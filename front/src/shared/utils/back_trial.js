/* eslint-disable */

const env = {
  keeper: 'keeper',
  cloud:  'cloud',
  web:    'web'
};

const { types }         = require('./types.js');
const { generate_name } = require('./generate_name.js');
const { new_resources } = require('./resources.js');

async function get_mintable_songs() {
  return [];
}

async function get_mint_quantity(asset_id) {
  return 0;
}

async function get_mint_price(asset_id) {
  return {
    asset_name: 'WAVES',
    amount:     0
  };
}

async function get_mint_type(asset_id) {
  return 'cover';
}

async function get_chart() {
  return [];
}

function _new_stock() {
  return {
    prices: {
      chord:  0,
      rhythm: 0,
      beat:   0,
      hybrid: 0
    },
    resources: []
  };
}

var stock     = _new_stock();
var accounts  = [];

var _next_id = 0;

function _id() {
  _next_id++;
  return `${_next_id}`;
}

function _clone(obj) {
  let x = JSON.parse(JSON.stringify(obj));
  x.id = _id();
  delete x.quantity;
  return x;
}

function get_total_quantity(pool, type) {
  let quantity = 0;

  for (const res of pool)
    if (res.type === type)
      quantity += res.quantity;

  return quantity;
}

function get_resource_internal(pool, type) {
  if (pool.length === 0)
    return null;

  const quantity = get_total_quantity(pool, type);

  let index = Math.floor(Math.random() * quantity);
  let n = 0;

  for (; n < pool.length; n++) {
    if (pool[n].type != type)
      continue;
    index -= pool[n].quantity;
    if (index < 0)
      break;
  }

  if (n >= 0 && n < pool.length) {
    let res = pool[n];
    res.quantity--;
    if (res.quantity === 0) {
      pool[n] = pool[pool.length - 1];
      pool.pop();
    }
    return _clone(res);
  }

  return null;
}

function generate_instruments() {
  return {
    kick:   'kick-alpha',
    snare:  'snare-alpha',
    hihat:  'hihat-alpha',
    bass:   'bass-alpha',
    back:   'back-alpha',
    lead:   'lead-alpha'
  };
}

function generate_tonality() {
  const tons = [
    { id: '0', type: types.tonality, label: 'G minor', key: -5 },
    { id: '0', type: types.tonality, label: 'A minor', key: -3 },
    { id: '0', type: types.tonality, label: 'H minor', key: -1 },
    { id: '0', type: types.tonality, label: 'C minor', key: 0 },
    { id: '0', type: types.tonality, label: 'E minor', key: 4 },
    { id: '0', type: types.tonality, label: 'F minor', key: 5 }
  ];

  return tons[Math.floor(Math.random() * tons.length)];
}

function generate_pattern_size() {
  return 8;
}

function generate_pattern(size, unique_count) {
  let pattern = [];
  for (let i = 0; i < size - unique_count; i++)
    pattern.push(Math.floor(Math.random() * unique_count));
  for (let i = 0; i < unique_count; i++)
    pattern.push(i);
  for (let i = 2; i < size; i++) {
    const j = Math.floor(Math.random() * i);
    const x = pattern[i];
    pattern[i] = pattern[j];
    pattern[j] = x;
  }
  return pattern;
}

function generate_rhythm() {
  return {
    id:     '0',
    type:   types.rhythm,
    label:  'flat',
    notes:  [ 30, 2 ]
  };
}

function generate_beat() {
  return {
    id:     '0',
    type:   types.beat,
    label:  'none',
    kick:   [ 0, 32 ],
    snare:  [ 0, 32 ],
    hihat:  [ 0, 32 ]
  };
}

function generate_arpeggio() {
  const size = Math.floor(Math.random() * 16);
  let v = [];
  for (let i = 0; i < size; i++)
    v.push(Math.floor(Math.random() * 15) - 7);
  return v;
}

function multiply_rhythm(rhythm, count) {
  let v = [];
  for (let i = 0; i < count; i++)
    v.push(rhythm);
  return v;
}

function generate_bpm() {
  const bpms = [ 116, 122, 128, 134, 140, 146 ];
  return bpms[Math.floor(Math.random() * bpms.length)];
}

function from_beat(beat, name) {
  let rhythm = {
    id:     beat.id,
    type:   types.beat,
    label:  beat.label
  };

  rhythm.notes = beat[name];

  return rhythm;
}

function purge(pool, id) {
  for (let i = 0; i < pool.length; i++) {
    if (pool[i].id !== id)
      continue;
    pool[i] = pool[pool.length - 1];
    pool.pop();
    pool.sort((a, b) => {
      if (a.id < b.id)
        return -1;
      return 1;
    });
    return;
  }
}

function find_resource(pool, type, ids, remove) {
  for (const res of pool) {
    for (let i = 0; i < ids.length; i++) {
      if ((type.length === 0 || res.type === type) && res.id === ids[i]) {
        remove(i);
        return res;
      }
    }
  }

  return null;
}

function mix_chords(pattern, chords) {
  let result = [];
  for (const i of pattern)
    result.push(chords[i % chords.length]);
  return result;
}

function song_blank() {
  const id = _id();

  return {
    asset_id: `TEST_${id}`,
    asset_url: 'https://wavesexplorer.com/',

    id: id,
    type: types.song,
    name_index: 0,
    label: generate_name(Math.floor(Math.random() * 65536 * 65536)),
    parents: [],
    generation: 1,

    bpm:          generate_bpm(),
    bar_size:     32,
    beat_size:    8,
    tonality:     generate_tonality(),
    instruments:  generate_instruments(),
    chords:       [],

    rhythm: {
      kick:   [],
      snare:  [],
      hihat:  [],
      bass:   [],
      back:   [],
      lead:   []
    }
  };
}

function contain_id(v, id) {
  for (const x of v)
    if (x.id === id)
      return true;
  return false;
}

function get_unique(v) {
  let result = [];
  for (const x of v)
    if (!contain_id(result, x.id))
      result.push(x);
  return result;
}

function song_add_chord(song, chord) {
  if (song.chords.length === 0) {
    const size = generate_pattern_size();
    for (let i = 0; i < size; i++)
      song.chords.push(chord);
  } else {
    let v = get_unique(song.chords);
    v.push(chord);
    song.chords = mix_chords(generate_pattern(song.chords.length, v.length), v);
  }
}

function song_add_beat(song, beat) {
  const size  = generate_pattern_size();

  song.rhythm.kick  = multiply_rhythm(from_beat(beat, 'kick'), size);
  song.rhythm.snare = multiply_rhythm(from_beat(beat, 'snare'), size);
  song.rhythm.hihat = multiply_rhythm(from_beat(beat, 'hihat'), size);
}

function song_add_rhythm(song, rhythm) {
  const v = [ 'bass', 'back', 'lead' ];
  const n = Math.floor(Math.random() * v.length);

  const limit = v.length * v.length;
  let   index = 0;

  for (let i = 0; i < n && index < limit; index++)
    if (song.rhythm[v[index % v.length]].length === 0)
      i++;

  if (song.rhythm[v[index % v.length]].length === 0)
    song.rhythm[v[index % v.length]] =
      multiply_rhythm(rhythm, generate_pattern_size());
}

function song_add_element(song, element) {
  if (element.type === types.chord)
    song_add_chord(song, element);
  if (element.type === types.beat)
    song_add_beat(song, element);
  if (element.type === types.rhythm)
    song_add_rhythm(song, element);
}

function pick_random(first, second) {
  if (Math.floor(Math.random() * 2) === 0)
    return first;
  return second;
}

function shaffle_elements(first, second) {
  if (first.length === 0)
    return second;
  if (second.length === 0)
    return first;

  let result  = [];
  const size  = pick_random(first.length, second.length);

  for (let i = 0; i < size; i++)
    result.push(
      pick_random(
        first[i % first.length],
        second[i % second.length]));

  return result;
}

function mint_hybrid_internal(song1, song2) {
  const id = _id();

  return {
    asset_id: `TEST_${id}`,
    asset_url: 'https://wavesexplorer.com/',

    id:       id,
    type:     types.song,
    label:    generate_name(Math.floor(Math.random() * 65536 * 65536)),
    parents:  [ song1.id, song2.id ],
    generation: Math.max(song1.generation, song2.generation) + 1,

    bpm:        pick_random(song1.bpm, song2.bpm),
    bar_size:   pick_random(song1.bar_size, song2.bar_size),
    beat_size:  pick_random(song1.beat_size, song2.beat_size),
    tonality:   pick_random(song1.tonality, song2.tonality),

    instruments: {
      kick:   pick_random(song1.instruments.kick, song2.instruments.kick),
      snare:  pick_random(song1.instruments.snare, song2.instruments.snare),
      hihat:  pick_random(song1.instruments.hihat, song2.instruments.hihat),
      bass:   pick_random(song1.instruments.bass, song2.instruments.bass),
      back:   pick_random(song1.instruments.back, song2.instruments.back),
      lead:   pick_random(song1.instruments.lead, song2.instruments.lead)
    },

    chords:     shaffle_elements(song1.chords, song2.chords),
    arpeggio:   pick_random(song1.arpeggio, song2.arpeggio),

    rhythm: {
      kick:   shaffle_elements(song1.rhythm.kick, song2.rhythm.kick),
      snare:  shaffle_elements(song1.rhythm.snare, song2.rhythm.snare),
      hihat:  shaffle_elements(song1.rhythm.hihat, song2.rhythm.hihat),
      bass:   shaffle_elements(song1.rhythm.bass, song2.rhythm.bass),
      back:   shaffle_elements(song1.rhythm.back, song2.rhythm.back),
      lead:   shaffle_elements(song1.rhythm.lead, song2.rhythm.lead)
    }
  };
}

function find_account(id) {
  return find_resource(accounts, '', [ id ], () => {});
}

function mint_song_for_account(account, resources) {
  if (resources.length === 0)
    throw new Error('Invalid resources');
  for (const res of resources)
    if (!find_resource(account.resources, '', [ res.id ], () => {}))
      throw new Error('Invalid resources');

  let song = song_blank();

  for (const res of resources) {
    song_add_element(song, res);
    purge(account.resources, res.id);
  }

  if (song.rhythm.kick.length === 0) {
    const size = generate_pattern_size();
    const beat = generate_beat();
    song.rhythm.kick = multiply_rhythm(from_beat(beat, 'kick'), size);
    song.rhythm.snare = multiply_rhythm(from_beat(beat, 'snare'), size);
    song.rhythm.hihat = multiply_rhythm(from_beat(beat, 'hihat'), size);
  }

  if (song.rhythm.bass.length === 0)
    song.rhythm.bass = multiply_rhythm(generate_rhythm(), generate_pattern_size());
  if (song.rhythm.back.length === 0)
    song.rhythm.back = multiply_rhythm(generate_rhythm(), generate_pattern_size());
  if (song.rhythm.lead.length === 0)
    song.rhythm.lead = multiply_rhythm(generate_rhythm(), generate_pattern_size());

  song.arpeggio = generate_arpeggio();


  return song;
}

async function get_resource_by_id(id) {
  for (const res of stock.resources)
    if (res.id == id)
      return JSON.parse(JSON.stringify(res));
  for (const user of accounts)
    for (const res of user.resources)
      if (res.id == id)
        return JSON.parse(JSON.stringify(res));
  return null;
}

async function get_resource_by_asset_id(asset_id) {
  for (const res of stock.resources)
    if (res.asset_id == asset_id)
      return JSON.parse(JSON.stringify(res));
  for (const user of accounts)
    for (const res of user.resources)
      if (res.asset_id == asset_id)
        return JSON.parse(JSON.stringify(res));
  return null;
}

async function get_song_rarity_by_asset_id(asset_id) {
  return 50;
}

class clearance_handler {
  constructor(id_) {
    this.id             = id_;
    this.allowed_claims = 0;
  }

  async logout() {
    this.id = 0;
  }

  async empty_stock() {
    let account = find_account(this.id);
    if (!account)
      return;

    stock.resources = [];
  }

  async add_balance(balance) {
    let account = find_account(this.id);
    if (!account)
      return;

    account.balance += balance;
  }

  async mint_resources(resources) {
    let account = find_account(this.id);
    if (!account)
      return;

    for (const res of resources)
      stock.resources.push(res);
  }

  async get_price(type) {
    let account = find_account(this.id);
    if (!account)
      throw new Error('No account');

    if (type in stock.prices)
      return {
        asset_name: 'USD',
        amount:     stock.prices[type]
      };

    throw new Error('Invalid entity type');
  }

  async get_balance() {
    let account = find_account(this.id);
    if (!account)
      throw new Error('No account');

    return {
      asset_name: 'USD',
      amount:     account.balance
    };
  }

  async get_free_mix_balance() {
    let account = find_account(this.id);
    if (!account)
      return;

    return account.free_mix_balance;
  }

  async get_resources(options) {
    let account = find_account(this.id);
    if (!account)
      return;

    let resources = [];

    const filter = (res) => {
      if (!options || !('filter' in options))
        return true;
      if (typeof options.filter === 'string')
        return res.type === options.filter;
      return options.filter.includes(res.type);
    };

    const begin = () => {
      if (!options || !('after' in options))
        return account.resources.length - 1;
      for (let i = account.resources.length - 1; i >= 0; i--)
        if (account.resources[i].id === options.after)
          return i - 1;
      return -1;
    };

    const done = () => {
      if (!options || !('size' in options))
        return false;
      return resources.length >= options.size;
    };

    for (let i = begin(); i >= 0; i--) {
      if (done())
        break;

      const res = account.resources[i];

      if (filter(res))
        resources.push(res);
    }

    return JSON.parse(JSON.stringify(resources));
  }

  async buy(type) {
    let account = find_account(this.id);
    if (!account)
      return;

    const price = stock.prices[type];
    if (account.balance < price)
      return;

    const resource = get_resource_internal(stock.resources, type);
    if (!resource)
      return;

    account.resources.push(resource);
    account.balance -= price;
  }

  async mint_song(resources) {
    let account = find_account(this.id);
    if (!account)
      throw new Error('No account');

    const song = mint_song_for_account(account, resources);

    account.resources.push(song);

    return song.id;
  }

  async mint_hybrid(songs) {
    let ids = [];
    for (const song of songs)
      ids.push(song.id);

    let account = find_account(this.id);
    if (!account)
      throw new Error('No account');

    if (ids.length !== 2)
      throw new Error('Invalid resources');
    if (ids[0] === ids[1])
      throw new Error('Invalid resources');
    if (account.balance < stock.prices.hybrid)
      throw new Error('Not enough balance');

    const song1 = find_resource(account.resources, types.song, [ ids[0] ], () => {});
    const song2 = find_resource(account.resources, types.song, [ ids[1] ], () => {});

    if (song1 === null || song2 === null)
      throw new Error('Invalid resources');

    const hybrid = mint_hybrid_internal(song1, song2);

    account.resources.push(hybrid);
    account.balance -= stock.prices.hybrid;

    return hybrid.id;
  }

  async mint_hybrid_with_free_mix_token(songs) {
    let ids = [];
    for (const song of songs)
      ids.push(song.id);

    let account = find_account(this.id);
    if (!account)
      throw new Error('No account');

    if (ids.length !== 2)
      throw new Error('Invalid resources');
    if (ids[0] === ids[1])
      throw new Error('Invalid resources');
    if (account.free_mix_balance < 1)
      throw new Error('Not enough balance');

    const song1 = find_resource(account.resources, types.song, [ ids[0] ], () => {});
    const song2 = find_resource(account.resources, types.song, [ ids[1] ], () => {});

    if (song1 === null || song2 === null)
      throw new Error('Invalid resources');

    const hybrid = mint_hybrid_internal(song1, song2);

    account.resources.push(hybrid);
    account.free_mix_balance -= 1;

    return hybrid.id;
  }

  async mint_hybrid_and_burn(songs) {
    let ids = [];
    for (const song of songs)
      ids.push(song.id);

    let account = find_account(this.id);
    if (!account)
      throw new Error('No account');

    if (ids.length !== 2)
      throw new Error('Invalid resources');
    if (ids[0] === ids[1])
      throw new Error('Invalid resources');

    const song1 = find_resource(account.resources, types.song, [ ids[0] ], () => {});
    const song2 = find_resource(account.resources, types.song, [ ids[1] ], () => {});

    if (song1 === null || song2 === null)
      throw new Error('Invalid resources');

    const hybrid = mint_hybrid_internal(song1, song2);

    purge(account.resources, song1.id);
    purge(account.resources, song2.id);

    account.resources.push(hybrid);

    return hybrid.id;
  }

  async can_mint_hybrid() {
    return true;
  }

  async get_wallet_address() {
    return 'CLEF_TRIAL_WALLET';
  }

  async get_explorer_url() {
    return 'https://wavesexplorer.com/';
  }

  async get_airdrop_info(airdrop_name) {
    return {
      airdrop_exists:     false,
      user_in_whitelist:  false,
      allowed_claims:     0,
      songs_total:        0
    };
  }

  async airdrop_claim(airdrop_name) {
    if (airdrop_name !== 'test')
      return [];
    if (this.allowed_claims <= 0)
      return [];

    let account = find_account(this.id);
    if (!account)
      return [];

    const resource = get_resource_internal(stock.resources, types.song);
    if (!resource)
      return [];

    account.resources.push(resource);
    this.allowed_claims--;

    return [ resource.id ];
  }
};

function new_account() {
  return {
    id:               _id(),
    balance:          0,
    free_mix_balance: 0,
    resources:        []
  };
}

let user_ = (async () => {
  const resources = new_resources();
  for (const res of resources)
      stock.resources.push(res);

  const account = new_account();

  const chord_ = (notes) => {
    return {
      id:     _id(),
      type:   types.chord,
      label:  '',
      notes:  notes
    };
  };

  const rhythm_ = (notes, scale = 1) => {
    for (let i = 0; i < notes.length; i++) {
      notes[i] /= scale;
    }

    return {
      id:     _id(),
      type:   types.rhythm,
      label:  '',
      notes:  notes
    };
  };

  const Am    = chord_([  9,  9,  9, 12, 16 ]);
  const C     = chord_([  0,  0,  0,  4,  7 ]);
  const Dm    = chord_([  2,  2,  2,  5,  9 ]);
  const Em    = chord_([  4,  4,  4,  7, 11 ]);
  const F     = chord_([  5,  5,  5,  9, 12 ]);
  const G     = chord_([  7,  7,  7, 11, 14 ]);
  const Asus2 = chord_([  9,  9,  9, 11, 16 ]);
  const Dsus2 = chord_([  2,  2,  2,  4,  9 ]);

  const slow    = rhythm_([ 15, 1 ]);
  const steady  = rhythm_([ 7, 1 ]);
  const fast    = rhythm_([ 3, 1 ]);
  const middle  = rhythm_([ 0, 8, 8, 0 ]);
  const offbeat = rhythm_([ 0, 4, 4, 0 ]);
  const sync    = rhythm_([ 5, 1, 5, 1, 3, 1 ]);

  const arpeggios = [
    [ -5, 7, -5, -2, 1, 7, 0, -1, -4, 4, 6, 7, -5, -6, 3 ],
    [  2, -4, -2, 6, 2, -5, 2, 3 ],
    [ 3, -1, 0, -1, 2 ],
    [ -7, 6, 1, -6 ]
  ];

  const mult_8_ = (x) => {
    let v = [];
    for (let i = 0; i < 8; i++) {
      v.push(x);
    }
    return v;
  };

  const mult_4_ = (x) => {
    let v = [];
    for (let i = 0; i < 4; i++) {
      v.push(x);
    }
    return v;
  };

  const concat_ = (x, y) => {
    let v = [];
    for (const z of x) {
      v.push(z);
    }
    for (const z of y) {
      v.push(z);
    }
    return v;
  };

  const add_ = (x) => {
    x.id        = _id();
    x.asset_id  = `CLEF_TRIAL_${x.id}`;

    account.resources.push(JSON.parse(JSON.stringify(x)));
  };

  add_({
    type:       types.song,
    asset_url:  'https://wavesexplorer.com/',
    label:      'Faded Tennis',
    name_index: 0,
    parents:    [],
    generation: 1,
    bpm:        170,
    bar_size:   32,
    beat_size:  8,
    tonality: {
      id:     _id(),
      label:  '',
      key:    4
    },
    instruments: {
      kick:   'kick-alpha',
      snare:  'snare-alpha',
      hihat:  'hihat-alpha',
      bass:   'bass-alpha',
      back:   'back-alpha',
      lead:   'lead-alpha'
    },
    chords: [
      Asus2, Asus2, Dsus2, Dsus2, Asus2, Asus2, Dsus2, Dsus2
    ],
    arpeggio: arpeggios[3],
    rhythm: {
      kick:   mult_8_(steady),
      snare:  mult_8_(middle),
      hihat:  mult_8_(steady),
      bass:   mult_8_(sync),
      back:   mult_8_(steady),
      lead:   mult_8_(slow)
    }
  });

  add_({
    type:       types.song,
    asset_url:  'https://wavesexplorer.com/',
    label:      'Well-considered Pound',
    name_index: 0,
    parents:    [],
    generation: 1,
    bpm:        120,
    bar_size:   32,
    beat_size:  8,
    tonality: {
      id:     _id(),
      label:  '',
      key:    0
    },
    instruments: {
      kick:   'kick-alpha',
      snare:  'snare-alpha',
      hihat:  'hihat-alpha',
      bass:   'bass-alpha',
      back:   'back-alpha',
      lead:   'lead-alpha'
    },
    chords: [
      C, C, F, F, C, C, G, G
    ],
    arpeggio: arpeggios[0],
    rhythm: {
      kick:   mult_8_(slow),
      snare:  mult_8_(middle),
      hihat:  mult_8_(offbeat),
      bass:   mult_8_(sync),
      back:   mult_8_(slow),
      lead:   mult_8_(fast)
    }
  });

  add_({
    type:       types.song,
    asset_url:  'https://wavesexplorer.com/',
    label:      'Scarred Perspective',
    name_index: 0,
    parents:    [],
    generation: 1,
    bpm:        110,
    bar_size:   32,
    beat_size:  8,
    tonality: {
      id:     _id(),
      label:  '',
      key:    -2
    },
    instruments: {
      kick:   'kick-alpha',
      snare:  'snare-alpha',
      hihat:  'hihat-alpha',
      bass:   'bass-alpha',
      back:   'back-alpha',
      lead:   'lead-alpha'
    },
    chords: [
      Am, Am, Em, Em, Dm, Dm, Em, Em
    ],
    arpeggio: arpeggios[1],
    rhythm: {
      kick:   mult_8_(steady),
      snare:  mult_8_(middle),
      hihat:  mult_8_(fast),
      bass:   mult_8_(steady),
      back:   mult_8_(slow),
      lead:   mult_8_(sync)
    }
  });

  add_({
    type:       types.song,
    asset_url:  'https://wavesexplorer.com/',
    label:      'Incalculable Celebration',
    name_index: 0,
    parents:    [],
    generation: 1,
    bpm:        140,
    bar_size:   32,
    beat_size:  8,
    tonality: {
      id:     _id(),
      label:  '',
      key:    2
    },
    instruments: {
      kick:   'kick-alpha',
      snare:  'snare-alpha',
      hihat:  'hihat-alpha',
      bass:   'bass-alpha',
      back:   'back-alpha',
      lead:   'lead-alpha'
    },
    chords: [
      C, C, Dm, Dm, F, F, Am, Am,
    ],
    arpeggio: arpeggios[2],
    rhythm: {
      kick:   mult_8_(sync),
      snare:  mult_8_(middle),
      hihat:  mult_8_(offbeat),
      bass:   mult_8_(sync),
      back:   mult_8_(steady),
      lead:   mult_8_(fast)
    }
  });

  /*  Covers
   */

  /*
  add_({
    type:       types.song,
    asset_url:  'https://wavesexplorer.com/',
    label:      'Take On Me',
    name_index: 0,
    parents:    [],
    generation: 1,
    bpm:        168,
    bar_size:   32,
    beat_size:  8,
    tonality: {
      id:     _id(),
      label:  '',
      key:    -1
    },
    instruments: {
      kick:   'kick-alpha',
      snare:  'snare-alpha',
      hihat:  'hihat-alpha',
      bass:   'bass-alpha',
      back:   'back-alpha',
      lead:   'lead-alpha'
    },
    chords: [
      chord_([  0,  7,  0,  7,  3,  0,  0,  5 ]),
      chord_([  5,  5, 12,  5,  9,  9, 10, 12 ]),
      chord_([ -2, 10,  5, 10, 10,  5,  2,  7 ]),
      chord_([  3,  7, 14,  7,  5,  5,  7,  5 ]),

      chord_([  0,  7,  0,  7,  3,  0,  0,  5 ]),
      chord_([  5,  5, 12,  5,  9,  9, 10, 12 ]),
      chord_([ -2, 10,  5, 10, 10,  5,  2,  7 ]),
      chord_([  3,  7, 14,  7,  5,  5,  7,  5 ])
    ],
    arpeggio: [
      1, 2, 3, 4, 5
    ],
    rhythm: {
      kick:   mult_8_(steady),
      snare:  mult_8_(middle),
      hihat:  mult_8_(fast),
      bass:   mult_8_(steady),
      back:   mult_8_(rhythm_([ 2, 30 ])),
      lead:   mult_8_(rhythm_([
        3, 1,
        3, 1,
        3, 1,
        7, 1,
        7, 1,
        7, 1,
        7, 1,
        3, 1,
        3, 1,
        3, 1,
        3, 1,
        3, 1
      ]))
    }
  });

  add_({
    type:       types.song,
    asset_url:  'https://wavesexplorer.com/',
    label:      'Animals',
    name_index: 0,
    parents:    [],
    generation: 1,
    bpm:        128,
    bar_size:   16,
    beat_size:  8,
    tonality: {
      id:     _id(),
      label:  '',
      key:    5
    },
    instruments: {
      kick:   'kick-alpha',
      snare:  'snare-alpha',
      hihat:  'hihat-alpha',
      bass:   'bass-alpha',
      back:   'back-alpha',
      lead:   'lead-alpha'
    },
    chords: [
      chord_([  0,  3,  0,  3,  3,  5 ]),
      chord_([  3,  7,  3,  7, 10,  5 ]),
      chord_([ -5,  5,  5,  7,  3,  2 ]),
      chord_([  0,  0,  0,  3,  7 ]),
      chord_([  0,  3,  0,  3,  3,  5,  5 ]),
      chord_([  0,  0,  0,  3,  3,  3 ]),
      chord_([  0,  3,  0,  3,  3,  5,  5 ]),
      chord_([  0,  0,  0,  3,  7 ])
    ],
    arpeggio: [
      2, 3, 4
    ],
    rhythm: {
      kick:   mult_8_(steady),
      snare:  mult_8_(middle),
      hihat:  mult_8_(fast),
      bass:   mult_8_(steady),
      back:   mult_8_(rhythm_([ 2, 30 ])),
      lead:   concat_(
        mult_4_(rhythm_([
          5, 3,
          3, 1,
          3, 1,
          5, 3,
          4, 2,
          4, 2,
          3, 1,
          2, 2,
          2, 2,
          5, 11
        ])),
        mult_4_(rhythm_([
          3, 1,
          3, 1,
          3, 1,
          3, 1,
          5, 7,
          1, 1,
          1, 1,
          3, 1,
          3, 1,
          3, 1,
          3, 1,
          5, 11
        ]))
      )
    }
  });

  add_({
    type:       types.song,
    asset_url:  'https://wavesexplorer.com/',
    label:      'Blue',
    name_index: 0,
    parents:    [],
    generation: 1,
    bpm:        128,
    bar_size:   8,
    beat_size:  4,
    tonality: {
      id:     _id(),
      label:  '',
      key:    7
    },
    instruments: {
      kick:   'kick-alpha',
      snare:  'snare-alpha',
      hihat:  'hihat-alpha',
      bass:   'bass-alpha',
      back:   'back-alpha',
      lead:   'lead-alpha'
    },
    chords: [
      chord_([  0,  3, -5,  0,  3 ]),
      chord_([ -2,  5, -2,  2,  3 ]),
      chord_([ -4,  0,  3,  7,  0 ]),
      chord_([ -7,  8,  0,  7,  5 ]),

      chord_([  0,  3, -5,  0,  3 ]),
      chord_([ -2,  5, -2,  2,  3 ]),
      chord_([ -4,  0,  3,  7,  0 ]),
      chord_([ -7,  8,  0,  7,  5 ])
    ],
    arpeggio: [
      0, 1, 2, 3
    ],
    rhythm: {
      kick:   mult_8_(steady),
      snare:  mult_8_(middle),
      hihat:  mult_8_(fast),
      bass:   mult_8_(steady),
      back:   mult_8_(rhythm_([ 2, 30 ])),
      lead:   mult_8_(rhythm_([
        3, 1,
        3, 1,
        3, 1,
        3, 1,
        3, 1,
        3, 1,
        3, 1,
        7, 1,
        3, 1,
        3, 1,
        3, 1,
        3, 1,
        3, 1,
        3, 1,
        3, 1
      ], 2))
    }
  });

  add_({
    type:       types.song,
    asset_url:  'https://wavesexplorer.com/',
    label:      'What Is Love',
    name_index: 0,
    parents:    [],
    generation: 1,
    bpm:        124,
    bar_size:   16,
    beat_size:  4,
    tonality: {
      id:     _id(),
      label:  '',
      key:    7
    },
    instruments: {
      kick:   'kick-alpha',
      snare:  'snare-alpha',
      hihat:  'hihat-alpha',
      bass:   'bass-alpha',
      back:   'back-alpha',
      lead:   'lead-alpha'
    },
    chords: [
      chord_([  0,  7,  0,  7, 12,  8,  7, 10 ]),
      chord_([ -9,  7, -9, -2,  5,  7, 10 ]),
      chord_([ -5,  7, -5,  2,  7,  7,  5 ]),
      chord_([ -2,  7, -2,  5, 10, 10, 12 ]),

      chord_([  0,  7,  0,  7, 12,  8,  7, 10 ]),
      chord_([ -9,  7, -9, -2,  5,  7, 10 ]),
      chord_([ -5,  7, -5,  2,  7,  7,  5 ]),
      chord_([ -2,  7, -2,  5, 10, 10, 12 ])
    ],
    arpeggio: [
      3, 4, 5
    ],
    rhythm: {
      kick:   mult_8_(rhythm_([ 6, 2 ], 2)),
      snare:  mult_8_(rhythm_([ 0, 8, 8, 0 ], 2)),
      hihat:  mult_8_(rhythm_([ 0, 4, 4, 0 ], 2)),
      bass:   mult_8_(rhythm_([
        4, 4,
        4, 4,
        4, 2,
        4, 2,
        3, 1
      ], 2)),
      back:   mult_8_(rhythm_([ 0, 16 ])),
      lead:   mult_8_(rhythm_([
        0, 16,
        3, 1,
        3, 1,
        3, 1,
        7, 1,

        0, 4,
        7, 9,
        3, 1,
        7, 1,

        0, 4,
        7, 9,
        3, 1,
        7, 1,

        0, 16,
        3, 1,
        3, 1,
        7, 1,

        0, 12,
        3, 1,
        3, 1,
        3, 1,
        7, 1,

        0, 4,
        7, 9,
        3, 1,
        7, 1,

        0, 4,
        7, 9,
        3, 1,
        7, 1,

        0, 16,
        3, 1,
        3, 1,
        3, 1
      ], 2))
    }
  });

  add_({
    type:       types.song,
    asset_url:  'https://wavesexplorer.com/',
    label:      'Better Off Alone',
    name_index: 0,
    parents:    [],
    generation: 1,
    bpm:        137,
    bar_size:   16,
    beat_size:  4,
    tonality: {
      id:     _id(),
      label:  '',
      key:    4
    },
    instruments: {
      kick:   'kick-alpha',
      snare:  'snare-alpha',
      hihat:  'hihat-alpha',
      bass:   'bass-alpha',
      back:   'back-alpha',
      lead:   'lead-alpha'
    },
    chords: [
      chord_([  0,  7,  0,  7,  7,  4,  7,  7 ]),
      chord_([ -1,  6, -1,  6,  2, 14, 14, 11 ]),
      chord_([  4,  7,  4, 11,  7,  4,  7,  7 ]),
      chord_([  2,  6,  2,  9,  2, 12, 12, 11 ])
    ],
    arpeggio: [
      2, 3, 4, 5
    ],
    rhythm: {
      kick:   mult_8_(rhythm_([ 6, 2 ], 2)),
      snare:  mult_8_(rhythm_([ 0, 8, 8, 0 ], 2)),
      hihat:  mult_8_(rhythm_([ 0, 4, 4, 0 ], 2)),
      bass:   mult_8_(rhythm_([
        0, 4, 4, 0
      ], 2)),
      back:   mult_8_(rhythm_([ 0, 16 ])),
      lead:   mult_8_(rhythm_([
        7, 1,
        3, 1,
        7, 1,
        7, 1,
        7, 1,

        //0, 4,
        7, 1,
        3, 1,
        5, 1,
        5, 1,
        3, 1
      ], 2))
    }
  });
  */

  add_({
    type:       types.song,
    asset_url:  'https://wavesexplorer.com/',
    label:      'Can\'t Take My Eyes Off You',
    name_index: 0,
    parents:    [],
    generation: 1,
    bpm:        124,
    bar_size:   16,
    beat_size:  4,
    tonality: {
      id:     _id(),
      label:  '',
      key:    9 // Gb minor (A major)
    },
    instruments: {
      kick:   'kick-alpha',
      snare:  'snare-alpha',
      hihat:  'hihat-alpha',
      bass:   'bass-alpha',
      back:   'back-alpha',
      lead:   'lead-alpha'
    },
    chords: [
      chord_([ -8, -1,  -8, -4, -1,  11, 11, 11         ]),
      chord_([ -3, 11,  -1,  4, 11,   4,  6,  7,  9     ]),
      chord_([  2, 11,  -1,  6, 11,  11,  9,  7,  6,  7 ]),
      chord_([ -1,  9,  -3,  2,  9,   2,  4,  6,  7     ]),

      chord_([  4,  9,  -3,  4,  9,   9,  7,  7,  7,  4 ]),
      chord_([ -3,  7,  -5,  0,  7,   0                 ]),
      chord_([  2,  7,  -5,  0,  7,   7,  6,  7,  6     ]),
      chord_([ -5,  4,  -5, -1,  4,   2                 ])
    ],
    arpeggio: [
      3, 4, 5, 6, 7
    ],
    rhythm: {
      kick:   mult_8_(rhythm_([ 6, 2 ], 2)),
      snare:  mult_8_(rhythm_([ 0, 8, 8, 0 ], 2)),
      hihat:  mult_8_(rhythm_([ 0, 4, 4, 0 ], 2)),
      bass:   mult_8_(rhythm_([
        4, 0
      ], 2)),
      back:   mult_8_(rhythm_([ 14, 2 ])),
      lead:   mult_8_(rhythm_([
        8, 0,
        7, 1,
        7, 1,
        7, 1,

        12, 0,
        8, 0,
        4, 0,
        4, 0,
        3, 1,

        3, 1,
        8, 0,
        8, 0,
        4, 0,
        4, 0,
        4, 0,

        12, 0,
        8, 0,
        4, 0,
        4, 0,
        4, 0,

        3, 1,
        8, 0,
        7, 1,
        3, 1,
        4, 0,
        4, 0,

        12, 0,
        20, 0,

        7, 1,
        4, 0,
        8, 0,
        4, 0,
        8, 0,

        12, 0,
        20, 0
      ], 2))
    }
  });

  add_({
    type:       types.song,
    asset_url:  'https://wavesexplorer.com/',
    label:      'The Final Countdown',
    name_index: 0,
    parents:    [],
    generation: 1,
    bpm:        118,
    bar_size:   16,
    beat_size:  4,
    tonality: {
      id:     _id(),
      label:  '',
      key:    9 // Gb minor (A major)
    },
    instruments: {
      kick:   'kick-alpha',
      snare:  'snare-alpha',
      hihat:  'hihat-alpha',
      bass:   'bass-alpha',
      back:   'back-alpha',
      lead:   'lead-alpha'
    },
    chords: [
      chord_([ -3,  4,  -3,  4,  9,   2,  4, -3         ]),
      chord_([ -7,  5,  -7,  0,  5,   4,  5,  4,  2     ]),
      chord_([-10,  5, -10, -3,  2,   4,  5, -3         ]),
      chord_([ -5,  2,  -5,  2,  7,   0,  2,  0, -1,  2 ]),

      chord_([ -3,  0,  -3,  4,  9,   4,  2,  4, -3     ]),
      chord_([ -7,  5,  -7,  0,  5,   4,  5,  4,  2     ]),
      chord_([-10,  5, -10, -3,  2,   4,  5, -3         ]),
      chord_([ -5,  2,  -5,  2,  7,   0,  2,  0, -1,  2 ]),
    ],
    arpeggio: [
      3, 4, 5, 6, 7, 8
    ],
    rhythm: {
      kick:   mult_8_(rhythm_([ 16,  0         ], 2)),
      snare:  mult_8_(rhythm_([  0, 16, 16,  0 ], 2)),
      hihat:  mult_8_(rhythm_([  0,  8,  8,  0 ], 2)),
      bass:   mult_8_(rhythm_([ 16, 16         ], 2)),
      back:   mult_8_(rhythm_([ 16, 16         ], 2)),
      lead:   mult_8_(rhythm_([
        0, 24,
        3, 1,
        3, 1,
        16, 0,
        16, 0,

        0, 24,
        3, 1,
        3, 1,
        3, 5,
        3, 5,
        16, 0,

        0, 24,
        3, 1,
        3, 1,
        16, 0,
        16, 0,

        0, 24,
        3, 1,
        3, 1,
        3, 5,
        3, 5,
        3, 5,
        3, 5,

        16, 8,
        3, 1,
        3, 1,
        16, 0,
        16, 0,

        0, 24,
        3, 1,
        3, 1,
        3, 5,
        3, 5,
        16, 0,

        0, 24,
        3, 1,
        3, 1,
        16, 0,
        16, 0,

        0, 24,
        3, 1,
        3, 1,
        3, 5,
        3, 5,
        3, 5,
        3, 5,
      ], 4))
    }
  });

  add_({
    type:       types.song,
    asset_url:  'https://wavesexplorer.com/',
    label:      'Save Your Tears',
    name_index: 0,
    parents:    [],
    generation: 1,
    bpm:        118,
    bar_size:   16,
    beat_size:  4,
    tonality: {
      id:     _id(),
      label:  '',
      key:    0 // C major
    },
    instruments: {
      kick:   'kick-alpha',
      snare:  'snare-alpha',
      hihat:  'hihat-alpha',
      bass:   'bass-alpha',
      back:   'back-alpha',
      lead:   'lead-alpha'
    },
    chords: [
      chord_([ 0,  7,   0,  4,  7,   4,  7          ]),
      chord_([-3,  4,  -3,  0,  4,   7              ]),
      chord_([ 4,  9,  -1,  4,  7,   4,  4          ]),
      chord_([-5,  7,  -5, -1,  2,   5,  4,  5,  4  ]),
    ],
    arpeggio: [
      3, 4, 5, 6, 7, 8
    ],
    rhythm: {
      kick:   mult_8_(rhythm_([  8,  0         ], 2)),
      snare:  mult_8_(rhythm_([  0, 16, 16,  0 ], 2)),
      hihat:  mult_8_(rhythm_([  0,  4,  4,  0 ], 2)),
      bass:   mult_8_(rhythm_([  4,  0         ], 2)),
      back:   mult_8_(rhythm_([ 16,  0         ], 2)),
      lead:   mult_8_(rhythm_([
        0, 20,
        4, 0,
        4, 0,
        4, 0,

        6, 14,
        4, 8,

        4, 0,
        4, 0,
        8, 16,

        6, 2,
        6, 2,
        6, 2,
        4, 0,
        8, -4,
      ], 2))
    }
  });

  add_({
    type:       types.song,
    asset_url:  'https://wavesexplorer.com/',
    label:      'As It Was',
    name_index: 0,
    parents:    [],
    generation: 1,
    bpm:        174,
    bar_size:   32,
    beat_size:  4,
    tonality: {
      id:     _id(),
      label:  '',
      key:    9 // Gb minor (A major)
    },
    instruments: {
      kick:   'kick-alpha',
      snare:  'snare-alpha',
      hihat:  'hihat-alpha',
      bass:   'bass-alpha',
      back:   'back-alpha',
      lead:   'lead-alpha'
    },
    chords: [
      chord_([ 2,  0,   2,  5,  9,   2,  4,  2,  2,  2,  2,  0,  2,  0     ]),
      chord_([-5,  0,  -1,  2,  7,   2,  4,  2,  2,  2,  2,  0,  7,  7,  4 ]),
      chord_([ 0,  0,   0,  4,  7,   2,  4,  2,  2,  2,  2,  0,  2,  0     ]),
      chord_([ 5,  0,   0,  5,  9,   2,  4,  2,  2,  2,  2,  0,  7,  7,  4 ]),
    ],
    arpeggio: [
      3, 4, 5, 6, 7, 8, 9, 10, 11, 12
    ],
    rhythm: {
      kick:   mult_8_(rhythm_([ 16,  0, 16,  0, 12,  0,  8,  0, 12,  0 ], 2)),
      snare:  mult_8_(rhythm_([  0,  8,  8,  0 ], 2)),
      hihat:  mult_8_(rhythm_([  4,  0 ], 2)),
      bass:   mult_8_(rhythm_([ 16,  0 ], 1)),
      back:   mult_8_(rhythm_([ 32,  0 ], 1)),
      lead:   mult_8_(rhythm_([
        4, 0,
        4, 0,
        4, 0,
        4, 4,
        4, 4,
        4, 0,

        0, 4,
        4, 4,
        4, 0,
        4, 4,
        4, 4,

        4, 0,
        4, 0,
        4, 0,
        4, 4,
        4, 4,
        4, 0,

        0, 4,
        4, 4,
        4, 0,
        4, 0,
        4, 0,
        4, 4,
      ], 2))
    }
  });  accounts.push(account);

  add_({
    type:       types.song,
    asset_url:  'https://wavesexplorer.com/',
    label:      'Y.M.C.A',
    name_index: 0,
    parents:    [],
    generation: 1,
    bpm:        127,
    bar_size:   32,
    beat_size:  4,
    tonality: {
      id:     _id(),
      label:  '',
      key:    6 // Gb major
    },
    instruments: {
      kick:   'kick-alpha',
      snare:  'snare-alpha',
      hihat:  'hihat-alpha',
      bass:   'bass-alpha',
      back:   'back-alpha',
      lead:   'lead-alpha'
    },
    chords: [
      chord_([ 7, 12,   7, 11, 14,   9,  7, 12, 12,  9, 12, 12,  9, 12,  9, 12 ]),
      chord_([ 0,  9,   0,  4,  7,   7,  9,  7,  4,  7,  4,  7,  4,  2 ]),
      chord_([-3,  2,  -3,  0,  4,   0,  2,  0,                 12,  9 ]),
      chord_([ 2, 12,   2,  5,  9,  12, 12,  9, 12,  9, 12, 12, 12,  9, 12,  9 ]),
    ],
    arpeggio: [
      3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15
    ],
    rhythm: {
      kick:   mult_8_(rhythm_([  8,  0 ], 2)),
      snare:  mult_8_(rhythm_([  0,  8,  8,  0 ], 2)),
      hihat:  mult_8_(rhythm_([  0,  4,  2,  0,  2,  0 ], 2)),
      bass:   mult_8_(rhythm_([  4,  0,  2,  0,  2,  0 ], 2)),
      back:   mult_8_(rhythm_([ 16,  0 ], 1)),
      lead:   mult_8_(rhythm_([
        4, 0,
        4, 0,
        4, 0,
        4, 4,
        4, 4,
        4, 0,

        0, 4,
        4, 0,
        4, 0,
        4, 0,
        4, 0,
        4, 0,
        4, 4,

        16, 0,
        8, 0,
        4, 0,
        4, 0,

        0, 4,
        4, 0,
        4, 0,
        4, 0,
        4, 0,
        4, 0,
        4, 4,

        16, 0,
        8, 0,
        4, 0,
        4, 0,

        0, 24,
        4, 0,
        4, 0,

        4, 0,
        4, 0,
        4, 0,
        4, 8,
        4, 0,
        4, 0,

        4, 0,
        4, 0,
        4, 0,
        4, 8,
        4, 0,
        4, 0,
      ], 2))
    }
  });  accounts.push(account);


  return account.id;
})();

async function authenticate(options) {
  return new clearance_handler(await user_);
}

module.exports = {
  env:                          env,
  types:                        types,
  authenticate:                 authenticate,
  get_resource_by_id:           get_resource_by_id,
  get_resource_by_asset_id:     get_resource_by_asset_id,
  get_song_rarity_by_asset_id:  get_song_rarity_by_asset_id,

  get_mintable_songs:           get_mintable_songs,
  get_mint_quantity:            get_mint_quantity,
  get_mint_price:               get_mint_price,
  get_mint_type:                get_mint_type,
  get_chart:                    get_chart
};

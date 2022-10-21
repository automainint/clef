/* eslint-disable */

/*  Fake back-end implementation.
 */

const env = {
  keeper: 'keeper',
  cloud:  'cloud',
  web:    'web'
};

const { types }         = require('./types.js');
const { generate_name } = require('./generate_name.js');

function _new_stock() {
  return {
    prices: {
      chord:  10,
      rhythm: 10,
      beat:   10,
      hybrid: 50
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

class clearance_handler {
  constructor(id_) {
    this.id = id_;
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
      return;

    if (type in stock.prices)
      return stock.prices[type];

    return 0;
  }

  async get_balance() {
    let account = find_account(this.id);
    if (!account)
      return;

    return account.balance;
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

    /*  Imitate backend response delay.
     */
    for (const res of resources)
      if (res.type === types.song)
        await new Promise((resolve) => {
          setTimeout(resolve, 100);
        });

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

    if (resources.length > 4)
      throw new Error('Invalid resources');
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

    /*  Imitate backend response delay.
     */
    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });

    const hybrid = mint_hybrid_internal(song1, song2);

    account.resources.push(hybrid);
    account.balance -= stock.prices.hybrid;

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

    /*  Imitate backend response delay.
     */
    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });

    const hybrid = mint_hybrid_internal(song1, song2);

    purge(account.resources, song1.id);
    purge(account.resources, song2.id);

    account.resources.push(hybrid);

    return hybrid.id;
  }

  async get_wallet_address() {
    return 'f00ba7f00ba7f00ba7f00ba7';
  }

  async get_explorer_url() {
    return 'https://wavesexplorer.com/';
  }

  async can_mint_hybrid() {
    let balance = await this.get_balance();
    let price   = await this.get_price(types.hybrid);

    return balance >= price;
  }
};

function new_account() {
  return {
    id:         _id(),
    balance:    0,
    resources:  []
  };
}

async function authenticate(options) {
  if (options.env != env.keeper &&
      options.env != env.cloud &&
      options.env != env.web)
    throw new Error('Invalid environment');

  const account = new_account();
  accounts.push(account);
  return new clearance_handler(account.id);
}

module.exports = {
  env:                      env,
  types:                    types,
  authenticate:             authenticate,
  get_resource_by_id:       get_resource_by_id,
  get_resource_by_asset_id: get_resource_by_asset_id
};

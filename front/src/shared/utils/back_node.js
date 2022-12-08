/* eslint-disable */

const env = require('./env.js').env;

const { types }         = require('./types.js');
const { generate_name } = require('./generate_name.js');

const { Mutex } = require('async-mutex');

const { Signer }          = require('@waves/signer');
const { ProviderKeeper }  = require('@waves/provider-keeper');
const { ProviderCloud }   = require('@waves.exchange/provider-cloud');
const { ProviderWeb }     = require('@waves.exchange/provider-web');

const LOCK            = new Mutex();
const NOTE_SKIP       = 65535;
const UPDATE_TIMEOUT  = 5000;

const TOKEN_WAVES             = 'WAVES';
const TOKEN_FREE_MIX          = '3Luy24HNZY5RLKaJ8sc6jmER7QD8v1r7HBjQKX54skf1';

const KEY_PRICE_HYBRID_TOKEN  = 'price_hybrid_token';
const KEY_PRICE_HYBRID_AMOUNT = 'price_hybrid_amount';

const HYBRID_FEE_ASSET_ID     = TOKEN_WAVES;
const HYBRID_FEE              = 500000;
const HYBRID_PRICE_EXTRA      = 5;

const CLAIM_FEE_ASSET_ID      = TOKEN_WAVES;
const CLAIM_FEE               = 500000;
const CLAIM_LIMIT             = 20;

const keys_chord = [
  '_CL',
  '_C0',
  '_C1',
  '_C2',
  '_C3',
  '_C4'
];

const keys_arpeggio = [
  '_AL',
  '_A00',
  '_A01',
  '_A02',
  '_A03',
  '_A04',
  '_A05',
  '_A06',
  '_A07',
  '_A08',
  '_A09',
  '_A10',
  '_A11',
  '_A12',
  '_A13',
  '_A14',
  '_A15'
];

const keys_rhythm = [
  '_RL',
  '_RS',
  '_R00',
  '_R01',
  '_R02',
  '_R03',
  '_R04',
  '_R05',
  '_R06',
  '_R07',
  '_R08',
  '_R09',
  '_R10',
  '_R11',
  '_R12',
  '_R13',
  '_R14',
  '_R15'
];

const keys_song = [
  '_SL',
  '_SN',
  '_G',
  '_SP0',
  '_SP1',
  '_SB0',
  '_SB1',
  '_SB2',
  '_ST',
  '_SC0',
  '_SC1',
  '_SC2',
  '_SC3',
  '_SC4',
  '_SC5',
  '_SC6',
  '_SC7',
  '_SA',
  '_SI0',
  '_SI00',
  '_SI01',
  '_SI02',
  '_SI03',
  '_SI04',
  '_SI05',
  '_SI06',
  '_SI07',
  '_SI1',
  '_SI10',
  '_SI11',
  '_SI12',
  '_SI13',
  '_SI14',
  '_SI15',
  '_SI16',
  '_SI17',
  '_SI2',
  '_SI20',
  '_SI21',
  '_SI22',
  '_SI23',
  '_SI24',
  '_SI25',
  '_SI26',
  '_SI27',
  '_SI3',
  '_SI30',
  '_SI31',
  '_SI32',
  '_SI33',
  '_SI34',
  '_SI35',
  '_SI36',
  '_SI37',
  '_SI4',
  '_SI40',
  '_SI41',
  '_SI42',
  '_SI43',
  '_SI44',
  '_SI45',
  '_SI46',
  '_SI47',
  '_SI5',
  '_SI50',
  '_SI51',
  '_SI52',
  '_SI53',
  '_SI54',
  '_SI55',
  '_SI56',
  '_SI57'
];

let id_library    = env.keeper['W'].id_library;
let id_claim_pool = env.keeper['W'].id_claim_pool;
let network       = env.keeper['W'].network;
let node_url      = env.keeper['W'].node_url;

let cache = {};

function debug_log(s) {
  console.log(s);
}

function join_url(a, b) {
  if (a.length === 0)
    return b;
  if (b.length === 0)
    return a;
  if ((a[a.length - 1] == '/') != (b[0] == '/'))
    return a + b;
  if ((a[a.length - 1] == '/') && (b[0] == '/'))
    return a + b.substring(1);
  return a + '/' + b;
}

async function fetch_get(request) {
  try {
    const response = await window.fetch(
      join_url(node_url, request),
      { method: 'GET'
      });

    if (response.status != 200)
      return null;

    return await response.json();

  } catch (error) {
    return null;
  }
}

async function fetch_post(request, body) {
  try {
    const response = await window.fetch(
      join_url(node_url, request),
      { method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json' }
      });

    if (response.status != 200)
      return null;

    return await response.json();

  } catch (error) {
    return null;
  }
}

function tx_info_wait(id) {
  return new Promise((resolve, reject) => {
    let attempt;
    let request = `/transactions/info/${id}`;

    attempt = () => {
      fetch_get(request).then(data => {
        if (data === null)
          setTimeout(attempt, 2000);
        else
          resolve(data);
      });
    };

    attempt();
  });
}

async function get_value_by_key(contract_id, id, key) {
  try {
    const data = await fetch_get(`/addresses/data/${contract_id}/${id}${key}`);

    if (data === null)
      return null;

    return data.value;

  } catch (error) {
    return null;
  }
}

async function get_data_by_keys(contract_id, id, keys, first) {
  const request = `/addresses/data/${contract_id}`;
  const body    = { keys: [ ] };

  for (let i = first; i < keys.length; i++) {
    const key = keys[i];
    body.keys.push(`${id}${key}`);
  }

  return await fetch_post(request, body);
}

async function get_chord_explicit(n) {
  if (!(n in cache)) {
    cache[n] = (async () => {
      let chord = {
        type:   types.chord,
        id:     n,
        label:  '',
        notes:  []
      };

      const label = await get_value_by_key(id_library, n, keys_chord[0]);

      if (label === null) {
        return chord;
      }

      chord.label = label;

      const data = await get_data_by_keys(id_library, n, keys_chord, 1);

      for (let i = 0; i < 5; i++) {
        for (const x of data) {
          if (x.key === n + keys_chord[1 + i]) {
            const note = x.value;
            if (note === NOTE_SKIP)
              i = 5;
            else
              chord.notes.push(note);
            break;
          }
        }
      }

      return chord;
    })();
  }

  return await cache[n];
}

async function get_arpeggio_explicit(n) {
  if (!(n in cache)) {
    cache[n] = (async () => {
      let arpeggio = [];

      const label = await get_value_by_key(id_library, n, keys_arpeggio[0]);

      if (label === null) {
        return arpeggio;
      }

      const data = await get_data_by_keys(id_library, n, keys_arpeggio, 1);

      for (let i = 0; i < 16; i++) {
        for (const x of data) {
          if (x.key === n + keys_arpeggio[1 + i]) {
            const note = x.value;
            if (note === NOTE_SKIP)
              i = 16;
            else
              arpeggio.push(note);
            break;
          }
        }
      }

      return arpeggio;
    })();
  }

  return await cache[n];
}

async function get_rhythm_explicit(n) {
  if (!(n in cache)) {
    cache[n] = (async () => {
      let rhythm = {
        type:   types.rhythm,
        n:     n,
        label:  '',
        notes:  []
      };

      const label = await get_value_by_key(id_library, n, keys_rhythm[0]);

      if (label === null) {
        return rhythm;
      }

      rhythm.label = label;

      const data = await get_data_by_keys(id_library, n, keys_rhythm, 1);

      let scale = null;

      for (const x of data) {
        if (x.key === n + keys_rhythm[1]) {
          scale = x.value;
          break;
        }
      }

      if (scale === null || scale < 0.01)
        return rhythm;

      for (let i = 0; i < 16; i++) {
        for (const x of data) {
          if (x.key === n + keys_rhythm[2 + i]) {
            const duration = x.value;
            if (duration === NOTE_SKIP)
              i = 16;
            else
              rhythm.notes.push(duration / scale);
            break;
          }
        }
      }

      return rhythm;
    })();
  }

  return await cache[n];
}

function rhythm_blank() {
  return {
    type:   types.rhythm,
    id:     '',
    notes:  []
  };
}

function rhythms_blank() {
  return [
    rhythm_blank(),
    rhythm_blank(),
    rhythm_blank(),
    rhythm_blank(),
    rhythm_blank(),
    rhythm_blank(),
    rhythm_blank(),
    rhythm_blank()
  ];
}

function chords_blank() {
  return [
    null, null, null, null,
    null, null, null, null ];
}

function arpeggio_blank() {
  return [];
}

function song_blank() {
  return {
    asset_id:   '',
    asset_url:  `https://wavesexplorer.com/?network=${network}`,

    type: types.song,
    id:       '',
    label:    '',
    parents:  [],
    generation: 1,
    tonality: { key: 0 },
    instruments: {
      kick:   '',
      snare:  '',
      hihat:  '',
      bass:   '',
      back:   '',
      lead:   ''
    },
    chords:   chords_blank(),
    arpeggio: arpeggio_blank(),
    rhythm: {
      kick:   rhythms_blank(),
      snare:  rhythms_blank(),
      hihat:  rhythms_blank(),
      bass:   rhythms_blank(),
      back:   rhythms_blank(),
      lead:   rhythms_blank()
    }
  };
}

async function get_song_by_id(n) {
  if (n === null)
    return null;

  try {
    if (!(n in cache)) {
      cache[n] = (async () => {
        const asset_id = await get_value_by_key(id_library, n, '');

        if (asset_id === null)
          return null;

        const label = await get_value_by_key(id_library, n, keys_song[0]);

        if (label === null)
          return null;

        const data = await get_data_by_keys(id_library, n, keys_song, 1);

        let k = 1;
        const key_name_seed         = '' + n + keys_song[k++];
        const key_generation        = '' + n + keys_song[k++];
        const key_parent_0          = '' + n + keys_song[k++];
        const key_parent_1          = '' + n + keys_song[k++];
        const key_bpm               = '' + n + keys_song[k++];
        const key_bar_size          = '' + n + keys_song[k++];
        const key_beat_size         = '' + n + keys_song[k++];
        const key_tonality          = '' + n + keys_song[k++];
        const key_chords_0          = '' + n + keys_song[k++];
        const key_chords_1          = '' + n + keys_song[k++];
        const key_chords_2          = '' + n + keys_song[k++];
        const key_chords_3          = '' + n + keys_song[k++];
        const key_chords_4          = '' + n + keys_song[k++];
        const key_chords_5          = '' + n + keys_song[k++];
        const key_chords_6          = '' + n + keys_song[k++];
        const key_chords_7          = '' + n + keys_song[k++];
        const key_arpeggio          = '' + n + keys_song[k++];
        const key_kick_instrument   = '' + n + keys_song[k++];
        const key_kick_rhythm_0     = '' + n + keys_song[k++];
        const key_kick_rhythm_1     = '' + n + keys_song[k++];
        const key_kick_rhythm_2     = '' + n + keys_song[k++];
        const key_kick_rhythm_3     = '' + n + keys_song[k++];
        const key_kick_rhythm_4     = '' + n + keys_song[k++];
        const key_kick_rhythm_5     = '' + n + keys_song[k++];
        const key_kick_rhythm_6     = '' + n + keys_song[k++];
        const key_kick_rhythm_7     = '' + n + keys_song[k++];
        const key_snare_instrument  = '' + n + keys_song[k++];
        const key_snare_rhythm_0    = '' + n + keys_song[k++];
        const key_snare_rhythm_1    = '' + n + keys_song[k++];
        const key_snare_rhythm_2    = '' + n + keys_song[k++];
        const key_snare_rhythm_3    = '' + n + keys_song[k++];
        const key_snare_rhythm_4    = '' + n + keys_song[k++];
        const key_snare_rhythm_5    = '' + n + keys_song[k++];
        const key_snare_rhythm_6    = '' + n + keys_song[k++];
        const key_snare_rhythm_7    = '' + n + keys_song[k++];
        const key_hihat_instrument  = '' + n + keys_song[k++];
        const key_hihat_rhythm_0    = '' + n + keys_song[k++];
        const key_hihat_rhythm_1    = '' + n + keys_song[k++];
        const key_hihat_rhythm_2    = '' + n + keys_song[k++];
        const key_hihat_rhythm_3    = '' + n + keys_song[k++];
        const key_hihat_rhythm_4    = '' + n + keys_song[k++];
        const key_hihat_rhythm_5    = '' + n + keys_song[k++];
        const key_hihat_rhythm_6    = '' + n + keys_song[k++];
        const key_hihat_rhythm_7    = '' + n + keys_song[k++];
        const key_bass_instrument   = '' + n + keys_song[k++];
        const key_bass_rhythm_0     = '' + n + keys_song[k++];
        const key_bass_rhythm_1     = '' + n + keys_song[k++];
        const key_bass_rhythm_2     = '' + n + keys_song[k++];
        const key_bass_rhythm_3     = '' + n + keys_song[k++];
        const key_bass_rhythm_4     = '' + n + keys_song[k++];
        const key_bass_rhythm_5     = '' + n + keys_song[k++];
        const key_bass_rhythm_6     = '' + n + keys_song[k++];
        const key_bass_rhythm_7     = '' + n + keys_song[k++];
        const key_back_instrument   = '' + n + keys_song[k++];
        const key_back_rhythm_0     = '' + n + keys_song[k++];
        const key_back_rhythm_1     = '' + n + keys_song[k++];
        const key_back_rhythm_2     = '' + n + keys_song[k++];
        const key_back_rhythm_3     = '' + n + keys_song[k++];
        const key_back_rhythm_4     = '' + n + keys_song[k++];
        const key_back_rhythm_5     = '' + n + keys_song[k++];
        const key_back_rhythm_6     = '' + n + keys_song[k++];
        const key_back_rhythm_7     = '' + n + keys_song[k++];
        const key_lead_instrument   = '' + n + keys_song[k++];
        const key_lead_rhythm_0     = '' + n + keys_song[k++];
        const key_lead_rhythm_1     = '' + n + keys_song[k++];
        const key_lead_rhythm_2     = '' + n + keys_song[k++];
        const key_lead_rhythm_3     = '' + n + keys_song[k++];
        const key_lead_rhythm_4     = '' + n + keys_song[k++];
        const key_lead_rhythm_5     = '' + n + keys_song[k++];
        const key_lead_rhythm_6     = '' + n + keys_song[k++];
        const key_lead_rhythm_7     = '' + n + keys_song[k++];

        let song = song_blank();

        song.asset_id   = asset_id;
        song.asset_url  = `https://wavesexplorer.com/assets/${asset_id}?network=${network}`;

        song.id     = n;
        song.label  = label;

        for (const x of data) {
          if (x.key === key_name_seed && x.value != 0)
            song.label = generate_name(x.value);
          else if (x.key === key_generation)
            song.generation = x.value;
          else if (x.key === key_parent_0 || x.key === key_parent_1)
            song.parents.push(x.value);
          else if (x.key === key_bpm)
            song.bpm = x.value;
          else if (x.key === key_bar_size)
            song.bar_size = x.value;
          else if (x.key === key_beat_size)
            song.beat_size = x.value;
          else if (x.key === key_tonality)
            song.tonality.key = x.value;
          else if (x.key === key_kick_instrument)
            song.instruments.kick = x.value;
          else if (x.key === key_snare_instrument)
            song.instruments.snare = x.value;
          else if (x.key === key_hihat_instrument)
            song.instruments.hihat = x.value;
          else if (x.key === key_bass_instrument)
            song.instruments.bass = x.value;
          else if (x.key === key_back_instrument)
            song.instruments.back = x.value;
          else if (x.key === key_lead_instrument)
            song.instruments.lead = x.value;

          else if (x.key === key_chords_0)
            song.chords[0] = await get_chord_explicit(x.value);
          else if (x.key === key_chords_1)
            song.chords[1] = await get_chord_explicit(x.value);
          else if (x.key === key_chords_2)
            song.chords[2] = await get_chord_explicit(x.value);
          else if (x.key === key_chords_3)
            song.chords[3] = await get_chord_explicit(x.value);
          else if (x.key === key_chords_4)
            song.chords[4] = await get_chord_explicit(x.value);
          else if (x.key === key_chords_5)
            song.chords[5] = await get_chord_explicit(x.value);
          else if (x.key === key_chords_6)
            song.chords[6] = await get_chord_explicit(x.value);
          else if (x.key === key_chords_7)
            song.chords[7] = await get_chord_explicit(x.value);

          else if (x.key === key_arpeggio)
            song.arpeggio = await get_arpeggio_explicit(x.value);

          else if (x.key === key_kick_rhythm_0)
            song.rhythm.kick[0] = await get_rhythm_explicit(x.value);
          else if (x.key === key_kick_rhythm_1)
            song.rhythm.kick[1] = await get_rhythm_explicit(x.value);
          else if (x.key === key_kick_rhythm_2)
            song.rhythm.kick[2] = await get_rhythm_explicit(x.value);
          else if (x.key === key_kick_rhythm_3)
            song.rhythm.kick[3] = await get_rhythm_explicit(x.value);
          else if (x.key === key_kick_rhythm_4)
            song.rhythm.kick[4] = await get_rhythm_explicit(x.value);
          else if (x.key === key_kick_rhythm_5)
            song.rhythm.kick[5] = await get_rhythm_explicit(x.value);
          else if (x.key === key_kick_rhythm_6)
            song.rhythm.kick[6] = await get_rhythm_explicit(x.value);
          else if (x.key === key_kick_rhythm_7)
            song.rhythm.kick[7] = await get_rhythm_explicit(x.value);

          else if (x.key === key_snare_rhythm_0)
            song.rhythm.snare[0] = await get_rhythm_explicit(x.value);
          else if (x.key === key_snare_rhythm_1)
            song.rhythm.snare[1] = await get_rhythm_explicit(x.value);
          else if (x.key === key_snare_rhythm_2)
            song.rhythm.snare[2] = await get_rhythm_explicit(x.value);
          else if (x.key === key_snare_rhythm_3)
            song.rhythm.snare[3] = await get_rhythm_explicit(x.value);
          else if (x.key === key_snare_rhythm_4)
            song.rhythm.snare[4] = await get_rhythm_explicit(x.value);
          else if (x.key === key_snare_rhythm_5)
            song.rhythm.snare[5] = await get_rhythm_explicit(x.value);
          else if (x.key === key_snare_rhythm_6)
            song.rhythm.snare[6] = await get_rhythm_explicit(x.value);
          else if (x.key === key_snare_rhythm_7)
            song.rhythm.snare[7] = await get_rhythm_explicit(x.value);

          else if (x.key === key_hihat_rhythm_0)
            song.rhythm.hihat[0] = await get_rhythm_explicit(x.value);
          else if (x.key === key_hihat_rhythm_1)
            song.rhythm.hihat[1] = await get_rhythm_explicit(x.value);
          else if (x.key === key_hihat_rhythm_2)
            song.rhythm.hihat[2] = await get_rhythm_explicit(x.value);
          else if (x.key === key_hihat_rhythm_3)
            song.rhythm.hihat[3] = await get_rhythm_explicit(x.value);
          else if (x.key === key_hihat_rhythm_4)
            song.rhythm.hihat[4] = await get_rhythm_explicit(x.value);
          else if (x.key === key_hihat_rhythm_5)
            song.rhythm.hihat[5] = await get_rhythm_explicit(x.value);
          else if (x.key === key_hihat_rhythm_6)
            song.rhythm.hihat[6] = await get_rhythm_explicit(x.value);
          else if (x.key === key_hihat_rhythm_7)
            song.rhythm.hihat[7] = await get_rhythm_explicit(x.value);

          else if (x.key === key_bass_rhythm_0)
            song.rhythm.bass[0] = await get_rhythm_explicit(x.value);
          else if (x.key === key_bass_rhythm_1)
            song.rhythm.bass[1] = await get_rhythm_explicit(x.value);
          else if (x.key === key_bass_rhythm_2)
            song.rhythm.bass[2] = await get_rhythm_explicit(x.value);
          else if (x.key === key_bass_rhythm_3)
            song.rhythm.bass[3] = await get_rhythm_explicit(x.value);
          else if (x.key === key_bass_rhythm_4)
            song.rhythm.bass[4] = await get_rhythm_explicit(x.value);
          else if (x.key === key_bass_rhythm_5)
            song.rhythm.bass[5] = await get_rhythm_explicit(x.value);
          else if (x.key === key_bass_rhythm_6)
            song.rhythm.bass[6] = await get_rhythm_explicit(x.value);
          else if (x.key === key_bass_rhythm_7)
            song.rhythm.bass[7] = await get_rhythm_explicit(x.value);

          else if (x.key === key_back_rhythm_0)
            song.rhythm.back[0] = await get_rhythm_explicit(x.value);
          else if (x.key === key_back_rhythm_1)
            song.rhythm.back[1] = await get_rhythm_explicit(x.value);
          else if (x.key === key_back_rhythm_2)
            song.rhythm.back[2] = await get_rhythm_explicit(x.value);
          else if (x.key === key_back_rhythm_3)
            song.rhythm.back[3] = await get_rhythm_explicit(x.value);
          else if (x.key === key_back_rhythm_4)
            song.rhythm.back[4] = await get_rhythm_explicit(x.value);
          else if (x.key === key_back_rhythm_5)
            song.rhythm.back[5] = await get_rhythm_explicit(x.value);
          else if (x.key === key_back_rhythm_6)
            song.rhythm.back[6] = await get_rhythm_explicit(x.value);
          else if (x.key === key_back_rhythm_7)
            song.rhythm.back[7] = await get_rhythm_explicit(x.value);

          else if (x.key === key_lead_rhythm_0)
            song.rhythm.lead[0] = await get_rhythm_explicit(x.value);
          else if (x.key === key_lead_rhythm_1)
            song.rhythm.lead[1] = await get_rhythm_explicit(x.value);
          else if (x.key === key_lead_rhythm_2)
            song.rhythm.lead[2] = await get_rhythm_explicit(x.value);
          else if (x.key === key_lead_rhythm_3)
            song.rhythm.lead[3] = await get_rhythm_explicit(x.value);
          else if (x.key === key_lead_rhythm_4)
            song.rhythm.lead[4] = await get_rhythm_explicit(x.value);
          else if (x.key === key_lead_rhythm_5)
            song.rhythm.lead[5] = await get_rhythm_explicit(x.value);
          else if (x.key === key_lead_rhythm_6)
            song.rhythm.lead[6] = await get_rhythm_explicit(x.value);
          else if (x.key === key_lead_rhythm_7)
            song.rhythm.lead[7] = await get_rhythm_explicit(x.value);
        }

        return song;
      })();
    }

    const result = await cache[n];

    if (result.type != types.song)
      return null;

    return result;

  } catch (error) {
    debug_log(error);
    return null;
  }
}

async function get_song_by_asset_id(token_id) {
  try {
    const n = await get_value_by_key(id_library, token_id, '');

    return await get_song_by_id(n);

  } catch (error) {
    debug_log(error);
    return null;
  }
}

async function get_resource_by_id(id) {
  return await get_song_by_id(id);
}

async function get_resource_by_asset_id(asset_id) {
  return await get_song_by_asset_id(asset_id);
}

async function get_song_rarity_by_asset_id(asset_id) {
  return new Promise((resolve, reject) => {
    let attempt;
    let request = `/addresses/data/${id_library}/rarity_${asset_id}`;

    attempt = () => {
      fetch_get(request).then(data => {
        if (data === null)
          setTimeout(attempt, 2000);
        else
          resolve(data.value);
      });
    };

    attempt();
  });
}

class clearance_handler {
  constructor() {
    this.ready    = false;
    this.address  = '';
    this.signer   = null;

    this.price_scale = 1;
  }

  async empty_stock() { }

  async add_balance(balance) { }

  async mint_resources(resources) { }

  async get_price_hybrid() {
    const data = await fetch_get(`/addresses/data/${id_library}/${KEY_PRICE_HYBRID_AMOUNT}`);

    if (data === null)
      return 0;

    return data.value;
  }

  async update() {
    const release = await LOCK.acquire();

    try {
      const last_update = Date.now();

      if (this.ready && last_update - this.last_update < UPDATE_TIMEOUT) {
        debug_log('* UPDATE CACHED');
      } else {
        if (!this.ready) {
          const price_token = await fetch_get(`/addresses/data/${id_library}/${KEY_PRICE_HYBRID_TOKEN}`);

          if (price_token === null || price_token.value === '') {
            this.price_token  = TOKEN_WAVES;
            this.price_scale  = 10 ** 8;
          } else {
            const details     = await fetch_get(`/assets/details/${price_token.value}`);
            this.price_token  = price_token.value;
            this.price_scale  = 10 ** details.decimals;
          }

          const details = await fetch_get(`/assets/details/${TOKEN_FREE_MIX}`);
          this.free_mix_token_scale = 10 ** details.decimals;

          const price_amount = await fetch_get(`/addresses/data/${id_library}/${KEY_PRICE_HYBRID_AMOUNT}`);

          if (price_amount === null) {
            this.price_hybrid = 0;
          } else {
            this.price_hybrid = price_amount.value;
          }
        }

        let response;

        if (this.price_token === TOKEN_WAVES) {
          response = await fetch_get(`/addresses/balance/${this.address}`);
        } else {
          response = await fetch_get(`/assets/balance/${this.address}/${this.price_token}`);
        }

        if (response === null) {
          this.balance = 0;
        } else {
          this.balance = response.balance;
        }

        response = await fetch_get(`/assets/balance/${this.address}/${TOKEN_FREE_MIX}`);

        if (response === null) {
          this.free_mix_balance = 0;
        } else {
          this.free_mix_balance = response.balance;
        }

        let v     = [];
        let after = null;

        const limit = 1000;

        while (true) {
          let request = `/assets/nft/${this.address}/limit/${limit}`;

          if (after) {
            request += `?after=${after}`;
          }

          const nfts = await fetch_get(request);

          for (const x of nfts) {
            v.push({
              asset_id: x.assetId,
              height:   x.issueHeight
            });
          }

          if (nfts.length < limit) {
            break;
          }

          after = nfts[nfts.length - 1].assetId;
        }

        v.sort((left, right) => {
          if (left.height < right.height)
            return 1;
          if (left.height > right.height)
            return -1;
          return 0;
        });

        this.nfts = [];

        for (const x of v) {
          this.nfts.push(x.asset_id);
        }

        this.ready        = true;
        this.last_update  = last_update;
      }
    } catch (error) {
      release();
      throw error;
    }

    release();
  }

  async get_balance() {
    await this.update();

    return this.balance / this.price_scale;
  }

  async get_free_mix_balance() {
    await this.update();

    return this.free_mix_balance / this.free_mix_token_scale;
  }

  async get_price(type) {
    if (type != types.hybrid)
      return 0;

    return this.price_hybrid / this.price_scale;
  }

  async get_resources(options) {
    const need_songs =  !('filter' in options) ||
                        options.filter === types.song ||
                        options.filter.includes(types.song);

    if (!need_songs)
      return [];

    await this.update();

    const size  = options?.size || 100;
    const after = options?.after;

    let i = 0;

    if (after) {
      const after_asset_id = await get_value_by_key(id_library, after, '');

      for (; i < this.nfts.length; i++) {
        if (this.nfts[i] === after_asset_id) {
          i++;
          break;
        }
      }
    }

    let v = [];

    for (; v.length < size && i < this.nfts.length; i++) {
      const song = await get_song_by_asset_id(this.nfts[i]);
      if (song != null) {
        v.push(song);
      }
    }

    return v;
  }

  async buy(type) { }

  async mint_song(resources) {
    throw new Error('Not implemented');

    return '';
  }

  async mint_hybrid_internal(tx_data) {
    if (!this.signer)
      throw new Error('No signer');

    let tx;

    try {
      [ tx ] = await this.signer
        .invoke(tx_data)
        .broadcast();
    } catch (error) {
      throw new Error(error.message);
    }

    const info = await tx_info_wait(tx.id);

    /*  @automainint
     *
     *  Must update to fetch new asset.
     */
    this.ready = false;

    let asset_id;

    if (info.stateChanges.issues.length != 0) {
      asset_id = info.stateChanges.issues[0].assetId;
    } else {
      for (const inv of info.stateChanges.invokes) {
        if (inv.stateChanges.issues != 0) {
          asset_id = inv.stateChanges.issues[0].assetId;
          break;
        }
      }
    }

    for (const x of info.stateChanges.data)
      if (x.key === asset_id)
        return x.value;

    throw new Error('Unknown error');
  }

  async mint_hybrid(songs) {
    if (songs.length != 2)
      throw new Error('Wrong resources');
    if (!('id' in songs[0]))
      throw new Error('Wrong resources');
    if (!('id' in songs[1]))
      throw new Error('Wrong resources');

    await this.update();

    return await this.mint_hybrid_internal({
      dApp: id_library,
      call: {
        function: 'mint_hybrid',
        args: [
          { type: 'string', value: songs[0].id },
          { type: 'string', value: songs[1].id }
        ],
      },
      payment: [
        { assetId:  this.price_token,
          /*  @automainint
           *
           *  Extra price will be returned if not needed.
           */
          amount:   this.price_hybrid + HYBRID_PRICE_EXTRA * this.price_scale }
      ],
      feeAssetId: HYBRID_FEE_ASSET_ID,
      fee:        HYBRID_FEE
    });
  }

  async mint_hybrid_with_free_mix_token(songs) {
    if (songs.length != 2)
      throw new Error('Wrong resources');
    if (!('id' in songs[0]))
      throw new Error('Wrong resources');
    if (!('id' in songs[1]))
      throw new Error('Wrong resources');

    await this.update();

    return await this.mint_hybrid_internal({
      dApp: id_library,
      call: {
        function: 'mint_hybrid',
        args: [
          { type: 'string', value: songs[0].id },
          { type: 'string', value: songs[1].id }
        ],
      },
      payment: [
        { assetId:  TOKEN_FREE_MIX,
          amount:   this.free_mix_token_scale }
      ],
      feeAssetId: HYBRID_FEE_ASSET_ID,
      fee:        HYBRID_FEE
    });
  }


  async mint_hybrid_and_burn(songs) {
    if (songs.length != 2)
      throw new Error("Wrong resources");
    if (!('asset_id' in songs[0]))
      throw new Error("Wrong resources");
    if (!('asset_id' in songs[1]))
      throw new Error("Wrong resources");

    return await this.mint_hybrid_internal({
      dApp: id_library,
      call: {
        function: 'mint_hybrid_and_burn',
        args: [ ],
      },
      payment: [
        { assetId: songs[0].asset_id, amount: 1 },
        { assetId: songs[1].asset_id, amount: 1 }
      ],
      feeAssetId: HYBRID_FEE_ASSET_ID,
      fee:        HYBRID_FEE
    });
  }

  async get_wallet_address() {
    return this.address;
  }

  async get_explorer_url() {
    return `https://wavesexplorer.com/addresses/${this.address}?network=${network}`;
  }

  async can_mint_hybrid() {
    await this.update();

    return this.balance >= this.price_hybrid;
  }

  async logout() {
    if (this.signer) {
      await this.signer.logout();
    }
  }

  async get_airdrop_info(airdrop_name) {
    const get_value = async (key, def) => {
      const response = await fetch_get(`/addresses/data/${id_claim_pool}/${airdrop_name}_${key}`)
      if (response === null)
        return def;
      return response.value;
    };

    const end = await get_value(`end`,  -1);

    if (end === -1)
      return {
        airdrop_exists:     false,
        user_in_whitelist:  false,
        allowed_claims:     0,
        songs_total:        0
      };

    const begin   = await get_value(`begin`, 0);
    const allowed = await get_value(`A_${this.address}`, -1);

    if (allowed === -1)
      return {
        airdrop_exists:     true,
        user_in_whitelist:  false,
        allowed_claims:     0,
        songs_total:        end - begin
      };

    return {
      airdrop_exists:     true,
      user_in_whitelist:  true,
      allowed_claims:     allowed,
      songs_total:        end - begin
    };
  }

  async airdrop_claim(airdrop_name) {
    if (!this.signer)
      throw new Error('No signer');

    const get_value = async (key) => {
      const response = await fetch_get(`/addresses/data/${id_claim_pool}/${airdrop_name}_${key}`)
      if (response === null)
        return 0;
      return response.value;
    };

    const begin   = await get_value(`begin`);
    const end     = await get_value(`end`);
    const allowed = await get_value(`A_${this.address}`);

    let amount = allowed;
    if (amount > CLAIM_LIMIT)
      amount = CLAIM_LIMIT;
    if (amount > end - begin)
      amount = end - begin;
    if (amount === 0)
      return [];

    let tx;

    try {
      [ tx ] = await this.signer
        .invoke({
          dApp: id_claim_pool,
          call: {
            function: 'claim',
            args: [
              { type: 'string',   value: airdrop_name },
              { type: 'integer',  value: amount }
            ],
          },
          feeAssetId: CLAIM_FEE_ASSET_ID,
          fee:        CLAIM_FEE
        })
        .broadcast();
    } catch (error) {
      throw new Error(error.message);
    }

    const info = await tx_info_wait(tx.id);

    /*  @automainint
     *
     *  Must update to fetch new asset.
     */
    this.ready = false;

    let assets = [];

    for (const transfer of info.stateChanges.transfers) {
      assets.push(transfer.asset);
    }

    const data = await get_data_by_keys(id_library, '', assets, 0);

    let ids = [];

    for (const x of data) {
      ids.push('' + x.value);
    }

    return ids;
  }
};

async function adjust_node_url() {
  /*  @automainint
   *
   *  Adjust `node_url` according to user's current
   *  KeeperWallet extension settings.
   */

  if (!('KeeperWallet' in window) && document.readyState != 'complete') {
    /*  Make sure the page is loaded.
      */
    await new Promise((resolve) => {
      if (document.readyState != 'complete')
        window.addEventListener('load', resolve);
      else
        resolve();
    });
  }

  if (!('KeeperWallet' in window)) {
    return;
  }

  let wallet_api;
  let state;

  try {
    wallet_api  = await window.KeeperWallet.initialPromise;
    state       = await wallet_api.publicState();
  } catch (error) {
    return;
  }

  node_url = state.network.server;
}

async function authenticate(options) {
  try {
    let provider = null;

    if        (options.env.provider === 'keeper') {
      provider = new ProviderKeeper();
    } else if (options.env.provider === 'cloud') {
      provider = new ProviderCloud();
    } else if (options.env.provider === 'web') {
      provider = new ProviderWeb();
    }

    if (!provider) {
      throw new Error('Invalid environment');
    }

    await adjust_node_url();

    const signer = new Signer({
      NODE_URL: node_url
    });

    signer.setProvider(provider);

    const { address } = await signer.login();

    let chain_id = await signer.getNetworkByte();

    if (typeof chain_id === 'number') {
      chain_id = String.fromCharCode(chain_id);
    }

    debug_log(`Chain ID:    ${chain_id}`);

    if (!(chain_id in options.env)) {
      await signer.logout();
      throw new Error('Invalid chain ID');
    }

    id_library    = options.env[chain_id].id_library;
    id_claim_pool = options.env[chain_id].id_claim_pool;
    node_url      = options.env[chain_id].node_url;
    network       = options.env[chain_id].network;

    debug_log(`Contract Library:    ${id_library}`);
    debug_log(`Contract Claim Pool: ${id_claim_pool}`);
    debug_log(`Node URL:            ${node_url}`);
    debug_log(`Network:             ${network}`);

    let user = new clearance_handler();

    user.signer   = signer;
    user.address  = address;

    await user.update();

    return user;

  } catch (error) {
    debug_log(error);

    if (error.message)
      throw new Error(error.message);

    throw new Error('Unknown error');
  }
}

module.exports = {
  env:                          env,
  types:                        types,
  NOTE_SKIP:                    NOTE_SKIP,
  authenticate:                 authenticate,
  get_resource_by_id:           get_resource_by_id,
  get_resource_by_asset_id:     get_resource_by_asset_id,
  get_song_rarity_by_asset_id:  get_song_rarity_by_asset_id
};

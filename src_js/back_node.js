/* eslint-disable */

const env = require('./env.js').env;

const { generate_name } = require('./generate_name.js');

const types = {
  chord:  'chord',
  melody: 'melody',
  rhythm: 'rhythm',
  beat:   'beat',
  song:   'song',
  hybrid: 'hybrid'
};

const tx_fee    = 500000;

const note_skip = 65535;

function debug_log(s) {
  console.log(s);
}

class clearance_handler {
  constructor(env_, keeper_api) {
    keeper_api.on('update', () => {
      if (this.resolve)
        this.resolve();
    });

    this.env        = env_;
    this.keeper_api = keeper_api;
    this.cache      = {};

    this.key_price_hybrid_token   = 'price_hybrid_token';
    this.key_price_hybrid_amount  = 'price_hybrid_amount';

    this.keys_chord = [
      '_CL',
      '_C0',
      '_C1',
      '_C2',
      '_C3',
      '_C4'
    ];

    this.keys_melody = [
      '_ML',
      '_M00',
      '_M01',
      '_M02',
      '_M03',
      '_M04',
      '_M05',
      '_M06',
      '_M07',
      '_M08',
      '_M09',
      '_M10',
      '_M11',
      '_M12',
      '_M13',
      '_M14',
      '_M15'
    ];

    this.keys_rhythm = [
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

    this.keys_song = [
      '_SL',
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
      '_SM',
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
  }

  join_url(a, b) {
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

  async fetch_get(request) {
    try {
      const response = await window.fetch(
        this.join_url(this.network.server, request),
        { method: 'GET'
        });

      if (response.status != 200)
        return null;

      return await response.json();

    } catch (error) {
      return null;
    }
  }

  async fetch_post(request, body) {
    try {
      const response = await window.fetch(
        this.join_url(this.network.server, request),
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

  async update() {
    const state = await this.keeper_api.publicState();

    //debug_log(JSON.stringify(state, null, '  '));

    this.network  = state.network;
    this.address  = state.account.address;
    this.nfts     = state.account.balance.nfts;

    this.contract_id = this.env[this.network.code].contract_id;

    this.nfts.sort((left, right) => {
      let date0 = new Date(left.timestamp);
      let date1 = new Date(right.timestamp);
      if (date0 < date1)
        return 1;
      if (date0 > date1)
        return -1;
      return 0;
    });

    this.opts = {
      apiBase: this.network.server,
      chainId: this.network.chainId
    };

    const balance_token = await this.fetch_get(`/addresses/data/${this.contract_id}/${this.key_price_hybrid_token}`);

    if (balance_token === null || balance_token.value === '') {
      this.balance_scale  = 10 ** 8;
      this.balance_amount = state.account.balance.available;
    } else {
      const details = await this.fetch_get(`/assets/details/${balance_token.value}`);

      this.balance_scale  = 10 ** details.decimals;

      if (details.assetId in state.account.balance.assets)
        this.balance_amount = state.account.balance.assets[details.assetId].balance;
      else
        this.balance_amount = 0;
    }

    if (typeof this.balance_amount === 'string')
      this.balance_amount = parseInt(this.balance_amount);
  }

  async get_nfts(size, after) {
    try {
      let i = 0;

      if (after) {
        const id = await this.get_value_by_key(after, '');

        if (id === null)
          return [];

        for (; i < this.nfts.length; i++) {
          if (this.nfts[i].id === id) {
            i++;
            break;
          }
        }
      }

      let nfts = [];

      for (let k = 0; k < size && i + k < this.nfts.length; k++)
        nfts.push(this.nfts[i + k]);

      return nfts;

    } catch (error) {
      debug_log(error);
      return [];
    }
  }

  tx_info_wait(id) {
    return new Promise((resolve, reject) => {
      let attempt;
      let request = `/transactions/info/${id}`;

      attempt = () => {
        this.fetch_get(request).then(data => {
          if (data === null)
            setTimeout(attempt, 2000);
          else
            resolve(data);
        });
      };

      attempt();
    });
  }

  async empty_stock() { }

  async add_balance(balance) { }

  async mint_resources(resources) { }

  async get_balance_internal() {
    await this.update();

    return this.balance_amount;
  }

  async get_balance() {
    return (await this.get_balance_internal()) / this.balance_scale;
  }

  async get_price_hybrid_token() {
    const data = await this.fetch_get(`/addresses/data/${this.contract_id}/${this.key_price_hybrid_token}`);

    if (data === null)
      return '';

    return data.value;
  }

  async get_price_hybrid() {
    const data = await this.fetch_get(`/addresses/data/${this.contract_id}/${this.key_price_hybrid_amount}`);

    if (data === null)
      return 0;

    return data.value;
  }

  async get_price(type) {
    if (type === types.hybrid) {
      const price = await this.get_price_hybrid();
      return price / this.balance_scale;
    }

    return 0;
  }

  rhythm_blank() {
    return {
      type:   types.rhythm,
      id:     '',
      notes:  []
    };
  }

  rhythms_blank() {
    return [
      this.rhythm_blank(),
      this.rhythm_blank(),
      this.rhythm_blank(),
      this.rhythm_blank(),
      this.rhythm_blank(),
      this.rhythm_blank(),
      this.rhythm_blank(),
      this.rhythm_blank()
    ];
  }

  chords_blank() {
    return [
      null, null, null, null,
      null, null, null, null ];
  }

  melody_blank() {
    return [];
  }

  song_blank() {
    return {
      asset_id:   '',
      asset_url:  'https://testnet.wavesexplorer.com/',

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
      chords: this.chords_blank(),
      melody: this.melody_blank(),
      rhythm: {
        kick:   this.rhythms_blank(),
        snare:  this.rhythms_blank(),
        hihat:  this.rhythms_blank(),
        bass:   this.rhythms_blank(),
        back:   this.rhythms_blank(),
        lead:   this.rhythms_blank()
      }
    };
  }

  async get_value_by_key(id, key) {
    try {
      const data = await this.fetch_get(`/addresses/data/${this.contract_id}/${id}${key}`);

      if (data === null)
        return null;

      return data.value;

    } catch (error) {
      return null;
    }
  }

  async get_data_by_keys(id, keys, first) {
    const request = `/addresses/data/${this.contract_id}`;
    const body    = { keys: [ ] };

    for (let i = first; i < keys.length; i++) {
      const key = keys[i];
      body.keys.push(`${id}${key}`);
    }

    return await this.fetch_post(request, body);
  }

  async get_chord_explicit(n) {
    if (n in this.cache)
      return this.cache[n];

    let chord = {
      type:   types.chord,
      id:     n,
      label:  '',
      notes:  []
    };

    const label = await this.get_value_by_key(n, this.keys_chord[0]);

    if (label === null) {
      this.cache[n] = chord;
      return chord;
    }

    chord.label = label;

    const data = await this.get_data_by_keys(n, this.keys_chord, 1);

    for (let i = 0; i < 5; i++) {
      for (const x of data) {
        if (x.key === n + this.keys_chord[1 + i]) {
          const note = x.value;
          if (note === note_skip)
            i = 5;
          else
            chord.notes.push(note);
          break;
        }
      }
    }

    this.cache[n] = chord;

    return chord;
  }

  async get_melody_explicit(n) {
    if (n in this.cache)
      return this.cache[n];

    let melody = [];

    const label = await this.get_value_by_key(n, this.keys_melody[0]);

    if (label === null) {
      this.cache[n] = melody;
      return melody;
    }

    const data = await this.get_data_by_keys(n, this.keys_melody, 1);

    for (let i = 0; i < 16; i++) {
      for (const x of data) {
        if (x.key === n + this.keys_melody[1 + i]) {
          const note = x.value;
          if (note === note_skip)
            i = 16;
          else
            melody.push(note);
          break;
        }
      }
    }

    this.cache[n] = melody;
    return melody;
  }

  async get_rhythm_explicit(n) {
    if (n in this.cache)
      return this.cache[n];

    let rhythm = {
      type:   types.rhythm,
      n:     n,
      label:  '',
      notes:  []
    };

    const label = await this.get_value_by_key(n, this.keys_rhythm[0]);

    if (label === null) {
      this.cache[n] = rhythm;
      return rhythm;
    }

    rhythm.label = label;

    const data = await this.get_data_by_keys(n, this.keys_rhythm, 1);

    let scale = null;

    for (const x of data) {
      if (x.key === n + this.keys_rhythm[1]) {
        scale = x.value;
        break;
      }
    }

    if (scale === null || scale < 0.01)
      return rhythm;

    for (let i = 0; i < 16; i++) {
      for (const x of data) {
        if (x.key === n + this.keys_rhythm[2 + i]) {
          const duration = x.value;
          if (duration === note_skip)
            i = 16;
          else
            rhythm.notes.push(duration / scale);
          break;
        }
      }
    }

    this.cache[n] = rhythm;

    return rhythm;
  }

  async get_song(n) {
    try {
      if (n === null)
        return null;

      if (n in this.cache)
        return this.cache[n];

      const asset_id = await this.get_value_by_key(n, '');

      if (asset_id === null)
        return null;

      const label = await this.get_value_by_key(n, this.keys_song[0]);

      if (label === null)
        return null;

      const data = await this.get_data_by_keys(n, this.keys_song, 1);

      let k = 1;
      const key_generation        = '' + n + this.keys_song[k++];
      const key_parent_0          = '' + n + this.keys_song[k++];
      const key_parent_1          = '' + n + this.keys_song[k++];
      const key_bpm               = '' + n + this.keys_song[k++];
      const key_bar_size          = '' + n + this.keys_song[k++];
      const key_beat_size         = '' + n + this.keys_song[k++];
      const key_tonality          = '' + n + this.keys_song[k++];
      const key_chords_0          = '' + n + this.keys_song[k++];
      const key_chords_1          = '' + n + this.keys_song[k++];
      const key_chords_2          = '' + n + this.keys_song[k++];
      const key_chords_3          = '' + n + this.keys_song[k++];
      const key_chords_4          = '' + n + this.keys_song[k++];
      const key_chords_5          = '' + n + this.keys_song[k++];
      const key_chords_6          = '' + n + this.keys_song[k++];
      const key_chords_7          = '' + n + this.keys_song[k++];
      const key_melody            = '' + n + this.keys_song[k++];
      const key_kick_instrument   = '' + n + this.keys_song[k++];
      const key_kick_rhythm_0     = '' + n + this.keys_song[k++];
      const key_kick_rhythm_1     = '' + n + this.keys_song[k++];
      const key_kick_rhythm_2     = '' + n + this.keys_song[k++];
      const key_kick_rhythm_3     = '' + n + this.keys_song[k++];
      const key_kick_rhythm_4     = '' + n + this.keys_song[k++];
      const key_kick_rhythm_5     = '' + n + this.keys_song[k++];
      const key_kick_rhythm_6     = '' + n + this.keys_song[k++];
      const key_kick_rhythm_7     = '' + n + this.keys_song[k++];
      const key_snare_instrument  = '' + n + this.keys_song[k++];
      const key_snare_rhythm_0    = '' + n + this.keys_song[k++];
      const key_snare_rhythm_1    = '' + n + this.keys_song[k++];
      const key_snare_rhythm_2    = '' + n + this.keys_song[k++];
      const key_snare_rhythm_3    = '' + n + this.keys_song[k++];
      const key_snare_rhythm_4    = '' + n + this.keys_song[k++];
      const key_snare_rhythm_5    = '' + n + this.keys_song[k++];
      const key_snare_rhythm_6    = '' + n + this.keys_song[k++];
      const key_snare_rhythm_7    = '' + n + this.keys_song[k++];
      const key_hihat_instrument  = '' + n + this.keys_song[k++];
      const key_hihat_rhythm_0    = '' + n + this.keys_song[k++];
      const key_hihat_rhythm_1    = '' + n + this.keys_song[k++];
      const key_hihat_rhythm_2    = '' + n + this.keys_song[k++];
      const key_hihat_rhythm_3    = '' + n + this.keys_song[k++];
      const key_hihat_rhythm_4    = '' + n + this.keys_song[k++];
      const key_hihat_rhythm_5    = '' + n + this.keys_song[k++];
      const key_hihat_rhythm_6    = '' + n + this.keys_song[k++];
      const key_hihat_rhythm_7    = '' + n + this.keys_song[k++];
      const key_bass_instrument   = '' + n + this.keys_song[k++];
      const key_bass_rhythm_0     = '' + n + this.keys_song[k++];
      const key_bass_rhythm_1     = '' + n + this.keys_song[k++];
      const key_bass_rhythm_2     = '' + n + this.keys_song[k++];
      const key_bass_rhythm_3     = '' + n + this.keys_song[k++];
      const key_bass_rhythm_4     = '' + n + this.keys_song[k++];
      const key_bass_rhythm_5     = '' + n + this.keys_song[k++];
      const key_bass_rhythm_6     = '' + n + this.keys_song[k++];
      const key_bass_rhythm_7     = '' + n + this.keys_song[k++];
      const key_back_instrument   = '' + n + this.keys_song[k++];
      const key_back_rhythm_0     = '' + n + this.keys_song[k++];
      const key_back_rhythm_1     = '' + n + this.keys_song[k++];
      const key_back_rhythm_2     = '' + n + this.keys_song[k++];
      const key_back_rhythm_3     = '' + n + this.keys_song[k++];
      const key_back_rhythm_4     = '' + n + this.keys_song[k++];
      const key_back_rhythm_5     = '' + n + this.keys_song[k++];
      const key_back_rhythm_6     = '' + n + this.keys_song[k++];
      const key_back_rhythm_7     = '' + n + this.keys_song[k++];
      const key_lead_instrument   = '' + n + this.keys_song[k++];
      const key_lead_rhythm_0     = '' + n + this.keys_song[k++];
      const key_lead_rhythm_1     = '' + n + this.keys_song[k++];
      const key_lead_rhythm_2     = '' + n + this.keys_song[k++];
      const key_lead_rhythm_3     = '' + n + this.keys_song[k++];
      const key_lead_rhythm_4     = '' + n + this.keys_song[k++];
      const key_lead_rhythm_5     = '' + n + this.keys_song[k++];
      const key_lead_rhythm_6     = '' + n + this.keys_song[k++];
      const key_lead_rhythm_7     = '' + n + this.keys_song[k++];

      let song = this.song_blank();

      song.asset_id   = asset_id;
      song.asset_url  = `https://testnet.wavesexplorer.com/assets/${asset_id}`;

      song.id     = n;
      song.label  = label;

      for (const x of data) {
        if (x.key === key_generation)
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
          song.chords[0] = await this.get_chord_explicit(x.value);
        else if (x.key === key_chords_1)
          song.chords[1] = await this.get_chord_explicit(x.value);
        else if (x.key === key_chords_2)
          song.chords[2] = await this.get_chord_explicit(x.value);
        else if (x.key === key_chords_3)
          song.chords[3] = await this.get_chord_explicit(x.value);
        else if (x.key === key_chords_4)
          song.chords[4] = await this.get_chord_explicit(x.value);
        else if (x.key === key_chords_5)
          song.chords[5] = await this.get_chord_explicit(x.value);
        else if (x.key === key_chords_6)
          song.chords[6] = await this.get_chord_explicit(x.value);
        else if (x.key === key_chords_7)
          song.chords[7] = await this.get_chord_explicit(x.value);

        else if (x.key === key_melody)
          song.melody = await this.get_melody_explicit(x.value);

        else if (x.key === key_kick_rhythm_0)
          song.rhythm.kick[0] = await this.get_rhythm_explicit(x.value);
        else if (x.key === key_kick_rhythm_1)
          song.rhythm.kick[1] = await this.get_rhythm_explicit(x.value);
        else if (x.key === key_kick_rhythm_2)
          song.rhythm.kick[2] = await this.get_rhythm_explicit(x.value);
        else if (x.key === key_kick_rhythm_3)
          song.rhythm.kick[3] = await this.get_rhythm_explicit(x.value);
        else if (x.key === key_kick_rhythm_4)
          song.rhythm.kick[4] = await this.get_rhythm_explicit(x.value);
        else if (x.key === key_kick_rhythm_5)
          song.rhythm.kick[5] = await this.get_rhythm_explicit(x.value);
        else if (x.key === key_kick_rhythm_6)
          song.rhythm.kick[6] = await this.get_rhythm_explicit(x.value);
        else if (x.key === key_kick_rhythm_7)
          song.rhythm.kick[7] = await this.get_rhythm_explicit(x.value);

        else if (x.key === key_snare_rhythm_0)
          song.rhythm.snare[0] = await this.get_rhythm_explicit(x.value);
        else if (x.key === key_snare_rhythm_1)
          song.rhythm.snare[1] = await this.get_rhythm_explicit(x.value);
        else if (x.key === key_snare_rhythm_2)
          song.rhythm.snare[2] = await this.get_rhythm_explicit(x.value);
        else if (x.key === key_snare_rhythm_3)
          song.rhythm.snare[3] = await this.get_rhythm_explicit(x.value);
        else if (x.key === key_snare_rhythm_4)
          song.rhythm.snare[4] = await this.get_rhythm_explicit(x.value);
        else if (x.key === key_snare_rhythm_5)
          song.rhythm.snare[5] = await this.get_rhythm_explicit(x.value);
        else if (x.key === key_snare_rhythm_6)
          song.rhythm.snare[6] = await this.get_rhythm_explicit(x.value);
        else if (x.key === key_snare_rhythm_7)
          song.rhythm.snare[7] = await this.get_rhythm_explicit(x.value);

        else if (x.key === key_hihat_rhythm_0)
          song.rhythm.hihat[0] = await this.get_rhythm_explicit(x.value);
        else if (x.key === key_hihat_rhythm_1)
          song.rhythm.hihat[1] = await this.get_rhythm_explicit(x.value);
        else if (x.key === key_hihat_rhythm_2)
          song.rhythm.hihat[2] = await this.get_rhythm_explicit(x.value);
        else if (x.key === key_hihat_rhythm_3)
          song.rhythm.hihat[3] = await this.get_rhythm_explicit(x.value);
        else if (x.key === key_hihat_rhythm_4)
          song.rhythm.hihat[4] = await this.get_rhythm_explicit(x.value);
        else if (x.key === key_hihat_rhythm_5)
          song.rhythm.hihat[5] = await this.get_rhythm_explicit(x.value);
        else if (x.key === key_hihat_rhythm_6)
          song.rhythm.hihat[6] = await this.get_rhythm_explicit(x.value);
        else if (x.key === key_hihat_rhythm_7)
          song.rhythm.hihat[7] = await this.get_rhythm_explicit(x.value);

        else if (x.key === key_bass_rhythm_0)
          song.rhythm.bass[0] = await this.get_rhythm_explicit(x.value);
        else if (x.key === key_bass_rhythm_1)
          song.rhythm.bass[1] = await this.get_rhythm_explicit(x.value);
        else if (x.key === key_bass_rhythm_2)
          song.rhythm.bass[2] = await this.get_rhythm_explicit(x.value);
        else if (x.key === key_bass_rhythm_3)
          song.rhythm.bass[3] = await this.get_rhythm_explicit(x.value);
        else if (x.key === key_bass_rhythm_4)
          song.rhythm.bass[4] = await this.get_rhythm_explicit(x.value);
        else if (x.key === key_bass_rhythm_5)
          song.rhythm.bass[5] = await this.get_rhythm_explicit(x.value);
        else if (x.key === key_bass_rhythm_6)
          song.rhythm.bass[6] = await this.get_rhythm_explicit(x.value);
        else if (x.key === key_bass_rhythm_7)
          song.rhythm.bass[7] = await this.get_rhythm_explicit(x.value);

        else if (x.key === key_back_rhythm_0)
          song.rhythm.back[0] = await this.get_rhythm_explicit(x.value);
        else if (x.key === key_back_rhythm_1)
          song.rhythm.back[1] = await this.get_rhythm_explicit(x.value);
        else if (x.key === key_back_rhythm_2)
          song.rhythm.back[2] = await this.get_rhythm_explicit(x.value);
        else if (x.key === key_back_rhythm_3)
          song.rhythm.back[3] = await this.get_rhythm_explicit(x.value);
        else if (x.key === key_back_rhythm_4)
          song.rhythm.back[4] = await this.get_rhythm_explicit(x.value);
        else if (x.key === key_back_rhythm_5)
          song.rhythm.back[5] = await this.get_rhythm_explicit(x.value);
        else if (x.key === key_back_rhythm_6)
          song.rhythm.back[6] = await this.get_rhythm_explicit(x.value);
        else if (x.key === key_back_rhythm_7)
          song.rhythm.back[7] = await this.get_rhythm_explicit(x.value);

        else if (x.key === key_lead_rhythm_0)
          song.rhythm.lead[0] = await this.get_rhythm_explicit(x.value);
        else if (x.key === key_lead_rhythm_1)
          song.rhythm.lead[1] = await this.get_rhythm_explicit(x.value);
        else if (x.key === key_lead_rhythm_2)
          song.rhythm.lead[2] = await this.get_rhythm_explicit(x.value);
        else if (x.key === key_lead_rhythm_3)
          song.rhythm.lead[3] = await this.get_rhythm_explicit(x.value);
        else if (x.key === key_lead_rhythm_4)
          song.rhythm.lead[4] = await this.get_rhythm_explicit(x.value);
        else if (x.key === key_lead_rhythm_5)
          song.rhythm.lead[5] = await this.get_rhythm_explicit(x.value);
        else if (x.key === key_lead_rhythm_6)
          song.rhythm.lead[6] = await this.get_rhythm_explicit(x.value);
        else if (x.key === key_lead_rhythm_7)
          song.rhythm.lead[7] = await this.get_rhythm_explicit(x.value);
      }

      this.cache[n] = song;

      return song;

    } catch (error) {
      debug_log(error);
      return null;
    }
  }

  async get_song_by_token(token_id) {
    try {
      const n = await this.get_value_by_key(token_id, '');

      return await this.get_song(n);

    } catch (error) {
      debug_log(error);
      return null;
    }
  }

  async get_resources(options) {
    await this.update();

    this.cache = {};

    let v = [];

    const size      = options?.size || 100;
    let   after     = options?.after;

    const need_songs =  !('filter' in options) ||
                        options.filter === types.song ||
                        options.filter.includes(types.song);

    while (v.length < size) {
      const tokens = await this.get_nfts(size, after);

      if (tokens.length == 0)
        break;

      for (const token of tokens) {
        const id = token.id;

        if (need_songs) {
          const song = await this.get_song_by_token(id);
          if (song != null)
            v.push(song);
        }
      }

      if (tokens.length < size)
        break;

      after = tokens[tokens.length - 1].id;
    }

    return v;
  }

  async buy(type) { }

  async mint_song(resources) {
    throw new Error('Not implemented');
  }

  async mint_hybrid_internal(songs, payment) {
    await this.update();

    const song_0 = songs[0].id;
    const song_1 = songs[1].id;

    const tx_0 = {
      type: 16,
      data: {
        dApp: this.contract_id,
        call: {
          function: 'mint_hybrid',
          args: [
            { type: 'string', value: generate_name() },
            { type: 'string', value: song_0 },
            { type: 'string', value: song_1 }
          ],
        },
        payment: payment
      },
    };

    const re_0 = await this.keeper_api.signAndPublishTransaction(tx_0);

    const data_0 = JSON.parse(re_0);

    const info = await this.tx_info_wait(data_0.id);

    //debug_log(JSON.stringify(info, null, '  '));

    /*  Wait for KeeperWallet to update it's state.
      */
    await new Promise((resolve) => {
      setTimeout(resolve, 15000);
      if (this.resolve)
        this.resolve();
      this.resolve = resolve;
    });
    this.resolve = null;

    const asset_id = info.stateChanges.issues[0].assetId;

    for (const x of info.stateChanges.data)
      if (x.key === asset_id)
        return x.value;

    return null;
  }

  async mint_hybrid(songs) {
    return await this.mint_hybrid_internal(
      songs, [ {
        assetId:  await this.get_price_hybrid_token(),
        amount:   await this.get_price_hybrid()
      } ]);
  }

  async mint_hybrid_and_burn(songs) {
    if (songs.length != 2)
      throw new Error("Wrong resources");
    if (!('asset_id' in songs[0]))
      throw new Error("Wrong resources");
    if (!('asset_id' in songs[1]))
      throw new Error("Wrong resources");

    return await this.mint_hybrid_internal(
      songs, [
        { assetId: songs[0].asset_id, amount: 1 },
        { assetId: songs[1].asset_id, amount: 1 }
      ]);
  }

  async get_resource_by_id(id) {
    return await this.get_song(id);
  }

  async get_wallet_address() {
    return this.address;
  }

  async get_explorer_url() {
    return `https://testnet.wavesexplorer.com/address/${this.address}`;
  }

  async can_mint_hybrid() {
    let balance = await this.get_balance_internal();
    let price   = await this.get_price_hybrid();

    return balance >= price;
  }
};

var user = null;

async function authenticate(options) {
  if (user === null) {
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
      throw new Error('No KeeperWallet extension');
    }

    const wallet_api  = await window.KeeperWallet.initialPromise;
    const state       = await wallet_api.publicState();

    //debug_log(JSON.stringify(options, null, '  '));
    //debug_log(JSON.stringify(state, null, '  '));

    user = new clearance_handler(options.env, wallet_api);

    await user.update();
  }

  return user;
}

module.exports = {
  env:          env,
  types:        types,
  note_skip:    note_skip,
  authenticate: authenticate
};

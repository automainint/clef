/* eslint-disable */

const sdk = require('./sdk.js');

const KEY_COUNT = 'count';

const SONG_FIRST = 512;

function int_to_base58(x) {
  const DIGITS = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

  const MASK = [
    0xff00000000000000,
    0x00ff000000000000,
    0x0000ff0000000000,
    0x000000ff00000000,
    0x00000000ff000000,
    0x0000000000ff0000,
    0x000000000000ff00,
    0x00000000000000ff
  ];

  let y = '';

  for (let n = x; n != 0; n = Math.floor(n / 58)) {
    const d = DIGITS[n % 58];
    y = `${d}${y}`;
  }

  for (let i = 0; i < 8; i++) {
    if ((x & MASK[i]) == 0) {
      y = `1${y}`;
    } else {
      break;
    }
  }

  return y;
}

async function fetch_current_height(options) {
  const { fetch, node_url, log } = sdk.adjust_options(options);

  return (await sdk.fetch_json_request(
    fetch,
    `${node_url}blocks/height`,
    { METHOD: 'GET' },
    log
  )).height;
}

async function fetch_nft_distribution(asset_id, height, options) {
  const { fetch, node_url, log } = sdk.adjust_options(options);

  const distribution = (await sdk.fetch_json_request(
    fetch,
    `${node_url}assets/${asset_id}/distribution/${height}/limit/1`,
    { METHOD: 'GET' },
    log
  ));

  for (const x of Object.keys(distribution.items)) {
    if (distribution.items[x] >= 1)
      return 1;
  }

  return 0;
}

async function fetch_songs(cache, options) {
  const { log } = sdk.adjust_options(options);

  let cache_new = {};
  let songs     = [];

  let count   = await sdk.fetch_value('count', options);
  let height  = await fetch_current_height(options);

  let v = [];

  for (let i = SONG_FIRST; i < count; i++) {
    const song_id = int_to_base58(i);

    v.push((async () => {
      try {
        let cached = (song_id in cache);

        if (cached) {
          cache_new[song_id] = cache[song_id];
        } else {
          cache_new[song_id] = await sdk.fetch_raw_song(song_id, options);
        }

        if (!cached || cache_new[song_id].distributed != 0) {
          cache_new[song_id].distributed =
            await fetch_nft_distribution(
              cache_new[song_id].asset_id,
              height,
              options);
        }

        if (cache_new[song_id].distributed == 1) {
          songs.push(cache_new[song_id]);
        } else {
          cache_new[song_id] = { distributed: 0 };
        }

      } catch (error) {
        log(error.message);
      }
    })());
  }

  await Promise.all(v);

  return {
    cache: cache_new,
    songs: songs
  };
}

function count_property(songs, prop, value) {
  let n = 0;

  for (const x of songs) {
    if (x[prop] === value)
      n++;
  }

  return n;
}

function count_property2(songs, prop, index, value) {
  let n = 0;

  for (const x of songs) {
    if (x[prop][index] === value)
      n++;
  }

  return n;
}

function count_meter(songs, bar_size, beat_size) {
  let n = 0;

  for (const x of songs) {
    if (x.bar_size === bar_size && x.beat_size === beat_size)
      n++;
  }

  return n;
}

function count_rhythm(songs, prop, index, value) {
  let n = 0;

  for (const x of songs) {
    if (x.rhythm[prop][index] === value)
      n++;
  }

  return n;
}

function count_any_chord(songs, value) {
  let n = 0;

  for (const x of songs) {
    for (const chord of x.chords) {
      if (chord === value) {
        n++;
        break;
      }
    }
  }

  return n;
}

function count_any_rhythm(songs, value) {
  let n = 0;

  for (const x of songs) {
    for (const k of Object.keys(x.rhythm)) {
      let found = false;

      for (const rhythm of x.rhythm[k]) {
        if (rhythm === value) {
          n++;
          found = true;
          break;
        }
      }

      if (found) break;
    }
  }

  return n;
}

function calculate_rarity(songs, song) {
  if (songs.length === 1)
    return 1.0;

  let unique_chords   = [];
  let unique_rhythms  = [];

  for (const x of song.chords) {
    if (!unique_chords.includes(x))
      unique_chords.push(x);
  }

  for (const k of [ 'kick', 'snare', 'hihat', 'bass', 'back', 'lead' ]) {
    for (const x of song.rhythm[k]) {
      if (!unique_rhythms.includes(x))
        unique_rhythms.push(x);
    }
  }

  const TOTAL_MIN = 67 + unique_chords.length + unique_rhythms.length;
  const TOTAL_MAX = TOTAL_MIN * songs.length;

  let total = 0;

  total += count_property(songs, 'generation', song.generation);
  total += count_property(songs, 'bpm', song.generation);
  total += count_meter(songs, song.bar_size, song.beat_size);
  total += count_property(songs, 'tonality', song.tonality);
  total += count_property(songs, 'arpeggio', song.arpeggio);

  total += count_property2(songs, 'instruments', 0, song.instruments[0]);
  total += count_property2(songs, 'instruments', 1, song.instruments[1]);
  total += count_property2(songs, 'instruments', 2, song.instruments[2]);
  total += count_property2(songs, 'instruments', 3, song.instruments[3]);
  total += count_property2(songs, 'instruments', 4, song.instruments[4]);
  total += count_property2(songs, 'instruments', 5, song.instruments[5]);

  for (let i = 0; i < 8; i++) {
    total += count_property2(songs, 'chords', i, song.chords[i]);
    total += count_rhythm(songs, 'kick', i, song.rhythm.kick[i]);
    total += count_rhythm(songs, 'snare', i, song.rhythm.snare[i]);
    total += count_rhythm(songs, 'hihat', i, song.rhythm.hihat[i]);
    total += count_rhythm(songs, 'bass', i, song.rhythm.bass[i]);
    total += count_rhythm(songs, 'back', i, song.rhythm.back[i]);
    total += count_rhythm(songs, 'lead', i, song.rhythm.lead[i]);
  }

  for (let x of unique_chords)
    total += count_any_chord(songs, x);
  for (let x of unique_rhythms)
    total += count_any_rhythm(songs, x);

  return 1.0 - (total - TOTAL_MIN) / (TOTAL_MAX - TOTAL_MIN);
}

async function eval_rarity(cache_old, options) {
  const { cache, songs } = await fetch_songs(cache_old, options);

  let rarity_values = {};

  for (const song of songs) {
    rarity_values[song.asset_id] = calculate_rarity(songs, song);
  }

  return {
    cache:          cache,
    rarity_values:  rarity_values
  };
}

module.exports = {
  eval_rarity: eval_rarity
};


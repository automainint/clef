/* eslint-disable */

const CONTRACT  = '3P4m4beJ6p1pMPHqCQMAXEdquUuXJz72CMe';
const NODE_URL  = 'https://nodes.wavesnodes.com/';
const NOTE_SKIP = 65535;

/*  Fetch one smart contract value from blockchain.
 */
async function fetch_value(key) {
  const response = await window.fetch(
    `${NODE_URL}addresses/data/${CONTRACT}/${key}`,
    { method:   'GET' });

  if (response.status != 200)
    throw new Error('Fetch failed');

  return (await response.json()).value;
}

/*  Fetch multiple smart contract values from blockchain.
 */
async function fetch_values(keys) {
  const response = await window.fetch(
    `${NODE_URL}addresses/data/${CONTRACT}`,
    { method:   'POST',
      body:     JSON.stringify({ keys: keys }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

  if (response.status != 200)
    throw new Error('Fetch failed');

  const data = await response.json();

  let values = [];

  for (let i = 0; i < keys.length; i++) {
    for (const x of data) {
      if (x.key === keys[i]) {
        values.push(x.value);
        break;
      }
    }
  }

  return values;
}

let cache = {};

/*  Fetch song chords and cache the response.
 */
async function fetch_song_chords(id) {
  if (!(id in cache)) {
    cache[id] = fetch_values([
      `${song_id}_SC0`,
      `${song_id}_SC1`,
      `${song_id}_SC2`,
      `${song_id}_SC3`,
      `${song_id}_SC4`,
      `${song_id}_SC5`,
      `${song_id}_SC6`,
      `${song_id}_SC7`
    ]);
  }

  return await cache[id];
}

/*  Fetch chord notes and cache the response.
 */
async function fetch_chord_notes(id) {
  if (!(id in cache)) {
    cache[id] = fetch_values([
      `${chord_id}_C0`,
      `${chord_id}_C1`,
      `${chord_id}_C2`,
      `${chord_id}_C3`,
      `${chord_id}_C4`
    ]);
  }

  const notes_raw = await cache[id];
  let   notes     = [];

  for (const x of notes_raw) {
    if (x === NOTE_SKIP)
      break;
    notes.push(x);
  }

  return notes;
}

/*  Chord colors.
 */
const colors = {
  major:    0,
  minor:    1,
  neutral:  2,
  weird:    3
};

/*  Fetch song colors by NFT asset id.
 */
async function get_colors_by_asset_id(asset_id) {
  let v = [];

  try {
    /*  Fetch song internal ID by NFT asset ID.
     */
    const song_id = await fetch_value(`${asset_id}`);

    /*  Fetch chords IDs.
     */
    const chords = await fetch_song_chords(song_id);

    /*  Fetch notes for each chord.
     */
    for (const chord_id of chords) {
      /*  Fetch notes by chord internal ID.
       */
      const notes = await fetch_chord_notes(chord_id);

      /*  Determine chord color.
       */
      const bass = notes[0];
      if (notes.includes(bass + 3))
        v.push(colors.minor);
      else if (notes.includes(bass + 4))
        v.push(colors.major);
      else if (notes.includes(bass + 7))
        v.push(colors.neutral);
      else
        v.push(colors.weird);
    }

  } catch (error) {
    console.log(error);
  }

  return v;
}

module.exports = {
  colors:                 colors,
  get_colors_by_asset_id: get_colors_by_asset_id
};

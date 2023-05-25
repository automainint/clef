/* eslint-disable */

const { types } = require('./types.js');
const sdk       = require('./sdk.js');

function notate_chord(text) {
  let notes = [ 0, 0 ];

  for (let i = 0; i < text.length; i++) {
    if (text[i] == 'a') {
      notes[0] = i;
      notes[1] = i;
      notes.push(i);
    } else if (text[i] == 'b') {
      notes[0] = i;
      notes.push(i);
    } else if (text[i] == 'l') {
      notes[1] = i;
      notes.push(i);
    } else if (text[i] == 'x') {
      notes.push(i);
    }
  }

  return { notes: notes };
}

function notate_rhythm(text) {
  let notes   = [];
  let offset  = 0;

  let add_pause = (n) => {
    if (notes.length === 0)
      notes.push(0);
    notes.push(n - offset);
  };

  let add = (n) => {
    if (notes.length > 0)
      add_pause(n);
    notes.push(2);
    offset = n + 2;
  };

  for (let i = 0; i < text.length; i++) {
    if (text[i] == 'x')
      add(i * 2);
  }

  add_pause(text.length * 2);

  return { notes: notes };
}

function diatonic_minor(key_note) {
  return [
    key_note, key_note + 2,
    key_note + 3, key_note + 5, key_note + 7,
    key_note + 8, key_note + 10
  ];
}

function pitch_to_midi(tonality, pitch) {
  const octave = Math.floor(pitch / tonality.length);
  const note   = tonality[pitch - octave * tonality.length];
  return 12 * octave + note;
}

function beat_to_sec(bpm, beats) {
  return (beats * 60) / bpm;
}

function make_song(entity) {
  if (entity.type === types.song) {
    return entity;
  }

  let dup_ = (x) => {
    return [ x, x ];
  };

  let song = {
    id:         entity.id,
    bpm:        120,
    bar_size:   16,
    beat_size:  4,
    tonality:   { key: 0 },
    instruments: {
      kick:   'kick-alpha',
      snare:  'snare-alpha',
      hihat:  'hihat-alpha',
      bass:   'bass-alpha',
      back:   'back-alpha',
      lead:   'lead-alpha'
    },
    chords: dup_({ notes: [ 0, 12, 0, 4, 7 ] }),
    arpeggio: [],
    rhythm: {
      kick:   [],
      snare:  [],
      hihat:  [],
      bass:   [],
      back:   [],
      lead:   []
    }
  };

  if (entity.type === types.chord) {
    song.rhythm.bass = dup_({ notes: [ 16, 0 ] });
    song.rhythm.back = dup_({ notes: [ 16, 0 ] });

    song.chords = dup_(entity);
  }

  if (entity.type === types.beat) {
    song.bpm        = entity.bpm;
    song.bar_size   = entity.bar_size;
    song.beat_size  = entity.beat_size;

    song.instruments.kick   = entity.instruments.kick;
    song.instruments.snare  = entity.instruments.snare;
    song.instruments.hihat  = entity.instruments.hihat;

    song.rhythm.kick  = dup_(entity.rhythm.kick);
    song.rhythm.snare = dup_(entity.rhythm.snare);
    song.rhythm.hihat = dup_(entity.rhythm.hihat);
  }

  if (entity.type === types.vibe) {
    song.instruments.bass = entity.instruments.bass;
    song.instruments.back = entity.instruments.back;
    song.instruments.lead = entity.instruments.lead;

    song.arpeggio = entity.arpeggio;

    song.rhythm.bass = dup_(entity.rhythm.bass);
    song.rhythm.back = dup_(entity.rhythm.back);
    song.rhythm.lead = dup_(entity.rhythm.lead);
  }

  return song;
}

async function render_sheet(entity, extend_duration = true) {
  let data = entity;
  if (!('rhythm' in data))
    data = await sdk.fetch_song_data_by_asset_id(entity.asset_id);
  return sdk.render_sheet(make_song(data), extend_duration);
}

function get_song_label(song) {
  return song.label;
}

async function get_song_parents(song) {
  if ('parents' in song) {
    return song.parents;
  }

  const data = await sdk.fetch_song_data_by_asset_id(song.asset_id);
  return data.parents;
}

async function get_song_bpm(song) {
  if ('bpm' in song) {
    return song.bpm;
  }

  const data = await sdk.fetch_song_data_by_asset_id(song.asset_id);
  return data.bpm;
}

async function get_song_meter(song) {
  if ('bar_size' in song && 'beat_size' in song) {
    return [ Math.floor(song.bar_size / song.beat_size), 4 ];
  }

  const data = await sdk.fetch_song_data_by_asset_id(song.asset_id);
  return [ Math.floor(data.bar_size / data.beat_size), 4 ];
}

async function get_song_tonality(song) {
  const names = [ 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'H' ];

  if ('tonality' in song) {
    return names[sdk.clamp_note(song.tonality.key)];
  }

  const data = await sdk.fetch_song_data_by_asset_id(song.asset_id);
  return names[sdk.clamp_note(data.tonality.key)];
}

const colors = {
  major:    0,
  minor:    1,
  neutral:  2,
  weird:    3
};

function get_song_colors(song) {
  let data;

  if ('colors' in song) {
    return song.colors;
  }

  let v = [];
  for (const chord of song.chords) {
    v.push(sdk.get_chord_color(chord.notes));
  }
  return v;
}

async function get_song_chords(song) {
  let data;

  if ('tonality' in song && 'chords' in song) {
    data = song;
  } else {
    data = await sdk.fetch_song_data_by_asset_id(song.asset_id);
  }

  let v = [];

  const key = data.tonality.key;

  for (const chord of data.chords) {
    if (chord.notes.length == 0) {
      v.push([]);
    } else {
      let notes = [ key + chord.notes[0] ];

      for (let i = 2; i < chord.notes.length; i++) {
        if (!notes.includes(key + chord.notes[i]))
          notes.push(key + chord.notes[i]);
      }

      if (chord.notes.length > 1 && !notes.includes(key + chord.notes[1]))
        notes.push(key + chord.notes[1]);

      v.push(notes);
    }
  }

  return v;
}

function get_chord_name(chord) {
  const clamped = sdk.clamp_notes(chord);

  const root_names = [ 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'H' ];

  if (chord.length == 0)
    return 'X';

  const root = sdk.clamp_note(chord[0]);

  let name = root_names[root];

  if (chord.length == 1)
    return `${name}x`;

  let sus2  = sdk.clamp_note(root + 2);
  let minor = sdk.clamp_note(root + 3);
  let major = sdk.clamp_note(root + 4);
  let sus4  = sdk.clamp_note(root + 5);
  let dim   = sdk.clamp_note(root + 6);
  let fifth = sdk.clamp_note(root + 7);
  let sept  = sdk.clamp_note(root + 10);
  let bsept = sdk.clamp_note(root + 11);

  if (clamped.includes(minor) && clamped.includes(dim))
    return `${name}dim`;
  if (clamped.includes(minor)) {
    if (clamped.includes(sept))
      return `${name}m7`;
    if (clamped.includes(bsept))
      return `${name}m7+`;
  }
  if (clamped.includes(major)) {
    if (clamped.includes(sept))
      return `${name}maj7`;
    if (clamped.includes(bsept))
      return `${name}maj7+`;
  }
  if (clamped.includes(minor) && !clamped.includes(major))
    return `${name}m`;
  if (clamped.includes(major) && !clamped.includes(minor))
    return `${name}maj`;
  if (!clamped.includes(minor) && !clamped.includes(major)) {
    if (clamped.includes(sus2))
      return `${name}sus2`;
    if (clamped.includes(sus4))
      return `${name}sus4`;
  }
  if (clamped.includes(fifth))
    return `${name}5`;

  return `${name}*`;
}

async function get_song_chord_names(song) {
  let v = [];
  const chords = await get_song_chords(song);
  for (const chord of chords)
    v.push(get_chord_name(chord));
  return v;
}

async function get_song_generation(song) {
  if ('generation' in song) {
    return song.generation;
  }

  const data = await sdk.fetch_song_data_by_asset_id(song.asset_id);
  return data.generation;
}

function get_song_id(song) {
  return song.id;
}

function get_song_asset_id(song) {
  return song.asset_id;
}

function get_song_asset_url(song) { 
  return `https://wavesexplorer.com/assets/${song.asset_id}`;
}

async function can_mint_hybrid(song) {
  return true;
}

function get_element_label(element) {
  if (element.type === types.chord) {
    return get_chord_name(element.notes);
  }

  return element.label;
}

module.exports = {
  notate_chord:         notate_chord,
  notate_rhythm:        notate_rhythm,
  diatonic_minor:       diatonic_minor,
  pitch_to_midi:        pitch_to_midi,
  beat_to_sec:          beat_to_sec,
  render_sheet:         render_sheet,
  get_song_id:          get_song_id,
  get_song_label:       get_song_label,
  get_song_parents:     get_song_parents,
  get_song_bpm:         get_song_bpm,
  get_song_meter:       get_song_meter,
  get_song_tonality:    get_song_tonality,
  colors:               colors,
  get_song_colors:      get_song_colors,
  get_song_chords:      get_song_chords,
  get_chord_name:       get_chord_name,
  get_song_chord_names: get_song_chord_names,
  get_song_generation:  get_song_generation,
  get_song_asset_id:    get_song_asset_id,
  get_song_asset_url:   get_song_asset_url,
  can_mint_hybrid:      can_mint_hybrid,
  get_element_label:    get_element_label
};

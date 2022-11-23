/* eslint-disable */

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
  const note = tonality[pitch - octave * tonality.length];
  return 12 * octave + note;
}

function beat_to_sec(bpm, beats) {
  return (beats * 60) / bpm;
}

function render_line(bpm, notes, bar, beat_size, beat_count, beats_per_bar, add) {
  if (notes.length === 0)
    return;

  let prev_bar  = 0;
  let offset    = 0;
  let index     = 0;

  for ( let i = 0;
        offset < beat_count;
        i += 2) {
    if (offset <= 0 && i > notes.length)
      break;

    const current_bar = Math.floor(offset / beats_per_bar);
    const duration    = notes[i % notes.length] / beat_size;

    if (current_bar != prev_bar)
      index = 0;

    if (current_bar === bar)
      add({
        bar: current_bar,
        index: index,
        time: beat_to_sec(bpm, offset),
        duration: beat_to_sec(bpm, duration)
      });

    prev_bar = current_bar;
    index++;

    const pause = notes[(i + 1) % notes.length] / beat_size;
    offset += duration + pause;
  }
}

function render_rhythms(bpm, rhythms, beat_size, beat_count, beats_per_bar, add) {
  if (rhythms.length === 0 || beats_per_bar <= 0)
    return;

  for ( let offset = 0, bar = 0;
        offset < beat_count;
        offset += beats_per_bar, bar++)
    render_line(
      bpm, rhythms[bar % rhythms.length].notes, bar,
      beat_size, beat_count, beats_per_bar, add);
}

function render_sheet(song) {
  let sheet = {
    instruments: song.instruments,

    duration: 0,
    kick: [],
    snare: [],
    hihat: [],
    bass: [],
    back: [],
    lead: []
  };

  const beat_count    = Math.floor(song.chords.length * song.bar_size / song.beat_size);
  const beats_per_bar = Math.floor(song.bar_size / song.beat_size);

  sheet.duration = beat_to_sec(song.bpm, beat_count);

  render_rhythms(
    song.bpm,
    song.rhythm.kick,
    song.beat_size,
    beat_count,
    beats_per_bar,
    ({ time, duration }) => {
      if (sheet.kick.length > 0 && duration <= 0)
        return;
      sheet.kick.push(
        { time: time,
          note: 0,
          duration: duration,
          velocity: 1 });
    });

  render_rhythms(
    song.bpm,
    song.rhythm.snare,
    song.beat_size,
    beat_count,
    beats_per_bar,
    ({ time, duration }) => {
      if (sheet.snare.length > 0 && duration <= 0)
        return;
      sheet.snare.push(
        { time: time,
          note: 0,
          duration: duration,
          velocity: 1 });
    });

  render_rhythms(
    song.bpm,
    song.rhythm.hihat,
    song.beat_size,
    beat_count,
    beats_per_bar,
    ({ time, duration }) => {
      if (sheet.hihat.length > 0 && duration <= 0)
        return;
      sheet.hihat.push(
        { time: time,
          note: 0,
          duration: duration,
          velocity: 1 });
    });

  render_rhythms(
    song.bpm,
    song.rhythm.back,
    song.beat_size,
    beat_count,
    beats_per_bar,
    ({ bar, time, duration }) => {
      if (sheet.back.length > 0 && duration <= 0)
        return;
      const chord = song.chords[bar % song.chords.length];
      for (let i = 2; i < chord.notes.length; i++)
        sheet.back.push(
          { time: time,
            note: song.tonality.key + chord.notes[i],
            duration: duration,
            velocity: 1 });
    });

  render_rhythms(
    song.bpm,
    song.rhythm.bass,
    song.beat_size,
    beat_count,
    beats_per_bar,
    ({ bar, time, duration }) => {
      const chord = song.chords[bar % song.chords.length];
      if (chord.notes.length === 0)
        return;
      if (sheet.bass.length > 0 && duration <= 0)
        return;
      sheet.bass.push(
        { time: time,
          note: song.tonality.key + chord.notes[0],
          duration: duration,
          velocity: 1 });
    });

  render_rhythms(
    song.bpm,
    song.rhythm.lead,
    song.beat_size,
    beat_count,
    beats_per_bar,
    ({ bar, index, time, duration }) => {
      if (sheet.lead.length > 0 && duration <= 0)
        return;
      const chord = song.chords[bar % song.chords.length];
      if (chord.notes.length < 2)
        return;
      let note;
      if (index === 0 || chord.notes.length === 2 || song.arpeggio.length === 0)
        note = song.tonality.key + chord.notes[1];
      else {
        const m0  = song.arpeggio[(index - 1) % song.arpeggio.length];
        const m   = m0 < 0 ? (-m0 - 1) : m0;
        const n   = 2 + (m % (chord.notes.length - 2));
        note = song.tonality.key + chord.notes[n];
        if (m0 < 0)
          note -= 12;
      }
      sheet.lead.push(
        { time: time,
          note: note,
          duration: duration,
          velocity: 1 });
    });

  return sheet;
}

function get_song_label(song) {
  return song.label;
}

function get_song_parents(song) {
  return song.parents;
}

function get_song_bpm(song) {
  return song.bpm;
}

function get_song_meter(song) {
  return [ Math.floor(song.bar_size / song.beat_size), 4 ];
}

function clamp_note(note) {
  let n = note;
  while (n < 0)
    n += 12;
  while (n >= 12)
    n -= 12;
  return n;
}

function get_song_tonality(song) {
  const names = [ 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'H' ];
  return names[clamp_note(song.tonality.key)];
}

const colors = {
  major:    0,
  minor:    1,
  neutral:  2,
  weird:    3
};

function get_song_colors(song) {
  let v = [];

  for (const chord of song.chords) {
    const bass = chord.notes[0];

    if (chord.notes.includes(bass + 3))
      v.push(colors.minor);
    else if (chord.notes.includes(bass + 4))
      v.push(colors.major);
    else if (chord.notes.includes(bass + 7))
      v.push(colors.neutral);
    else
      v.push(colors.weird);
  }

  return v;
}

function get_song_chords(song) {
  let v = [];

  const key = song.tonality.key;

  for (const chord of song.chords) {
    if (chord.notes.length == 0)
      v.push([]);
    else {
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

function clamp_chord(chord) {
  let v = [];
  for (const n of chord)
    v.push(clamp_note(n));
  return v;
}

function get_chord_name(chord) {
  const clamped = clamp_chord(chord);

  const root_names = [ 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'H' ];

  if (chord.length == 0)
    return 'X';

  const root = clamp_note(chord[0]);

  let name = root_names[root];

  if (chord.length == 1)
    return `${name}x`;

  let sus2  = clamp_note(root + 2);
  let minor = clamp_note(root + 3);
  let major = clamp_note(root + 4);
  let sus4  = clamp_note(root + 5);
  let dim   = clamp_note(root + 6);
  let fifth = clamp_note(root + 7);
  let sept  = clamp_note(root + 10);
  let bsept = clamp_note(root + 11);

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

function get_song_chord_names(song) {
  let v = [];

  const chords = get_song_chords(song);

  for (const chord of chords)
    v.push(get_chord_name(chord));

  return v;
}

function get_song_generation(song) {
  return song.generation;
}

function get_song_id(song) {
  return song.id;
}

function get_song_asset_id(song) {
  return song.asset_id;
}

function get_song_asset_url(song) {
  return song.asset_url;
}

function can_mint_hybrid(song) {
  return true;
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
  can_mint_hybrid:      can_mint_hybrid
};

const {
  diatonic_minor,
  pitch_to_midi,
  beat_to_sec,
  render_sheet,
  notate_chord,
  notate_rhythm,
  get_song_id,
  get_song_label,
  get_song_parents,
  get_song_bpm,
  get_song_meter,
  get_song_tonality,
  colors,
  get_song_colors,
  get_song_chords,
  get_song_chord_names,
  get_song_generation,
  get_song_asset_id,
  get_song_asset_url,
  can_mint_hybrid,
  get_element_label
} = require('../src_js/music.js');

const { get_all_elements } = require('../src_js/resources.js');

const assert = require('assert');

describe('music', async function() {
  it('convert zero pitch to note', async function() {
    const tonality = [ 0, 2, 3, 5, 7, 8, 10 ];
    assert.equal(pitch_to_midi(tonality, 0), 0);
  });

  it('convert negative pitch to note', async function() {
    const tonality = [ 0, 2, 3, 5, 7, 8, 10 ];
    assert.equal(pitch_to_midi(tonality, -1), -2);
  });

  it('la minor tonality', async function() {
    const am = diatonic_minor(0);
    assert.equal(am.length, 7);
    assert.equal(am[0], 0);
    assert.equal(am[1], 2);
    assert.equal(am[2], 3);
    assert.equal(am[3], 5);
    assert.equal(am[4], 7);
    assert.equal(am[5], 8);
    assert.equal(am[6], 10);
  });

  it('convert positive pitch to note', async function() {
    const tonality = [ 0, 2, 3, 5, 7, 8, 10 ];
    assert.equal(pitch_to_midi(tonality, 9), 15);
  });

  it('convert 0 beat to sec', async function() {
    assert.equal(beat_to_sec(120, 0), 0);
  });

  it('convert 120 beat to sec', async function() {
    assert.equal(beat_to_sec(120, 120), 60);
  });

  it('convert 2 beat to sec', async function() {
    assert.equal(beat_to_sec(120, 2), 1);
  });

  it('render empty song', async function() {
    const sheet = await render_sheet({
      type:       'song',
      bpm:        135,
      bar_size:   16,
      beat_size:  4,
      instruments: {
        kick:   'kick-alpha',
        snare:  'snare-alpha',
        hihat:  'hihat-alpha',
        bass:   'bass-alpha',
        back:   'back-alpha',
        lead:   'lead-alpha'
      },
      chords: [],
      arpeggio: [],
      rhythm: {
        kick:   [],
        snare:  [],
        hihat:  [],
        bass:   [],
        back:   [],
        lead:   []
      }
    }, false);

    assert.equal(sheet.duration, 0);
    assert.equal(sheet.kick.length, 0);
    assert.equal(sheet.snare.length, 0);
    assert.equal(sheet.hihat.length, 0);
    assert.equal(sheet.bass.length, 0);
    assert.equal(sheet.back.length, 0);
    assert.equal(sheet.lead.length, 0);
    assert.equal(typeof sheet.instruments.kick, 'string');
    assert.equal(typeof sheet.instruments.snare, 'string');
    assert.equal(typeof sheet.instruments.hihat, 'string');
    assert.equal(typeof sheet.instruments.bass, 'string');
    assert.equal(typeof sheet.instruments.back, 'string');
    assert.equal(typeof sheet.instruments.lead, 'string');
  });

  it('render 1 kick note', async function() {
    const sheet = await render_sheet({
      type:       'song',
      bpm:        135,
      bar_size:   16,
      beat_size:  4,
      instruments: {
        kick:   'kick-alpha',
        snare:  'snare-alpha',
        hihat:  'hihat-alpha',
        bass:   'bass-alpha',
        back:   'back-alpha',
        lead:   'lead-alpha'
      },
      chords: [ { notes: [ 0 ] } ],
      arpeggio: [],
      rhythm: {
        kick:   [ { notes: [ 2, 30 ] } ],
        snare:  [],
        hihat:  [],
        bass:   [],
        back:   [],
        lead:   []
      }
    }, false);

    assert.ok(sheet.duration > 0);
    assert.equal(sheet.kick.length, 1);
    assert.equal(sheet.kick[0].time, beat_to_sec(135, 0));
    assert.equal(sheet.kick[0].note, 0);
    assert.equal(sheet.kick[0].duration, beat_to_sec(135, 0.5));
    assert.ok(sheet.kick[0].velocity > 0);
    assert.ok(sheet.kick[0].velocity <= 1);
    assert.equal(sheet.snare.length, 0);
    assert.equal(sheet.hihat.length, 0);
    assert.equal(sheet.bass.length, 0);
    assert.equal(sheet.back.length, 0);
    assert.equal(sheet.lead.length, 0);
    assert.equal(typeof sheet.instruments.kick, 'string');
    assert.equal(typeof sheet.instruments.snare, 'string');
    assert.equal(typeof sheet.instruments.hihat, 'string');
    assert.equal(typeof sheet.instruments.bass, 'string');
    assert.equal(typeof sheet.instruments.back, 'string');
    assert.equal(typeof sheet.instruments.lead, 'string');
  });

  it('render 1 snare note', async function() {
    const sheet = await render_sheet({
      type:       'song',
      bpm:        135,
      bar_size:   16,
      beat_size:  4,
      instruments: {
        kick:   'kick-alpha',
        snare:  'snare-alpha',
        hihat:  'hihat-alpha',
        bass:   'bass-alpha',
        back:   'back-alpha',
        lead:   'lead-alpha'
      },
      chords: [ { notes: [ 0 ] } ],
      arpeggio: [],
      rhythm: {
        kick:   [],
        snare:  [ { notes: [ 2, 30 ] } ],
        hihat:  [],
        bass:   [],
        back:   [],
        lead:   []
      }
    }, false);

    assert.equal(sheet.duration, beat_to_sec(135, 4));
    assert.equal(sheet.kick.length, 0);
    assert.equal(sheet.snare.length, 1);
    assert.equal(sheet.snare[0].time, beat_to_sec(135, 0));
    assert.equal(sheet.snare[0].note, 0);
    assert.equal(sheet.snare[0].duration, beat_to_sec(135, 0.5));
    assert.ok(sheet.snare[0].velocity > 0);
    assert.ok(sheet.snare[0].velocity <= 1);
    assert.equal(sheet.hihat.length, 0);
    assert.equal(sheet.bass.length, 0);
    assert.equal(sheet.back.length, 0);
    assert.equal(sheet.lead.length, 0);
    assert.equal(typeof sheet.instruments.kick, 'string');
    assert.equal(typeof sheet.instruments.snare, 'string');
    assert.equal(typeof sheet.instruments.hihat, 'string');
    assert.equal(typeof sheet.instruments.bass, 'string');
    assert.equal(typeof sheet.instruments.back, 'string');
    assert.equal(typeof sheet.instruments.lead, 'string');
  });

  it('render beat', async function() {
    const sheet = await render_sheet({
      type:       'beat',
      bpm:        135,
      bar_size:   16,
      beat_size:  4,
      instruments: {
        kick:   'kick-alpha',
        snare:  'snare-alpha',
        hihat:  'hihat-alpha'
      },
      rhythm: {
        kick:   { notes: [] },
        snare:  { notes: [ 2, 30 ] },
        hihat:  { notes: [] },
      }
    }, false);

    assert.equal(sheet.duration, beat_to_sec(135, 8));
    assert.equal(sheet.kick.length, 0);
    assert.equal(sheet.snare.length, 1);
    assert.equal(sheet.snare[0].time, beat_to_sec(135, 0));
    assert.equal(sheet.snare[0].note, 0);
    assert.equal(sheet.snare[0].duration, beat_to_sec(135, 0.5));
    assert.ok(sheet.snare[0].velocity > 0);
    assert.ok(sheet.snare[0].velocity <= 1);
    assert.equal(sheet.hihat.length, 0);
    assert.equal(sheet.bass.length, 0);
    assert.equal(sheet.back.length, 0);
    assert.equal(sheet.lead.length, 0);
    assert.equal(typeof sheet.instruments.kick, 'string');
    assert.equal(typeof sheet.instruments.snare, 'string');
    assert.equal(typeof sheet.instruments.hihat, 'string');
    assert.equal(typeof sheet.instruments.bass, 'string');
    assert.equal(typeof sheet.instruments.back, 'string');
    assert.equal(typeof sheet.instruments.lead, 'string');
  });

  it('render 1 hihat note', async function() {
    const sheet = await render_sheet({
      type:       'song',
      bpm:        135,
      bar_size:   16,
      beat_size:  4,
      instruments: {
        kick:   'kick-alpha',
        snare:  'snare-alpha',
        hihat:  'hihat-alpha',
        bass:   'bass-alpha',
        back:   'back-alpha',
        lead:   'lead-alpha'
      },
      chords: [ { notes: [ 0 ] } ],
      arpeggio: [],
      rhythm: {
        kick:   [],
        snare:  [],
        hihat:  [ { notes: [ 2, 30 ] } ],
        bass:   [],
        back:   [],
        lead:   []
      }
    }, false);

    assert.equal(sheet.duration, beat_to_sec(135, 4));
    assert.equal(sheet.kick.length, 0);
    assert.equal(sheet.snare.length, 0);
    assert.equal(sheet.hihat.length, 1);
    assert.equal(sheet.hihat[0].time, beat_to_sec(135, 0));
    assert.equal(sheet.hihat[0].note, 0);
    assert.equal(sheet.hihat[0].duration, beat_to_sec(135, 0.5));
    assert.ok(sheet.hihat[0].velocity > 0);
    assert.ok(sheet.hihat[0].velocity <= 1);
    assert.equal(sheet.bass.length, 0);
    assert.equal(sheet.back.length, 0);
    assert.equal(sheet.lead.length, 0);
    assert.equal(typeof sheet.instruments.kick, 'string');
    assert.equal(typeof sheet.instruments.snare, 'string');
    assert.equal(typeof sheet.instruments.hihat, 'string');
    assert.equal(typeof sheet.instruments.bass, 'string');
    assert.equal(typeof sheet.instruments.back, 'string');
    assert.equal(typeof sheet.instruments.lead, 'string');
  });

  it('render 2 snare notes', async function() {
    const sheet = await render_sheet({
      type:       'song',
      bpm:        135,
      bar_size:   16,
      beat_size:  4,
      instruments: {
        kick:   'kick-alpha',
        snare:  'snare-alpha',
        hihat:  'hihat-alpha',
        bass:   'bass-alpha',
        back:   'back-alpha',
        lead:   'lead-alpha'
      },
      chords: [ { notes: [ 0 ] } ],
      arpeggio: [],
      rhythm: {
        kick:   [],
        snare:  [ { notes: [ 2, 4, 4, 22 ] } ],
        hihat:  [],
        bass:   [],
        back:   [],
        lead:   []
      }
    }, false);

    assert.equal(sheet.duration, beat_to_sec(135, 4));
    assert.equal(sheet.kick.length, 0);
    assert.equal(sheet.snare.length, 2);
    assert.equal(sheet.snare[0].time, beat_to_sec(135, 0));
    assert.equal(sheet.snare[0].note, 0);
    assert.equal(sheet.snare[0].duration, beat_to_sec(135, 0.5));
    assert.ok(sheet.snare[0].velocity > 0);
    assert.ok(sheet.snare[0].velocity <= 1);
    assert.equal(sheet.snare[1].time, beat_to_sec(135, 1.5));
    assert.equal(sheet.snare[1].note, 0);
    assert.equal(sheet.snare[1].duration, beat_to_sec(135, 1));
    assert.ok(sheet.snare[1].velocity > 0);
    assert.ok(sheet.snare[1].velocity <= 1);
    assert.equal(sheet.hihat.length, 0);
    assert.equal(sheet.bass.length, 0);
    assert.equal(sheet.back.length, 0);
    assert.equal(sheet.lead.length, 0);
    assert.equal(typeof sheet.instruments.kick, 'string');
    assert.equal(typeof sheet.instruments.snare, 'string');
    assert.equal(typeof sheet.instruments.hihat, 'string');
    assert.equal(typeof sheet.instruments.bass, 'string');
    assert.equal(typeof sheet.instruments.back, 'string');
    assert.equal(typeof sheet.instruments.lead, 'string');
  });

  it('render 2 snare notes with pause', async function() {
    const sheet = await render_sheet({
      type:       'song',
      bpm:        135,
      bar_size:   16,
      beat_size:  4,
      instruments: {
        kick:   'kick-alpha',
        snare:  'snare-alpha',
        hihat:  'hihat-alpha',
        bass:   'bass-alpha',
        back:   'back-alpha',
        lead:   'lead-alpha'
      },
      chords: [ { notes: [ 0 ] } ],
      arpeggio: [],
      rhythm: {
        kick:   [],
        snare:  [ { notes: [ 2, 2, 0, 2, 4, 22 ] } ],
        hihat:  [],
        bass:   [],
        back:   [],
        lead:   []
      }
    }, false);

    assert.equal(sheet.duration, beat_to_sec(135, 4));
    assert.equal(sheet.kick.length, 0);
    assert.equal(sheet.snare.length, 2);
    assert.equal(sheet.snare[0].time, beat_to_sec(135, 0));
    assert.equal(sheet.snare[0].note, 0);
    assert.equal(sheet.snare[0].duration, beat_to_sec(135, 0.5));
    assert.ok(sheet.snare[0].velocity > 0);
    assert.ok(sheet.snare[0].velocity <= 1);
    assert.equal(sheet.snare[1].time, beat_to_sec(135, 1.5));
    assert.equal(sheet.snare[1].note, 0);
    assert.equal(sheet.snare[1].duration, beat_to_sec(135, 1));
    assert.ok(sheet.snare[1].velocity > 0);
    assert.ok(sheet.snare[1].velocity <= 1);
    assert.equal(sheet.hihat.length, 0);
    assert.equal(sheet.bass.length, 0);
    assert.equal(sheet.back.length, 0);
    assert.equal(sheet.lead.length, 0);
    assert.equal(typeof sheet.instruments.kick, 'string');
    assert.equal(typeof sheet.instruments.snare, 'string');
    assert.equal(typeof sheet.instruments.hihat, 'string');
    assert.equal(typeof sheet.instruments.bass, 'string');
    assert.equal(typeof sheet.instruments.back, 'string');
    assert.equal(typeof sheet.instruments.lead, 'string');
  });

  it('render overlapping rhythm', async function() {
    const sheet = await render_sheet({
      type:       'song',
      bpm:        135,
      bar_size:   16,
      beat_size:  4,
      instruments: {
        kick:   'kick-alpha',
        snare:  'snare-alpha',
        hihat:  'hihat-alpha',
        bass:   'bass-alpha',
        back:   'back-alpha',
        lead:   'lead-alpha'
      },
      chords: [
        { notes: [ 0 ] },
        { notes: [ 0 ] }
      ],
      arpeggio: [],
      rhythm: {
        kick:   [],
        snare:  [ { notes: [ 2, 16, 4, 10 ] } ],
        hihat:  [],
        bass:   [],
        back:   [],
        lead:   []
      }
    }, false);

    assert.equal(sheet.duration, beat_to_sec(135, 8));
    assert.equal(sheet.snare.length, 2);
    assert.equal(sheet.snare[0].time, beat_to_sec(135, 0));
    assert.equal(sheet.snare[0].duration, beat_to_sec(135, 0.5));
    assert.equal(sheet.snare[1].time, beat_to_sec(135, 4.5));
    assert.equal(sheet.snare[1].duration, beat_to_sec(135, 1));
    assert.equal(typeof sheet.instruments.kick, 'string');
    assert.equal(typeof sheet.instruments.snare, 'string');
    assert.equal(typeof sheet.instruments.hihat, 'string');
    assert.equal(typeof sheet.instruments.bass, 'string');
    assert.equal(typeof sheet.instruments.back, 'string');
    assert.equal(typeof sheet.instruments.lead, 'string');
  });

  it('render short rhythm', async function() {
    const sheet = await render_sheet({
      type:       'song',
      bpm:        135,
      bar_size:   16,
      beat_size:  4,
      instruments: {
        kick:   'kick-alpha',
        snare:  'snare-alpha',
        hihat:  'hihat-alpha',
        bass:   'bass-alpha',
        back:   'back-alpha',
        lead:   'lead-alpha'
      },
      chords: [
        { notes: [ 0 ] }
      ],
      arpeggio: [],
      rhythm: {
        kick:   [],
        snare:  [ { notes: [ 2, 6 ] } ],
        hihat:  [],
        bass:   [],
        back:   [],
        lead:   []
      }
    }, false);

    assert.equal(sheet.duration, beat_to_sec(135, 4));
    assert.equal(sheet.snare.length, 2);
    assert.equal(sheet.snare[0].time, beat_to_sec(135, 0));
    assert.equal(sheet.snare[0].duration, beat_to_sec(135, 0.5));
    assert.equal(sheet.snare[1].time, beat_to_sec(135, 2));
    assert.equal(sheet.snare[1].duration, beat_to_sec(135, 0.5));
    assert.equal(typeof sheet.instruments.kick, 'string');
    assert.equal(typeof sheet.instruments.snare, 'string');
    assert.equal(typeof sheet.instruments.hihat, 'string');
    assert.equal(typeof sheet.instruments.bass, 'string');
    assert.equal(typeof sheet.instruments.back, 'string');
    assert.equal(typeof sheet.instruments.lead, 'string');
  });

  it('render vibe', async function() {
    const sheet = await render_sheet({
      type:       'vibe',
      instruments: {
        bass:   'bass-alpha',
        back:   'back-alpha',
        lead:   'lead-alpha'
      },
      arpeggio: [],
      rhythm: {
        bass:   { notes: [] },
        back:   { notes: [ 32, 0 ] },
        lead:   { notes: [] }
      }
    }, false);

    assert.equal(sheet.duration, beat_to_sec(120, 8));
    assert.equal(sheet.back.length, 3);
    assert.equal(sheet.back[0].note, 0);
    assert.equal(sheet.back[0].time, beat_to_sec(120, 0));
    assert.equal(sheet.back[0].duration, beat_to_sec(120, 8));
    assert.ok(sheet.back[0].velocity > 0);
    assert.ok(sheet.back[0].velocity <= 1);
    assert.equal(sheet.back[1].note, 4);
    assert.equal(sheet.back[1].time, beat_to_sec(120, 0));
    assert.equal(sheet.back[1].duration, beat_to_sec(120, 8));
    assert.ok(sheet.back[1].velocity > 0);
    assert.ok(sheet.back[1].velocity <= 1);
    assert.equal(sheet.back[2].note, 7);
    assert.equal(sheet.back[2].time, beat_to_sec(120, 0));
    assert.equal(sheet.back[2].duration, beat_to_sec(120, 8));
    assert.ok(sheet.back[2].velocity > 0);
    assert.ok(sheet.back[2].velocity <= 1);
    assert.equal(typeof sheet.instruments.kick, 'string');
    assert.equal(typeof sheet.instruments.snare, 'string');
    assert.equal(typeof sheet.instruments.hihat, 'string');
    assert.equal(typeof sheet.instruments.bass, 'string');
    assert.equal(typeof sheet.instruments.back, 'string');
    assert.equal(typeof sheet.instruments.lead, 'string');
  });

  it('render 1 back', async function() {
    const sheet = await render_sheet({
      type:       'song',
      bpm:        135,
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
      chords: [
        { notes: [ 0, 0, 0, 2, 4 ] }
      ],
      arpeggio: [],
      rhythm: {
        kick:   [],
        snare:  [],
        hihat:  [],
        bass:   [],
        back:   [ { notes: [ 16, 0 ] } ],
        lead:   []
      }
    }, false);

    assert.equal(sheet.duration, beat_to_sec(135, 4));
    assert.equal(sheet.back.length, 3);
    assert.equal(sheet.back[0].note, 0);
    assert.equal(sheet.back[0].time, beat_to_sec(135, 0));
    assert.equal(sheet.back[0].duration, beat_to_sec(135, 4));
    assert.ok(sheet.back[0].velocity > 0);
    assert.ok(sheet.back[0].velocity <= 1);
    assert.equal(sheet.back[1].note, 2);
    assert.equal(sheet.back[1].time, beat_to_sec(135, 0));
    assert.equal(sheet.back[1].duration, beat_to_sec(135, 4));
    assert.ok(sheet.back[1].velocity > 0);
    assert.ok(sheet.back[1].velocity <= 1);
    assert.equal(sheet.back[2].note, 4);
    assert.equal(sheet.back[2].time, beat_to_sec(135, 0));
    assert.equal(sheet.back[2].duration, beat_to_sec(135, 4));
    assert.ok(sheet.back[2].velocity > 0);
    assert.ok(sheet.back[2].velocity <= 1);
    assert.equal(typeof sheet.instruments.kick, 'string');
    assert.equal(typeof sheet.instruments.snare, 'string');
    assert.equal(typeof sheet.instruments.hihat, 'string');
    assert.equal(typeof sheet.instruments.bass, 'string');
    assert.equal(typeof sheet.instruments.back, 'string');
    assert.equal(typeof sheet.instruments.lead, 'string');
  });

  it('render 1 bass', async function() {
    const sheet = await render_sheet({
      type:       'song',
      bpm:        135,
      bar_size:   16,
      beat_size:  4,
      tonality:   { key: 3 },
      instruments: {
        kick:   'kick-alpha',
        snare:  'snare-alpha',
        hihat:  'hihat-alpha',
        bass:   'bass-alpha',
        back:   'back-alpha',
        lead:   'lead-alpha'
      },
      chords: [
        { notes: [ -7, 0, 0, 2, 4 ] }
      ],
      arpeggio: [],
      rhythm: {
        kick:   [],
        snare:  [],
        hihat:  [],
        bass:   [ { notes: [ 16, 0 ] } ],
        back:   [],
        lead:   []
      }
    }, false);

    assert.equal(sheet.duration, beat_to_sec(135, 4));
    assert.equal(sheet.bass.length, 1);
    assert.equal(sheet.bass[0].note, -4);
    assert.equal(sheet.bass[0].time, beat_to_sec(135, 0));
    assert.equal(sheet.bass[0].duration, beat_to_sec(135, 4));
    assert.ok(sheet.bass[0].velocity > 0);
    assert.ok(sheet.bass[0].velocity <= 1);
    assert.equal(typeof sheet.instruments.kick, 'string');
    assert.equal(typeof sheet.instruments.snare, 'string');
    assert.equal(typeof sheet.instruments.hihat, 'string');
    assert.equal(typeof sheet.instruments.bass, 'string');
    assert.equal(typeof sheet.instruments.back, 'string');
    assert.equal(typeof sheet.instruments.lead, 'string');
  });

  it('render 1 lead', async function() {
    const sheet = await render_sheet({
      type:       'song',
      bpm:        135,
      bar_size:   16,
      beat_size:  4,
      tonality:   { key: -1 },
      instruments: {
        kick:   'kick-alpha',
        snare:  'snare-alpha',
        hihat:  'hihat-alpha',
        bass:   'bass-alpha',
        back:   'back-alpha',
        lead:   'lead-alpha'
      },
      chords: [
        { notes: [ 0, 2, 0, 2, 4 ] }
      ],
      arpeggio: [],
      rhythm: {
        kick:   [],
        snare:  [],
        hihat:  [],
        bass:   [],
        back:   [],
        lead:   [ { notes: [ 16, 0 ] } ]
      }
    }, false);

    assert.equal(sheet.duration, beat_to_sec(135, 4));
    assert.equal(sheet.lead.length, 1);
    assert.equal(sheet.lead[0].note, 1);
    assert.equal(sheet.lead[0].time, beat_to_sec(135, 0));
    assert.equal(sheet.lead[0].duration, beat_to_sec(135, 4));
    assert.ok(sheet.lead[0].velocity > 0);
    assert.ok(sheet.lead[0].velocity <= 1);

    assert.equal(typeof sheet.instruments.kick, 'string');
    assert.equal(typeof sheet.instruments.snare, 'string');
    assert.equal(typeof sheet.instruments.hihat, 'string');
    assert.equal(typeof sheet.instruments.bass, 'string');
    assert.equal(typeof sheet.instruments.back, 'string');
    assert.equal(typeof sheet.instruments.lead, 'string');
  });

  it('render arpeggio', async function() {
    const sheet = await render_sheet({
      type:       'song',
      bpm:        135,
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
      chords: [
        { notes: [ 0, 0, 2, 4 ] }
      ],
      arpeggio: [ 0, 1 ],
      rhythm: {
        kick:   [],
        snare:  [],
        hihat:  [],
        bass:   [],
        back:   [],
        lead:   [ { notes: [ 4, 0, 4, 0, 8, 0 ] } ]
      }
    }, false);

    assert.equal(sheet.lead.length, 3);
    assert.equal(sheet.lead[0].note, 0);
    assert.equal(sheet.lead[1].note, 2);
    assert.equal(sheet.lead[2].note, 4);

    assert.equal(typeof sheet.instruments.kick, 'string');
    assert.equal(typeof sheet.instruments.snare, 'string');
    assert.equal(typeof sheet.instruments.hihat, 'string');
    assert.equal(typeof sheet.instruments.bass, 'string');
    assert.equal(typeof sheet.instruments.back, 'string');
    assert.equal(typeof sheet.instruments.lead, 'string');
  });

  it('render arpeggio negative', async function() {
    const sheet = await render_sheet({
      type:       'song',
      bpm:        135,
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
      chords: [
        { notes: [ 0, 0, 2, 4 ] }
      ],
      arpeggio: [ -1, -2 ],
      rhythm: {
        kick:   [],
        snare:  [],
        hihat:  [],
        bass:   [],
        back:   [],
        lead:   [ { notes: [ 4, 0, 4, 0, 8, 0 ] } ]
      }
    }, false);

    assert.equal(sheet.lead.length, 3);
    assert.equal(sheet.lead[0].note, 0);
    assert.equal(sheet.lead[1].note, -10);
    assert.equal(sheet.lead[2].note, -8);

    assert.equal(typeof sheet.instruments.kick, 'string');
    assert.equal(typeof sheet.instruments.snare, 'string');
    assert.equal(typeof sheet.instruments.hihat, 'string');
    assert.equal(typeof sheet.instruments.bass, 'string');
    assert.equal(typeof sheet.instruments.back, 'string');
    assert.equal(typeof sheet.instruments.lead, 'string');
  });

  it('render all elements', async function() {
    const elements = get_all_elements();

    for (const x of elements) {
      assert.ok('id' in x);
      get_element_label(x);
      render_sheet(x);
    }
  });

  it('chord notation', async function() {
    const foo = notate_chord('a  x   x');
    const bar = notate_chord('x   b  l');

    assert.equal(foo.notes[0], 0);
    assert.equal(foo.notes[1], 0);
    assert.equal(foo.notes[2], 0);
    assert.equal(foo.notes[3], 3);
    assert.equal(foo.notes[4], 7);

    assert.equal(bar.notes[0], 4);
    assert.equal(bar.notes[1], 7);
    assert.equal(bar.notes[2], 0);
    assert.equal(bar.notes[3], 4);
    assert.equal(bar.notes[4], 7);
  });

  it('rhythm notation', async function() {
    const foo = notate_rhythm('x - - - x - - - ');
    const bar = notate_rhythm('x - - x - - x - ');

    assert.equal(foo.notes[0], 2);
    assert.equal(foo.notes[1], 14);
    assert.equal(foo.notes[2], 2);
    assert.equal(foo.notes[3], 14);

    assert.equal(bar.notes[0], 2);
    assert.equal(bar.notes[1], 10);
    assert.equal(bar.notes[2], 2);
    assert.equal(bar.notes[3], 10);
    assert.equal(bar.notes[4], 2);
    assert.equal(bar.notes[5], 6);
  });

  it('get song label', async function () {
    const song = { name_index: 0, label: 'foo bar' };

    assert.equal(await get_song_label(song), 'foo bar');
  });

  it('get song parents', async function () {
    const song1 = { parents: [] };
    const song2 = { parents: [ 'foo', 'bar' ] };

    assert.equal((await get_song_parents(song1)).length, 0);
    assert.equal((await get_song_parents(song2)).length, 2);
    assert.equal((await get_song_parents(song2))[0], 'foo');
    assert.equal((await get_song_parents(song2))[1], 'bar');
  });

  it('get song bpm', async function () {
    const song = { bpm: 123 };

    assert.equal(await get_song_bpm(song), 123);
  });

  it('get song meter', async function () {
    const song = { bar_size: 12, beat_size: 4 };

    assert.equal((await get_song_meter(song))[0], 3);
    assert.equal((await get_song_meter(song))[1], 4);
  });

  it('get song tonality', async function () {
    const song = { tonality: { key: 42 } };

    assert.equal(await get_song_tonality(song), 'Gb');
  });

  it('get song colors', async function () {
    const song = {
      chords: [
        { notes: [ 0, 0, 0, 3, 7 ] },
        { notes: [ 0, 0, 0, 4, 7 ] },
        { notes: [ 0, 0, 0, 2, 6 ] },
        { notes: [ 2, 2, 2, 5, 9 ] },
        { notes: [ 0, 0, 0, 2, 7 ] }
      ]
    };

    const v = await get_song_colors(song);

    assert.equal(v.length, 5);
    assert.equal(v[0], colors.minor);
    assert.equal(v[1], colors.major);
    assert.equal(v[2], colors.weird);
    assert.equal(v[3], colors.minor);
    assert.equal(v[4], colors.neutral);
  });

  it('get song chords', async function () {
    const song = {
      tonality: { key: 10 },
      chords: [
        { notes: [ 0, 0, 0, 3, 7 ] },
        { notes: [ 0, 0, 0, 4, 7 ] },
        { notes: [ 0, 0, 0, 3, 6 ] },
        { notes: [ 2, 2, 2, 5, 9 ] }
      ]
    };

    const chords = await get_song_chords(song);

    assert.equal(chords.length, 4);
    assert.equal(chords[0].length, 3);
    assert.equal(chords[0][0], 10);
    assert.equal(chords[0][1], 13);
    assert.equal(chords[0][2], 17);
    assert.equal(chords[1].length, 3);
    assert.equal(chords[1][0], 10);
    assert.equal(chords[1][1], 14);
    assert.equal(chords[1][2], 17);
    assert.equal(chords[2].length, 3);
    assert.equal(chords[2][0], 10);
    assert.equal(chords[2][1], 13);
    assert.equal(chords[2][2], 16);
    assert.equal(chords[3].length, 3);
    assert.equal(chords[3][0], 12);
    assert.equal(chords[3][1], 15);
    assert.equal(chords[3][2], 19);
  });

  it('get song chord names', async function () {
    const song = {
      tonality: { key: 9 },
      chords: [
        { notes: [ 0, 0, 0, 3, 7 ] },
        { notes: [ 0, 0, 0, 4, 7 ] },
        { notes: [ 0, 0, 0, 3, 6 ] },
        { notes: [ 2, 2, 2, 5, 9 ] }
      ]
    };

    const names = await get_song_chord_names(song);

    assert.equal(names.length, 4);
    assert.equal(names[0], 'Am');
    assert.equal(names[1], 'Amaj');
    assert.equal(names[2], 'Adim');
    assert.equal(names[3], 'Hm');
  });

  it('get song generation', async function () {
    const song = {
      generation: 42,
    };

    assert.equal(await get_song_generation(song), 42);
  });

  it('get song id', async function () {
    const song = {
      id: 'foobar'
    };

    assert.equal(await get_song_id(song), 'foobar');
  });

  it('get song asset id', async function () {
    const song = {
      asset_id: 'foobar',
    };

    assert.equal(await get_song_asset_id(song), 'foobar');
  });

  it('get song asset url', async function () {
    const song = {
      asset_id: 'foobar',
    };

    assert.equal(await get_song_asset_url(song), 'https://wavesexplorer.com/assets/foobar');
  });

  it('can mint hybrid', async function() {
    /*  TODO
     *  Mint hybrid conditions.
     */
    const song = {};
    assert.ok(await can_mint_hybrid(song));
  });
});

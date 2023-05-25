/* eslint-disable */

const {
  diatonic_minor,
  pitch_to_midi
} = require('./music.js');

const { types } = require('./types.js');

function _triad(base) {
  const key = diatonic_minor(0);

  return [
    pitch_to_midi(key, base),     // bass
    pitch_to_midi(key, base),     // lead

    pitch_to_midi(key, base),
    pitch_to_midi(key, base + 2),
    pitch_to_midi(key, base + 4) ];
}

function _sept(base) {
  const key = diatonic_minor(0);

  return [
    pitch_to_midi(key, base),     // bass
    pitch_to_midi(key, base),     // lead

    pitch_to_midi(key, base),
    pitch_to_midi(key, base + 4),
    pitch_to_midi(key, base + 6) ];
}

function _sus9(base) {
  const key = diatonic_minor(0);

  return [
    pitch_to_midi(key, base),     // bass
    pitch_to_midi(key, base),     // lead

    pitch_to_midi(key, base),
    pitch_to_midi(key, base + 4),
    pitch_to_midi(key, base + 8) ];
}

function new_resources() {
  return [
    { quantity: 20, type: types.chord,  label: "/chord/ Am",    notes: _triad(0) },
    { quantity: 2,  type: types.chord,  label: "/chord/ Hdim",  notes: _triad(1) },
    { quantity: 24, type: types.chord,  label: "/chord/ Cmaj",  notes: _triad(2) },
    { quantity: 20, type: types.chord,  label: "/chord/ Dm",    notes: _triad(3) },
    { quantity: 20, type: types.chord,  label: "/chord/ Em",    notes: _triad(4) },
    { quantity: 24, type: types.chord,  label: "/chord/ Fmaj",  notes: _triad(5) },
    { quantity: 24, type: types.chord,  label: "/chord/ Gmaj",  notes: _triad(-1) },

    { quantity: 8,  type: types.chord,  label: "/chord/ Am7",   notes: _sept(0) },
    { quantity: 2,  type: types.chord,  label: "/chord/ H7",    notes: _sept(1) },
    { quantity: 2,  type: types.chord,  label: "/chord/ Cmaj7", notes: _sept(2) },
    { quantity: 8,  type: types.chord,  label: "/chord/ Dm7",   notes: _sept(3) },
    { quantity: 2,  type: types.chord,  label: "/chord/ Em7",   notes: _sept(4) },
    { quantity: 2,  type: types.chord,  label: "/chord/ Fmaj7", notes: _sept(5) },
    { quantity: 2,  type: types.chord,  label: "/chord/ Gmaj7", notes: _sept(-1) },

    { quantity: 6,  type: types.chord,  label: "/chord/ Asus9", notes: _sus9(0) },
    { quantity: 2,  type: types.chord,  label: "/chord/ Hsus9", notes: _sus9(1) },
    { quantity: 10, type: types.chord,  label: "/chord/ Csus9", notes: _sus9(2) },
    { quantity: 6,  type: types.chord,  label: "/chord/ Dsus9", notes: _sus9(3) },
    { quantity: 6,  type: types.chord,  label: "/chord/ Esus9", notes: _sus9(4) },
    { quantity: 10, type: types.chord,  label: "/chord/ Fsus9", notes: _sus9(5) },
    { quantity: 10, type: types.chord,  label: "/chord/ Gsus9", notes: _sus9(-1) },

    { quantity: 8, type: types.rhythm, label: '/rhythm/ flat',  notes: [ 30, 2 ] },
    { quantity: 8, type: types.rhythm, label: '/rhythm/ -4',    notes: [ 22, 2, 6, 2 ] },
    { quantity: 8, type: types.rhythm, label: '/rhythm/ 3-3-2', notes: [ 5, 1, 5, 1, 3, 1 ] },
    { quantity: 8, type: types.rhythm, label: '/rhythm/ 16s',   notes: [ 1.5, 0.5 ] },
    { quantity: 8, type: types.rhythm, label: '/rhythm/ 8s',    notes: [ 3, 1 ] },
    { quantity: 8, type: types.rhythm, label: '/rhythm/ 4s',    notes: [ 7, 1 ] },

    { quantity: 8, type: types.rhythm, label: '/rhythm/ duck',
      notes: [ 15, 17 ] },

    { quantity: 8, type: types.rhythm, label: '/rhythm/ duck 4s',
      notes: [ 7, 1, 7, 1, 7, 1, 7, 17 ] },

    { quantity: 8, type: types.rhythm, label: '/rhythm/ double duck',
      notes: [ 31, 33 ] },

    { quantity: 8, type: types.rhythm, label: '/rhythm/ double duck 4s',
      notes: [ 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 33 ] },

    { quantity: 8, type: types.rhythm, label: '/rhythm/ 3-3-2 duck',
      notes: [ 5, 1, 5, 1, 3, 7, 5, 1, 3, 1 ] },

    { quantity: 8, type: types.rhythm, label: '/rhythm/ 3-3-3-3-2-2',
      notes: [ 5, 1, 5, 1, 5, 1, 5, 1, 3, 1, 3, 1 ] },

    { quantity: 8, type: types.rhythm, label: '/rhythm/ upbeat',
      notes: [ 0, 4, 3, 1 ] },

    { quantity: 8, type: types.rhythm, label: '/rhythm/ upbeat 16s',
      notes: [ 0, 4, 1.5, 0.5, 1.5, 0.5 ] },

    { quantity: 8, type: types.rhythm, label: '/rhythm/ upbeat triple 16s',
      notes: [ 0, 2, 1.5, 0.5, 1.5, 0.5, 1.5, 0.5 ] },

    {
      quantity: 8,
      type: types.beat,
      label: '/beat/ 1',
      //    x - - - x - - - 
      //    - - - - x - - - 
      //    - - x - - - x - 
      kick: [ 1, 7 ],
      snare: [ 0, 8, 1, 7 ],
      hihat: [ 0, 4, 1, 3 ]
    },

    {
      quantity: 8,
      type: types.beat,
      label: '/beat/ 2',
      //    x - - x - - x - 
      //    - - - - x - - - 
      //    - - x - - - x - 
      kick: [ 1, 5, 1, 5, 1, 3 ],
      snare: [ 0, 8, 1, 7 ],
      hihat: [ 0, 4, 1, 3 ]
    },

    {
      quantity: 8,
      type: types.beat,
      label: '/beat/ 3',
      //    x - - - - - - - x - - - - - - - 
      //    - - - - - - - - x - - - - - - - 
      //    x - x - x - x - x - x - x - x - 
      kick: [ 1, 15 ],
      snare: [ 0, 16, 1, 15 ],
      hihat: [ 1, 3, 1, 3 ]
    },

    {
      quantity: 8,
      type: types.beat,
      label: '/beat/ 4',
      //    x - - x - - x - - x - - x - x - 
      //    - - - - x - - - - - - - x - - - 
      //    - - x - - - x - - - x - - - x - 
      kick: [ 1, 5, 1, 5, 1, 5, 1, 5, 1, 3, 1, 3 ],
      snare: [ 0, 8, 1, 7 ],
      hihat: [ 0, 4, 1, 3 ]
    },

    {
      quantity: 8,
      type: types.beat,
      label: '/beat/ 5',
      //    x - - - - x - - x - - - - x - - 
      //    - - - - x - - - - - - - x - - - 
      //    x - x - x - x - x - x - x - x - 
      kick: [ 1, 9, 1, 5 ],
      snare: [ 0, 8, 1, 7 ],
      hihat: [ 1, 3, 1, 3 ]
    },

    {
      quantity: 8,
      type: types.beat,
      label: '/beat/ 6',
      //    x - - - x - - - 
      //    - - - - x - - - 
      //    - - x x - - x x 
      kick: [ 1, 7 ],
      snare: [ 0, 8, 1, 7 ],
      hihat: [ 0, 4, 1, 1, 1, 1 ]
    },

    {
      quantity: 8,
      type: types.beat,
      label: '/beat/ 7',
      //    x - - - - x - - x - - - - x - - 
      //    - - - - x - - - - - - x - - - - 
      //    x - x - x - x - x - x - x - x - 
      kick: [ 1, 9, 1, 5 ],
      snare: [ 0, 8, 1, 13, 1, 9 ],
      hihat: [ 1, 3, 1, 3 ]
    },

    {
      quantity: 8,
      type: types.beat,
      label: '/beat/ 8',
      //    x - - - - - - - - - x - - - - - 
      //    - - - - x - - - - - - - x - - - 
      //    x - x - x - x - x - x - x - x - 
      kick: [ 1, 19, 1, 11 ],
      snare: [ 0, 8, 1, 7 ],
      hihat: [ 1, 3, 1, 3 ]
    }
  ];
}

function get_all_elements() {
  return [
    { id: 'CHORD_00',  type: types.chord,  notes: [  0, 12,  0,  4,  7 ] },
    { id: 'CHORD_01',  type: types.chord,  notes: [  2, 14,  2,  5,  9 ] },
    { id: 'CHORD_02',  type: types.chord,  notes: [  4, 16,  4,  7, 11 ] },
    { id: 'CHORD_03',  type: types.chord,  notes: [  4, 16,  4,  8, 11 ] },
    { id: 'CHORD_04',  type: types.chord,  notes: [  5, 17,  5,  9, 12 ] },
    { id: 'CHORD_05',  type: types.chord,  notes: [ -5,  7, -5, -1,  2 ] },
    { id: 'CHORD_06',  type: types.chord,  notes: [ -3,  9, -3,  0,  4 ] },
    { id: 'CHORD_07',  type: types.chord,  notes: [  0, 12,  0,  7, 14 ] },
    { id: 'CHORD_08',  type: types.chord,  notes: [  2, 14,  2,  9, 16 ] },
    { id: 'CHORD_09',  type: types.chord,  notes: [  5, 17,  5, 12, 19 ] },
    { id: 'CHORD_10',  type: types.chord,  notes: [ -5,  7, -5,  2,  9 ] },
    { id: 'CHORD_11',  type: types.chord,  notes: [ -3,  9, -3,  4, 11 ] },
    { id: 'CHORD_12',  type: types.chord,  notes: [  0, 12,  0,  7, 17 ] },
    { id: 'CHORD_13',  type: types.chord,  notes: [  2, 14,  2,  9, 19 ] },
    { id: 'CHORD_14',  type: types.chord,  notes: [  4, 16,  4, 11, 21 ] },
    { id: 'CHORD_15',  type: types.chord,  notes: [ -5,  7, -5,  2, 12 ] },
    { id: 'CHORD_16',  type: types.chord,  notes: [ -3,  9, -3,  4, 14 ] },
    { id: 'CHORD_17',  type: types.chord,  notes: [  0, 11,  4,  7, 11 ] },
    { id: 'CHORD_18',  type: types.chord,  notes: [  2, 12,  5,  8, 12 ] },

    { id:     'BEAT_1',
      type:   types.beat,
      label:  'Beat 1',
      bpm:        120,
      bar_size:   16,
      beat_size:  4,
      instruments: {
        kick:   'kick-alpha',
        snare:  'snare-alpha',
        hihat:  'hihat-alpha'
      },
      rhythm: {
        kick:   { notes: [ 4, 0 ] },
        snare:  { notes: [ 0, 4, 4, 0 ] },
        hihat:  { notes: [ 0, 2, 2, 0 ] },
      }
    },

    { id:     'BEAT_2',
      type:   types.beat,
      label:  'Beat 2',
      bpm:        140,
      bar_size:   16,
      beat_size:  4,
      instruments: {
        kick:   'kick-alpha',
        snare:  'snare-alpha',
        hihat:  'hihat-alpha'
      },
      rhythm: {
        kick:   { notes: [ 4, 0 ] },
        snare:  { notes: [ 0, 4, 4, 0 ] },
        hihat:  { notes: [ 0, 2, 2, 0 ] },
      }
    },

    { id:     'BEAT_3',
      type:   types.beat,
      label:  'Beat 3',
      bpm:        180,
      bar_size:   16,
      beat_size:  4,
      instruments: {
        kick:   'kick-alpha',
        snare:  'snare-alpha',
        hihat:  'hihat-alpha'
      },
      rhythm: {
        kick:   { notes: [ 8, 2, 6, 0 ] },
        snare:  { notes: [ 0, 4, 4, 0 ] },
        hihat:  { notes: [ 2, 0, 2, 0 ] },
      }
    },

    { id:     'BEAT_4',
      type:   types.beat,
      label:  'Beat 4',
      bpm:        160,
      bar_size:   16,
      beat_size:  4,
      instruments: {
        kick:   'kick-alpha',
        snare:  'snare-alpha',
        hihat:  'hihat-alpha'
      },
      rhythm: {
        kick:   { notes: [ 8, 0 ] },
        snare:  { notes: [ 0, 4, 4, 2, 6, 4, 4, 2, 3, 1, 2, 0 ] },
        hihat:  { notes: [ 2, 0, 2, 0 ] },
      }
    },

    { id:     'BEAT_5',
      type:   types.beat,
      label:  'Beat 5',
      bpm:        115,
      bar_size:   16,
      beat_size:  4,
      instruments: {
        kick:   'kick-alpha',
        snare:  'snare-alpha',
        hihat:  'hihat-alpha'
      },
      rhythm: {
        kick:   { notes: [ 2, 0 ] },
        snare:  { notes: [ 0, 4, 4, 0 ] },
        hihat:  { notes: [ 4, 0 ] },
      }
    },

    { id:     'BEAT_6',
      type:   types.beat,
      label:  'Beat 6',
      bpm:        135,
      bar_size:   16,
      beat_size:  4,
      instruments: {
        kick:   'kick-alpha',
        snare:  'snare-alpha',
        hihat:  'hihat-alpha'
      },
      rhythm: {
        kick:   { notes: [ 2, 1, 2, 1, 2, 0 ] },
        snare:  { notes: [ 0, 4, 4, 0 ] },
        hihat:  { notes: [ 4, 0 ] },
      }
    },

    { id:     'BEAT_7',
      type:   types.beat,
      label:  'Beat 7',
      bpm:        115,
      bar_size:   16,
      beat_size:  4,
      instruments: {
        kick:   'kick-alpha',
        snare:  'snare-alpha',
        hihat:  'hihat-alpha'
      },
      rhythm: {
        kick:   { notes: [ 8, 8 ] },
        snare:  { notes: [ 0, 4, 4, 0 ] },
        hihat:  { notes: [ 2, 0 ] },
      }
    },

    {
      id:       'VIBE_1',
      type:     types.vibe,
      label:    'Vibe 1',
      instruments: {
        bass:   'bass-alpha',
        back:   'back-alpha',
        lead:   'lead-alpha'
      },
      arpeggio: [ 0, 1, 2 ],
      rhythm: {
        bass:   { notes: [ 7, 1 ] },
        back:   { notes: [ 7, 1 ] },
        lead:   { notes: [ 3, 1 ] }
      }
    },

    {
      id:       'VIBE_2',
      type:     types.vibe,
      label:    'Vibe 2',
      instruments: {
        bass:   'bass-alpha',
        back:   'back-alpha',
        lead:   'lead-alpha'
      },
      arpeggio: [ 2, 1, 0 ],
      rhythm: {
        bass:   { notes: [ 4, 4 ] },
        back:   { notes: [ 4, 4 ] },
        lead:   { notes: [ 3, 1 ] }
      }
    },

    {
      id:       'VIBE_3',
      type:     types.vibe,
      label:    'Vibe 3',
      instruments: {
        bass:   'bass-alpha',
        back:   'back-alpha',
        lead:   'lead-alpha'
      },
      arpeggio: [ 0, 1, 2 ],
      rhythm: {
        bass:   { notes: [ 2.5, 0.5, 2.5, 0.5, 1.5, 0.5 ] },
        back:   { notes: [ 2.5, 0.5, 2.5, 0.5, 1.5, 0.5 ] },
        lead:   { notes: [ 3, 1 ] }
      }
    },

    {
      id:       'VIBE_4',
      type:     types.vibe,
      label:    'Vibe 4',
      instruments: {
        bass:   'bass-alpha',
        back:   'back-alpha',
        lead:   'lead-alpha'
      },
      arpeggio: [ -3, -2, -1 ],
      rhythm: {
        bass:   { notes: [ 5, 1, 5, 1, 3, 1 ] },
        back:   { notes: [ 5, 1, 5, 1, 3, 1 ] },
        lead:   { notes: [ 3, 1 ] }
      }
    },

    {
      id:       'VIBE_5',
      type:     types.vibe,
      label:    'Vibe 5',
      instruments: {
        bass:   'bass-alpha',
        back:   'back-alpha',
        lead:   'lead-alpha'
      },
      arpeggio: [ -1, -2, -3 ],
      rhythm: {
        bass:   { notes: [ 8, 8 ] },
        back:   { notes: [ 8, 8 ] },
        lead:   { notes: [ 8, 8 ] }
      }
    },

    {
      id:       'VIBE_6',
      type:     types.vibe,
      label:    'Vibe 6',
      instruments: {
        bass:   'bass-alpha',
        back:   'back-alpha',
        lead:   'lead-alpha'
      },
      arpeggio: [ -3, -2, -1 ],
      rhythm: {
        bass:   { notes: [ 7, 1 ] },
        back:   { notes: [ 7, 1 ] },
        lead:   { notes: [ 2.5, 0.5, 2.5, 0.5, 1.5, 0.5 ] }
      }
    },

    {
      id:       'VIBE_7',
      type:     types.vibe,
      label:    'Vibe 7',
      instruments: {
        bass:   'bass-alpha',
        back:   'back-alpha',
        lead:   'lead-alpha'
      },
      arpeggio: [ -1, -2, -3 ],
      rhythm: {
        bass:   { notes: [ 7, 1 ] },
        back:   { notes: [ 7, 1 ] },
        lead:   { notes: [ 5, 1, 5, 1, 3, 1 ] }
      }
    },

    {
      id:       'VIBE_8',
      type:     types.vibe,
      label:    'Vibe 8',
      instruments: {
        bass:   'bass-alpha',
        back:   'back-alpha',
        lead:   'lead-alpha'
      },
      arpeggio: [ 0, 1, 2 ],
      rhythm: {
        bass:   { notes: [ 0, 2, 2, 0 ] },
        back:   { notes: [ 7, 1 ] },
        lead:   { notes: [ 7, 1 ] }
      }
    },

    {
      id:       'VIBE_9',
      type:     types.vibe,
      label:    'Vibe 9',
      instruments: {
        bass:   'bass-xmas',
        back:   'back-xmas',
        lead:   'lead-xmas'
      },
      arpeggio: [ 0, 1, 2 ],
      rhythm: {
        bass:   { notes: [ 15, 1 ] },
        back:   { notes: [ 15, 1 ] },
        lead:   { notes: [ 3, 1 ] }
      }
    }
  ];
}

module.exports = {
  new_resources:    new_resources,
  get_all_elements: get_all_elements
}; 

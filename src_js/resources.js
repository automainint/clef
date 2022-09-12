/* eslint-disable */

const {
  diatonic_minor,
  pitch_to_midi
} = require('./music.js');

const { types } = require('./back_fake.js');

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

module.exports = {
  new_resources: new_resources
}; 

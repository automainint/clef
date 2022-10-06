const DAPP          = address(env.SEED);
const USDN_QUANTITY = 100000000000;
const HYBRID_PRICE  = 1000;

const wvs = 10 ** 8;

(async () => {
  try {
    const expand_ = (notes) => {
      const n = notes.length;

      for (let i = notes.length; i < 16; i++)
        notes.push(65535);
    };

    const mint_chord = async (index, label, notes) => {
      const tx = invokeScript(
        { dApp: DAPP,
          call: {
            function: 'mint_chord',
            args:     [
              { type: 'integer', value: index },
              { type: 'string', value: label },
              { type: 'list', value: [
                { type: 'integer', value: notes[0] },
                { type: 'integer', value: notes[1] },
                { type: 'integer', value: notes[2] },
                { type: 'integer', value: notes[3] },
                { type: 'integer', value: notes[4] }
              ] }
            ]
          } },
        env.SEED);

      await broadcast(tx);
      await waitForTx(tx.id);

      const changes = await stateChanges(tx.id);

      return changes.data[1].key.split('_')[0];
    };

    const mint_melody = async (index, label, notes) => {
      expand_(notes);

      const tx = invokeScript(
        { dApp: DAPP,
          call: {
            function: 'mint_melody',
            args:     [
              { type: 'integer', value: index },
              { type: 'string', value: label },
              { type: 'list', value: [
                { type: 'integer', value: notes[0] },
                { type: 'integer', value: notes[1] },
                { type: 'integer', value: notes[2] },
                { type: 'integer', value: notes[3] },
                { type: 'integer', value: notes[4] },
                { type: 'integer', value: notes[5] },
                { type: 'integer', value: notes[6] },
                { type: 'integer', value: notes[7] },
                { type: 'integer', value: notes[8] },
                { type: 'integer', value: notes[9] },
                { type: 'integer', value: notes[10] },
                { type: 'integer', value: notes[11] },
                { type: 'integer', value: notes[12] },
                { type: 'integer', value: notes[13] },
                { type: 'integer', value: notes[14] },
                { type: 'integer', value: notes[15] }
              ] }
            ]
          } },
        env.SEED);

      await broadcast(tx);
      await waitForTx(tx.id);

      const changes = await stateChanges(tx.id);

      return changes.data[1].key.split('_')[0];
    };

    const mint_rhythm = async (index, label, scale, notes) => {
      expand_(notes);

      const tx = invokeScript(
        { dApp: DAPP,
          call: {
            function: 'mint_rhythm',
            args:     [
              { type: 'integer', value: index },
              { type: 'string', value: label },
              { type: 'integer', value: scale },
              { type: 'list', value: [
                { type: 'integer', value: notes[0] },
                { type: 'integer', value: notes[1] },
                { type: 'integer', value: notes[2] },
                { type: 'integer', value: notes[3] },
                { type: 'integer', value: notes[4] },
                { type: 'integer', value: notes[5] },
                { type: 'integer', value: notes[6] },
                { type: 'integer', value: notes[7] },
                { type: 'integer', value: notes[8] },
                { type: 'integer', value: notes[9] },
                { type: 'integer', value: notes[10] },
                { type: 'integer', value: notes[11] },
                { type: 'integer', value: notes[12] },
                { type: 'integer', value: notes[13] },
                { type: 'integer', value: notes[14] },
                { type: 'integer', value: notes[15] }
              ] }
            ]
          } },
        env.SEED);

      await broadcast(tx);
      await waitForTx(tx.id);

      const changes = await stateChanges(tx.id);

      return changes.data[1].key.split('_')[0];
    };

    console.log('    ` Mint chords');

    const [ chord_C,
            chord_Dm,
            chord_Em,
            chord_E,
            chord_F,
            chord_G,
            chord_Am,
            chord_Csus2,
            chord_Dsus2,
            chord_Fsus2,
            chord_Gsus2,
            chord_Asus2,
            chord_Csus4,
            chord_Dsus4,
            chord_Esus4,
            chord_Gsus4,
            chord_Asus4,
            chord_C7,
            chord_Dm7,
            chord_Em7,
            chord_E7,
            chord_F7,
            chord_G7,
            chord_Am7 ] = await Promise.all(
      /*
       *     G   A   H   C   D   E   F   G   A   H   C   D   E   F   G   A   H   C
       *    -5  -3  -1   0   2   4   5   7   9   11  12  14  16  17  19  21  23  24
       */
      [ mint_chord( 0, 'C',     [  0, 12,  0,  4,  7 ]),
        mint_chord( 1, 'Dm',    [  2, 14,  2,  5,  9 ]),
        mint_chord( 2, 'Em',    [  4, 16,  4,  7, 11 ]),
        mint_chord( 3, 'E',     [  4, 16,  4,  8, 11 ]),
        mint_chord( 4, 'F',     [  5, 17,  5,  9, 12 ]),
        mint_chord( 5, 'G',     [ -5,  7, -5, -1,  2 ]),
        mint_chord( 6, 'Am',    [ -3,  9, -3,  0,  4 ]),
        mint_chord( 7, 'Csus2', [  0, 12,  0,  7, 14 ]),
        mint_chord( 8, 'Dsus2', [  2, 14,  2,  9, 16 ]),
        mint_chord( 9, 'Fsus2', [  5, 17,  5, 12, 19 ]),
        mint_chord(10, 'Gsus2', [ -5,  7, -5,  2,  9 ]),
        mint_chord(11, 'Asus2', [ -3,  9, -3,  4, 11 ]),
        mint_chord(12, 'Csus4', [  0, 12,  0,  7, 17 ]),
        mint_chord(13, 'Dsus4', [  2, 14,  2,  9, 19 ]),
        mint_chord(14, 'Esus4', [  4, 16,  4, 11, 21 ]),
        mint_chord(15, 'Gsus4', [ -5,  7, -5,  2, 12 ]),
        mint_chord(16, 'Asus4', [ -3,  9, -3,  4, 14 ]),
        mint_chord(17, 'C7',    [  0, 12,  0,  4, 11 ]),
        mint_chord(18, 'Dm7',   [  2, 14,  2,  5, 12 ]),
        mint_chord(19, 'Em7',   [  4, 16,  4,  7, 14 ]),
        mint_chord(20, 'E7',    [  4, 16,  4,  8, 14 ]),
        mint_chord(21, 'F7',    [  5, 17,  5,  9, 16 ]),
        mint_chord(22, 'G7',    [ -5,  7, -5, -1,  5 ]),
        mint_chord(23, 'Am7',   [ -3,  9, -3,  0,  7 ])
      ]);

    console.log(`    const chord_C      = '${chord_C}';`);
    console.log(`    const chord_Dm     = '${chord_Dm}';`);
    console.log(`    const chord_Em     = '${chord_Em}';`);
    console.log(`    const chord_E      = '${chord_E}';`);
    console.log(`    const chord_F      = '${chord_F}';`);
    console.log(`    const chord_G      = '${chord_G}';`);
    console.log(`    const chord_Am     = '${chord_Am}';`);
    console.log(`    const chord_Csus2  = '${chord_Csus2}';`);
    console.log(`    const chord_Dsus2  = '${chord_Dsus2}';`);
    console.log(`    const chord_Fsus2  = '${chord_Fsus2}';`);
    console.log(`    const chord_Gsus2  = '${chord_Gsus2}';`);
    console.log(`    const chord_Asus2  = '${chord_Asus2}';`);
    console.log(`    const chord_Csus4  = '${chord_Csus4}';`);
    console.log(`    const chord_Dsus4  = '${chord_Dsus4}';`);
    console.log(`    const chord_Esus4  = '${chord_Esus4}';`);
    console.log(`    const chord_Gsus4  = '${chord_Gsus4}';`);
    console.log(`    const chord_Asus4  = '${chord_Asus4}';`);
    console.log(`    const chord_C7     = '${chord_C7}';`);
    console.log(`    const chord_Dm7    = '${chord_Dm7}';`);
    console.log(`    const chord_Em7    = '${chord_Em7}';`);
    console.log(`    const chord_E7     = '${chord_E7}';`);
    console.log(`    const chord_F7     = '${chord_F7}';`);
    console.log(`    const chord_G7     = '${chord_G7}';`);
    console.log(`    const chord_Am7    = '${chord_Am7}';`);

    console.log('');
    console.log('    ` Mint melodies');

    const [ melody_triple_repeats,
            melody_go_up,
            melody_go_down,
            melody_alterations ] = await Promise.all(
      [ mint_melody(24, 'Triple Repeats', [ 0, 0, 2, 2, 2, 3, 3, 3, 0 ]),
        mint_melody(25, 'Go Up',          [ 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3 ]),
        mint_melody(26, 'Go Down',        [ -2, -1, -3, -2, -1, -3, -2, -1, -3, -2, -1, -3, -2, -1 ]),
        mint_melody(27, 'Alterations',    [ -2, 3, -1, 2, -3, 1, -2, 3, -1, 2, -3 ]) ]);

    console.log(`    const melody_triple_repeats  = '${melody_triple_repeats}';`);
    console.log(`    const melody_go_up           = '${melody_go_up}';`);
    console.log(`    const melody_go_down         = '${melody_go_down}';`);
    console.log(`    const melody_alterations     = '${melody_alterations}';`);

    console.log('');
    console.log('    ` Mint rhythms');

    const [ rhythm_silent,
            rhythm_fast,
            rhythm_steady,
            rhythm_slow,
            rhythm_slower,
            rhythm_slowest,
            rhythm_middle,
            rhythm_off_beat,
            rhythm_sync_lead,
            rhythm_sync_middle,
            rhythm_sync_two,
            rhythm_long_middle,
            rhythm_long_off_beat,
            rhythm_long_sync_lead,
            rhythm_long_sync_middle,
            rhythm_long_sync_two,
            rhythm_1st_half,
            rhythm_1st_half_fast,
            rhythm_1st_half_steady,
            rhythm_1st_half_slow,
            rhythm_2nd_half,
            rhythm_2nd_half_fast,
            rhythm_2nd_half_steady,
            rhythm_2nd_half_slow,
            rhythm_long_1st_half,
            rhythm_long_1st_half_fast,
            rhythm_long_1st_half_steady,
            rhythm_long_1st_half_slow,
            rhythm_long_2nd_half,
            rhythm_long_2nd_half_fast,
            rhythm_long_2nd_half_steady,
            rhythm_long_2nd_half_slow ] = await Promise.all(
      [ mint_rhythm(511,  'Silent',             2, [ 0, 16 ]),
        mint_rhythm(28, 'Fast',                 4, [ 3, 1 ]),
        mint_rhythm(29, 'Steady',               2, [ 3, 1 ]),
        mint_rhythm(30, 'Slow',                 2, [ 7, 1 ]),
        mint_rhythm(31, 'Slower',               2, [ 14, 2 ]),
        mint_rhythm(32, 'Slowest',              2, [ 30, 2 ]),
        mint_rhythm(33, 'Middle',               2, [ 0, 8, 5, 1 ]),
        mint_rhythm(34, 'Off-beat',             2, [ 0, 4, 3, 1 ]),
        mint_rhythm(35, 'Sync Lead',            2, [ 11, 1, 11, 1, 7, 1 ]),
        mint_rhythm(36, 'Sync Middle',          2, [ 0, 8, 11, 1, 11, 1 ]),
        mint_rhythm(37, 'Sync Two',             2, [ 19, 1, 11, 1 ]),
        mint_rhythm(38, 'Long Middle',          1, [ 0, 8, 5, 1 ]),
        mint_rhythm(39, 'Long Off-beat',        1, [ 0, 4, 3, 1 ]),
        mint_rhythm(40, 'Long Sync Lead',       1, [ 11, 1, 11, 1, 7, 1 ]),
        mint_rhythm(41, 'Long Sync Middle',     1, [ 0, 8, 11, 1, 11, 1 ]),
        mint_rhythm(42, 'Long Sync Two',        1, [ 19, 1, 11, 1 ]),
        mint_rhythm(43, '1st Half',             2, [ 15, 17 ]),
        mint_rhythm(44, '1st Half Fast',        4, [ 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 33 ]),
        mint_rhythm(45, '1st Half Steady',      2, [ 3, 1, 3, 1, 3, 1, 3, 17 ]),
        mint_rhythm(46, '1st Half Slow',        2, [ 7, 1, 7, 17 ]),
        mint_rhythm(47, '2nd Half',             2, [ 0, 16, 15, 1 ]),
        mint_rhythm(48, '2nd Half Fast',        4, [ 0, 36, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1 ]),
        mint_rhythm(49, '2nd Half Steady',      2, [ 0, 16, 3, 1, 3, 1, 3, 1, 3, 1 ]),
        mint_rhythm(50, '2nd Half Slow',        2, [ 16, 7, 1, 7, 1 ]),
        mint_rhythm(51, 'Long 1st Half',        1, [ 15, 17 ]),
        mint_rhythm(52, 'Long 1st Half Fast',   2, [ 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 33 ]),
        mint_rhythm(53, 'Long 1st Half Steady', 1, [ 3, 1, 3, 1, 3, 1, 3, 17 ]),
        mint_rhythm(54, 'Long 1st Half Slow',   1, [ 7, 1, 7, 17 ]),
        mint_rhythm(55, 'Long 2nd Half',        1, [ 0, 16, 15, 1 ]),
        mint_rhythm(56, 'Long 2nd Half Fast',   2, [ 0, 36, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1 ]),
        mint_rhythm(57, 'Long 2nd Half Steady', 1, [ 0, 16, 3, 1, 3, 1, 3, 1, 3, 1 ]),
        mint_rhythm(58, 'Long 2nd Half Slow',   1, [ 16, 7, 1, 7, 1 ])
      ]);

    console.log(`    const rhythm_silent                = '${rhythm_silent}';`);
    console.log(`    const rhythm_fast                  = '${rhythm_fast}';`);
    console.log(`    const rhythm_steady                = '${rhythm_steady}';`);
    console.log(`    const rhythm_slow                  = '${rhythm_slow}';`);
    console.log(`    const rhythm_slower                = '${rhythm_slower}';`);
    console.log(`    const rhythm_slowest               = '${rhythm_slowest}';`);
    console.log(`    const rhythm_middle                = '${rhythm_middle}';`);
    console.log(`    const rhythm_off_beat              = '${rhythm_off_beat}';`);
    console.log(`    const rhythm_sync_lead             = '${rhythm_sync_lead}';`);
    console.log(`    const rhythm_sync_middle           = '${rhythm_sync_middle}';`);
    console.log(`    const rhythm_sync_two              = '${rhythm_sync_two}';`);
    console.log(`    const rhythm_long_middle           = '${rhythm_middle}';`);
    console.log(`    const rhythm_long_off_beat         = '${rhythm_off_beat}';`);
    console.log(`    const rhythm_long_sync_lead        = '${rhythm_sync_lead}';`);
    console.log(`    const rhythm_long_sync_middle      = '${rhythm_sync_middle}';`);
    console.log(`    const rhythm_long_sync_two         = '${rhythm_sync_two}';`);
    console.log(`    const rhythm_1st_half              = '${rhythm_1st_half}';`);
    console.log(`    const rhythm_1st_half_fast         = '${rhythm_1st_half_fast}';`);
    console.log(`    const rhythm_1st_half_steady       = '${rhythm_1st_half_steady}';`);
    console.log(`    const rhythm_1st_half_slow         = '${rhythm_1st_half_slow}';`);
    console.log(`    const rhythm_2nd_half              = '${rhythm_2nd_half}';`);
    console.log(`    const rhythm_2nd_half_fast         = '${rhythm_2nd_half_fast}';`);
    console.log(`    const rhythm_2nd_half_steady       = '${rhythm_2nd_half_steady}';`);
    console.log(`    const rhythm_2nd_half_slow         = '${rhythm_2nd_half_slow}';`);
    console.log(`    const rhythm_long_1st_half         = '${rhythm_long_1st_half}';`);
    console.log(`    const rhythm_long_1st_half_fast    = '${rhythm_long_1st_half_fast}';`);
    console.log(`    const rhythm_long_1st_half_steady  = '${rhythm_long_1st_half_steady}';`);
    console.log(`    const rhythm_long_1st_half_slow    = '${rhythm_long_1st_half_slow}';`);
    console.log(`    const rhythm_long_2nd_half         = '${rhythm_long_2nd_half}';`);
    console.log(`    const rhythm_long_2nd_half_fast    = '${rhythm_long_2nd_half_fast}';`);
    console.log(`    const rhythm_long_2nd_half_steady  = '${rhythm_long_2nd_half_steady}';`);
    console.log(`    const rhythm_long_2nd_half_slow    = '${rhythm_long_2nd_half_slow}';`);

  } catch (error) {
    console.error(error);
  }
})();

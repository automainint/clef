const DAPP          = address(env.SEED);
const USDN_QUANTITY = 100000000000;
const HYBRID_PRICE  = 1000;

const wvs = 10 ** 8;

(async () => {
  try {
    const sleep_for = (time) => {
      return new Promise((resolve, reject) => {
        setTimeout(resolve, time);
      });
    };

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
      await sleep_for(1000);
      await waitForTx(tx.id);

      const changes = await stateChanges(tx.id);

      return changes.data[1].key.split('_')[0];
    };

    const mint_arpeggio = async (index, label, notes) => {
      expand_(notes);

      const tx = invokeScript(
        { dApp: DAPP,
          call: {
            function: 'mint_arpeggio',
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
      await sleep_for(1000);
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
      await sleep_for(1000);
      await waitForTx(tx.id);

      const changes = await stateChanges(tx.id);

      return changes.data[1].key.split('_')[0];
    };

    /*
     *     G   A   H   C   D   E   F   G   A   H   C   D   E   F   G   A   H   C
     *    -5  -3  -1   0   2   4   5   7   9   11  12  14  16  17  19  21  23  24
     */

    /*
    console.log('    ` Mint chords');

    const chord_C     = await mint_chord( 0, 'C',     [  0, 12,  0,  4,  7 ]);
    console.log(`    const chord_C     = '${chord_C}';`);

    const chord_Dm    = await mint_chord( 1, 'Dm',    [  2, 14,  2,  5,  9 ]);
    console.log(`    const chord_Dm    = '${chord_Dm}';`);

    const chord_Em    = await mint_chord( 2, 'Em',    [  4, 16,  4,  7, 11 ]);
    console.log(`    const chord_Em    = '${chord_Em}';`);

    const chord_E     = await mint_chord( 3, 'E',     [  4, 16,  4,  8, 11 ]);
    console.log(`    const chord_E     = '${chord_E}';`);

    const chord_F     = await mint_chord( 4, 'F',     [  5, 17,  5,  9, 12 ]);
    console.log(`    const chord_F     = '${chord_F}';`);

    const chord_G     = await mint_chord( 5, 'G',     [ -5,  7, -5, -1,  2 ]);
    console.log(`    const chord_G     = '${chord_G}';`);

    const chord_Am    = await mint_chord( 6, 'Am',    [ -3,  9, -3,  0,  4 ]);
    console.log(`    const chord_Am    = '${chord_Am}';`);

    const chord_Csus2 = await mint_chord( 7, 'Csus2', [  0, 12,  0,  7, 14 ]);
    console.log(`    const chord_Csus2 = '${chord_Csus2}';`);

    const chord_Dsus2 = await mint_chord( 8, 'Dsus2', [  2, 14,  2,  9, 16 ]);
    console.log(`    const chord_Dsus2 = '${chord_Dsus2}';`);

    const chord_Fsus2 = await mint_chord( 9, 'Fsus2', [  5, 17,  5, 12, 19 ]);
    console.log(`    const chord_Fsus2 = '${chord_Fsus2}';`);

    const chord_Gsus2 = await mint_chord(10, 'Gsus2', [ -5,  7, -5,  2,  9 ]);
    console.log(`    const chord_Gsus2 = '${chord_Gsus2}';`);

    const chord_Asus2 = await mint_chord(11, 'Asus2', [ -3,  9, -3,  4, 11 ]);
    console.log(`    const chord_Asus2 = '${chord_Asus2}';`);

    const chord_Csus4 = await mint_chord(12, 'Csus4', [  0, 12,  0,  7, 17 ]);
    console.log(`    const chord_Csus4 = '${chord_Csus4}';`);

    const chord_Dsus4 = await mint_chord(13, 'Dsus4', [  2, 14,  2,  9, 19 ]);
    console.log(`    const chord_Dsus4 = '${chord_Dsus4}';`);

    const chord_Esus4 = await mint_chord(14, 'Esus4', [  4, 16,  4, 11, 21 ]);
    console.log(`    const chord_Esus4 = '${chord_Esus4}';`);

    const chord_Gsus4 = await mint_chord(15, 'Gsus4', [ -5,  7, -5,  2, 12 ]);
    console.log(`    const chord_Gsus4 = '${chord_Gsus4}';`);

    const chord_Asus4 = await mint_chord(16, 'Asus4', [ -3,  9, -3,  4, 14 ]);
    console.log(`    const chord_Asus4 = '${chord_Asus4}';`);
    */

    const chord_Cmaj7p  = await mint_chord(17, 'Cmaj7p',  [  0, 11,  4,  7, 11 ]);
    console.log(`    const chord_Cmaj7p  = '${chord_Cmaj7p}';`);

    const chord_Ddim7   = await mint_chord(18, 'Ddim7',   [  2, 12,  5,  8, 12 ]);
    console.log(`    const chord_Ddim7   = '${chord_Ddim7}';`);

    /*
    console.log('');
    console.log('    ` Mint arpeggios');

    const arpeggio_0 = await mint_arpeggio(24, 'Arpeggio', [ 2, -10, -16, 20, -5, 7, 13, 14, -1, 14, 4, 19, 0, -6, -12, 0 ]);
    console.log(`    const arpeggio_0    = '${arpeggio_0}';`);

    const arpeggio_1 = await mint_arpeggio(25, 'Arpeggio', [ 13, 14, 20, -10, 7, 4, 16, 9, 10, -12, -7, -13, 12, 14, 4, 17 ]);
    console.log(`    const arpeggio_1    = '${arpeggio_1}';`);

    const arpeggio_2 = await mint_arpeggio(26, 'Arpeggio', [ 8, 4, 15, 8, 19, 16, 6, 5, 3, 4, 6, 8, 20, 9, 12, 20 ]);
    console.log(`    const arpeggio_2    = '${arpeggio_2}';`);

    const arpeggio_3 = await mint_arpeggio(27, 'Arpeggio', [ -6, -2, -1, -7, -20, -6, -12, -4, -9, -3, -20, -12, -17, -16, -20, -1 ]);
    console.log(`    const arpeggio_3    = '${arpeggio_3}';`);
    */

    const arpeggio_nil = await mint_arpeggio(510, 'Nil Arpeggio', [ ]);
    console.log(`    const arpeggio_nil  = '${arpeggio_nil}';`);

    /*
    console.log('');
    console.log('    ` Mint rhythms');

    const rhythm_silent = await mint_rhythm(
      511, 'Silent',
      2, [ 0, 16 ]);
    console.log(`    const rhythm_silent                = '${rhythm_silent}';`);

    const rhythm_fast = await mint_rhythm(
      28, 'Fast',
      4, [ 3, 1 ]);
    console.log(`    const rhythm_fast                  = '${rhythm_fast}';`);

    const rhythm_steady = await mint_rhythm(
      29, 'Steady',
      2, [ 3, 1 ]);
    console.log(`    const rhythm_steady                = '${rhythm_steady}';`);

    const rhythm_slow = await mint_rhythm(
      30, 'Slow',
      2, [ 7, 1 ]);
    console.log(`    const rhythm_slow                  = '${rhythm_slow}';`);

    const rhythm_slower = await mint_rhythm(
      31, 'Slower',
      2, [ 14, 2 ]);
    console.log(`    const rhythm_slower                = '${rhythm_slower}';`);

    const rhythm_slowest = await mint_rhythm(
      32, 'Slowest',
      2, [ 30, 2 ]);
    console.log(`    const rhythm_slowest               = '${rhythm_slowest}';`);

    const rhythm_middle = await mint_rhythm(
      33, 'Middle',
      2, [ 0, 8, 7, 1 ]);
    console.log(`    const rhythm_middle                = '${rhythm_middle}';`);

    const rhythm_off_beat = await mint_rhythm(
      34, 'Off-beat',
      2, [ 0, 4, 3, 1 ]);
    console.log(`    const rhythm_off_beat              = '${rhythm_off_beat}';`);

    const rhythm_sync_lead = await mint_rhythm(
      35, 'Sync Lead',
      2, [ 11, 1, 11, 1, 7, 1 ]);
    console.log(`    const rhythm_sync_lead             = '${rhythm_sync_lead}';`);

    const rhythm_sync_middle = await mint_rhythm(
      36, 'Sync Middle',
      2, [ 0, 8, 11, 1, 11, 1 ]);
    console.log(`    const rhythm_sync_middle           = '${rhythm_sync_middle}';`);

    const rhythm_sync_two = await mint_rhythm(
      37, 'Sync Two',
      2, [ 19, 1, 11, 1 ]);
    console.log(`    const rhythm_sync_two              = '${rhythm_sync_two}';`);

    const rhythm_long_middle = await mint_rhythm(
      38, 'Long Middle',
      1, [ 0, 8, 7, 1 ]);
    console.log(`    const rhythm_long_middle           = '${rhythm_middle}';`);

    const rhythm_long_off_beat = await mint_rhythm(
      39, 'Long Off-beat',
      1, [ 0, 4, 3, 1 ]);
    console.log(`    const rhythm_long_off_beat         = '${rhythm_off_beat}';`);

    const rhythm_long_sync_lead = await mint_rhythm(
      40, 'Long Sync Lead',
      1, [ 11, 1, 11, 1, 7, 1 ]);
    console.log(`    const rhythm_long_sync_lead        = '${rhythm_sync_lead}';`);

    const rhythm_long_sync_middle = await mint_rhythm(
      41, 'Long Sync Middle',
      1, [ 0, 8, 11, 1, 11, 1 ]);
    console.log(`    const rhythm_long_sync_middle      = '${rhythm_sync_middle}';`);

    const rhythm_long_sync_two = await mint_rhythm(
      42, 'Long Sync Two',
      1, [ 19, 1, 11, 1 ]);
    console.log(`    const rhythm_long_sync_two         = '${rhythm_sync_two}';`);

    const rhythm_1st_half = await mint_rhythm(
      43, '1st Half',
      2, [ 15, 17 ]);
    console.log(`    const rhythm_1st_half              = '${rhythm_1st_half}';`);

    const rhythm_1st_half_fast = await mint_rhythm(
      44, '1st Half Fast',
      4, [ 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 33 ]);
    console.log(`    const rhythm_1st_half_fast         = '${rhythm_1st_half_fast}';`);

    const rhythm_1st_half_steady = await mint_rhythm(
      45, '1st Half Steady',
      2, [ 3, 1, 3, 1, 3, 1, 3, 17 ]);
    console.log(`    const rhythm_1st_half_steady       = '${rhythm_1st_half_steady}';`);

    const rhythm_1st_half_slow = await mint_rhythm(
      46, '1st Half Slow',
      2, [ 7, 1, 7, 17 ]);
    console.log(`    const rhythm_1st_half_slow         = '${rhythm_1st_half_slow}';`);

    const rhythm_2nd_half = await mint_rhythm(
      47, '2nd Half',
      2, [ 0, 16, 15, 1 ]);
    console.log(`    const rhythm_2nd_half              = '${rhythm_2nd_half}';`);

    const rhythm_2nd_half_fast = await mint_rhythm(
      48, '2nd Half Fast',
      4, [ 0, 36, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1 ]);
    console.log(`    const rhythm_2nd_half_fast         = '${rhythm_2nd_half_fast}';`);

    const rhythm_2nd_half_steady = await mint_rhythm(
      49, '2nd Half Steady',
      2, [ 0, 16, 3, 1, 3, 1, 3, 1, 3, 1 ]);
    console.log(`    const rhythm_2nd_half_steady       = '${rhythm_2nd_half_steady}';`);

    const rhythm_2nd_half_slow = await mint_rhythm(
      50, '2nd Half Slow',
      2, [ 0, 16, 7, 1, 7, 1 ]);
    console.log(`    const rhythm_2nd_half_slow         = '${rhythm_2nd_half_slow}';`);

    const rhythm_long_1st_half = await mint_rhythm(
      51, 'Long 1st Half',
      1, [ 15, 17 ]);
    console.log(`    const rhythm_long_1st_half         = '${rhythm_long_1st_half}';`);

    const rhythm_long_1st_half_fast = await mint_rhythm(
      52, 'Long 1st Half Fast',
      2, [ 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 33 ]);
    console.log(`    const rhythm_long_1st_half_fast    = '${rhythm_long_1st_half_fast}';`);

    const rhythm_long_1st_half_steady = await mint_rhythm(
      53, 'Long 1st Half Steady',
      1, [ 3, 1, 3, 1, 3, 1, 3, 17 ]);
    console.log(`    const rhythm_long_1st_half_steady  = '${rhythm_long_1st_half_steady}';`);

    const rhythm_long_1st_half_slow = await mint_rhythm(
      54, 'Long 1st Half Slow',
      1, [ 7, 1, 7, 17 ]);
    console.log(`    const rhythm_long_1st_half_slow    = '${rhythm_long_1st_half_slow}';`);

    const rhythm_long_2nd_half = await mint_rhythm(
      55, 'Long 2nd Half',
      1, [ 0, 16, 15, 1 ]);
    console.log(`    const rhythm_long_2nd_half         = '${rhythm_long_2nd_half}';`);

    const rhythm_long_2nd_half_fast = await mint_rhythm(
      56, 'Long 2nd Half Fast',
      2, [ 0, 36, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1 ]);
    console.log(`    const rhythm_long_2nd_half_fast    = '${rhythm_long_2nd_half_fast}';`);

    const rhythm_long_2nd_half_steady = await mint_rhythm(
      57, 'Long 2nd Half Steady',
      1, [ 0, 16, 3, 1, 3, 1, 3, 1, 3, 1 ]);
    console.log(`    const rhythm_long_2nd_half_steady  = '${rhythm_long_2nd_half_steady}';`);

    const rhythm_long_2nd_half_slow = await mint_rhythm(
      58, 'Long 2nd Half Slow',
      1, [ 0, 16, 7, 1, 7, 1 ]);
    console.log(`    const rhythm_long_2nd_half_slow    = '${rhythm_long_2nd_half_slow}';`);
    */

    const rhythm_sync_xmas = await mint_rhythm(
      59, 'Sync Xmas',
      2, [ 5, 1, 5, 1, 5, 1, 5, 1, 3, 1, 3, 1 ]);
    console.log(`    const rhythm_sync_xmas             = '${rhythm_sync_xmas}';`);

  } catch (error) {
    console.error(error);
  }
})();

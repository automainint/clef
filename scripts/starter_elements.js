const DAPP          = address(env.SEED);
const USDN_QUANTITY = 100000000000;
const HYBRID_PRICE  = 1000;

const wvs = 10 ** 8;

(async () => {
  const expand_ = (notes) => {
    const n = notes.length;

    for (let i = notes.length; i < 16; i++)
      notes.push(65535);
  };

  const mint_chord = async (label, notes) => {
    const tx = invokeScript(
      { dApp: DAPP,
        call: {
          function: 'mint_chord',
          args:     [
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

  const mint_melody = async (label, notes) => {
    expand_(notes);

    const tx = invokeScript(
      { dApp: DAPP,
        call: {
          function: 'mint_melody',
          args:     [
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

  const mint_rhythm = async (label, notes) => {
    expand_(notes);

    const tx = invokeScript(
      { dApp: DAPP,
        call: {
          function: 'mint_rhythm',
          args:     [
            { type: 'string', value: label },
            { type: 'integer', value: 2 },
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

  const n_C  = await mint_chord('/Clef/ C',   [  0, 12,  0,  4,  7 ]);
  const n_Dm = await mint_chord('/Clef/ Dm',  [  2, 14,  2,  5,  9 ]);
  const n_Em = await mint_chord('/Clef/ Em',  [  4, 16,  4,  7, 11 ]);
  const n_F  = await mint_chord('/Clef/ F',   [  5, 17,  5,  9, 12 ]);
  const n_G  = await mint_chord('/Clef/ G',   [  7, 19,  7, 11, 14 ]);
  const n_Am = await mint_chord('/Clef/ Am',  [  9, 21,  9, 12, 16 ]);

  console.log(`    const n_C  = '${n_C}';`);
  console.log(`    const n_Dm = '${n_Dm}';`);
  console.log(`    const n_Em = '${n_Em}';`);
  console.log(`    const n_F  = '${n_F}';`);
  console.log(`    const n_G  = '${n_G}';`);
  console.log(`    const n_Am = '${n_Am}';`);

  console.log('');
  console.log('    ` Mint melodies');

  const n_0_mel = await mint_melody('/Clef/ Melody', [ 0, 0, 0, 1, 1, 0, 0, 0, 2, 2 ]);
  const n_1_mel = await mint_melody('/Clef/ Melody', [ -3, -2, -1, 2, 1, 0 ]);
  const n_2_mel = await mint_melody('/Clef/ Melody', [ -4, -3, -2, -1 ]);

  console.log(`    const n_0_mel  = '${n_0_mel}';`);
  console.log(`    const n_1_mel  = '${n_1_mel}';`);
  console.log(`    const n_2_mel  = '${n_2_mel}';`);

  console.log('');
  console.log('    ` Mint rhythms');

  const n_0_kick   = await mint_rhythm('/Clef/ Silent', [ 0, 32 ]);
  const n_0_snare  = n_0_kick;
  const n_0_hihat  = n_0_kick;

  const n_0_bass   = n_0_kick;
  const n_0_back   = n_0_kick;
  const n_0_lead   = n_0_kick;

  const n_1_kick   = await mint_rhythm('/Clef/ Flat',     [ 2, 14 ]);
  const n_1_snare  = await mint_rhythm('/Clef/ Flat',     [ 0, 8, 2, 6 ]);
  const n_1_hihat  = await mint_rhythm('/Clef/ Off-beat', [ 0, 4, 2, 2 ]);

  const n_1_bass   = await mint_rhythm('/Clef/ 3-3-2',    [ 10, 2, 10, 2, 6, 2 ]);
  const n_1_back   = await mint_rhythm('/Clef/ Whole',    [ 15, 1 ]);
  const n_1_lead   = await mint_rhythm('/Clef/ Fast',     [ 3, 1 ]);

  const n_2_kick   = n_1_kick;
  const n_2_snare  = await mint_rhythm('/Clef/ Flat',     [ 0, 16, 2, 14 ]);
  const n_2_hihat  = await mint_rhythm('/Clef/ Flat',     [ 2, 2 ]);

  const n_2_bass   = await mint_rhythm('/Clef/ Heavy',    [ 15, 17 ]);
  const n_2_back   = n_2_bass;
  const n_2_lead   = await mint_rhythm('/Clef/ Heavy',    [ 0, 16, 3, 1, 3, 1, 3, 1, 3, 1 ]);

  console.log(`    const n_0_kick   = '${n_0_kick}';`);
  console.log(`    const n_0_snare  = '${n_0_snare}';`);
  console.log(`    const n_0_hihat  = '${n_0_hihat}';`);
  console.log(`    const n_0_bass   = '${n_0_bass}';`);
  console.log(`    const n_0_back   = '${n_0_back}';`);
  console.log(`    const n_0_lead   = '${n_0_lead}';`);

  console.log(`    const n_1_kick   = '${n_1_kick}';`);
  console.log(`    const n_1_snare  = '${n_1_snare}';`);
  console.log(`    const n_1_hihat  = '${n_1_hihat}';`);
  console.log(`    const n_1_bass   = '${n_1_bass}';`);
  console.log(`    const n_1_back   = '${n_1_back}';`);
  console.log(`    const n_1_lead   = '${n_1_lead}';`);

  console.log(`    const n_2_kick   = '${n_2_kick}';`);
  console.log(`    const n_2_snare  = '${n_2_snare}';`);
  console.log(`    const n_2_hihat  = '${n_2_hihat}';`);
  console.log(`    const n_2_bass   = '${n_2_bass}';`);
  console.log(`    const n_2_back   = '${n_2_back}';`);
  console.log(`    const n_2_lead   = '${n_2_lead}';`);
})();

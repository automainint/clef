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

  const make_song = async (name, bpm, key, chords, melody, kick, snare, hihat, bass, back, lead) => {
    const tx_song = invokeScript(
      { dApp: DAPP,
        call: {
          function: 'mint_song',
          args:     [
            { type: 'string', value: name },
            { type: 'string', value: '' },
            { type: 'string', value: '' },
            { type: 'integer', value: bpm },
            { type: 'integer', value: 16 },
            { type: 'integer', value: 4 },
            { type: 'integer', value: key },
            { type: 'list', value: [
              { type: 'string', value: chords[0] },
              { type: 'string', value: chords[1] },
              { type: 'string', value: chords[2] },
              { type: 'string', value: chords[3] },
              { type: 'string', value: chords[4] },
              { type: 'string', value: chords[5] },
              { type: 'string', value: chords[6] },
              { type: 'string', value: chords[7] }
            ] },
            { type: 'string', value: melody },
            { type: 'string', value: 'kick-alpha' },
            { type: 'string', value: 'snare-alpha' },
            { type: 'string', value: 'hihat-alpha' },
            { type: 'string', value: 'bass-alpha' },
            { type: 'string', value: 'back-alpha' },
            { type: 'string', value: 'lead-alpha' },
            { type: 'list', value: [
              { type: 'string', value: kick },
              { type: 'string', value: kick },
              { type: 'string', value: kick },
              { type: 'string', value: kick },
              { type: 'string', value: kick },
              { type: 'string', value: kick },
              { type: 'string', value: kick },
              { type: 'string', value: kick }
            ] },
            { type: 'list', value: [
              { type: 'string', value: snare },
              { type: 'string', value: snare },
              { type: 'string', value: snare },
              { type: 'string', value: snare },
              { type: 'string', value: snare },
              { type: 'string', value: snare },
              { type: 'string', value: snare },
              { type: 'string', value: snare }
            ] },
            { type: 'list', value: [
              { type: 'string', value: hihat },
              { type: 'string', value: hihat },
              { type: 'string', value: hihat },
              { type: 'string', value: hihat },
              { type: 'string', value: hihat },
              { type: 'string', value: hihat },
              { type: 'string', value: hihat },
              { type: 'string', value: hihat }
            ] },
            { type: 'list', value: [
              { type: 'string', value: bass },
              { type: 'string', value: bass },
              { type: 'string', value: bass },
              { type: 'string', value: bass },
              { type: 'string', value: bass },
              { type: 'string', value: bass },
              { type: 'string', value: bass },
              { type: 'string', value: bass }
            ] },
            { type: 'list', value: [
              { type: 'string', value: back },
              { type: 'string', value: back },
              { type: 'string', value: back },
              { type: 'string', value: back },
              { type: 'string', value: back },
              { type: 'string', value: back },
              { type: 'string', value: back },
              { type: 'string', value: back }
            ] },
            { type: 'list', value: [
              { type: 'string', value: lead },
              { type: 'string', value: lead },
              { type: 'string', value: lead },
              { type: 'string', value: lead },
              { type: 'string', value: lead },
              { type: 'string', value: lead },
              { type: 'string', value: lead },
              { type: 'string', value: lead }
            ] }
          ]
        } },
      env.SEED);

    await broadcast(tx_song);
    await waitForTx(tx_song.id);
  };

  console.log('    ` Mint chords');

  const n_C  = await mint_chord('/Clef/ C',   [  0, 12,  0,  4,  7 ]);
  const n_Dm = await mint_chord('/Clef/ Dm',  [  2, 14,  2,  5,  9 ]);
  const n_Em = await mint_chord('/Clef/ Em',  [  4, 16,  4,  7, 11 ]);
  const n_F  = await mint_chord('/Clef/ F',   [  5, 17,  5,  9, 12 ]);
  const n_G  = await mint_chord('/Clef/ G',   [  7, 19,  7, 11, 14 ]);
  const n_Am = await mint_chord('/Clef/ Am',  [  9, 21,  9, 12, 16 ]);

  /*
  const n_C  = '11111111';
  const n_Dm = '11111112';
  const n_Em = '11111113';
  const n_F  = '11111114';
  const n_G  = '11111115';
  const n_Am = '11111116';
  */

  console.log('    ` Mint melodies');

  const n_0_mel = await mint_melody('/Clef/ Melody', [ 0, 0, 0, 1, 1, 0, 0, 0, 2, 2 ]);
  const n_1_mel = await mint_melody('/Clef/ Melody', [ -3, -2, -1, 2, 1, 0 ]);
  const n_2_mel = await mint_melody('/Clef/ Melody', [ -4, -3, -2, -1 ]);

  /*
  const n_0_mel = '11111117';
  const n_1_mel = '11111118';
  const n_2_mel = '11111119';
  */

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

  /*
  const n_0_kick   = '1111111A';
  const n_0_snare  = '1111111A';
  const n_0_hihat  = '1111111A';

  const n_0_bass   = '1111111A';
  const n_0_back   = '1111111A';
  const n_0_lead   = '1111111A';

  const n_1_kick   = '1111111G';
  const n_1_snare  = '1111111H';
  const n_1_hihat  = '1111111J';

  const n_1_bass   = '1111111K';
  const n_1_back   = '1111111L';
  const n_1_lead   = '1111111M';

  const n_2_kick   = '1111111G';
  const n_2_snare  = '1111111P';
  const n_2_hihat  = '1111111Q';

  const n_2_bass   = '1111111R';
  const n_2_back   = '1111111R';
  const n_2_lead   = '1111111T';
  */

  console.log('    ` Make songs');

  //for (let i = 0; i < 10; i++) {
    await make_song('Silence', 125, 2,
      [ n_Dm, n_Dm, n_Em, n_Em, n_Dm, n_Dm, n_Em, n_Em ],
      n_0_mel,
      n_0_kick,
      n_0_snare,
      n_0_hihat,
      n_0_bass,
      n_0_back,
      n_0_lead
    );

    await make_song('Four Chords', 130, 0,
      [ n_Am, n_F, n_C, n_G, n_Am, n_F, n_C, n_G ],
      n_1_mel,
      n_1_kick,
      n_1_snare,
      n_1_hihat,
      n_1_bass,
      n_1_back,
      n_1_lead
    );

    await make_song('Heavy', 120, -2,
      [ n_Em, n_Em, n_Am, n_Am, n_Dm, n_Dm, n_C, n_C ],
      n_2_mel,
      n_2_kick,
      n_2_snare,
      n_2_hihat,
      n_2_bass,
      n_2_back,
      n_2_lead
    );
  //}
})();

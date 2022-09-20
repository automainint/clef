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

  const n_C  = '11111111';
  const n_Dm = '11111112';
  const n_Em = '11111113';
  const n_F  = '11111114';
  const n_G  = '11111115';
  const n_Am = '11111116';

  const n_0_mel  = '11111117';
  const n_1_mel  = '11111118';
  const n_2_mel  = '11111119';

  const n_0_kick   = '1111111A';
  const n_0_snare  = '1111111A';
  const n_0_hihat  = '1111111A';
  const n_0_bass   = '1111111A';
  const n_0_back   = '1111111A';
  const n_0_lead   = '1111111A';
  const n_1_kick   = '1111111B';
  const n_1_snare  = '1111111C';
  const n_1_hihat  = '1111111D';
  const n_1_bass   = '1111111E';
  const n_1_back   = '1111111F';
  const n_1_lead   = '1111111G';
  const n_2_kick   = '1111111B';
  const n_2_snare  = '1111111H';
  const n_2_hihat  = '1111111J';
  const n_2_bass   = '1111111K';
  const n_2_back   = '1111111K';
  const n_2_lead   = '1111111L';

  console.log('    ` Make songs');

  for (let i = 0; i < 10; i++) {
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

    console.log(`      ${i} of 10`);
  }
})();

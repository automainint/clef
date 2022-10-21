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

  const chord_C      = '11111111';
  const chord_Dm     = '11111112';
  const chord_Em     = '11111113';
  const chord_E      = '11111114';
  const chord_F      = '11111115';
  const chord_G      = '11111116';
  const chord_Am     = '11111117';
  const chord_Csus2  = '11111118';
  const chord_Dsus2  = '11111119';
  const chord_Fsus2  = '1111111A';
  const chord_Gsus2  = '1111111B';
  const chord_Asus2  = '1111111C';
  const chord_Csus4  = '1111111D';
  const chord_Dsus4  = '1111111E';
  const chord_Esus4  = '1111111F';
  const chord_Gsus4  = '1111111G';
  const chord_Asus4  = '1111111H';

  const arpeggio_0  = '1111111R';
  const arpeggio_1  = '1111111S';
  const arpeggio_2  = '1111111T';
  const arpeggio_3  = '1111111U';

  const rhythm_silent                = '11111115Q';
  const rhythm_fast                  = '1111111V';
  const rhythm_steady                = '1111111W';
  const rhythm_slow                  = '1111111X';
  const rhythm_slower                = '1111111Y';
  const rhythm_slowest               = '1111111Z';
  const rhythm_middle                = '1111111a';
  const rhythm_off_beat              = '1111111b';
  const rhythm_sync_lead             = '1111111c';
  const rhythm_sync_middle           = '1111111d';
  const rhythm_sync_two              = '1111111e';
  const rhythm_long_middle           = '1111111a';
  const rhythm_long_off_beat         = '1111111b';
  const rhythm_long_sync_lead        = '1111111c';
  const rhythm_long_sync_middle      = '1111111d';
  const rhythm_long_sync_two         = '1111111e';
  const rhythm_1st_half              = '1111111k';
  const rhythm_1st_half_fast         = '1111111m';
  const rhythm_1st_half_steady       = '1111111n';
  const rhythm_1st_half_slow         = '1111111o';
  const rhythm_2nd_half              = '1111111p';
  const rhythm_2nd_half_fast         = '1111111q';
  const rhythm_2nd_half_steady       = '1111111r';
  const rhythm_2nd_half_slow         = '1111111s';
  const rhythm_long_1st_half         = '1111111t';
  const rhythm_long_1st_half_fast    = '1111111u';
  const rhythm_long_1st_half_steady  = '1111111v';
  const rhythm_long_1st_half_slow    = '1111111w';
  const rhythm_long_2nd_half         = '1111111x';
  const rhythm_long_2nd_half_fast    = '1111111y';
  const rhythm_long_2nd_half_steady  = '1111111z';
  const rhythm_long_2nd_half_slow    = '111111121';

  console.log('    ` Make songs');

  //for (let i = 0; i < 10; i++) {
    await Promise.all([
      make_song('Bearish Silence', 125, -4,
        [ chord_C, chord_C, chord_G, chord_G, chord_F, chord_F, chord_G, chord_G ],
        arpeggio_0,
        rhythm_silent,
        rhythm_silent,
        rhythm_silent,
        rhythm_silent,
        rhythm_silent,
        rhythm_silent
      ),
      make_song('Minor Silence', 140, -3,
        [ chord_Am, chord_Am, chord_Dm, chord_Dm, chord_Em, chord_Em, chord_Dm, chord_Dm ],
        arpeggio_1,
        rhythm_silent,
        rhythm_silent,
        rhythm_silent,
        rhythm_silent,
        rhythm_silent,
        rhythm_silent
      ),
      make_song('Puzzle Me', 115, -2,
        [ chord_C, chord_C, chord_Am, chord_Am, chord_C, chord_C, chord_G, chord_G ],
        arpeggio_2,
        rhythm_slow,
        rhythm_middle,
        rhythm_off_beat,
        rhythm_sync_lead,
        rhythm_slow,
        rhythm_2nd_half_fast
      ),
      make_song('Swop Talk', 120, -1,
        [ chord_Dm, chord_Dm, chord_F, chord_F, chord_Dm, chord_Dm, chord_C, chord_C ],
        arpeggio_3,
        rhythm_slow,
        rhythm_sync_middle,
        rhythm_off_beat,
        rhythm_sync_lead,
        rhythm_slow,
        rhythm_2nd_half_steady
      ),
      make_song('Made In WX', 175, 0,
        [ chord_Em, chord_Em, chord_C, chord_C, chord_Em, chord_Em, chord_Am, chord_Am ],
        arpeggio_0,
        rhythm_sync_two,
        rhythm_middle,
        rhythm_off_beat,
        rhythm_sync_lead,
        rhythm_1st_half_slow,
        rhythm_steady
      ),
      make_song('Blame It On Your Vires', 130, 1,
        [ chord_F, chord_F, chord_Dm, chord_Dm, chord_F, chord_F, chord_G, chord_G ],
        arpeggio_1,
        rhythm_slow,
        rhythm_middle,
        rhythm_steady,
        rhythm_sync_lead,
        rhythm_long_sync_two,
        rhythm_fast
      ),
      make_song('Pluto Style', 180, 2,
        [ chord_G, chord_G, chord_Em, chord_Em, chord_G, chord_G, chord_Dm, chord_Dm ],
        arpeggio_2,
        rhythm_sync_lead,
        rhythm_long_sync_middle,
        rhythm_off_beat,
        rhythm_steady,
        rhythm_1st_half,
        rhythm_sync_lead
      ),
      make_song('Hodling Onto You', 140, 3,
        [ chord_Am, chord_Am, chord_G, chord_G, chord_Am, chord_Am, chord_Em, chord_Em ],
        arpeggio_3,
        rhythm_slower,
        rhythm_long_middle,
        rhythm_long_off_beat,
        rhythm_sync_lead,
        rhythm_slow,
        rhythm_steady
      ),
      make_song('Stranding USDN', 115, 4,
        [ chord_Csus2, chord_Csus2, chord_Asus2, chord_Asus2, chord_Csus2, chord_Csus2, chord_Gsus2, chord_Gsus2 ],
        arpeggio_0,
        rhythm_slow,
        rhythm_middle,
        rhythm_off_beat,
        rhythm_long_1st_half_steady,
        rhythm_long_1st_half,
        rhythm_long_2nd_half_slow
      ),
      make_song('Funny AMA', 120, 3,
        [ chord_Dsus2, chord_Dsus2, chord_Fsus2, chord_Fsus2, chord_Dsus2, chord_Dsus2, chord_Csus2, chord_Csus2 ],
        arpeggio_1,
        rhythm_slow,
        rhythm_sync_middle,
        rhythm_off_beat,
        rhythm_long_1st_half_steady,
        rhythm_long_1st_half,
        rhythm_long_2nd_half_fast
      ),
      make_song('Bullish Puzzle', 130, 1,
        [ chord_Fsus2, chord_Fsus2, chord_Dsus2, chord_Dsus2, chord_Fsus2, chord_Fsus2, chord_Gsus2, chord_Gsus2 ],
        arpeggio_2,
        rhythm_slow,
        rhythm_middle,
        rhythm_off_beat,
        rhythm_long_1st_half_slow,
        rhythm_long_1st_half,
        rhythm_long_2nd_half_steady
      ),
      make_song('Moon Node', 135, 0,
        [ chord_Gsus2, chord_Gsus2, chord_Esus4, chord_Esus4, chord_Gsus2, chord_Gsus2, chord_Dsus2, chord_Dsus2 ],
        arpeggio_3,
        rhythm_sync_two,
        rhythm_sync_middle,
        rhythm_off_beat,
        rhythm_long_1st_half_steady,
        rhythm_long_1st_half,
        rhythm_long_2nd_half_fast
      ),
      make_song('Buy The Dip', 140, -1,
        [ chord_Asus2, chord_Asus2, chord_Gsus2, chord_Gsus2, chord_Asus2, chord_Asus2, chord_Esus4, chord_Esus4 ],
        arpeggio_0,
        rhythm_slower,
        rhythm_long_middle,
        rhythm_long_off_beat,
        rhythm_long_1st_half_fast,
        rhythm_long_2nd_half,
        rhythm_long_2nd_half
      ),
      make_song('Tsunami Love', 115, -2,
        [ chord_Csus4, chord_Csus4, chord_Asus4, chord_Asus4, chord_Csus4, chord_Csus4, chord_Gsus4, chord_Gsus4 ],
        arpeggio_1,
        rhythm_slowest,
        rhythm_long_middle,
        rhythm_steady,
        rhythm_sync_lead,
        rhythm_long_1st_half,
        rhythm_long_sync_lead
      ),
      make_song('SURF Gazing', 120, -3,
        [ chord_Dsus4, chord_Dsus4, chord_Fsus2, chord_Fsus2, chord_Dsus4, chord_Dsus4, chord_Csus4, chord_Csus4 ],
        arpeggio_2,
        rhythm_slowest,
        rhythm_long_middle,
        rhythm_long_off_beat,
        rhythm_sync_lead,
        rhythm_long_1st_half,
        rhythm_steady
      ),
      make_song('Lambo Jam', 125, -2,
        [ chord_Esus4, chord_Esus4, chord_Csus4, chord_Csus4, chord_Esus4, chord_Esus4, chord_Asus4, chord_Asus4 ],
        arpeggio_3,
        rhythm_slowest,
        rhythm_long_middle,
        rhythm_off_beat,
        rhythm_sync_lead,
        rhythm_long_1st_half,
        rhythm_steady
      ),
      make_song('Clef In The Sky', 135, 0,
        [ chord_Gsus4, chord_Gsus4, chord_Esus4, chord_Esus4, chord_Gsus4, chord_Gsus4, chord_Dsus4, chord_Dsus4 ],
        arpeggio_0,
        rhythm_slowest,
        rhythm_long_middle,
        rhythm_long_sync_two,
        rhythm_sync_lead,
        rhythm_long_1st_half,
        rhythm_steady
      ),
      make_song('DYOR Luxe', 140, 1,
        [ chord_Asus4, chord_Asus4, chord_Gsus4, chord_Gsus4, chord_Asus4, chord_Asus4, chord_Esus4, chord_Esus4 ],
        arpeggio_1,
        rhythm_long_sync_lead,
        rhythm_long_middle,
        rhythm_off_beat,
        rhythm_sync_lead,
        rhythm_long_1st_half,
        rhythm_steady
      ),
      make_song('On-chain Romance', 120, 2,
        [ chord_C, chord_C, chord_C, chord_E, chord_C, chord_C, chord_C, chord_E ],
        arpeggio_2,
        rhythm_slower,
        rhythm_long_sync_middle,
        rhythm_fast,
        rhythm_sync_lead,
        rhythm_slow,
        rhythm_steady
      )
    ]);

    //console.log(`      ${i} of 10`);
  //}
})();

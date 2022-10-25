const wvs = 10 ** 8;

describe('library', async function () {
  this.timeout(300000);

  const tx_mint_song = function (app, account, bpm, bar_size, beat_size, tonality, nonce) {
    return invokeScript(
      { dApp: app,
        call: {
          function: 'mint_song',
          args:     [
            { type: 'string', value: 'some song long name' + nonce },
            { type: 'string', value: '0000' + nonce },
            { type: 'string', value: '0001' + nonce },
            { type: 'integer', value: bpm },
            { type: 'integer', value: bar_size },
            { type: 'integer', value: beat_size },
            { type: 'integer', value: tonality },
            { type: 'list', value: [
              { type: 'string', value: '0002' + nonce },
              { type: 'string', value: '0003' + nonce },
              { type: 'string', value: '0004' + nonce },
              { type: 'string', value: '0005' + nonce },
              { type: 'string', value: '0006' + nonce },
              { type: 'string', value: '0007' + nonce },
              { type: 'string', value: '0008' + nonce },
              { type: 'string', value: '0009' + nonce }
            ] },
            { type: 'string', value: '000a' + nonce },
            { type: 'string', value: 'kick-1' + nonce },
            { type: 'string', value: 'snare-1' + nonce },
            { type: 'string', value: 'hihat-1' + nonce },
            { type: 'string', value: 'bass-1' + nonce },
            { type: 'string', value: 'back-1' + nonce },
            { type: 'string', value: 'lead-1' + nonce },
            { type: 'list', value: [
              { type: 'string', value: '000b' + nonce },
              { type: 'string', value: '000c' + nonce },
              { type: 'string', value: '000d' + nonce },
              { type: 'string', value: '000e' + nonce },
              { type: 'string', value: '000f' + nonce },
              { type: 'string', value: '0010' + nonce },
              { type: 'string', value: '0011' + nonce },
              { type: 'string', value: '0012' + nonce }
            ] },
            { type: 'list', value: [
              { type: 'string', value: '0013' + nonce },
              { type: 'string', value: '0014' + nonce },
              { type: 'string', value: '0015' + nonce },
              { type: 'string', value: '0016' + nonce },
              { type: 'string', value: '0017' + nonce },
              { type: 'string', value: '0018' + nonce },
              { type: 'string', value: '0019' + nonce },
              { type: 'string', value: '001a' + nonce }
            ] },
            { type: 'list', value: [
              { type: 'string', value: '001b' + nonce },
              { type: 'string', value: '001c' + nonce },
              { type: 'string', value: '001d' + nonce },
              { type: 'string', value: '001e' + nonce },
              { type: 'string', value: '001f' + nonce },
              { type: 'string', value: '0020' + nonce },
              { type: 'string', value: '0021' + nonce },
              { type: 'string', value: '0022' + nonce }
            ] },
            { type: 'list', value: [
              { type: 'string', value: '0023' + nonce },
              { type: 'string', value: '0024' + nonce },
              { type: 'string', value: '0025' + nonce },
              { type: 'string', value: '0026' + nonce },
              { type: 'string', value: '0027' + nonce },
              { type: 'string', value: '0028' + nonce },
              { type: 'string', value: '0029' + nonce },
              { type: 'string', value: '002a' + nonce }
            ] },
            { type: 'list', value: [
              { type: 'string', value: '002b' + nonce },
              { type: 'string', value: '002c' + nonce },
              { type: 'string', value: '002d' + nonce },
              { type: 'string', value: '002e' + nonce },
              { type: 'string', value: '002f' + nonce },
              { type: 'string', value: '0030' + nonce },
              { type: 'string', value: '0031' + nonce },
              { type: 'string', value: '0032' + nonce }
            ] },
            { type: 'list', value: [
              { type: 'string', value: '0033' + nonce },
              { type: 'string', value: '0034' + nonce },
              { type: 'string', value: '0035' + nonce },
              { type: 'string', value: '0036' + nonce },
              { type: 'string', value: '0037' + nonce },
              { type: 'string', value: '0038' + nonce },
              { type: 'string', value: '0039' + nonce },
              { type: 'string', value: '003a' + nonce }
            ] }
          ]
        } },
      account);
  };

  before(async function () {
    const compile_and_broadcast = async (seed, source) => {
      const script = compile(source);
      const tx = setScript(
        { script: script,
          fee:    3800000 },
        seed);
      await broadcast(tx);
      await waitForTx(tx.id)
    };

    await setupAccounts(
      { library:  10 * wvs,
        market:   10 * wvs,
        foo:      10 * wvs,
        bar:      10 * wvs });

    await compile_and_broadcast(
      accounts.market,
      file('market_dummy.ride'));

    await compile_and_broadcast(
      accounts.library,
      file('library.ride').replace(
        '3PFQjjDMiZKQZdu5JqTHD7HwgSXyp9Rw9By',
        address(accounts.market)));
  });

  it('mint chord', async function () {
    const library = address(accounts.library);

    const tx_mint = invokeScript(
      { dApp: library,
        call: {
          function: 'mint_chord',
          args:     [
            { type: 'integer', value: 0 },
            { type: 'string', value: 'some chord' },
            { type: 'list', value: [
              { type: 'integer', value: 0 },
              { type: 'integer', value: 12 },
              { type: 'integer', value: 2 },
              { type: 'integer', value: 5 },
              { type: 'integer', value: 7 }
            ] }
          ]
        } },
      accounts.library);

    await broadcast(tx_mint);
    await waitForTx(tx_mint.id);

    const changes = await stateChanges(tx_mint.id);

    const n = changes.data[1].key.split('_')[0];

    const name    = await accountDataByKey(`${n}_CL`,     library);
    const notes_0 = await accountDataByKey(`${n}_C0`,     library);
    const notes_1 = await accountDataByKey(`${n}_C1`,     library);
    const notes_2 = await accountDataByKey(`${n}_C2`,     library);
    const notes_3 = await accountDataByKey(`${n}_C3`,     library);
    const notes_4 = await accountDataByKey(`${n}_C4`,     library);

    expect(name.value).to.equal('some chord');
    expect(notes_0.value).to.equal(0);
    expect(notes_1.value).to.equal(12);
    expect(notes_2.value).to.equal(2);
    expect(notes_3.value).to.equal(5);
    expect(notes_4.value).to.equal(7);
  });

  it('can not mint chord if not in whitelist', async function () {
    const library = address(accounts.library);

    const tx_mint = invokeScript(
      { dApp: library,
        call: {
          function: 'mint_chord',
          args:     [
            { type: 'integer', value: 0 },
            { type: 'string', value: 'some chord' },
            { type: 'list', value: [
              { type: 'integer', value: 0 },
              { type: 'integer', value: 12 },
              { type: 'integer', value: 2 },
              { type: 'integer', value: 5 },
              { type: 'integer', value: 7 }
            ] }
          ]
        } },
      accounts.foo);

    await expect(broadcast(tx_mint)).to.be.rejectedWith('Caller not in whitelist');
  });

  it('mint arpeggio', async function () {
    const library = address(accounts.library);

    const tx_mint = invokeScript(
      { dApp: library,
        call: {
          function: 'mint_arpeggio',
          args:     [
            { type: 'integer', value: 0 },
            { type: 'string', value: 'some arpeggio' },
            { type: 'list', value: [
              { type: 'integer', value: 2 },
              { type: 'integer', value: 4 },
              { type: 'integer', value: -5 },
              { type: 'integer', value: 6 },
              { type: 'integer', value: 7 },
              { type: 'integer', value: -1 },
              { type: 'integer', value: 1 },
              { type: 'integer', value: 3 },
              { type: 'integer', value: -9 },
              { type: 'integer', value: -6 },
              { type: 'integer', value: 4 },
              { type: 'integer', value: 5 },
              { type: 'integer', value: 8 },
              { type: 'integer', value: 9 },
              { type: 'integer', value: 10 },
              { type: 'integer', value: -3 }
            ] }
          ]
        } },
      accounts.library);

    await broadcast(tx_mint);
    await waitForTx(tx_mint.id);

    const changes = await stateChanges(tx_mint.id);

    const n = changes.data[1].key.split('_')[0];

    const name      = await accountDataByKey(`${n}_AL`,     library);
    const notes_00  = await accountDataByKey(`${n}_A00`,    library);
    const notes_01  = await accountDataByKey(`${n}_A01`,    library);
    const notes_02  = await accountDataByKey(`${n}_A02`,    library);
    const notes_03  = await accountDataByKey(`${n}_A03`,    library);
    const notes_04  = await accountDataByKey(`${n}_A04`,    library);
    const notes_05  = await accountDataByKey(`${n}_A05`,    library);
    const notes_06  = await accountDataByKey(`${n}_A06`,    library);
    const notes_07  = await accountDataByKey(`${n}_A07`,    library);
    const notes_08  = await accountDataByKey(`${n}_A08`,    library);
    const notes_09  = await accountDataByKey(`${n}_A09`,    library);
    const notes_10  = await accountDataByKey(`${n}_A10`,    library);
    const notes_11  = await accountDataByKey(`${n}_A11`,    library);
    const notes_12  = await accountDataByKey(`${n}_A12`,    library);
    const notes_13  = await accountDataByKey(`${n}_A13`,    library);
    const notes_14  = await accountDataByKey(`${n}_A14`,    library);
    const notes_15  = await accountDataByKey(`${n}_A15`,    library);

    expect(name.value).to.equal('some arpeggio');
    expect(notes_00.value).to.equal(2);
    expect(notes_01.value).to.equal(4);
    expect(notes_02.value).to.equal(-5);
    expect(notes_03.value).to.equal(6);
    expect(notes_04.value).to.equal(7);
    expect(notes_05.value).to.equal(-1);
    expect(notes_06.value).to.equal(1);
    expect(notes_07.value).to.equal(3);
    expect(notes_08.value).to.equal(-9);
    expect(notes_09.value).to.equal(-6);
    expect(notes_10.value).to.equal(4);
    expect(notes_11.value).to.equal(5);
    expect(notes_12.value).to.equal(8);
    expect(notes_13.value).to.equal(9);
    expect(notes_14.value).to.equal(10);
    expect(notes_15.value).to.equal(-3);
  });

  it('can not mint arpeggio if not in whitelist', async function () {
    const library = address(accounts.library);

    const tx_mint = invokeScript(
      { dApp: library,
        call: {
          function: 'mint_arpeggio',
          args:     [
            { type: 'integer', value: 0 },
            { type: 'string', value: 'some arpeggio' },
            { type: 'list', value: [
              { type: 'integer', value: 2 },
              { type: 'integer', value: 4 },
              { type: 'integer', value: -5 },
              { type: 'integer', value: 6 },
              { type: 'integer', value: 7 },
              { type: 'integer', value: -1 },
              { type: 'integer', value: 1 },
              { type: 'integer', value: 3 },
              { type: 'integer', value: -9 },
              { type: 'integer', value: -6 },
              { type: 'integer', value: 4 },
              { type: 'integer', value: 5 },
              { type: 'integer', value: 8 },
              { type: 'integer', value: 9 },
              { type: 'integer', value: 10 },
              { type: 'integer', value: -3 }
            ] }
          ]
        } },
      accounts.foo);

    await expect(broadcast(tx_mint)).to.be.rejectedWith('Caller not in whitelist');
  });

  it('mint rhythm', async function () {
    const library = address(accounts.library);

    const tx_mint = invokeScript(
      { dApp: library,
        call: {
          function: 'mint_rhythm',
          args:     [
            { type: 'integer', value: 0 },
            { type: 'string', value: 'some rhythm' },
            { type: 'integer', value: 42 },
            { type: 'list', value: [
              { type: 'integer', value: 1 },
              { type: 'integer', value: 5 },
              { type: 'integer', value: 2 },
              { type: 'integer', value: 6 },
              { type: 'integer', value: 3 },
              { type: 'integer', value: 7 },
              { type: 'integer', value: 4 },
              { type: 'integer', value: 8 },
              { type: 'integer', value: 9 },
              { type: 'integer', value: 13 },
              { type: 'integer', value: 10 },
              { type: 'integer', value: 14 },
              { type: 'integer', value: 11 },
              { type: 'integer', value: 15 },
              { type: 'integer', value: 12 },
              { type: 'integer', value: 16 }
            ] }
          ]
        } },
      accounts.library);

    await broadcast(tx_mint);
    await waitForTx(tx_mint.id);

    const changes = await stateChanges(tx_mint.id);

    const n = changes.data[1].key.split('_')[0];

    const name      = await accountDataByKey(`${n}_RL`,     library);
    const scale     = await accountDataByKey(`${n}_RS`,     library);
    const notes_00  = await accountDataByKey(`${n}_R00`,    library);
    const notes_01  = await accountDataByKey(`${n}_R01`,    library);
    const notes_02  = await accountDataByKey(`${n}_R02`,    library);
    const notes_03  = await accountDataByKey(`${n}_R03`,    library);
    const notes_04  = await accountDataByKey(`${n}_R04`,    library);
    const notes_05  = await accountDataByKey(`${n}_R05`,    library);
    const notes_06  = await accountDataByKey(`${n}_R06`,    library);
    const notes_07  = await accountDataByKey(`${n}_R07`,    library);
    const notes_08  = await accountDataByKey(`${n}_R08`,    library);
    const notes_09  = await accountDataByKey(`${n}_R09`,    library);
    const notes_10  = await accountDataByKey(`${n}_R10`,    library);
    const notes_11  = await accountDataByKey(`${n}_R11`,    library);
    const notes_12  = await accountDataByKey(`${n}_R12`,    library);
    const notes_13  = await accountDataByKey(`${n}_R13`,    library);
    const notes_14  = await accountDataByKey(`${n}_R14`,    library);
    const notes_15  = await accountDataByKey(`${n}_R15`,    library);

    expect(name.value).to.equal('some rhythm');
    expect(scale.value).to.equal(42);
    expect(notes_00.value).to.equal(1);
    expect(notes_01.value).to.equal(5);
    expect(notes_02.value).to.equal(2);
    expect(notes_03.value).to.equal(6);
    expect(notes_04.value).to.equal(3);
    expect(notes_05.value).to.equal(7);
    expect(notes_06.value).to.equal(4);
    expect(notes_07.value).to.equal(8);
    expect(notes_08.value).to.equal(9);
    expect(notes_09.value).to.equal(13);
    expect(notes_10.value).to.equal(10);
    expect(notes_11.value).to.equal(14);
    expect(notes_12.value).to.equal(11);
    expect(notes_13.value).to.equal(15);
    expect(notes_14.value).to.equal(12);
    expect(notes_15.value).to.equal(16);
  });

  it('can not mint rhythm if not in whitelist', async function () {
    const library = address(accounts.library);

    const tx_mint = invokeScript(
      { dApp: library,
        call: {
          function: 'mint_rhythm',
          args:     [
            { type: 'integer', value: 0 },
            { type: 'string', value: 'some rhythm' },
            { type: 'integer', value: 42 },
            { type: 'list', value: [
              { type: 'integer', value: 1 },
              { type: 'integer', value: 5 },
              { type: 'integer', value: 2 },
              { type: 'integer', value: 6 },
              { type: 'integer', value: 3 },
              { type: 'integer', value: 7 },
              { type: 'integer', value: 4 },
              { type: 'integer', value: 8 },
              { type: 'integer', value: 9 },
              { type: 'integer', value: 13 },
              { type: 'integer', value: 10 },
              { type: 'integer', value: 14 },
              { type: 'integer', value: 11 },
              { type: 'integer', value: 15 },
              { type: 'integer', value: 12 },
              { type: 'integer', value: 16 }
            ] }
          ]
        } },
      accounts.foo);

    await expect(broadcast(tx_mint)).to.be.rejectedWith('Caller not in whitelist');
  });

  it('set market image', async function () {
    const library = address(accounts.library);

    const tx_set_image = invokeScript(
      { dApp: library,
        call: {
          function: 'set_market_image',
          args: [
            { type: 'string',   value: 'foo' }
          ]
        } },
      accounts.library);

    await broadcast(tx_set_image);
    await waitForTx(tx_set_image.id);

    const url = await accountDataByKey(`market_image_link`, library);

    expect(url.value).to.equal('foo');
  });

  it('mint song', async function () {
    const library = address(accounts.library);

    const tx_mint = tx_mint_song(library, accounts.library, 123, 4, 8, 7, '');

    await broadcast(tx_mint);
    await waitForTx(tx_mint.id);

    const changes = await stateChanges(tx_mint.id);

    const assetId = changes.invokes[0].stateChanges.issues[0].assetId;

    const n = (await accountDataByKey(`${assetId}`, library)).value;

    const id                = await accountDataByKey(`${n}`,      library);
    const gen               = await accountDataByKey(`${n}_G`,    library);
    const name              = await accountDataByKey(`${n}_SL`,   library);
    const name_seed         = await accountDataByKey(`${n}_SN`,   library);
    const parent_0          = await accountDataByKey(`${n}_SP0`,  library);
    const parent_1          = await accountDataByKey(`${n}_SP1`,  library);
    const bpm               = await accountDataByKey(`${n}_SB0`,  library);
    const bar_size          = await accountDataByKey(`${n}_SB1`,  library);
    const beat_size         = await accountDataByKey(`${n}_SB2`,  library);
    const tonality          = await accountDataByKey(`${n}_ST`,   library);
    const chords_0          = await accountDataByKey(`${n}_SC0`,  library);
    const chords_1          = await accountDataByKey(`${n}_SC1`,  library);
    const chords_2          = await accountDataByKey(`${n}_SC2`,  library);
    const chords_3          = await accountDataByKey(`${n}_SC3`,  library);
    const chords_4          = await accountDataByKey(`${n}_SC4`,  library);
    const chords_5          = await accountDataByKey(`${n}_SC5`,  library);
    const chords_6          = await accountDataByKey(`${n}_SC6`,  library);
    const chords_7          = await accountDataByKey(`${n}_SC7`,  library);
    const arpeggio          = await accountDataByKey(`${n}_SA`,   library);
    const kick_instrument   = await accountDataByKey(`${n}_SI0`,  library);
    const kick_rhythm_0     = await accountDataByKey(`${n}_SI00`, library);
    const kick_rhythm_1     = await accountDataByKey(`${n}_SI01`, library);
    const kick_rhythm_2     = await accountDataByKey(`${n}_SI02`, library);
    const kick_rhythm_3     = await accountDataByKey(`${n}_SI03`, library);
    const kick_rhythm_4     = await accountDataByKey(`${n}_SI04`, library);
    const kick_rhythm_5     = await accountDataByKey(`${n}_SI05`, library);
    const kick_rhythm_6     = await accountDataByKey(`${n}_SI06`, library);
    const kick_rhythm_7     = await accountDataByKey(`${n}_SI07`, library);
    const snare_instrument  = await accountDataByKey(`${n}_SI1`,  library);
    const snare_rhythm_0    = await accountDataByKey(`${n}_SI10`, library);
    const snare_rhythm_1    = await accountDataByKey(`${n}_SI11`, library);
    const snare_rhythm_2    = await accountDataByKey(`${n}_SI12`, library);
    const snare_rhythm_3    = await accountDataByKey(`${n}_SI13`, library);
    const snare_rhythm_4    = await accountDataByKey(`${n}_SI14`, library);
    const snare_rhythm_5    = await accountDataByKey(`${n}_SI15`, library);
    const snare_rhythm_6    = await accountDataByKey(`${n}_SI16`, library);
    const snare_rhythm_7    = await accountDataByKey(`${n}_SI17`, library);
    const hihat_instrument  = await accountDataByKey(`${n}_SI2`,  library);
    const hihat_rhythm_0    = await accountDataByKey(`${n}_SI20`, library);
    const hihat_rhythm_1    = await accountDataByKey(`${n}_SI21`, library);
    const hihat_rhythm_2    = await accountDataByKey(`${n}_SI22`, library);
    const hihat_rhythm_3    = await accountDataByKey(`${n}_SI23`, library);
    const hihat_rhythm_4    = await accountDataByKey(`${n}_SI24`, library);
    const hihat_rhythm_5    = await accountDataByKey(`${n}_SI25`, library);
    const hihat_rhythm_6    = await accountDataByKey(`${n}_SI26`, library);
    const hihat_rhythm_7    = await accountDataByKey(`${n}_SI27`, library);
    const bass_instrument   = await accountDataByKey(`${n}_SI3`,  library);
    const bass_rhythm_0     = await accountDataByKey(`${n}_SI30`, library);
    const bass_rhythm_1     = await accountDataByKey(`${n}_SI31`, library);
    const bass_rhythm_2     = await accountDataByKey(`${n}_SI32`, library);
    const bass_rhythm_3     = await accountDataByKey(`${n}_SI33`, library);
    const bass_rhythm_4     = await accountDataByKey(`${n}_SI34`, library);
    const bass_rhythm_5     = await accountDataByKey(`${n}_SI35`, library);
    const bass_rhythm_6     = await accountDataByKey(`${n}_SI36`, library);
    const bass_rhythm_7     = await accountDataByKey(`${n}_SI37`, library);
    const back_instrument   = await accountDataByKey(`${n}_SI4`,  library);
    const back_rhythm_0     = await accountDataByKey(`${n}_SI40`, library);
    const back_rhythm_1     = await accountDataByKey(`${n}_SI41`, library);
    const back_rhythm_2     = await accountDataByKey(`${n}_SI42`, library);
    const back_rhythm_3     = await accountDataByKey(`${n}_SI43`, library);
    const back_rhythm_4     = await accountDataByKey(`${n}_SI44`, library);
    const back_rhythm_5     = await accountDataByKey(`${n}_SI45`, library);
    const back_rhythm_6     = await accountDataByKey(`${n}_SI46`, library);
    const back_rhythm_7     = await accountDataByKey(`${n}_SI47`, library);
    const lead_instrument   = await accountDataByKey(`${n}_SI5`,  library);
    const lead_rhythm_0     = await accountDataByKey(`${n}_SI50`, library);
    const lead_rhythm_1     = await accountDataByKey(`${n}_SI51`, library);
    const lead_rhythm_2     = await accountDataByKey(`${n}_SI52`, library);
    const lead_rhythm_3     = await accountDataByKey(`${n}_SI53`, library);
    const lead_rhythm_4     = await accountDataByKey(`${n}_SI54`, library);
    const lead_rhythm_5     = await accountDataByKey(`${n}_SI55`, library);
    const lead_rhythm_6     = await accountDataByKey(`${n}_SI56`, library);
    const lead_rhythm_7     = await accountDataByKey(`${n}_SI57`, library);
    const asset_balance     = await assetBalance(assetId, library);

    expect(id.value).to.equal(assetId);
    expect(gen.value).to.equal(1);
    expect(name.value).to.equal('some song long name');
    expect(name_seed.value).to.equal(0);
    expect(parent_0.value).to.equal('0000');
    expect(parent_1.value).to.equal('0001');
    expect(bpm.value).to.equal(123);
    expect(bar_size.value).to.equal(4);
    expect(beat_size.value).to.equal(8);
    expect(tonality.value).to.equal(7);
    expect(chords_0.value).to.equal('0002');
    expect(chords_1.value).to.equal('0003');
    expect(chords_2.value).to.equal('0004');
    expect(chords_3.value).to.equal('0005');
    expect(chords_4.value).to.equal('0006');
    expect(chords_5.value).to.equal('0007');
    expect(chords_6.value).to.equal('0008');
    expect(chords_7.value).to.equal('0009');
    expect(arpeggio.value).to.equal('000a');
    expect(kick_instrument.value).to.equal('kick-1');
    expect(kick_rhythm_0.value).to.equal('000b');
    expect(kick_rhythm_1.value).to.equal('000c');
    expect(kick_rhythm_2.value).to.equal('000d');
    expect(kick_rhythm_3.value).to.equal('000e');
    expect(kick_rhythm_4.value).to.equal('000f');
    expect(kick_rhythm_5.value).to.equal('0010');
    expect(kick_rhythm_6.value).to.equal('0011');
    expect(kick_rhythm_7.value).to.equal('0012');
    expect(snare_instrument.value).to.equal('snare-1');
    expect(snare_rhythm_0.value).to.equal('0013');
    expect(snare_rhythm_1.value).to.equal('0014');
    expect(snare_rhythm_2.value).to.equal('0015');
    expect(snare_rhythm_3.value).to.equal('0016');
    expect(snare_rhythm_4.value).to.equal('0017');
    expect(snare_rhythm_5.value).to.equal('0018');
    expect(snare_rhythm_6.value).to.equal('0019');
    expect(snare_rhythm_7.value).to.equal('001a');
    expect(hihat_instrument.value).to.equal('hihat-1');
    expect(hihat_rhythm_0.value).to.equal('001b');
    expect(hihat_rhythm_1.value).to.equal('001c');
    expect(hihat_rhythm_2.value).to.equal('001d');
    expect(hihat_rhythm_3.value).to.equal('001e');
    expect(hihat_rhythm_4.value).to.equal('001f');
    expect(hihat_rhythm_5.value).to.equal('0020');
    expect(hihat_rhythm_6.value).to.equal('0021');
    expect(hihat_rhythm_7.value).to.equal('0022');
    expect(bass_instrument.value).to.equal('bass-1');
    expect(bass_rhythm_0.value).to.equal('0023');
    expect(bass_rhythm_1.value).to.equal('0024');
    expect(bass_rhythm_2.value).to.equal('0025');
    expect(bass_rhythm_3.value).to.equal('0026');
    expect(bass_rhythm_4.value).to.equal('0027');
    expect(bass_rhythm_5.value).to.equal('0028');
    expect(bass_rhythm_6.value).to.equal('0029');
    expect(bass_rhythm_7.value).to.equal('002a');
    expect(back_instrument.value).to.equal('back-1');
    expect(back_rhythm_0.value).to.equal('002b');
    expect(back_rhythm_1.value).to.equal('002c');
    expect(back_rhythm_2.value).to.equal('002d');
    expect(back_rhythm_3.value).to.equal('002e');
    expect(back_rhythm_4.value).to.equal('002f');
    expect(back_rhythm_5.value).to.equal('0030');
    expect(back_rhythm_6.value).to.equal('0031');
    expect(back_rhythm_7.value).to.equal('0032');
    expect(lead_instrument.value).to.equal('lead-1');
    expect(lead_rhythm_0.value).to.equal('0033');
    expect(lead_rhythm_1.value).to.equal('0034');
    expect(lead_rhythm_2.value).to.equal('0035');
    expect(lead_rhythm_3.value).to.equal('0036');
    expect(lead_rhythm_4.value).to.equal('0037');
    expect(lead_rhythm_5.value).to.equal('0038');
    expect(lead_rhythm_6.value).to.equal('0039');
    expect(lead_rhythm_7.value).to.equal('003a');
    expect(asset_balance).to.equal(1);
  });

  it('can not mint song if not in whitelist', async function () {
    const library = address(accounts.library);

    const tx_mint = tx_mint_song(library, accounts.foo, 123, 4, 8, 7, '');

    await expect(broadcast(tx_mint)).to.be.rejectedWith('Caller not in whitelist');
  });

  it('set hybrid price', async function () {
    const library = address(accounts.library);

    const tx_set_price = invokeScript(
      { dApp: library,
        call: {
          function: 'set_price_hybrid',
          args: [
            { type: 'string',   value: 'foo' },
            { type: 'integer',  value: 42 },
            { type: 'integer',  value: 10 }
          ]
        } },
      accounts.library);

    await broadcast(tx_set_price);
    await waitForTx(tx_set_price.id);

    const price_token     = await accountDataByKey(`price_hybrid_token`,      library);
    const price_amount    = await accountDataByKey(`price_hybrid_amount`,     library);
    const price_increment = await accountDataByKey(`price_hybrid_increment`,  library);

    expect(price_token.value).to.equal('foo');
    expect(price_amount.value).to.equal(42);
    expect(price_increment.value).to.equal(10);
  });

  it('whitelist', async function () {
    const library = address(accounts.library);
    const foo     = address(accounts.foo);

    const tx_whitelist_add = invokeScript(
      { dApp: library,
        call: {
          function: 'whitelist_add',
          args: [
            { type: 'string', value: foo }
          ]
        } },
      accounts.library);

    await broadcast(tx_whitelist_add);
    await waitForTx(tx_whitelist_add.id);

    const tx_set_price = invokeScript(
      { dApp: library,
        call: {
          function: 'set_price_hybrid',
          args: [
            { type: 'string',   value: 'foo' },
            { type: 'integer',  value: 42 },
            { type: 'integer',  value: 10 }
          ]
        } },
      accounts.foo);

    await broadcast(tx_set_price);
    await waitForTx(tx_set_price.id);

    const price_token   = await accountDataByKey(`price_hybrid_token`,  library);
    const price_amount  = await accountDataByKey(`price_hybrid_amount`, library);

    expect(price_token.value).to.equal('foo');
    expect(price_amount.value).to.equal(42);

    const tx_whitelist_remove = invokeScript(
      { dApp: library,
        call: {
          function: 'whitelist_remove',
          args: [
            { type: 'string', value: foo }
          ]
        } },
      accounts.library);

    await broadcast(tx_whitelist_remove);
    await waitForTx(tx_whitelist_remove.id);
  });
  
  it('mint song by other account', async function () {
    const library = address(accounts.library);
    const foo     = address(accounts.foo);

    const tx_whitelist_add = invokeScript(
      { dApp: library,
        call: {
          function: 'whitelist_add',
          args: [
            { type: 'string', value: foo }
          ]
        } },
      accounts.library);

    await broadcast(tx_whitelist_add);
    await waitForTx(tx_whitelist_add.id);

    const tx_mint = tx_mint_song(library, accounts.foo, 123, 4, 8, 7, '');

    await broadcast(tx_mint);
    await waitForTx(tx_mint.id);

    const changes = await stateChanges(tx_mint.id);

    const assetId = changes.invokes[0].stateChanges.issues[0].assetId;

    const n = (await accountDataByKey(`${assetId}`, library)).value;

    const id            = await accountDataByKey(`${n}`, library);
    const asset_balance = await assetBalance(assetId, foo);

    expect(id.value).to.equal(assetId);
    expect(asset_balance).to.equal(1);

    const tx_whitelist_remove = invokeScript(
      { dApp: library,
        call: {
          function: 'whitelist_remove',
          args: [
            { type: 'string', value: foo }
          ]
        } },
      accounts.library);

    await broadcast(tx_whitelist_remove);
    await waitForTx(tx_whitelist_remove.id);
  });


  it('can not edit whitelist if not owner', async function () {
    const library = address(accounts.library);
    const foo     = address(accounts.foo);

    const tx_whitelist_add = invokeScript(
      { dApp: library,
        call: {
          function: 'whitelist_add',
          args: [
            { type: 'string', value: foo }
          ]
        } },
      accounts.foo);

    await expect(broadcast(tx_whitelist_add)).to.be.rejectedWith('Caller is not dApp owner');

    const tx_whitelist_remove = invokeScript(
      { dApp: library,
        call: {
          function: 'whitelist_remove',
          args: [
            { type: 'string', value: foo }
          ]
        } },
      accounts.foo);

    await expect(broadcast(tx_whitelist_remove)).to.be.rejectedWith('Caller is not dApp owner');
  });

  it('can not set market image if not in whitelist', async function () {
    const library = address(accounts.library);
    const foo     = address(accounts.foo);

    const tx_whitelist_add = invokeScript(
      { dApp: library,
        call: {
          function: 'whitelist_add',
          args: [
            { type: 'string', value: foo }
          ]
        } },
      accounts.library);

    await broadcast(tx_whitelist_add);
    await waitForTx(tx_whitelist_add.id);

    const tx_whitelist_remove = invokeScript(
      { dApp: library,
        call: {
          function: 'whitelist_remove',
          args: [
            { type: 'string', value: foo }
          ]
        } },
      accounts.library);

    await broadcast(tx_whitelist_remove);
    await waitForTx(tx_whitelist_remove.id);

    const tx_set_image = invokeScript(
      { dApp: library,
        call: {
          function: 'set_market_image',
          args: [
            { type: 'string', value: 'foo' }
          ]
        } },
      accounts.foo);

    await expect(broadcast(tx_set_image)).to.be.rejectedWith('Caller not in whitelist');
  });

  it('can not set hybrid price if not in whitelist', async function () {
    const library = address(accounts.library);
    const foo     = address(accounts.foo);

    const tx_whitelist_add = invokeScript(
      { dApp: library,
        call: {
          function: 'whitelist_add',
          args: [
            { type: 'string', value: foo }
          ]
        } },
      accounts.library);

    await broadcast(tx_whitelist_add);
    await waitForTx(tx_whitelist_add.id);

    const tx_whitelist_remove = invokeScript(
      { dApp: library,
        call: {
          function: 'whitelist_remove',
          args: [
            { type: 'string', value: foo }
          ]
        } },
      accounts.library);

    await broadcast(tx_whitelist_remove);
    await waitForTx(tx_whitelist_remove.id);

    const tx_set_price = invokeScript(
      { dApp: library,
        call: {
          function: 'set_price_hybrid',
          args: [
            { type: 'string',   value: 'foo' },
            { type: 'integer',  value: 42 },
            { type: 'integer',  value: 10 }
          ]
        } },
      accounts.foo);

    await expect(broadcast(tx_set_price)).to.be.rejectedWith('Caller not in whitelist');
  });

  it('mint hybrid', async function () {
    const library = address(accounts.library);
    const foo     = address(accounts.foo);

    const fee   = 500000;
    const price = 1000000;
    const incr  = 100000;

    const tx_set_price = invokeScript(
      { dApp: library,
        call: {
          function: 'set_price_hybrid',
          args: [
            { type: 'string',   value: '' },
            { type: 'integer',  value: price },
            { type: 'integer',  value: incr }
          ]
        } },
      accounts.library);
    await broadcast(tx_set_price);
    await waitForTx(tx_set_price.id);

    const tx_mint_0 = tx_mint_song(library, accounts.library, 120, 4, 4, 5, '_foo');
    await broadcast(tx_mint_0);
    await waitForTx(tx_mint_0.id);
    const song_0 = (await stateChanges(tx_mint_0.id)).invokes[0].stateChanges.issues[0].assetId;

    const tx_mint_1 = tx_mint_song(library, accounts.library, 180, 6, 8, 7, '_bar');
    await broadcast(tx_mint_1);
    await waitForTx(tx_mint_1.id);
    const song_1 = (await stateChanges(tx_mint_1.id)).invokes[0].stateChanges.issues[0].assetId;

    const iTxSend_0 = transfer(
      { assetId: song_0, amount: 1, recipient: foo },
      accounts.library);
    await broadcast(iTxSend_0);
    await waitForTx(iTxSend_0.id);

    const iTxSend_1 = transfer(
      { assetId: song_1, amount: 1, recipient: foo },
      accounts.library);
    await broadcast(iTxSend_1);
    await waitForTx(iTxSend_1.id);

    expect(await assetBalance(song_0, foo)).to.equal(1);
    expect(await assetBalance(song_1, foo)).to.equal(1);

    const n_0 = (await accountDataByKey(song_0, library)).value;
    const n_1 = (await accountDataByKey(song_1, library)).value;

    const tx_mint_hybrid = invokeScript(
      { dApp: library,
        call: {
          function: 'mint_hybrid',
          args: [
            { type: 'string', value: n_0 },
            { type: 'string', value: n_1 }
          ]
        },
        payment: [ { assetId: null, amount: price } ],
        feeAssetId: 'WAVES',
        fee:        fee,
      },
      accounts.foo);

    const waves_balance_0 = await balance(foo);

    await broadcast(tx_mint_hybrid);
    await waitForTx(tx_mint_hybrid.id);

    const waves_balance_1 = await balance(foo);

    expect(waves_balance_1).to.equal(waves_balance_0 - price - fee);

    const hybrid = (await stateChanges(tx_mint_hybrid.id)).invokes[0].stateChanges.issues[0].assetId;

    const n = (await accountDataByKey(hybrid, library)).value;

    const id                = await accountDataByKey(`${n}`,      library);
    const gen               = await accountDataByKey(`${n}_G`,    library);
    const name              = await accountDataByKey(`${n}_SL`,   library);
    const name_seed         = await accountDataByKey(`${n}_SN`,   library);
    const parent_0          = await accountDataByKey(`${n}_SP0`,  library);
    const parent_1          = await accountDataByKey(`${n}_SP1`,  library);
    const bpm               = await accountDataByKey(`${n}_SB0`,  library);
    const bar_size          = await accountDataByKey(`${n}_SB1`,  library);
    const beat_size         = await accountDataByKey(`${n}_SB2`,  library);
    const tonality          = await accountDataByKey(`${n}_ST`,   library);
    const chords_0          = await accountDataByKey(`${n}_SC0`,  library);
    const chords_1          = await accountDataByKey(`${n}_SC1`,  library);
    const chords_2          = await accountDataByKey(`${n}_SC2`,  library);
    const chords_3          = await accountDataByKey(`${n}_SC3`,  library);
    const chords_4          = await accountDataByKey(`${n}_SC4`,  library);
    const chords_5          = await accountDataByKey(`${n}_SC5`,  library);
    const chords_6          = await accountDataByKey(`${n}_SC6`,  library);
    const chords_7          = await accountDataByKey(`${n}_SC7`,  library);
    const arpeggio          = await accountDataByKey(`${n}_SA`,   library);
    const kick_instrument   = await accountDataByKey(`${n}_SI0`,  library);
    const kick_rhythm_0     = await accountDataByKey(`${n}_SI00`, library);
    const kick_rhythm_1     = await accountDataByKey(`${n}_SI01`, library);
    const kick_rhythm_2     = await accountDataByKey(`${n}_SI02`, library);
    const kick_rhythm_3     = await accountDataByKey(`${n}_SI03`, library);
    const kick_rhythm_4     = await accountDataByKey(`${n}_SI04`, library);
    const kick_rhythm_5     = await accountDataByKey(`${n}_SI05`, library);
    const kick_rhythm_6     = await accountDataByKey(`${n}_SI06`, library);
    const kick_rhythm_7     = await accountDataByKey(`${n}_SI07`, library);
    const snare_instrument  = await accountDataByKey(`${n}_SI1`,  library);
    const snare_rhythm_0    = await accountDataByKey(`${n}_SI10`, library);
    const snare_rhythm_1    = await accountDataByKey(`${n}_SI11`, library);
    const snare_rhythm_2    = await accountDataByKey(`${n}_SI12`, library);
    const snare_rhythm_3    = await accountDataByKey(`${n}_SI13`, library);
    const snare_rhythm_4    = await accountDataByKey(`${n}_SI14`, library);
    const snare_rhythm_5    = await accountDataByKey(`${n}_SI15`, library);
    const snare_rhythm_6    = await accountDataByKey(`${n}_SI16`, library);
    const snare_rhythm_7    = await accountDataByKey(`${n}_SI17`, library);
    const hihat_instrument  = await accountDataByKey(`${n}_SI2`,  library);
    const hihat_rhythm_0    = await accountDataByKey(`${n}_SI20`, library);
    const hihat_rhythm_1    = await accountDataByKey(`${n}_SI21`, library);
    const hihat_rhythm_2    = await accountDataByKey(`${n}_SI22`, library);
    const hihat_rhythm_3    = await accountDataByKey(`${n}_SI23`, library);
    const hihat_rhythm_4    = await accountDataByKey(`${n}_SI24`, library);
    const hihat_rhythm_5    = await accountDataByKey(`${n}_SI25`, library);
    const hihat_rhythm_6    = await accountDataByKey(`${n}_SI26`, library);
    const hihat_rhythm_7    = await accountDataByKey(`${n}_SI27`, library);
    const bass_instrument   = await accountDataByKey(`${n}_SI3`,  library);
    const bass_rhythm_0     = await accountDataByKey(`${n}_SI30`, library);
    const bass_rhythm_1     = await accountDataByKey(`${n}_SI31`, library);
    const bass_rhythm_2     = await accountDataByKey(`${n}_SI32`, library);
    const bass_rhythm_3     = await accountDataByKey(`${n}_SI33`, library);
    const bass_rhythm_4     = await accountDataByKey(`${n}_SI34`, library);
    const bass_rhythm_5     = await accountDataByKey(`${n}_SI35`, library);
    const bass_rhythm_6     = await accountDataByKey(`${n}_SI36`, library);
    const bass_rhythm_7     = await accountDataByKey(`${n}_SI37`, library);
    const back_instrument   = await accountDataByKey(`${n}_SI4`,  library);
    const back_rhythm_0     = await accountDataByKey(`${n}_SI40`, library);
    const back_rhythm_1     = await accountDataByKey(`${n}_SI41`, library);
    const back_rhythm_2     = await accountDataByKey(`${n}_SI42`, library);
    const back_rhythm_3     = await accountDataByKey(`${n}_SI43`, library);
    const back_rhythm_4     = await accountDataByKey(`${n}_SI44`, library);
    const back_rhythm_5     = await accountDataByKey(`${n}_SI45`, library);
    const back_rhythm_6     = await accountDataByKey(`${n}_SI46`, library);
    const back_rhythm_7     = await accountDataByKey(`${n}_SI47`, library);
    const lead_instrument   = await accountDataByKey(`${n}_SI5`,  library);
    const lead_rhythm_0     = await accountDataByKey(`${n}_SI50`, library);
    const lead_rhythm_1     = await accountDataByKey(`${n}_SI51`, library);
    const lead_rhythm_2     = await accountDataByKey(`${n}_SI52`, library);
    const lead_rhythm_3     = await accountDataByKey(`${n}_SI53`, library);
    const lead_rhythm_4     = await accountDataByKey(`${n}_SI54`, library);
    const lead_rhythm_5     = await accountDataByKey(`${n}_SI55`, library);
    const lead_rhythm_6     = await accountDataByKey(`${n}_SI56`, library);
    const lead_rhythm_7     = await accountDataByKey(`${n}_SI57`, library);
    const asset_balance     = await assetBalance(hybrid, foo);

    expect(id.value).to.be.equal(hybrid);
    expect(gen.value).to.be.equal(2);
    expect(name.value).to.be.equal('');
    expect(name_seed.type).to.be.equal('integer');
    expect(parent_0.value).to.equal(n_0);
    expect(parent_1.value).to.equal(n_1);
    expect(asset_balance).to.equal(1);

    const _fix = (s) => {
      return [ s + '_foo', s + '_bar' ];
    };

    let bits = '';

    const _check_random_bit = (value, vars) => {
      if (value === vars[0])
        bits = `${bits} 0`
      else
        bits = `${bits} 1`

      expect(value).to.be.oneOf(vars);
    };

    _check_random_bit(bpm.value, [ 120, 180 ]);
    _check_random_bit(bar_size.value, [ 4, 6 ]);
    _check_random_bit(beat_size.value, [ 4, 8 ]);
    _check_random_bit(tonality.value, [ 5, 7 ]);
    _check_random_bit(chords_0.value, _fix('0002'));
    _check_random_bit(chords_1.value, _fix('0003'));
    _check_random_bit(chords_2.value, _fix('0004'));
    _check_random_bit(chords_3.value, _fix('0005'));
    _check_random_bit(chords_4.value, _fix('0006'));
    _check_random_bit(chords_5.value, _fix('0007'));
    _check_random_bit(chords_6.value, _fix('0008'));
    _check_random_bit(chords_7.value, _fix('0009'));
    _check_random_bit(arpeggio.value, _fix('000a'));
    _check_random_bit(kick_instrument.value, _fix('kick-1'));
    _check_random_bit(kick_rhythm_0.value, _fix('000b'));
    _check_random_bit(kick_rhythm_1.value, _fix('000c'));
    _check_random_bit(kick_rhythm_2.value, _fix('000d'));
    _check_random_bit(kick_rhythm_3.value, _fix('000e'));
    _check_random_bit(kick_rhythm_4.value, _fix('000f'));
    _check_random_bit(kick_rhythm_5.value, _fix('0010'));
    _check_random_bit(kick_rhythm_6.value, _fix('0011'));
    _check_random_bit(kick_rhythm_7.value, _fix('0012'));
    _check_random_bit(snare_instrument.value, _fix('snare-1'));
    _check_random_bit(snare_rhythm_0.value, _fix('0013'));
    _check_random_bit(snare_rhythm_1.value, _fix('0014'));
    _check_random_bit(snare_rhythm_2.value, _fix('0015'));
    _check_random_bit(snare_rhythm_3.value, _fix('0016'));
    _check_random_bit(snare_rhythm_4.value, _fix('0017'));
    _check_random_bit(snare_rhythm_5.value, _fix('0018'));
    _check_random_bit(snare_rhythm_6.value, _fix('0019'));
    _check_random_bit(snare_rhythm_7.value, _fix('001a'));
    _check_random_bit(hihat_instrument.value, _fix('hihat-1'));
    _check_random_bit(hihat_rhythm_0.value, _fix('001b'));
    _check_random_bit(hihat_rhythm_1.value, _fix('001c'));
    _check_random_bit(hihat_rhythm_2.value, _fix('001d'));
    _check_random_bit(hihat_rhythm_3.value, _fix('001e'));
    _check_random_bit(hihat_rhythm_4.value, _fix('001f'));
    _check_random_bit(hihat_rhythm_5.value, _fix('0020'));
    _check_random_bit(hihat_rhythm_6.value, _fix('0021'));
    _check_random_bit(hihat_rhythm_7.value, _fix('0022'));
    _check_random_bit(bass_instrument.value, _fix('bass-1'));
    _check_random_bit(bass_rhythm_0.value, _fix('0023'));
    _check_random_bit(bass_rhythm_1.value, _fix('0024'));
    _check_random_bit(bass_rhythm_2.value, _fix('0025'));
    _check_random_bit(bass_rhythm_3.value, _fix('0026'));
    _check_random_bit(bass_rhythm_4.value, _fix('0027'));
    _check_random_bit(bass_rhythm_5.value, _fix('0028'));
    _check_random_bit(bass_rhythm_6.value, _fix('0029'));
    _check_random_bit(bass_rhythm_7.value, _fix('002a'));
    _check_random_bit(back_instrument.value, _fix('back-1'));
    _check_random_bit(back_rhythm_0.value, _fix('002b'));
    _check_random_bit(back_rhythm_1.value, _fix('002c'));
    _check_random_bit(back_rhythm_2.value, _fix('002d'));
    _check_random_bit(back_rhythm_3.value, _fix('002e'));
    _check_random_bit(back_rhythm_4.value, _fix('002f'));
    _check_random_bit(back_rhythm_5.value, _fix('0030'));
    _check_random_bit(back_rhythm_6.value, _fix('0031'));
    _check_random_bit(back_rhythm_7.value, _fix('0032'));
    _check_random_bit(lead_instrument.value, _fix('lead-1'));
    _check_random_bit(lead_rhythm_0.value, _fix('0033'));
    _check_random_bit(lead_rhythm_1.value, _fix('0034'));
    _check_random_bit(lead_rhythm_2.value, _fix('0035'));
    _check_random_bit(lead_rhythm_3.value, _fix('0036'));
    _check_random_bit(lead_rhythm_4.value, _fix('0037'));
    _check_random_bit(lead_rhythm_5.value, _fix('0038'));
    _check_random_bit(lead_rhythm_6.value, _fix('0039'));
    _check_random_bit(lead_rhythm_7.value, _fix('003a'));

    console.log('      Random bits');
    console.log(`     ${bits}`);
  });


  it('mint hybrid and get change', async function () {
    const library = address(accounts.library);
    const foo     = address(accounts.foo);
    
    const fee   = 500000;
    const price = 1000000;
    const incr  = 100000;

    const tx_set_price = invokeScript(
      { dApp: library,
        call: {
          function: 'set_price_hybrid',
          args: [
            { type: 'string',   value: '' },
            { type: 'integer',  value: price },
            { type: 'integer',  value: incr }
          ]
        } },
      accounts.library);
    await broadcast(tx_set_price);
    await waitForTx(tx_set_price.id);

    const tx_mint_0 = tx_mint_song(library, accounts.library, 120, 4, 4, 5, '_foo');
    await broadcast(tx_mint_0);
    await waitForTx(tx_mint_0.id);
    const song_0 = (await stateChanges(tx_mint_0.id)).invokes[0].stateChanges.issues[0].assetId;

    const tx_mint_1 = tx_mint_song(library, accounts.library, 180, 6, 8, 7, '_bar');
    await broadcast(tx_mint_1);
    await waitForTx(tx_mint_1.id);
    const song_1 = (await stateChanges(tx_mint_1.id)).invokes[0].stateChanges.issues[0].assetId;

    const iTxSend_0 = transfer(
      { assetId: song_0, amount: 1, recipient: foo },
      accounts.library);
    await broadcast(iTxSend_0);
    await waitForTx(iTxSend_0.id);

    const iTxSend_1 = transfer(
      { assetId: song_1, amount: 1, recipient: foo },
      accounts.library);
    await broadcast(iTxSend_1);
    await waitForTx(iTxSend_1.id);

    expect(await assetBalance(song_0, foo)).to.equal(1);
    expect(await assetBalance(song_1, foo)).to.equal(1);

    const n_0 = (await accountDataByKey(song_0, library)).value;
    const n_1 = (await accountDataByKey(song_1, library)).value;

    const tx_mint_hybrid = invokeScript(
      { dApp: library,
        call: {
          function: 'mint_hybrid',
          args: [
            { type: 'string', value: n_0 },
            { type: 'string', value: n_1 }
          ]
        },
        payment: [ { assetId: null, amount: price + price } ]
      },
      accounts.foo);

    const waves_balance_0 = await balance(foo);

    await broadcast(tx_mint_hybrid);
    await waitForTx(tx_mint_hybrid.id);

    const waves_balance_1 = await balance(foo);

    expect(waves_balance_1).to.equal(waves_balance_0 - price - fee);

    const hybrid = (await stateChanges(tx_mint_hybrid.id)).invokes[0].stateChanges.issues[0].assetId;

    const n = (await accountDataByKey(hybrid, library)).value;

    const id                = await accountDataByKey(`${n}`,      library);
    const gen               = await accountDataByKey(`${n}_G`,    library);
    const name              = await accountDataByKey(`${n}_SL`,   library);
    const name_seed         = await accountDataByKey(`${n}_SN`,   library);
    const parent_0          = await accountDataByKey(`${n}_SP0`,  library);
    const parent_1          = await accountDataByKey(`${n}_SP1`,  library);
    const bpm               = await accountDataByKey(`${n}_SB0`,  library);
    const bar_size          = await accountDataByKey(`${n}_SB1`,  library);
    const beat_size         = await accountDataByKey(`${n}_SB2`,  library);
    const tonality          = await accountDataByKey(`${n}_ST`,   library);
    const chords_0          = await accountDataByKey(`${n}_SC0`,  library);
    const chords_1          = await accountDataByKey(`${n}_SC1`,  library);
    const chords_2          = await accountDataByKey(`${n}_SC2`,  library);
    const chords_3          = await accountDataByKey(`${n}_SC3`,  library);
    const chords_4          = await accountDataByKey(`${n}_SC4`,  library);
    const chords_5          = await accountDataByKey(`${n}_SC5`,  library);
    const chords_6          = await accountDataByKey(`${n}_SC6`,  library);
    const chords_7          = await accountDataByKey(`${n}_SC7`,  library);
    const arpeggio          = await accountDataByKey(`${n}_SA`,   library);
    const kick_instrument   = await accountDataByKey(`${n}_SI0`,  library);
    const kick_rhythm_0     = await accountDataByKey(`${n}_SI00`, library);
    const kick_rhythm_1     = await accountDataByKey(`${n}_SI01`, library);
    const kick_rhythm_2     = await accountDataByKey(`${n}_SI02`, library);
    const kick_rhythm_3     = await accountDataByKey(`${n}_SI03`, library);
    const kick_rhythm_4     = await accountDataByKey(`${n}_SI04`, library);
    const kick_rhythm_5     = await accountDataByKey(`${n}_SI05`, library);
    const kick_rhythm_6     = await accountDataByKey(`${n}_SI06`, library);
    const kick_rhythm_7     = await accountDataByKey(`${n}_SI07`, library);
    const snare_instrument  = await accountDataByKey(`${n}_SI1`,  library);
    const snare_rhythm_0    = await accountDataByKey(`${n}_SI10`, library);
    const snare_rhythm_1    = await accountDataByKey(`${n}_SI11`, library);
    const snare_rhythm_2    = await accountDataByKey(`${n}_SI12`, library);
    const snare_rhythm_3    = await accountDataByKey(`${n}_SI13`, library);
    const snare_rhythm_4    = await accountDataByKey(`${n}_SI14`, library);
    const snare_rhythm_5    = await accountDataByKey(`${n}_SI15`, library);
    const snare_rhythm_6    = await accountDataByKey(`${n}_SI16`, library);
    const snare_rhythm_7    = await accountDataByKey(`${n}_SI17`, library);
    const hihat_instrument  = await accountDataByKey(`${n}_SI2`,  library);
    const hihat_rhythm_0    = await accountDataByKey(`${n}_SI20`, library);
    const hihat_rhythm_1    = await accountDataByKey(`${n}_SI21`, library);
    const hihat_rhythm_2    = await accountDataByKey(`${n}_SI22`, library);
    const hihat_rhythm_3    = await accountDataByKey(`${n}_SI23`, library);
    const hihat_rhythm_4    = await accountDataByKey(`${n}_SI24`, library);
    const hihat_rhythm_5    = await accountDataByKey(`${n}_SI25`, library);
    const hihat_rhythm_6    = await accountDataByKey(`${n}_SI26`, library);
    const hihat_rhythm_7    = await accountDataByKey(`${n}_SI27`, library);
    const bass_instrument   = await accountDataByKey(`${n}_SI3`,  library);
    const bass_rhythm_0     = await accountDataByKey(`${n}_SI30`, library);
    const bass_rhythm_1     = await accountDataByKey(`${n}_SI31`, library);
    const bass_rhythm_2     = await accountDataByKey(`${n}_SI32`, library);
    const bass_rhythm_3     = await accountDataByKey(`${n}_SI33`, library);
    const bass_rhythm_4     = await accountDataByKey(`${n}_SI34`, library);
    const bass_rhythm_5     = await accountDataByKey(`${n}_SI35`, library);
    const bass_rhythm_6     = await accountDataByKey(`${n}_SI36`, library);
    const bass_rhythm_7     = await accountDataByKey(`${n}_SI37`, library);
    const back_instrument   = await accountDataByKey(`${n}_SI4`,  library);
    const back_rhythm_0     = await accountDataByKey(`${n}_SI40`, library);
    const back_rhythm_1     = await accountDataByKey(`${n}_SI41`, library);
    const back_rhythm_2     = await accountDataByKey(`${n}_SI42`, library);
    const back_rhythm_3     = await accountDataByKey(`${n}_SI43`, library);
    const back_rhythm_4     = await accountDataByKey(`${n}_SI44`, library);
    const back_rhythm_5     = await accountDataByKey(`${n}_SI45`, library);
    const back_rhythm_6     = await accountDataByKey(`${n}_SI46`, library);
    const back_rhythm_7     = await accountDataByKey(`${n}_SI47`, library);
    const lead_instrument   = await accountDataByKey(`${n}_SI5`,  library);
    const lead_rhythm_0     = await accountDataByKey(`${n}_SI50`, library);
    const lead_rhythm_1     = await accountDataByKey(`${n}_SI51`, library);
    const lead_rhythm_2     = await accountDataByKey(`${n}_SI52`, library);
    const lead_rhythm_3     = await accountDataByKey(`${n}_SI53`, library);
    const lead_rhythm_4     = await accountDataByKey(`${n}_SI54`, library);
    const lead_rhythm_5     = await accountDataByKey(`${n}_SI55`, library);
    const lead_rhythm_6     = await accountDataByKey(`${n}_SI56`, library);
    const lead_rhythm_7     = await accountDataByKey(`${n}_SI57`, library);
    const asset_balance     = await assetBalance(hybrid, foo);

    expect(id.value).to.be.equal(hybrid);
    expect(gen.value).to.be.equal(2);
    expect(name.value).to.be.equal('');
    expect(name_seed.type).to.be.equal('integer');
    expect(parent_0.value).to.equal(n_0);
    expect(parent_1.value).to.equal(n_1);
    expect(asset_balance).to.equal(1);

    const _fix = (s) => {
      return [ s + '_foo', s + '_bar' ];
    };

    let bits = '';

    const _check_random_bit = (value, vars) => {
      if (value === vars[0])
        bits = `${bits} 0`
      else
        bits = `${bits} 1`

      expect(value).to.be.oneOf(vars);
    };

    _check_random_bit(bpm.value, [ 120, 180 ]);
    _check_random_bit(bar_size.value, [ 4, 6 ]);
    _check_random_bit(beat_size.value, [ 4, 8 ]);
    _check_random_bit(tonality.value, [ 5, 7 ]);
    _check_random_bit(chords_0.value, _fix('0002'));
    _check_random_bit(chords_1.value, _fix('0003'));
    _check_random_bit(chords_2.value, _fix('0004'));
    _check_random_bit(chords_3.value, _fix('0005'));
    _check_random_bit(chords_4.value, _fix('0006'));
    _check_random_bit(chords_5.value, _fix('0007'));
    _check_random_bit(chords_6.value, _fix('0008'));
    _check_random_bit(chords_7.value, _fix('0009'));
    _check_random_bit(arpeggio.value, _fix('000a'));
    _check_random_bit(kick_instrument.value, _fix('kick-1'));
    _check_random_bit(kick_rhythm_0.value, _fix('000b'));
    _check_random_bit(kick_rhythm_1.value, _fix('000c'));
    _check_random_bit(kick_rhythm_2.value, _fix('000d'));
    _check_random_bit(kick_rhythm_3.value, _fix('000e'));
    _check_random_bit(kick_rhythm_4.value, _fix('000f'));
    _check_random_bit(kick_rhythm_5.value, _fix('0010'));
    _check_random_bit(kick_rhythm_6.value, _fix('0011'));
    _check_random_bit(kick_rhythm_7.value, _fix('0012'));
    _check_random_bit(snare_instrument.value, _fix('snare-1'));
    _check_random_bit(snare_rhythm_0.value, _fix('0013'));
    _check_random_bit(snare_rhythm_1.value, _fix('0014'));
    _check_random_bit(snare_rhythm_2.value, _fix('0015'));
    _check_random_bit(snare_rhythm_3.value, _fix('0016'));
    _check_random_bit(snare_rhythm_4.value, _fix('0017'));
    _check_random_bit(snare_rhythm_5.value, _fix('0018'));
    _check_random_bit(snare_rhythm_6.value, _fix('0019'));
    _check_random_bit(snare_rhythm_7.value, _fix('001a'));
    _check_random_bit(hihat_instrument.value, _fix('hihat-1'));
    _check_random_bit(hihat_rhythm_0.value, _fix('001b'));
    _check_random_bit(hihat_rhythm_1.value, _fix('001c'));
    _check_random_bit(hihat_rhythm_2.value, _fix('001d'));
    _check_random_bit(hihat_rhythm_3.value, _fix('001e'));
    _check_random_bit(hihat_rhythm_4.value, _fix('001f'));
    _check_random_bit(hihat_rhythm_5.value, _fix('0020'));
    _check_random_bit(hihat_rhythm_6.value, _fix('0021'));
    _check_random_bit(hihat_rhythm_7.value, _fix('0022'));
    _check_random_bit(bass_instrument.value, _fix('bass-1'));
    _check_random_bit(bass_rhythm_0.value, _fix('0023'));
    _check_random_bit(bass_rhythm_1.value, _fix('0024'));
    _check_random_bit(bass_rhythm_2.value, _fix('0025'));
    _check_random_bit(bass_rhythm_3.value, _fix('0026'));
    _check_random_bit(bass_rhythm_4.value, _fix('0027'));
    _check_random_bit(bass_rhythm_5.value, _fix('0028'));
    _check_random_bit(bass_rhythm_6.value, _fix('0029'));
    _check_random_bit(bass_rhythm_7.value, _fix('002a'));
    _check_random_bit(back_instrument.value, _fix('back-1'));
    _check_random_bit(back_rhythm_0.value, _fix('002b'));
    _check_random_bit(back_rhythm_1.value, _fix('002c'));
    _check_random_bit(back_rhythm_2.value, _fix('002d'));
    _check_random_bit(back_rhythm_3.value, _fix('002e'));
    _check_random_bit(back_rhythm_4.value, _fix('002f'));
    _check_random_bit(back_rhythm_5.value, _fix('0030'));
    _check_random_bit(back_rhythm_6.value, _fix('0031'));
    _check_random_bit(back_rhythm_7.value, _fix('0032'));
    _check_random_bit(lead_instrument.value, _fix('lead-1'));
    _check_random_bit(lead_rhythm_0.value, _fix('0033'));
    _check_random_bit(lead_rhythm_1.value, _fix('0034'));
    _check_random_bit(lead_rhythm_2.value, _fix('0035'));
    _check_random_bit(lead_rhythm_3.value, _fix('0036'));
    _check_random_bit(lead_rhythm_4.value, _fix('0037'));
    _check_random_bit(lead_rhythm_5.value, _fix('0038'));
    _check_random_bit(lead_rhythm_6.value, _fix('0039'));
    _check_random_bit(lead_rhythm_7.value, _fix('003a'));

    console.log('      Random bits');
    console.log(`     ${bits}`);
  });

  it('can not mint hybrid if do not own first song', async function () {
    const price = 1000;
    const incr  = 100;

    const library = address(accounts.library);
    const foo     = address(accounts.foo);
    
    const tx_set_price = invokeScript(
      { dApp: library,
        call: {
          function: 'set_price_hybrid',
          args: [
            { type: 'string',   value: '' },
            { type: 'integer',  value: price },
            { type: 'integer',  value: incr }
          ]
        } },
      accounts.library);
    await broadcast(tx_set_price);
    await waitForTx(tx_set_price.id);

    const tx_mint_0 = tx_mint_song(library, accounts.library, 120, 4, 4, 5, '_foo');
    await broadcast(tx_mint_0);
    await waitForTx(tx_mint_0.id);
    const song_0 = (await stateChanges(tx_mint_0.id)).invokes[0].stateChanges.issues[0].assetId;

    const tx_mint_1 = tx_mint_song(library, accounts.library, 180, 6, 8, 7, '_bar');
    await broadcast(tx_mint_1);
    await waitForTx(tx_mint_1.id);
    const song_1 = (await stateChanges(tx_mint_1.id)).invokes[0].stateChanges.issues[0].assetId;

    expect(await assetBalance(song_0, foo)).to.equal(0);
    expect(await assetBalance(song_1, foo)).to.equal(0);

    const n_0 = (await accountDataByKey(song_0, library)).value;
    const n_1 = (await accountDataByKey(song_1, library)).value;

    const tx_mint_hybrid = invokeScript(
      { dApp: library,
        call: {
          function: 'mint_hybrid',
          args: [
            { type: 'string', value: n_0 },
            { type: 'string', value: n_1 }
          ]
        },
        payment: [ { assetId: null, amount: price } ]
      },
      accounts.foo);

    await expect(broadcast(tx_mint_hybrid)).to.be.rejectedWith('Caller do not own first song');
  });

  it('can not mint hybrid if do not own second song', async function () {
    const price = 1000;
    const incr  = 100;

    const library = address(accounts.library);
    const foo     = address(accounts.foo);
    
    const tx_set_price = invokeScript(
      { dApp: library,
        call: {
          function: 'set_price_hybrid',
          args: [
            { type: 'string',   value: '' },
            { type: 'integer',  value: price },
            { type: 'integer',  value: incr }
          ]
        } },
      accounts.library);
    await broadcast(tx_set_price);
    await waitForTx(tx_set_price.id);

    const tx_mint_0 = tx_mint_song(library, accounts.library, 120, 4, 4, 5, '_foo');
    await broadcast(tx_mint_0);
    await waitForTx(tx_mint_0.id);
    const song_0 = (await stateChanges(tx_mint_0.id)).invokes[0].stateChanges.issues[0].assetId;

    const tx_mint_1 = tx_mint_song(library, accounts.library, 180, 6, 8, 7, '_bar');
    await broadcast(tx_mint_1);
    await waitForTx(tx_mint_1.id);
    const song_1 = (await stateChanges(tx_mint_1.id)).invokes[0].stateChanges.issues[0].assetId;

    const iTxSend_0 = transfer(
      { assetId: song_0, amount: 1, recipient: foo },
      accounts.library);
    await broadcast(iTxSend_0);
    await waitForTx(iTxSend_0.id);

    expect(await assetBalance(song_0, foo)).to.equal(1);
    expect(await assetBalance(song_1, foo)).to.equal(0);

    const n_0 = (await accountDataByKey(song_0, library)).value;
    const n_1 = (await accountDataByKey(song_1, library)).value;

    const tx_mint_hybrid = invokeScript(
      { dApp: library,
        call: {
          function: 'mint_hybrid',
          args: [
            { type: 'string', value: n_0 },
            { type: 'string', value: n_1 }
          ]
        },
        payment: [ { assetId: null, amount: price } ]
      },
      accounts.foo);

    await expect(broadcast(tx_mint_hybrid)).to.be.rejectedWith('Caller do not own second song');
  });

  it('can not mint hybrid if payment amount is wrong', async function () {
    const price = 1000;
    const incr  = 100;

    const library = address(accounts.library);
    const foo     = address(accounts.foo);
    
    const tx_set_price = invokeScript(
      { dApp: library,
        call: {
          function: 'set_price_hybrid',
          args: [
            { type: 'string',   value: '' },
            { type: 'integer',  value: price },
            { type: 'integer',  value: incr }
          ]
        } },
      accounts.library);
    await broadcast(tx_set_price);
    await waitForTx(tx_set_price.id);

    const tx_mint_0 = tx_mint_song(library, accounts.library, 120, 4, 4, 5, '_foo');
    await broadcast(tx_mint_0);
    await waitForTx(tx_mint_0.id);
    const song_0 = (await stateChanges(tx_mint_0.id)).invokes[0].stateChanges.issues[0].assetId;

    const tx_mint_1 = tx_mint_song(library, accounts.library, 180, 6, 8, 7, '_bar');
    await broadcast(tx_mint_1);
    await waitForTx(tx_mint_1.id);
    const song_1 = (await stateChanges(tx_mint_1.id)).invokes[0].stateChanges.issues[0].assetId;

    const iTxSend_0 = transfer(
      { assetId: song_0, amount: 1, recipient: foo },
      accounts.library);
    await broadcast(iTxSend_0);
    await waitForTx(iTxSend_0.id);

    const iTxSend_1 = transfer(
      { assetId: song_1, amount: 1, recipient: foo },
      accounts.library);
    await broadcast(iTxSend_1);
    await waitForTx(iTxSend_1.id);

    expect(await assetBalance(song_0, foo)).to.equal(1);
    expect(await assetBalance(song_1, foo)).to.equal(1);

    const n_0 = (await accountDataByKey(song_0, library)).value;
    const n_1 = (await accountDataByKey(song_1, library)).value;

    const tx_mint_hybrid = invokeScript(
      { dApp: library,
        call: {
          function: 'mint_hybrid',
          args: [
            { type: 'string', value: n_0 },
            { type: 'string', value: n_1 }
          ]
        },
        payment: [ { assetId: null, amount: price - 1 } ]
      },
      accounts.foo);

    await expect(broadcast(tx_mint_hybrid)).to.be.rejectedWith('Wrong payment');
  });

  it('can not mint hybrid if payment token is wrong', async function () {
    const price = 1000;
    const incr  = 100;

    const library = address(accounts.library);
    const foo     = address(accounts.foo);
    
    const tx_set_price = invokeScript(
      { dApp: library,
        call: {
          function: 'set_price_hybrid',
          args: [
            { type: 'string',   value: '' },
            { type: 'integer',  value: price },
            { type: 'integer',  value: incr }
          ]
        } },
      accounts.library);
    await broadcast(tx_set_price);
    await waitForTx(tx_set_price.id);

    const tx_mint_0 = tx_mint_song(library, accounts.library, 120, 4, 4, 5, '_foo');
    await broadcast(tx_mint_0);
    await waitForTx(tx_mint_0.id);
    const song_0 = (await stateChanges(tx_mint_0.id)).invokes[0].stateChanges.issues[0].assetId;

    const tx_mint_1 = tx_mint_song(library, accounts.library, 180, 6, 8, 7, '_bar');
    await broadcast(tx_mint_1);
    await waitForTx(tx_mint_1.id);
    const song_1 = (await stateChanges(tx_mint_1.id)).invokes[0].stateChanges.issues[0].assetId;

    const iTxSend_0 = transfer(
      { assetId: song_0, amount: 1, recipient: foo },
      accounts.library);
    await broadcast(iTxSend_0);
    await waitForTx(iTxSend_0.id);

    const iTxSend_1 = transfer(
      { assetId: song_1, amount: 1, recipient: foo },
      accounts.library);
    await broadcast(iTxSend_1);
    await waitForTx(iTxSend_1.id);

    expect(await assetBalance(song_0, foo)).to.equal(1);
    expect(await assetBalance(song_1, foo)).to.equal(1);

    const n_0 = (await accountDataByKey(song_0, library)).value;
    const n_1 = (await accountDataByKey(song_1, library)).value;

    const tx_mint_hybrid = invokeScript(
      { dApp: library,
        call: {
          function: 'mint_hybrid',
          args: [
            { type: 'string', value: n_0 },
            { type: 'string', value: n_1 }
          ]
        },
        payment: [ { assetId: song_0, amount: 1 } ]
      },
      accounts.foo);

    await expect(broadcast(tx_mint_hybrid)).to.be.rejectedWith('Wrong payment');
  });

  it('can not mint hybrid if payment size is wrong', async function () {
    const price = 1000;
    const incr  = 100;

    const library = address(accounts.library);
    const foo     = address(accounts.foo);
    
    const tx_set_price = invokeScript(
      { dApp: library,
        call: {
          function: 'set_price_hybrid',
          args: [
            { type: 'string',   value: '' },
            { type: 'integer',  value: price },
            { type: 'integer',  value: incr }
          ]
        } },
      accounts.library);
    await broadcast(tx_set_price);
    await waitForTx(tx_set_price.id);

    const tx_mint_0 = tx_mint_song(library, accounts.library, 120, 4, 4, 5, '_foo');
    await broadcast(tx_mint_0);
    await waitForTx(tx_mint_0.id);
    const song_0 = (await stateChanges(tx_mint_0.id)).invokes[0].stateChanges.issues[0].assetId;

    const tx_mint_1 = tx_mint_song(library, accounts.library, 180, 6, 8, 7, '_bar');
    await broadcast(tx_mint_1);
    await waitForTx(tx_mint_1.id);
    const song_1 = (await stateChanges(tx_mint_1.id)).invokes[0].stateChanges.issues[0].assetId;

    const iTxSend_0 = transfer(
      { assetId: song_0, amount: 1, recipient: foo },
      accounts.library);
    await broadcast(iTxSend_0);
    await waitForTx(iTxSend_0.id);

    const iTxSend_1 = transfer(
      { assetId: song_1, amount: 1, recipient: foo },
      accounts.library);
    await broadcast(iTxSend_1);
    await waitForTx(iTxSend_1.id);

    expect(await assetBalance(song_0, foo)).to.equal(1);
    expect(await assetBalance(song_1, foo)).to.equal(1);

    const n_0 = (await accountDataByKey(song_0, library)).value;
    const n_1 = (await accountDataByKey(song_1, library)).value;

    const tx_mint_hybrid = invokeScript(
      { dApp: library,
        call: {
          function: 'mint_hybrid',
          args: [
            { type: 'string', value: n_0 },
            { type: 'string', value: n_1 }
          ]
        },
        payment: [
          { assetId: null, amount: price / 2 },
          { assetId: null, amount: price / 2 }
        ]
      },
      accounts.foo);

    await expect(broadcast(tx_mint_hybrid)).to.be.rejectedWith('Wrong payment');
  });

  it('pay for hybrid with usdn', async function () {
    const library = address(accounts.library);
    const foo     = address(accounts.foo);
    
    const price         = 1000000;
    const incr          = 100000;
    const usdn_quantity = 100000000;

    const tx_issue_usdn = issue(
      { name:         'USDN',
        description:  'Fake USDN token for testing',
        quantity:     usdn_quantity,
        reissuable:   true
      },
      accounts.foo);
    await broadcast(tx_issue_usdn);
    await waitForTx(tx_issue_usdn.id);

    const usdn          = (await transactionById(tx_issue_usdn.id)).assetId;
    const usdn_balance  = await assetBalance(usdn, foo);

    expect(usdn_balance).to.equal(usdn_quantity);

    const tx_set_price = invokeScript(
      { dApp: library,
        call: {
          function: 'set_price_hybrid',
          args: [
            { type: 'string',   value: usdn },
            { type: 'integer',  value: price },
            { type: 'integer',  value: incr }
          ]
        } },
      accounts.library);
    await broadcast(tx_set_price);
    await waitForTx(tx_set_price.id);

    expect((await accountDataByKey(`price_hybrid_token`, library)).value).to.equal(usdn);
    expect((await accountDataByKey(`price_hybrid_amount`, library)).value).to.equal(price);

    const tx_mint_0 = tx_mint_song(library, accounts.library, 120, 4, 4, 5, '_foo');
    await broadcast(tx_mint_0);
    await waitForTx(tx_mint_0.id);
    const song_0 = (await stateChanges(tx_mint_0.id)).invokes[0].stateChanges.issues[0].assetId;

    const tx_mint_1 = tx_mint_song(library, accounts.library, 180, 6, 8, 7, '_bar');
    await broadcast(tx_mint_1);
    await waitForTx(tx_mint_1.id);
    const song_1 = (await stateChanges(tx_mint_1.id)).invokes[0].stateChanges.issues[0].assetId;

    const tx_send_0 = transfer(
      { assetId: song_0, amount: 1, recipient: foo },
      accounts.library);
    await broadcast(tx_send_0);
    await waitForTx(tx_send_0.id);

    const tx_send_1 = transfer(
      { assetId: song_1, amount: 1, recipient: foo },
      accounts.library);
    await broadcast(tx_send_1);
    await waitForTx(tx_send_1.id);

    expect(await assetBalance(song_0, foo)).to.equal(1);
    expect(await assetBalance(song_1, foo)).to.equal(1);

    const n_0 = (await accountDataByKey(song_0, library)).value;
    const n_1 = (await accountDataByKey(song_1, library)).value;

    const tx_mint_hybrid = invokeScript(
      { dApp: library,
        call: {
          function: 'mint_hybrid',
          args: [
            { type: 'string', value: n_0 },
            { type: 'string', value: n_1 }
          ]
        },
        payment: [ { assetId: usdn, amount: price + price } ]
      },
      accounts.foo);

    await broadcast(tx_mint_hybrid);
    await waitForTx(tx_mint_hybrid.id);
    const hybrid = (await stateChanges(tx_mint_hybrid.id)).invokes[0].stateChanges.issues[0].assetId;

    const n = (await accountDataByKey(hybrid, library)).value;

    const id              = await accountDataByKey(`${n}`,      library);
    const asset_balance   = await assetBalance(hybrid, foo);
    const usdn_balance_1  = await assetBalance(usdn, foo);

    expect(id.value).to.be.equal(hybrid);
    expect(asset_balance).to.equal(1);
    expect(usdn_balance_1).to.equal(usdn_balance - price);
  });

  it('mint hybrid and burn', async function () {
    const library = address(accounts.library);
    const foo     = address(accounts.foo);

    const tx_mint_0 = tx_mint_song(library, accounts.library, 120, 4, 4, 5, '_foo');
    await broadcast(tx_mint_0);
    await waitForTx(tx_mint_0.id);
    const song_0 = (await stateChanges(tx_mint_0.id)).invokes[0].stateChanges.issues[0].assetId;

    const tx_mint_1 = tx_mint_song(library, accounts.library, 180, 6, 8, 7, '_bar');
    await broadcast(tx_mint_1);
    await waitForTx(tx_mint_1.id);
    const song_1 = (await stateChanges(tx_mint_1.id)).invokes[0].stateChanges.issues[0].assetId;

    const tx_send_0 = transfer(
      { assetId: song_0, amount: 1, recipient: foo },
      accounts.library);
    await broadcast(tx_send_0);
    await waitForTx(tx_send_0.id);

    const tx_send_1 = transfer(
      { assetId: song_1, amount: 1, recipient: foo },
      accounts.library);
    await broadcast(tx_send_1);
    await waitForTx(tx_send_1.id);

    expect(await assetBalance(song_0, foo)).to.equal(1);
    expect(await assetBalance(song_1, foo)).to.equal(1);

    const tx_mint_hybrid = invokeScript(
      { dApp: library,
        call: {
          function: 'mint_hybrid_and_burn',
          args: [ ]
        },
        payment: [
          { assetId: song_0, amount: 1 },
          { assetId: song_1, amount: 1 }
        ]
      },
      accounts.foo);

    await broadcast(tx_mint_hybrid);
    await waitForTx(tx_mint_hybrid.id);
    const hybrid = (await stateChanges(tx_mint_hybrid.id)).invokes[2].stateChanges.issues[0].assetId;

    const n = (await accountDataByKey(hybrid, library)).value;

    const id        = await accountDataByKey(`${n}`, library);
    const balance_0 = await assetBalance(song_0, foo);
    const balance_1 = await assetBalance(song_1, foo);
    const balance_2 = await assetBalance(hybrid, foo);

    expect(id.value).to.be.equal(hybrid);
    expect(balance_0).to.be.equal(0);
    expect(balance_1).to.be.equal(0);
    expect(balance_2).to.be.equal(1);
  });

  it('after 10 hybrids price will increase', async function () {
    const library = address(accounts.library);
    const foo     = address(accounts.foo);

    const fee   = 500000;
    const price = 1000000;
    const incr  = 100000;

    const tx_set_price = invokeScript(
      { dApp: library,
        call: {
          function: 'set_price_hybrid',
          args: [
            { type: 'string',   value: '' },
            { type: 'integer',  value: price },
            { type: 'integer',  value: incr }
          ]
        } },
      accounts.library);
    await broadcast(tx_set_price);
    await waitForTx(tx_set_price.id);

    const tx_mint_0 = tx_mint_song(library, accounts.library, 120, 4, 4, 5, '_foo');
    await broadcast(tx_mint_0);
    await waitForTx(tx_mint_0.id);
    const song_0 = (await stateChanges(tx_mint_0.id)).invokes[0].stateChanges.issues[0].assetId;

    const tx_mint_1 = tx_mint_song(library, accounts.library, 180, 6, 8, 7, '_bar');
    await broadcast(tx_mint_1);
    await waitForTx(tx_mint_1.id);
    const song_1 = (await stateChanges(tx_mint_1.id)).invokes[0].stateChanges.issues[0].assetId;

    const iTxSend_0 = transfer(
      { assetId: song_0, amount: 1, recipient: foo },
      accounts.library);
    await broadcast(iTxSend_0);
    await waitForTx(iTxSend_0.id);

    const iTxSend_1 = transfer(
      { assetId: song_1, amount: 1, recipient: foo },
      accounts.library);
    await broadcast(iTxSend_1);
    await waitForTx(iTxSend_1.id);

    expect(await assetBalance(song_0, foo)).to.equal(1);
    expect(await assetBalance(song_1, foo)).to.equal(1);

    const n_0 = (await accountDataByKey(song_0, library)).value;
    const n_1 = (await accountDataByKey(song_1, library)).value;

    let tx_wait = [];

    for (let i = 0; i < 10; i++) {
      const tx_mint_hybrid = invokeScript(
        { dApp: library,
          call: {
            function: 'mint_hybrid',
            args: [
              { type: 'string', value: n_0 },
              { type: 'string', value: n_1 }
            ]
          },
          payment: [ { assetId: null, amount: price + incr } ],
          feeAssetId: 'WAVES',
          fee:        fee,
        },
        accounts.foo);

      await broadcast(tx_mint_hybrid);

      tx_wait.push(waitForTx(tx_mint_hybrid.id));
    }

    await Promise.all(tx_wait);

    const price_token     = await accountDataByKey(`price_hybrid_token`,      library);
    const price_amount    = await accountDataByKey(`price_hybrid_amount`,     library);
    const price_increment = await accountDataByKey(`price_hybrid_increment`,  library);

    expect(price_token.value).to.equal('');
    expect(price_amount.value).to.equal(price + price_increment.value);
  });
});

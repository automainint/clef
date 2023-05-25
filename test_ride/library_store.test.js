const wvs = 10 ** 8;

describe('Library Store', async function () {
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
      await waitForTx(tx.id);
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

    const tx_set_image = invokeScript(
      { dApp: address(accounts.library),
        call: {
          function: 'set_market_image',
          args: [
            { type: 'string',   value: 'foo' }
          ]
        } },
      accounts.library);

    await broadcast(tx_set_image);
    await waitForTx(tx_set_image.id);
  });

  it('can not add song to store if not contract owner', async function () {
    const library = address(accounts.library);

    const tx_set_daemon = invokeScript(
      { dApp: library,
        call: {
          function: 'store_add_song',
          args: [
            { type: 'string',   value: '11111foo' },
            { type: 'integer',  value: 10 },
            { type: 'string',   value: '11111bar' },
            { type: 'integer',  value: 500 }
          ]
        } },
      accounts.bar);

    await expect(broadcast(tx_set_daemon)).to.be.rejectedWith('Caller not in whitelist');
  });

  it('add song to store', async function () {
    const library = address(accounts.library);

    const tx_add_song = invokeScript(
      { dApp: library,
        call: {
          function: 'store_add_song',
          args: [
            { type: 'string',   value: '11111foo' },
            { type: 'integer',  value: 10 },
            { type: 'string',   value: '11111bar' },
            { type: 'integer',  value: 500 }
          ]
        } },
      accounts.library);

    await broadcast(tx_add_song);
    await waitForTx(tx_add_song.id);

    const amount        = await accountDataByKey(`SA_11111foo`, library); 
    const price_token   = await accountDataByKey(`ST_11111foo`, library); 
    const price_amount  = await accountDataByKey(`SP_11111foo`, library); 

    expect(amount.value).to.equal(10);
    expect(price_token.value).to.equal('11111bar');
    expect(price_amount.value).to.equal(500);
  });

  it('mint song from store', async function () {
    const library = address(accounts.library);
    const foo     = address(accounts.foo);

    const fee   = 500000;
    const price = 1000000;

    const tx_mint = tx_mint_song(library, accounts.library, 123, 4, 8, 7, '');

    await broadcast(tx_mint);
    await waitForTx(tx_mint.id);

    const changes = await stateChanges(tx_mint.id);

    const asset_id = changes.invokes[0].stateChanges.issues[0].assetId;

    const tx_add_song = invokeScript(
      { dApp: library,
        call: {
          function: 'store_add_song',
          args: [
            { type: 'string',   value: asset_id },
            { type: 'integer',  value: 10 },
            { type: 'string',   value: '' },
            { type: 'integer',  value: price }
          ]
        } },
      accounts.library);

    await broadcast(tx_add_song);
    await waitForTx(tx_add_song.id);

    const tx_store_mint = invokeScript(
      { dApp: library,
        call: {
          function: 'store_mint_song',
          args: [
            { type: 'string', value: asset_id }
          ]
        },
        payment:    [ { assetId: null, amount: price } ],
        feeAssetId: 'WAVES',
        fee:        fee
      },
      accounts.foo);

    const waves_balance_0 = await balance(foo);

    await broadcast(tx_store_mint);
    await waitForTx(tx_store_mint.id);

    const waves_balance_1 = await balance(foo);

    expect(waves_balance_1).to.equal(waves_balance_0 - price - fee);

    const new_song_id   = (await stateChanges(tx_store_mint.id)).invokes[0].stateChanges.issues[0].assetId;
    const asset_balance = await assetBalance(new_song_id, foo);
    const amount        = await accountDataByKey(`SA_${asset_id}`, library); 

    expect(amount.value).to.equal(9);
    expect(asset_balance).to.equal(1);

    const n = (await accountDataByKey(`${new_song_id}`, library)).value;

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

    expect(id.value).to.equal(new_song_id);
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
  });
});

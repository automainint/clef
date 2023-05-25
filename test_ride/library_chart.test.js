const wvs = 10 ** 8;

describe('Library Chart', async function () {
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

  it('Chart likes', async function () {
    const library = address(accounts.library);
    const foo     = address(accounts.foo);
    const bar     = address(accounts.bar);

    const tx_mint = tx_mint_song(library, accounts.library, 123, 4, 8, 7, '');
    await broadcast(tx_mint);
    await waitForTx(tx_mint.id);
    const changes = await stateChanges(tx_mint.id);
    const asset_id = changes.invokes[0].stateChanges.issues[0].assetId;

    let amount, like;

    const tx_0 = invokeScript(
      { dApp: library,
        call: {
          function: 'chart_like_add',
          args: [
            { type: 'string', value: asset_id }
          ]
        } },
      accounts.foo);

    await broadcast(tx_0);
    await waitForTx(tx_0.id);

    amount  = await accountDataByKey(`CN_${asset_id}`,        library);
    like    = await accountDataByKey(`CL_${asset_id}_${foo}`, library);

    expect(amount.value).to.equal(1);
    expect(like.value).to.equal(true);

    const tx_1 = invokeScript(
      { dApp: library,
        call: {
          function: 'chart_like_add',
          args: [
            { type: 'string', value: asset_id }
          ]
        } },
      accounts.bar);

    await broadcast(tx_1);
    await waitForTx(tx_1.id);

    amount  = await accountDataByKey(`CN_${asset_id}`,        library);
    like    = await accountDataByKey(`CL_${asset_id}_${bar}`, library);

    expect(amount.value).to.equal(2);
    expect(like.value).to.equal(true);

    const tx_2 = invokeScript(
      { dApp: library,
        call: {
          function: 'chart_like_add',
          args: [
            { type: 'string', value: asset_id }
          ]
        } },
      accounts.foo);

    await expect(broadcast(tx_2)).to.be.rejectedWith('Already have a like');

    const tx_3 = invokeScript(
      { dApp: library,
        call: {
          function: 'chart_like_remove',
          args: [
            { type: 'string', value: asset_id }
          ]
        } },
      accounts.foo);

    await broadcast(tx_3);
    await waitForTx(tx_3.id);

    amount  = await accountDataByKey(`CN_${asset_id}`,        library);
    like    = await accountDataByKey(`CL_${asset_id}_${foo}`, library);

    expect(amount.value).to.equal(1);
    expect(like.value).to.equal(false);

    const tx_4 = invokeScript(
      { dApp: library,
        call: {
          function: 'chart_like_remove',
          args: [
            { type: 'string', value: asset_id }
          ]
        } },
      accounts.foo);

    await expect(broadcast(tx_4)).to.be.rejectedWith('Do not have a like');
  });
});

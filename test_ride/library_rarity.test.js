const wvs = 10 ** 8;

describe('Library Rarity', async function () {
  this.timeout(300000);

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
  });

  it('can not set daemon if not contract owner', async function () {
    const library = address(accounts.library);
    const foo     = address(accounts.foo);

    const tx_set_daemon = invokeScript(
      { dApp: library,
        call: {
          function: 'set_daemon',
          args: [
            { type: 'string', value: foo }
          ]
        } },
      accounts.bar);

    await expect(broadcast(tx_set_daemon)).to.be.rejectedWith('Caller is not dApp owner');
  });

  it('can not set rarity if not daemon', async function () {
    const library = address(accounts.library);

    const tx_set_rarity = invokeScript(
      { dApp: library,
        call: {
          function: 'set_rarity',
          args: [
            { type: 'list', value: [
              { type: 'string', value: '11111111' }
            ] },
            { type: 'list', value: [
              { type: 'integer', value: 100 }
            ] }
          ]
        } },
      accounts.bar);

    await expect(broadcast(tx_set_rarity)).to.be.rejectedWith('Caller is not daemon');
  });

  it('set daemon and set rarity', async function () {
    const library = address(accounts.library);
    const foo     = address(accounts.foo);

    const tx_set_daemon = invokeScript(
      { dApp: library,
        call: {
          function: 'set_daemon',
          args: [
            { type: 'string', value: foo }
          ]
        } },
      accounts.library);

    await broadcast(tx_set_daemon);
    await waitForTx(tx_set_daemon.id);

    const tx_set_rarity = invokeScript(
      { dApp: library,
        call: {
          function: 'set_rarity',
          args: [
            { type: 'list', value: [
              { type: 'string', value: 'CSB5QjKAYeY5BCK4EyLC66fKn5QWX73HAXhn4pNb9HD' },
              { type: 'string', value: 'CSB5QjKAYeY5BCK4EyLC66fKn5QWX73HAXhn4pNb9HE' },
              { type: 'string', value: 'CSB5QjKAYeY5BCK4EyLC66fKn5QWX73HAXhn4pNb9HF' },
              { type: 'string', value: 'CSB5QjKAYeY5BCK4EyLC66fKn5QWX73HAXhn4pNb9HG' }
            ] },
            { type: 'list', value: [
              { type: 'integer', value: 100 },
              { type: 'integer', value: 50 },
              { type: 'integer', value: 33 },
              { type: 'integer', value: 77 }
            ] }
          ]
        } },
      accounts.foo);

    await broadcast(tx_set_rarity);
    await waitForTx(tx_set_rarity.id);

    const rarity_0 = await accountDataByKey(`rarity_CSB5QjKAYeY5BCK4EyLC66fKn5QWX73HAXhn4pNb9HD`, library); 
    const rarity_1 = await accountDataByKey(`rarity_CSB5QjKAYeY5BCK4EyLC66fKn5QWX73HAXhn4pNb9HE`, library); 
    const rarity_2 = await accountDataByKey(`rarity_CSB5QjKAYeY5BCK4EyLC66fKn5QWX73HAXhn4pNb9HF`, library); 
    const rarity_3 = await accountDataByKey(`rarity_CSB5QjKAYeY5BCK4EyLC66fKn5QWX73HAXhn4pNb9HG`, library); 

    expect(rarity_0.value).to.equal(100);
    expect(rarity_1.value).to.equal(50);
    expect(rarity_2.value).to.equal(33);
    expect(rarity_3.value).to.equal(77);
  });
});

const wvs = 10 ** 8;

describe('Claim Pool', async function () {
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
      { pool: 10 * wvs,
        foo:  10 * wvs,
        bar:  10 * wvs });

    await compile_and_broadcast(accounts.pool, file('claim_pool.ride'));
  });

  it('Claim one NFT', async function () {
    const pool  = address(accounts.pool);
    const foo   = address(accounts.foo);
    const bar   = address(accounts.bar);

    const tx_whitelist = invokeScript(
      { dApp: pool,
        call: {
          function: 'whitelist_add',
          args: [
            { type: 'string', value: foo }
          ]
        } },
      accounts.pool);

    await broadcast(tx_whitelist);
    await waitForTx(tx_whitelist.id);

    const tx_issue = issue(
      { name:         'Some NFT',
        description:  'Some NFT',
        quantity:     1,
        decimals:     0,
        reissuable:   false },
      accounts.foo);

    await broadcast(tx_issue);
    await waitForTx(tx_issue.id);

    const tx_put = invokeScript(
      { dApp: pool,
        call: {
          function: 'put_assets',
          args: [
            { type: 'string', value: 'testairdropname' }
          ]
        },
        payment: [
          { assetId: tx_issue.id, amount: 1 }
        ]
      },
      accounts.foo);

    await broadcast(tx_put);
    await waitForTx(tx_put.id);

    const tx_allow = invokeScript(
      { dApp: pool,
        call: {
          function: 'allow',
          args: [
            { type: 'string',   value: 'testairdropname' },
            { type: 'integer',  value: 1 },
            { type: 'list', value: [
              { type: 'string',   value: bar }
            ] }
          ]
        } },
      accounts.foo);

    await broadcast(tx_allow);
    await waitForTx(tx_allow.id);

    const allowed_0 = (await accountDataByKey(`testairdropname_A_${bar}`, pool)).value;

    expect(allowed_0).to.equal(1);

    const tx_claim = invokeScript(
      { dApp: pool,
        call: {
          function: 'claim',
          args: [
            { type: 'string',   value: 'testairdropname' },
            { type: 'integer',  value: 1 }
          ]
        } },
      accounts.bar);

    await broadcast(tx_claim);
    await waitForTx(tx_claim.id);

    const balance   =  await assetBalance(tx_issue.id, bar);
    const allowed_1 = (await accountDataByKey(`testairdropname_A_${bar}`, pool)).value;

    expect(balance).to.equal(1);
    expect(allowed_1).to.equal(0);
  });
});

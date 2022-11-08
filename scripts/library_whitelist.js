const DAPP  = address(env.SEED);
const wvs   = 10 ** 8;

(async () => {
  try {
    const tx = invokeScript(
      { dApp: DAPP,
        call: {
          function: 'whitelist_add',
          args: [
            { type: 'string', value: '3P4w7SNvxDGfatMPdRC7t8reHazxwWyxmHq' }
          ]
        } },
      env.SEED);

    await broadcast(tx);
    await waitForTx(tx.id);

  } catch (error) {
    console.error(error);
  }
})();

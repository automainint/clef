const DAPP  = address(env.SEED);

(async () => {
  try {
    const tx = invokeScript(
      { dApp: DAPP,
        call: {
          function: 'set_daemon',
          args: [
            { type: 'string', value: '3P42zELiupQ4SBDwrTfqXEE4hFZXiWNve9X' }
          ]
        } },
      env.SEED);

    await broadcast(tx);
    await waitForTx(tx.id);

  } catch (error) {
    console.error(error);
  }
})();

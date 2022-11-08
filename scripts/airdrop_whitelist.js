const DAPP = address(env.SEED);

(async () => {
  try {
    const sleep_for = (time) => {
      return new Promise((resolve, reject) => {
        setTimeout(resolve, time);
      });
    };

    const list = [
      '3PMCF2VLr5BqtZdDDRoCV3DovXN6imeqVb5'
    ];

    for (const x of list) {
      const tx = invokeScript(
        { dApp: DAPP,
          call: {
            function: 'whitelist_add',
            args: [
              { type: 'string', value: x }
            ]
          }
        },
        env.SEED);

      await broadcast(tx);
      await sleep_for(1000);
      await waitForTx(tx.id);
    }

  } catch (error) {
    console.error(error);
  }
})();
 

(async () => {
  try {
    const sleep_for = (time) => {
      return new Promise((resolve, reject) => {
        setTimeout(resolve, time);
      });
    };

    const list = [
    ];

    for (let i = 0; i < list.length; i += 10) {
      let assets = [];

      for (let j = i; j < i + 10 && j < list.length; j++) {
        assets.push({ assetId: list[j], amount: 1 });
      }

      const tx = invokeScript(
        { dApp: env.DAPP,
          call: {
            function: 'put_assets',
            args: [
              { type: 'string', value: 'xm' }
            ]
          },
          payment: assets
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
 

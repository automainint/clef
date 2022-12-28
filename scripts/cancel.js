const DAPP = '3P6fAxtw12pjFhayEfpcUWxgu2BHVCeP78A';

(async () => {
  try {
    const sleep_for = (time) => {
      return new Promise((resolve, reject) => {
        setTimeout(resolve, time);
      });
    };

    const list = [
    ];

    for (const x of list) {
      try {
        const tx = invokeScript(
          { dApp: DAPP,
            call: {
              function: 'cancelSellAndUnlock',
              args: [
                { type: 'string', value: x }
              ]
            }
          },
          env.SEED);

        await broadcast(tx);
        await sleep_for(1000);
        await waitForTx(tx.id);

      } catch (error) {
        console.error(error);
      }
    }

  } catch (error) {
    console.error(error);
  }
})();
 

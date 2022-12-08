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

    const price_amount    = 150000000;
    const price_asset_id  = 'DG2xFkPdDwKUoBkzGAhQtLpSGzfXLiCYPEzeKH2Ad24p';
    const comment         = '';

    for (const x of list) {
      const tx = invokeScript(
        { dApp: DAPP,
          call: {
            function: 'lockAndSellNFT',
            args: [
              { type: 'integer',  value: price_amount },
              { type: 'string',   value: price_asset_id },
              { type: 'string',   value: comment }
            ]
          },
          payment: [
            { assetId: x, amount: 1 }
          ]
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
 

const DAPP = '3P6fAxtw12pjFhayEfpcUWxgu2BHVCeP78A';

(async () => {
  try {
    const sleep_for = (time) => {
      return new Promise((resolve, reject) => {
        setTimeout(resolve, time);
      });
    };

    const list = [
      '4hZ7PZNADFT9oBH8gFTwb8QJtfSqnyZs1aVY1SHYFJzq',
      '7A1EP9hGpFSj1Dc8mJgab1bb51dsJ4QE81YYUWF3m1Sy',
      '7nPi7pfWdFPxK9gMUAwGT1t6M57uuoEcgHHD4ZHqwFVN',
      '8PeGKawvm9bsaoqmoHRiVWygyMwmbHVS448Aqt7RRs18',
      'EArh7dcNHVsczp75z6AfCJWqdDbDJp61tEjaMd1z8of8',
      'FGZULLLFv8PWD8VYJqmrNvGMzf86ZiTstj39R2AXJxP6',
      '2YyLsemd6TNZAFKiWJSHYVQyNrth8DmXfrXDiY5nav9R',
      '87Yd8meqSNGK5qjaNsHkVJTz8ddZTKVn7dMrog3Adfx4',
      'EZ4TTKbeJf7Q4Vy3auaqfYaspRigqQLKBWz4MXuQcu5a',
      'HnvaqVzMxJS5YzPG7c2RpC8EmqTjxRkTxyD2TTDA7HGT',
      '3eVDxYFge84sou322RQvyggqAS62YtfChw7NPLDPpmQh',
      'CtR2LbM1CPLXmDU7ceif819NnRUQX8oterwKDi41QkBK',
      'H3FVsie2V8T7wuoALvxeotCMUm2WS5PjrcZgUk9c1jTK',
      'B8ECfPhwn4i4r3frj9i8wY6nDUXTDTmKSBbAPpDMADDv',
      '9vE1kLp7TMPN2gaRJUx2W9kUEZrMEAryhojWM6a1GHwu'
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
 

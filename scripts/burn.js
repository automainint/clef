const DAPP  = address(env.SEED);
const wvs   = 10 ** 8;

(async () => {
  try {
    const sleep_for = (time) => {
      return new Promise((resolve, reject) => {
        setTimeout(resolve, time);
      });
    };

    const list = [
      /*
      '8oWFreYeSCEgBMzrPLzyS62iRSnZxBcv8wEaxaQQ8RSH',
      '9Tqi9XDGTwEZsvmKAYRVEtQXkRS4d6dwhCZoUMidfUCZ',
      'AQ88ZommWRhDCj5BzvZccQPP49G8NMRZQe8h1fmWzym1'
      */
    ];

    for (const x of list) {
      const tx = invokeScript(
        { dApp: DAPP,
          call: {
            function: 'burn_internal',
            args: [
              { type: 'string', value: x }
            ]
          } },
        env.SEED);

      await broadcast(tx);
      await sleep_for(1000);
      await waitForTx(tx.id);
    }

  } catch (error) {
    console.error(error);
  }
})();
 

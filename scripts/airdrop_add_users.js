const DAPP = address(env.SEED);

(async () => {
  try {
    const sleep_for = (time) => {
      return new Promise((resolve, reject) => {
        setTimeout(resolve, time);
      });
    };

    const list = [
      /*
      '3PDcW7rTFviN1nhtHqEtCx52iK19LnurP5M',
      '3P8DJYGDYCSbYMkJkc9NW4EJU53CLgqE3Fz',
      '3PJAeJKry8dZ5sNFWL7GAiQ7AFwSswMcJNE'
      */
    ];

    if (list.length > 0) {
      for (let i = 0; i < list.length; i += 20) {
        let accounts = [];

        for (let j = i; j < i + 20 && j < list.length; j++) {
          accounts.push({ type: 'string', value: list[j] });
        }

        const tx = invokeScript(
          { dApp: DAPP,
            call: {
              function: 'allow',
              args: [
                { type: 'string',   value: 'xm' },
                { type: 'integer',  value: 1 },
                { type: 'list',     value: accounts }
              ]
            } },
          env.SEED);

        await broadcast(tx);
        await sleep_for(1000);
        await waitForTx(tx.id);
      }
    } else {
      const tx = invokeScript(
        { dApp: DAPP,
          call: {
            function: 'allow_anyone',
            args: [
              { type: 'string',   value: 'xm' },
              { type: 'integer',  value: 1 }
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
 

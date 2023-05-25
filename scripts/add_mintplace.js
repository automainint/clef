const DAPP = address(env.SEED);

(async () => {
  try {
    /*  USDT asset ID
     */
    let usdt = '34N9YcEETLWn93qYQ64EsP1x89tSruJU44RrEMSXXEPJ';

    if (env.CHAIN_ID == 'T') {
      usdt = '23tToJpqbtaCajckMY52add5QwgwpAK7nEAsX4ffHs8C';
    }

    let asset_ids = [
      'CmapYtV9uuXy6QX6Jx5SAmEtveKi3YS2iST9JMEQwcib',
      '8vuNmbm5RnAJEqFcsGtaJcN9Fs4byUD2ydhKusDXApQX',
      '5tR6KaFB1HvH28mbYih8SZYT3sMfj4ojFhZ4XXBgYaMA',
      'CZHQabKEJghxAnSsDsTGcFwppQecWnTErupGMHEeDy5E',
      '3GYPBbysZsk9hgWD6u2kXViQTwivgA2jUZMxes81K2vU'
    ];

    let amount  = 0;
    let price   = 1000000;

    for (const asset_id of asset_ids) {
      const tx = invokeScript(
        { dApp: DAPP,
          call: {
            function: 'store_add_song',
            args: [
              { type: 'string',   value: asset_id },
              { type: 'integer',  value: amount },
              { type: 'string',   value: '' },
              { type: 'integer',  value: price }
            ]
          } },
        env.SEED);
      await broadcast(tx);
      await waitForTx(tx.id);
    }

  } catch (error) {
    console.error(error);
  }
})();

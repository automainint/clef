const DAPP              = address(env.SEED);
const HYBRID_PRICE      =  1500000000;
const HYBRID_PRICE_MAX  = 10000000000;
const HYBRID_PRICE_INC  =           0;

(async () => {
  try {
    /*  USDT asset ID
     */
    let usdt = '34N9YcEETLWn93qYQ64EsP1x89tSruJU44RrEMSXXEPJ';

    if (env.CHAIN_ID == 'T') {
      usdt = '23tToJpqbtaCajckMY52add5QwgwpAK7nEAsX4ffHs8C';
    }

    console.log('    ` Set price hybrid');
    const tx_set_price = invokeScript(
      { dApp: DAPP,
        call: {
          function: 'set_price_hybrid',
          args: [
            { type: 'string',   value: '' /* WAVES */ },
            { type: 'integer',  value: HYBRID_PRICE },
            { type: 'integer',  value: HYBRID_PRICE_MAX },
            { type: 'integer',  value: HYBRID_PRICE_INC }
          ]
        } },
      env.SEED);
    await broadcast(tx_set_price);
    await waitForTx(tx_set_price.id);

    /*
    console.log('    ` Set free mix token');
    const tx_set_free_mix_token = invokeScript(
      { dApp: DAPP,
        call: {
          function: 'set_free_mix_token',
          args: [
            { type: 'string',   value: '11111111' },
            { type: 'integer',  value: 100000000 }
          ]
        } },
      env.SEED);
    await broadcast(tx_set_free_mix_token);
    await waitForTx(tx_set_free_mix_token.id);
    */
  } catch (error) {
    console.error(error);
  }
})();

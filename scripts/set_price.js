const DAPP              = address(env.SEED);
const HYBRID_PRICE      =  80000000;
const HYBRID_PRICE_MAX  = 100000000;
const HYBRID_PRICE_INC  =   1000000;

(async () => {
  try {
    /*  USDT asset ID
     */
    let usdt = '34N9YcEETLWn93qYQ64EsP1x89tSruJU44RrEMSXXEPJ';

    console.log('    ` Set price hybrid');
    const tx_set_price = invokeScript(
      { dApp: DAPP,
        call: {
          function: 'set_price_hybrid',
          args: [
            { type: 'string',   value: usdt },
            { type: 'integer',  value: HYBRID_PRICE },
            { type: 'integer',  value: HYBRID_PRICE_MAX },
            { type: 'integer',  value: HYBRID_PRICE_INC }
          ]
        } },
      env.SEED);
    await broadcast(tx_set_price);
    await waitForTx(tx_set_price.id);
  } catch (error) {
    console.error(error);
  }
})();

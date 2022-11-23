const DAPP              = address(env.SEED);
const HYBRID_PRICE      = 10000000;
const HYBRID_PRICE_INC  = 1000000;

(async () => {
  try {
    /*  USDN asset ID
     */
    let usdn = 'DG2xFkPdDwKUoBkzGAhQtLpSGzfXLiCYPEzeKH2Ad24p';

    console.log('    ` Set price hybrid');
    const tx_set_price = invokeScript(
      { dApp: DAPP,
        call: {
          function: 'set_price_hybrid',
          args: [
            { type: 'string',   value: usdn },
            { type: 'integer',  value: HYBRID_PRICE },
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

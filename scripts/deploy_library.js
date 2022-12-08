const DAPP              = address(env.SEED);
const USDN_QUANTITY     = 100000000000;
const HYBRID_PRICE      = 100000000;
const HYBRID_PRICE_MAX  = 100000000;
const HYBRID_PRICE_INC  =   1000000;
const MARKET_IMAGE_URL  = 'https://clef.one/sign.svg';

const wvs = 10 ** 8;

(async () => {
  try {
    const compile_and_broadcast = async (seed, source) => {
      const script = compile(source);
      const tx = setScript(
        { script: script,
          fee:    3800000 },
        seed);
      await broadcast(tx);
      await waitForTx(tx.id)
    };

    if (env.CHAIN_ID === 'R' || env.CHAIN_ID === 'T') {
      /*  Create dummy market contract for testing.
       */
      console.log(`Master address: ${DAPP}`);

      console.log('    ` Set Clef library script');
      await compile_and_broadcast(
        env.SEED,
        file('library.ride').replace(
          '3PFQjjDMiZKQZdu5JqTHD7HwgSXyp9Rw9By',
          '3NCbmjGV7YHKdkHEfWkfGhmZyXsJbymQ5Z5'));

    } else {
      console.log('    ` Set Clef library script');
      await compile_and_broadcast(
        env.SEED,
        file('library.ride'));
    }

    /*  USDN asset ID
     */
    let usdn            = 'DG2xFkPdDwKUoBkzGAhQtLpSGzfXLiCYPEzeKH2Ad24p';
    let free_mix_token  = '3Luy24HNZY5RLKaJ8sc6jmER7QD8v1r7HBjQKX54skf1';

    if (env.CHAIN_ID === 'R' || env.CHAIN_ID === 'T') {
      /*  Use fake USDN token for testing.
       */

      usdn = '23tToJpqbtaCajckMY52add5QwgwpAK7nEAsX4ffHs8C';

      /*console.log('    ` Issue fake USDN');
      const tx_usdn = issue(
        { name:         'FUSD',
          description:  'Fake USDN token for testing purposes',
          quantity:     USDN_QUANTITY,
          decimals:     6,
          reissuable:   true },
        env.SEED);
      await broadcast(tx_usdn);
      await waitForTx(tx_usdn.id);

      usdn = (await transactionById(tx_usdn.id)).assetId;

      console.log(`    * Fake USDN asset id: ${usdn}`);*/
    }

    /*console.log('    ` Set price hybrid');
    const tx_set_price = invokeScript(
      { dApp: DAPP,
        call: {
          function: 'set_price_hybrid',
          args: [
            { type: 'string',   value: usdn },
            { type: 'integer',  value: HYBRID_PRICE },
            { type: 'integer',  value: HYBRID_PRICE_MAX },
            { type: 'integer',  value: HYBRID_PRICE_INC }
          ]
        } },
      env.SEED);
    await broadcast(tx_set_price);
    await waitForTx(tx_set_price.id);

    console.log('    ` Set free mix token');
    const tx_set_free_mix_token = invokeScript(
      { dApp: DAPP,
        call: {
          function: 'set_free_mix_token',
          args: [
            { type: 'string', value: free_mix_token },
            { type: 'integer', value: 100000000 }
          ]
        } },
      env.SEED);
    await broadcast(tx_set_free_mix_token);
    await waitForTx(tx_set_free_mix_token.id);

    console.log('    ` Set market image');
    const tx_set_image = invokeScript(
      { dApp: DAPP,
        call: {
          function: 'set_market_image',
          args: [
            { type: 'string', value: MARKET_IMAGE_URL }
          ]
        } },
      env.SEED);
    await broadcast(tx_set_image);
    await waitForTx(tx_set_image.id);*/
  } catch (error) {
    console.error(error);
  }
})();

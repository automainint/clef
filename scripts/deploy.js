const DAPP          = address(env.SEED);
const USDN_QUANTITY = 100000000000;
const HYBRID_PRICE  = 1000;

const wvs = 10 ** 8;

(async () => {
  const script = compile(file('library.ride'));

  console.log('    ` Set script');
  const tx_script = setScript(
    { script: script,
      fee:    2700000 },
    env.SEED);
  await broadcast(tx_script);
  await waitForTx(tx_script.id);

  console.log('    ` Issue fake USDN');
  const tx_usdn = issue(
    { name:         'FUSD',
      description:  'Fake USDN token for testing purposes',
      quantity:     USDN_QUANTITY,
      decimals:     2,
      reissuable:   true },
    env.SEED);
  await broadcast(tx_usdn);
  await waitForTx(tx_usdn.id);

  const usdn = (await transactionById(tx_usdn.id)).assetId;

  console.log(`    * Fake USDN asset id: ${usdn}`);

  console.log('    ` Set price hybrid');
  const tx_set_price = invokeScript(
    { dApp: DAPP,
      call: {
        function: 'set_price_hybrid',
        args: [
          { type: 'string',   value: usdn },
          { type: 'integer',  value: HYBRID_PRICE }
        ]
      } },
    env.SEED);
  await broadcast(tx_set_price);
  await waitForTx(tx_set_price.id);
})();

const DAPP = address(env.SEED);

(async () => {
  try {
    const compile_and_broadcast = async (seed, source) => {
      const script = compile(source);
      const tx = setScript(
        { script: script,
          fee:    500000 },
        seed);
      await broadcast(tx);
      await waitForTx(tx.id)
    };

    console.log('    ` Set Market script');
    await compile_and_broadcast(
      env.SEED,
      file('market_dummy.ride'));
  } catch (error) {
    console.error(error);
  }
})();

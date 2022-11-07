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

    console.log('    ` Set Clef claim pool script');
    await compile_and_broadcast(
      env.SEED,
      file('claim_pool.ride'));

  } catch (error) {
    console.error(error);
  }
})();

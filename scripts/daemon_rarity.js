const { readFileSync, writeFileSync } = require('fs');
const { eval_rarity }                 = require('../src_js/rarity.js');

function file_exists(path) {
  try {
    readFileSync(path);
    return true;
  } catch (error_) {
    return false;
  }
}

function to_percents(value) {
  return Math.max(0, Math.min(Math.floor(value * 100 + 0.5), 100));
}

(async () => {
  try {
    let cache_daemon = {
      count: 0,
      rarity_values: {}
    };

    if (file_exists('.clef_daemon')) {
      cache_daemon = JSON.parse(readFileSync('.clef_daemon', 'utf8'));
    }

    const count_data = await accountDataByKey('count', env.DAPP);

    if (cache_daemon.count == count_data.value) {
      return;
    }

    cache_daemon.count = count_data.value;

    let cache_old = {};

    if (file_exists('.clef_songs')) {
      cache_old = JSON.parse(readFileSync('.clef_songs', 'utf8'));
    }

    const { cache, rarity_values } = await eval_rarity(cache_old, {
      fetch: require('node-fetch')
    });

    let rarity_update = {};

    for (const x of Object.keys(rarity_values)) {
      let percents = to_percents(rarity_values[x]);

      if (!(x in cache_daemon.rarity_values) || (percents != cache_daemon.rarity_values[x])) {
        cache_daemon.rarity_values[x] = percents;
        rarity_update[x]              = percents;
      }
    }

    writeFileSync('.clef_daemon', JSON.stringify(cache_daemon,  null, '  '), 'utf8');
    writeFileSync('.clef_songs',  JSON.stringify(cache,         null, '  '), 'utf8');

    const assets = Object.keys(rarity_update);

    for (let i = 0; i < assets.length; i += 20) {
      let assets_20 = [];
      let values_20 = [];

      for (let k = 0; k < 20 && i + k < assets.length; k++) {
        const id      = assets[i + k];
        const rarity  = rarity_update[assets[i + k]];
        assets_20.push({ type: 'string',  value: id     });
        values_20.push({ type: 'integer', value: rarity });
        console.log(`${id} - ${rarity}%`);
      }

      const tx = invokeScript(
        { dApp: env.DAPP,
          call: {
            function: 'set_rarity',
            args: [
              { type: 'list', value: assets_20 },
              { type: 'list', value: values_20 }
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

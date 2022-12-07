const { eval_rarity } = require('../src_js/rarity.js');

const { readFileSync, writeFileSync } = require('fs');
const assert                          = require('assert');

function file_exists(path) {
  try {
    readFileSync(path);
    return true;
  } catch (error_) {
    return false;
  }
}

describe('rarity', async function() {
  this.timeout(300000);

  it('Calculate rarity', async function() {
    let cache_old = {};

    if (file_exists('.clef_songs')) {
      cache_old = JSON.parse(readFileSync('.clef_songs', 'utf8'));
    }

    const asset_id = 'CSB5QjKAYeY5BCK4EyLC66fKn5QWX73HAXhn4pNb9HD';

    const { cache, rarity_values } = await eval_rarity({}, {
      fetch: require('node-fetch')
    });

    const rarity = rarity_values[asset_id];
    assert.ok(rarity >= 0 && rarity <= 1);

    const percents = Math.floor(Math.min(100.0, (rarity * 100.0 + 0.5)));
    console.log(`    * Song ${asset_id} rarity: ${percents}%`);

    writeFileSync('.clef_songs', JSON.stringify(cache, null, '  '), 'utf8');
  });
});

const {
  COLORS,
  fetch_song_data_by_asset_id,
  render_sheet,
  get_song_name_by_asset_id,
  get_song_colors_by_asset_id,
  set_volume,
  play_song_by_asset_id,
  stop
} = require('../src_js/sdk.js');

const assert = require('assert');

global.window = {
  fetch: require('node-fetch')
};

describe('sdk', async function() {
  this.timeout(100000);

  it('Make sure basic functions work', async function() {
    const asset_id = 'CSB5QjKAYeY5BCK4EyLC66fKn5QWX73HAXhn4pNb9HD';

    const name    = await get_song_name_by_asset_id(asset_id);
    const colors  = await get_song_colors_by_asset_id(asset_id);
    const song    = await fetch_song_data_by_asset_id(asset_id);
    const sheet   = render_sheet(song);

    assert.equal(name, 'Prominent Designer');
    assert.equal(colors.length, 8);
    assert.equal(colors[0], 1);
    assert.equal(colors[1], 2);
    assert.equal(colors[2], 2);
    assert.equal(colors[3], 2);
    assert.equal(colors[4], 0);
    assert.equal(colors[5], 0);
    assert.equal(colors[6], 1);
    assert.equal(colors[7], 1);
    assert.equal(song.name_index, 3889594644840507000);
    assert.equal(song.generation, 3);
  });
});

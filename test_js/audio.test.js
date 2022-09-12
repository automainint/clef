const {
  render_song,
  play_song,
  stop,
  set_volume,
  write_wav
} = require('../src_js/audio.js');

const assert = require('assert');

describe('audio', () => {
  it('check functions', async () => {
    assert.equal(typeof render_song, 'function');
    assert.equal(typeof play_song, 'function');
    assert.equal(typeof stop, 'function');
    assert.equal(typeof set_volume, 'function');
    assert.equal(typeof write_wav, 'function');
  });
});

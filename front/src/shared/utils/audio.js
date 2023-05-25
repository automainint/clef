/* eslint-disable */

const {
  diatonic_minor,
  pitch_to_midi,
  beat_to_sec,
  render_sheet,
  make_song
} = require('./music.js');

const radio = require('./radio.js');

const sdk       = require('./sdk.js');
const { types } = require('./types.js');

async function render_song(Tone, song) {
  const sheet = sdk.render_sheet(song);

  return await sdk.render_audio(Tone, sheet);
}

async function play(Tone, entity, ready, log) {
  const song = make_song(entity);

  await sdk.play_song_data(
    Tone,
    song,
    async () => { ready(); },
    log,
    entity.type == types.song);
}

async function play_song(Tone, song, ready, log) {
  if ('rhythm' in song) {
    await sdk.play_song_data(Tone, song, async () => { ready(); }, log);
  } else {
    await sdk.play_song_by_asset_id(Tone, song.asset_id, async () => { ready(); }, log);
  }
}

async function stop(Tone) {
  /*  FIXME
   *  Hack: don't stop radio.
   */
  if (!radio.state.playing)
    await sdk.stop(Tone);
}

async function set_volume(volume_) {
  await sdk.set_volume(volume_);
}

function write_wav(buffer, put) {
  let size = 0;

  const put_16 = (n) => {
    put([  n % 0x100,
          Math.floor(n / 0x100) % 0x100 ]);
    size += 2;
  };

  const put_32 = (n) => {
    put([  n % 0x100,
          Math.floor(n / 0x100) % 0x100,
          Math.floor(n / 0x10000) % 0x100,
          Math.floor(n / 0x1000000) % 0x100 ]);
    size += 4;
  };

  const total_size = 44 + buffer.length * buffer.numberOfChannels * 2;

  put_32(0x46464952);
  put_32(total_size - 8);
  put_32(0x45564157);

  put_32(0x20746d66);
  put_32(16);
  put_16(1);
  put_16(buffer.numberOfChannels);
  put_32(buffer.sampleRate);
  put_32(buffer.sampleRate * buffer.numberOfChannels * 2);
  put_16(buffer.numberOfChannels * 2);
  put_16(16);

  put_32(0x61746164);
  put_32(total_size - size - 4);

  for (let i = 0; i < buffer.length; i++) {
    for (let k = 0; k < buffer.numberOfChannels; k++) {
      const x = 1 + Math.max(-1, Math.min(1, buffer.getChannelData(k)[i])) / 2;
      const y = Math.floor(0xffff * x + 0.5);
      put_16(y);
    }
  }
}

module.exports = {
  render_song:  render_song,
  play:         play,
  play_song:    play_song,
  stop:         stop,
  set_volume:   set_volume,
  write_wav:    write_wav
};

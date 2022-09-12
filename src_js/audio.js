/* eslint-disable */

const {
  diatonic_minor,
  pitch_to_midi,
  beat_to_sec,
  render_sheet
} = require('./music.js');

const { Mutex } = require('async-mutex');

const vol_silence = -10000;
const vol_min     = -60;
const vol_max     = 0;

var lock        = new Mutex();
var lock_render = new Mutex();

var data = {
  init: false,
  player: null,
  volume: vol_max,
  id: 0
};

async function _init(Tone) {
  const release = await lock.acquire();
  if (data.init) {
    release();
    return;
  }
  Tone.start();
  Tone.Transport.start();
  data.init = true;
  release();
}

async function load_urls(name) {
  try {
    const urls = await fetch(`./samples/${name}/urls.json`);

    if (urls.status != 200)
      return {};

    return JSON.parse(await urls.text());
    
  } catch (error) { }
  return {};
}

function new_sampler(Tone, name) {
  return new Promise((resolve, reject) => {
    load_urls(name).then(urls => {
      let sampler;

      sampler = new Tone.Sampler({
        urls:     urls,
        baseUrl:  `./samples/${name}/`,
        onload: () => {
          resolve(sampler)
        }
      }).toDestination();
    }).catch(error => { reject(error); });
  });
}

async function render_audio(Tone, sheet, log) {
  let buffer = null;

  const release = await lock_render.acquire();

  try {
    buffer = await Tone.Offline(async ({ transport }) => {
      const instr = [
        new_sampler(Tone, sheet.instruments.kick),
        new_sampler(Tone, sheet.instruments.snare),
        new_sampler(Tone, sheet.instruments.hihat),
        new_sampler(Tone, sheet.instruments.bass),
        new_sampler(Tone, sheet.instruments.back),
        new_sampler(Tone, sheet.instruments.lead) ];

      const kick  = await instr[0];
      const snare = await instr[1];
      const hihat = await instr[2];
      const bass  = await instr[3];
      const back  = await instr[4];
      const lead  = await instr[5];

      const _note = (midi) => {
        return Tone.Frequency(48 + midi, 'midi').toNote();
      };

      const render_part = (part_sheet, on_note) => {
        let part = new Tone.Part((time, note) => {
          if (time < sheet.duration + 0.01 && note.duration > 0)
            on_note(time, note);
        }, part_sheet);

        part.loop      = true;
        part.loopStart = 0;
        part.loopEnd   = sheet.duration;

        part.start();
      };

      render_part(sheet.bass, (time, note) => {
        bass.triggerAttackRelease(_note(note.note), note.duration, time, note.velocity);
      });

      render_part(sheet.back, (time, note) => {
        back.triggerAttackRelease(_note(note.note), note.duration, time, note.velocity);
      });

      render_part(sheet.lead, (time, note) => {
        lead.triggerAttackRelease(_note(note.note), note.duration, time, note.velocity);
      });

      render_part(sheet.kick, (time, note) => {
        kick.triggerAttackRelease('A2', note.duration, time, note.velocity);
      });

      render_part(sheet.snare, (time, note) => {
        snare.triggerAttackRelease('A2', note.duration, time, note.velocity);
      });

      render_part(sheet.hihat, (time, note) => {
        hihat.triggerAttackRelease('A2', note.duration, time, note.velocity);
      });

      transport.start();
    }, sheet.duration + 2);

  } catch (error) {
    log(error);
  }

  /*  Tone.js bug
   *  Make sure rendering don't overlap.
   */
  setTimeout(release, 100);

  return buffer;
}

async function render_song(Tone, song, log) {
  const sheet = render_sheet(song);

  if (log) {
    //log('Song:');
    //log(JSON.stringify(song, null, '  '));
    //log('Sheet:');
    //log(JSON.stringify(sheet, null, '  '));
  }

  return await render_audio(Tone, sheet, log);
}

async function play_song(Tone, song, ready, log) {
  await _init(Tone);

  let release = await lock.acquire();

  if (data.id === song.id) {
    data.player.stop();
    data.stop();

    ready();

    data.player.start();

  } else {
    release();

    const sheet = render_sheet(song);

    const buffer = await render_audio(Tone, sheet, log)

    release = await lock.acquire();

    if (data.player) {
      data.player.stop();
      data.stop();
    }

    ready();

    if (buffer != null) {
      data.player = new Tone.Player().toDestination();
      data.player.volume.value = data.volume;
      data.player.buffer = buffer;
      data.player.start();
      data.id = song.id;
      data.duration = sheet.duration + 2;
    }
  }

  await new Promise((resolve, reject) => {
    data.stop = resolve;
    release();

    setTimeout(
      () => { resolve(); },
      Math.floor(data.duration * 1000));
  });
}

async function stop(Tone) {
  await _init(Tone);

  const release = await lock.acquire();
  if (data.player) {
    data.player.stop();
    data.stop();
  }
  release();
}

async function set_volume(volume_) {
  if (volume_ <= 0)
    data.volume = vol_silence;
  else if (volume_ >= 1)
    data.volume = vol_max;
  else
    data.volume = vol_min + (vol_max - vol_min) * Math.log2(volume_ + 1);

  if (data.player)
    data.player.volume.value = data.volume;
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
  play_song:    play_song,
  stop:         stop,
  set_volume:   set_volume,
  write_wav:    write_wav
};

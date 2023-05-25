/* eslint-disable */

const sdk = require('./sdk.js');

const SONG_FIRST = 512;

let history       = [];
let history_size  = 5;
let history_index = 0;
let last_id       = '';
let last_parents  = [];
let crossfade     = true;

let queue = Promise.resolve();

let state = {
  playing: false
};

function similar(a, a_id, b, b_id) {
  for (const x of a) {
    for (const y of b) {
      if (x == y || x == b_id || a_id == y) {
        return true;
      }
    }
  }

  return false;
}

async function render_random_song(Tone) {
  try {
    const count = await sdk.fetch_value('count');

    let n, song, name;

    /*  Make sure songs don't repeat.
     */

    while (true) {
      n = SONG_FIRST + Math.floor(Math.random() * (count - SONG_FIRST));
      const id = sdk.int_to_base58(n);

      song = await sdk.fetch_song_data(id);
      name = await sdk.get_song_name_by_asset_id(song.asset_id);

      let is_repeat = false;
      for (const x of history) {
        if (x == name) {
          is_repeat = true;
          break;
        }
      }

      if (!is_repeat && !similar(song.parents, song.id, last_parents, last_id)) {
        break;
      }
    }

    if (history.length < history_size) {
      history.push(name);
    } else if (history_index < history.length) {
      history[history_index] = name;
      history_index = (history_index + 1) % history.length;
    }

    last_id       = song.id;
    last_parents  = song.parents;

    let sheet, duration;

    if (crossfade) {
      sheet     = sdk.render_sheet_extended(song);
      duration  = sheet.duration * (2.1 / 2.5);
    } else {
      sheet     = sdk.render_sheet(song);
      duration  = sheet.duration + 2.0;
    }

    const buffer  = await sdk.render_audio(Tone, sheet);

    return {
      asset_id: song.asset_id,
      name:     name,
      buffer:   buffer,
      duration: duration
    };

  } catch (error) {
    console.error(error);
  }

  return null;
}

async function radio_play(Tone, update_status) {
  state.playing = true;

  queue = queue.then(async () => {
    try {
      let playback = Promise.resolve();

      while (state.playing) {
        const data = await render_random_song(Tone);

        if (!state.playing) {
          break;
        }

        if (data === null) {
          continue;
        }

        await playback;

        if (!state.playing) {
          break;
        }

        await update_status(data.name, data.asset_id);

        playback = sdk.play_audio_buffer(Tone, data.buffer, data.duration);
      }
    } catch (error) {
      console.error(error);
    }
  });
}

async function radio_stop() {
  state.playing = false;
  await sdk.stop();
}

async function radio_skip() {
  await sdk.stop();
}

async function radio_set_crossfade(is_crossfade) {
  crossfade = is_crossfade;
}

module.exports = {
  radio_play:           radio_play,
  radio_stop:           radio_stop,
  radio_skip:           radio_skip,
  radio_set_crossfade:  radio_set_crossfade,
  state:                state
};

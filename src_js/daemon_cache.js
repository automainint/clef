const sdk = require('./sdk.js');

const { readFileSync, writeFileSync } = require('fs');
const argv = require('yargs').argv;

const SONG_FIRST = 512;

function file_exists(path) {
  try {
    readFileSync(path);
    return true;
  } catch (error_) {
    return false;
  }
}

function int_to_base58(x) {
  const DIGITS = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

  const MASK = [
    0xff00000000000000,
    0x00ff000000000000,
    0x0000ff0000000000,
    0x000000ff00000000,
    0x00000000ff000000,
    0x0000000000ff0000,
    0x000000000000ff00,
    0x00000000000000ff
  ];

  let y = '';

  for (let n = x; n != 0; n = Math.floor(n / 58)) {
    const d = DIGITS[n % 58];
    y = `${d}${y}`;
  }

  for (let i = 0; i < 8; i++) {
    if ((x & MASK[i]) == 0) {
      y = `1${y}`;
    } else {
      break;
    }
  }

  return y;
}

async function fetch_song_metadata_by_id(song_id, options) {
  const asset_id  = await sdk.fetch_value(song_id, options);

  return {
    asset_id: asset_id,
    name:     await sdk.get_song_name_by_asset_id(asset_id, options),
    colors:   await sdk.get_song_colors_by_asset_id(asset_id, options)
  };
}

async function main() {
  try {
    const options = {
      fetch: require('node-fetch')
    };

    const output = argv.output || '.';

    let data_cache = {
      count: SONG_FIRST
    };

    if (file_exists('.clef_data_cache')) {
      data_cache = JSON.parse(readFileSync('.clef_data_cache', 'utf8'));
    }

    const count_current = await sdk.fetch_value('count', options);

    for (let i = data_cache.count; i < count_current; i++) {
      try {
        const song_id = int_to_base58(i);
        const data    = await fetch_song_metadata_by_id(song_id, options);

        writeFileSync(`${output}/${data.asset_id}`, JSON.stringify(
          { name:   data.name,
            colors: data.colors }
        ), 'utf8');

      } catch (error) {
        console.error(error);
      }
    }

    data_cache.count = count_current;

    writeFileSync('.clef_data_cache', JSON.stringify(data_cache, null, '  '), 'utf8');

  } catch (error) {
    console.error(error);
  }
}

main();


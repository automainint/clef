/* eslint-disable */

const log = console.log;

console.log   = () => { };
//console.error = () => { };

const {
  render_song,
  write_wav
} = require('./audio.js');

const {
  env,
  types,
  authenticate
} = require('./back_fake.js');

const { new_resources } = require('./resources.js');

const { in_generation } = require('in');

const Tone = require('tone');

async function fetch_recent_song(user) {
  const songs = await user.get_resources({ filter: types.song });
  return songs[songs.length - 1];
}

async function mint_first(user) {
  await user.add_balance(
    (await user.get_price(types.song)) +
    (await user.get_price(types.chord)) * 2 +
    (await user.get_price(types.beat)) +
    (await user.get_price(types.rhythm)));

  await user.buy(types.chord);
  await user.buy(types.chord);
  await user.buy(types.beat);
  await user.buy(types.rhythm);

  await user.mint_song(await user.get_resources({
    filter: [ types.chord, types.beat, types.rhythm ] }));

  return await fetch_recent_song(user);
}

async function mint(user, generation) {
  if (generation <= 1)
    return mint_first(user);

  const foo = await mint(user, generation - 1);
  const bar = await mint(user, generation - 1);

  await user.add_balance(await user.get_price(types.hybrid));

  await user.mint_hybrid([ foo, bar ]);

  return await fetch_recent_song(user);
}

async function main() {
  try {
    const user = await authenticate({ env: env.test });
    await user.mint_resources(new_resources());

    const song    = await mint(user, in_generation);
    const buffer  = await render_song(Tone, song);

    let buf = '';

    write_wav(buffer, (data) => {
      for (const byte of data) {
        if (buf.length > 0)
          buf += ',';
        buf += `${byte}`;
      }
    });

    log('{"song":');
    log(JSON.stringify(song));
    log(`,"bytes":[${buf}]}\n`);

  } catch (error) {
    log(error);
  }

  window.close();
}

main();

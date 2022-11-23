const {
  env,
  types,
  authenticate,
  get_resource_by_id,
  get_resource_by_asset_id
} = require('../src_js/back_fake.js');

const {
  render_sheet,
  get_song_id,
  get_song_label,
  get_song_parents,
  get_song_bpm,
  get_song_meter,
  get_song_tonality,
  colors,
  get_song_colors,
  get_song_chords,
  get_song_asset_id,
  get_song_asset_url,
  can_mint_hybrid
} = require('../src_js/music.js');

const assert = require('assert');

function _json(obj) {
  console.log(JSON.stringify(obj, null, '  '));
}

function _resources() {
  return [
    { quantity: 8, type: types.chord,  label: 'i',     notes: [ 0, 0, 0, 3, 7 ] },
    { quantity: 8, type: types.rhythm, label: 'bar',   notes: [ 30, 2 ] },
    { quantity: 8, type: types.beat,   label: 'flat',  kick: [ 1, 7 ], snare: [ 0, 8, 1, 7 ], hihat: [ 0, 4, 1, 3 ] }
  ];
}

describe('back fake', async function () {
  this.timeout(10000);

  var user;

  beforeEach('authenticate and reset', async function () {
    user = await authenticate({ env: env.keeper });
    await user.empty_stock();
    await user.mint_resources(_resources());
  });

  it('can not authenticate with invalid environment', async function () {
    let ok = false;

    try {
      await authenticate({ env: 'invalid env' });
    } catch (e) {
      ok = true;
    }

    assert.ok(ok);
  });

  it('can authenticate with cloud or web environment', async function () {
    await authenticate({ env: env.web });
    await authenticate({ env: env.cloud });
  });

  it('balance is zero initially', async function () {
    assert.equal(await user.get_balance(), 0);

    await user.logout();
  });

  it('no resources initially', async function () {
    assert.equal((await user.get_resources()).length, 0);

    await user.logout();
  });

  it('balance will increase by request', async function () {
    await user.add_balance(10);
    assert.ok(await user.get_balance() === 10);

    await user.logout();
  });

  it('can not get balance after logout', async function () {
    await user.add_balance(10);
    await user.logout();

    assert.ok(await user.get_balance() === undefined);
  });

  it('can get prices', async function () {
    assert.ok(await user.get_price(types.chord) > 0);
    assert.ok(await user.get_price(types.rhythm) > 0);
    assert.ok(await user.get_price(types.beat) > 0);
    assert.ok(await user.get_price(types.hybrid) > 0);

    await user.logout();
  });

  it('can not buy chord with zero balance', async function () {
    await user.buy(types.chord);
    assert.equal((await user.get_resources({ filter: types.chord })).length, 0);

    await user.logout();
  });

  it('can buy chord with positive balance', async function () {
    const price = await user.get_price(types.chord);
    await user.add_balance(price);
    await user.buy(types.chord);
    let res = await user.get_resources({ filter: types.chord });
    assert.equal(res.length, 1);
    assert.equal(res[0].type, types.chord);

    await user.logout();
  });

  it('balance will decrease after spent on chord', async function () {
    const price = await user.get_price(types.chord);
    await user.add_balance(price + 10);
    const balance = await user.get_balance();
    await user.buy(types.chord);
    assert.equal(await user.get_balance(), balance - price);

    await user.logout();
  });

  it('resource ids should be unique', async function () {
    const price = await user.get_price(types.chord);
    await user.add_balance(price * 4);
    await user.buy(types.chord);
    await user.buy(types.chord);
    await user.buy(types.chord);
    await user.buy(types.chord);

    let res = await user.get_resources({ filter: types.chord });

    for (let i = 1; i < res.length; i++)
      for (let j = 0; j < i; j++)
        assert.notEqual(res[i].id, res[j].id);

    await user.logout();
  });

  it('can get resources by pages 1', async function () {
    const price = await user.get_price(types.chord);
    await user.add_balance(price * 5);
    await user.buy(types.chord);
    await user.buy(types.chord);
    await user.buy(types.chord);
    await user.buy(types.chord);
    await user.buy(types.chord);

    let v, last;

    v     = await user.get_resources({ filter: types.chord, size: 2 });
    last  = v[v.length - 1].id;
    assert.equal(v.length, 2);

    v     = await user.get_resources({ filter: types.chord, size: 2, after: last });
    last  = v[v.length - 1].id;
    assert.equal(v.length, 2);

    v     = await user.get_resources({ filter: types.chord, size: 2, after: last });
    last  = v[v.length - 1].id;
    assert.equal(v.length, 1);

    v     = await user.get_resources({ filter: types.chord, size: 2, after: last });
    assert.equal(v.length, 0);

    await user.logout();
  });

  it('can get resources by pages 2', async function () {
    const price =
      (await user.get_price(types.chord)) * 3 +
      (await user.get_price(types.rhythm)) * 2;
    await user.add_balance(price);

    await user.buy(types.chord);
    await user.buy(types.chord);
    await user.buy(types.chord);
    await user.buy(types.rhythm);
    await user.buy(types.rhythm);

    let v, last;

    v     = await user.get_resources({ filter: types.chord, size: 2 });
    last  = v[v.length - 1].id;
    assert.equal(v.length, 2);

    v     = await user.get_resources({ filter: types.chord, size: 2, after: last });
    assert.equal(v.length, 1);

    v     = await user.get_resources({ filter: types.rhythm, size: 2 });
    last  = v[v.length - 1].id;
    assert.equal(v.length, 2);

    v     = await user.get_resources({ filter: types.rhythm, size: 2, after: last });
    assert.equal(v.length, 0);

    await user.logout();
  });

  it('can not buy rhythm with zero balance', async function () {
    await user.buy(types.rhythm);
    assert.equal((await user.get_resources({ filter: types.rhythm })).length, 0);

    await user.logout();
  });

  it('can buy rhythm with positive balance', async function () {
    const price = await user.get_price(types.rhythm);
    await user.add_balance(price);
    await user.buy(types.rhythm);
    let res = await user.get_resources({ filter: types.rhythm });
    assert.equal(res.length, 1);
    assert.equal(res[0].type, types.rhythm);

    await user.logout();
  });

  it('balance will decrease after spent on rhythm', async function () {
    const price = await user.get_price(types.rhythm);
    await user.add_balance(price + 10);
    const balance = await user.get_balance();
    await user.buy(types.rhythm);
    assert.equal(await user.get_balance(), balance - price);

    await user.logout();
  });

  it('can not buy beat with zero balance', async function () {
    await user.buy(types.beat);
    assert.equal((await user.get_resources({ filter: types.beat })).length, 0);

    await user.logout();
  });

  it('can buy beat with positive balance', async function () {
    const price = await user.get_price(types.beat);
    await user.add_balance(price);
    await user.buy(types.beat);
    let res = await user.get_resources({ filter: types.beat });
    assert.equal(res.length, 1);
    assert.equal(res[0].type, types.beat);

    await user.logout();
  });

  it('balance will decrease after spent on beat', async function () {
    const price = await user.get_price(types.beat);
    await user.add_balance(price + 10);
    const balance = await user.get_balance();
    await user.buy(types.beat);
    assert.equal(await user.get_balance(), balance - price);

    await user.logout();
  });


  it('can filter multiple types', async function () {
    const price = (await user.get_price(types.chord)) +
                  (await user.get_price(types.rhythm)) +
                  (await user.get_price(types.beat));

    await user.add_balance(price);

    await user.buy(types.chord);
    await user.buy(types.rhythm);
    await user.buy(types.beat);

    assert.equal((await user.get_resources({ filter: types.song })).length, 0);
    assert.equal((await user.get_resources({ filter: types.chord })).length, 1);
    assert.equal((await user.get_resources({ filter: [ types.chord, types.beat ]})).length, 2);

    await user.logout();
  });

  it('can not mint song with zero resources and balance', async function () {
    let ok = false;
    
    try {
      await user.mint_song([]);
    } catch (e) {
      ok = true;
    }

    assert.equal((await user.get_resources({ filter: types.song })).length, 0);
    assert.ok(ok);

    await user.logout();
  });

  it('can not mint song with zero resources', async function () {
    const price = await user.get_price(types.song);
    await user.add_balance(price + 100);

    let ok = false;
    try {
      await user.mint_song([]);
    } catch (e) {
      ok = true;
    }

    assert.equal((await user.get_resources({ filter: types.song })).length, 0);
    assert.ok(ok);

    await user.logout();
  });

  it('can mint song with 2 chords', async function () {
    const price =
      (await user.get_price(types.song)) +
      (await user.get_price(types.chord)) * 2;

    await user.add_balance(price);
    
    await user.buy(types.chord);
    await user.buy(types.chord);

    await user.mint_song(await user.get_resources());

    assert.equal((await user.get_resources({ filter: types.song })).length, 1);

    await user.logout();
  });

  it('can not mint song with more than 4 resources', async function () {
    const price =
      (await user.get_price(types.song)) +
      (await user.get_price(types.chord)) * 2 +
      (await user.get_price(types.rhythm)) * 3;

    await user.add_balance(price);
    
    await user.buy(types.chord);
    await user.buy(types.chord);
    await user.buy(types.rhythm);
    await user.buy(types.rhythm);
    await user.buy(types.rhythm);

    let ok = false;
    try {
      await user.mint_song(await user.get_resources());
    } catch (e) {
      ok = true;
    }

    assert.equal((await user.get_resources({ filter: types.song })).length, 0);
    assert.ok(ok);

    await user.logout();
  });

  it('can mint song with 2 chords and 2 rhythms', async function () {
    const price =
      (await user.get_price(types.song)) +
      (await user.get_price(types.chord)) * 2 +
      (await user.get_price(types.rhythm)) * 2;

    await user.add_balance(price);
    await user.buy(types.chord);
    await user.buy(types.chord);
    await user.buy(types.rhythm);
    await user.buy(types.rhythm);
    const resources = await user.get_resources();
    await user.mint_song(resources);
    assert.equal((await user.get_resources({ filter: types.song })).length, 1);

    await user.logout();
  });

  it('can mint song with 2 chords and 1 beat', async function () {
    const price =
      (await user.get_price(types.song)) +
      (await user.get_price(types.chord)) * 2 +
      (await user.get_price(types.beat));

    await user.add_balance(price);
    await user.buy(types.chord);
    await user.buy(types.chord);
    await user.buy(types.beat);
    const resources = await user.get_resources();
    await user.mint_song(resources);
    assert.equal((await user.get_resources({ filter: types.song })).length, 1);

    await user.logout();
  });

  it('resources will be spent when song is minted', async function () {
    const price =
      (await user.get_price(types.song)) +
      (await user.get_price(types.chord)) * 2 +
      (await user.get_price(types.rhythm)) +
      (await user.get_price(types.beat));

    await user.add_balance(price);
    await user.buy(types.chord);
    await user.buy(types.chord);
    await user.buy(types.rhythm);
    await user.buy(types.beat);
    let resources = await user.get_resources();
    await user.mint_song(resources);
    resources = await user.get_resources({ filter: [ types.chord, types.rhythm, types.beat ] });
    assert.equal(resources.length, 0);

    await user.logout();
  });

  it('minted song will contain spent resources', async function () {
    const price =
      (await user.get_price(types.song)) +
      (await user.get_price(types.chord)) * 2 +
      (await user.get_price(types.rhythm)) +
      (await user.get_price(types.beat));

    await user.add_balance(price);
    await user.buy(types.chord);
    await user.buy(types.chord);
    await user.buy(types.rhythm);
    await user.buy(types.beat);

    let resources = await user.get_resources();

    await user.mint_song(resources);

    const song = (await user.get_resources({ filter: types.song }))[0];

    for (const res of resources) {
      let found = false;

      for (const chord of song.chords)
        if (chord.id === res.id)
          found = true;

      if (song.rhythm.kick[0].id === res.id)
        found = true;
      if (song.rhythm.snare[0].id === res.id)
        found = true;
      if (song.rhythm.hihat[0].id === res.id)
        found = true;
      if (song.rhythm.bass[0].id === res.id)
        found = true;
      if (song.rhythm.lead[0].id === res.id)
        found = true;
      if (song.rhythm.back[0].id === res.id)
        found = true;

      assert.ok(found);
    }

    await user.logout();
  });

  it('minted song should not have parents', async function () {
    const price =
      (await user.get_price(types.song)) +
      (await user.get_price(types.chord)) * 2 +
      (await user.get_price(types.rhythm)) +
      (await user.get_price(types.beat));

    await user.add_balance(price);
    await user.buy(types.chord);
    await user.buy(types.chord);
    await user.buy(types.rhythm);
    await user.buy(types.beat);

    await user.mint_song(await user.get_resources());

    const song = (await user.get_resources({ filter: types.song }))[0];

    assert.equal(song.parents.length, 0);

    await user.logout();
  });

  it('minted song should have a label and a type', async function () {
    const price =
      (await user.get_price(types.song)) +
      (await user.get_price(types.chord)) * 2 +
      (await user.get_price(types.rhythm)) +
      (await user.get_price(types.beat));

    await user.add_balance(price);
    await user.buy(types.chord);
    await user.buy(types.chord);
    await user.buy(types.rhythm);
    await user.buy(types.beat);

    await user.mint_song(await user.get_resources());

    const song = (await user.get_resources({ filter: types.song }))[0];

    assert.equal(song.type, types.song);
    assert.equal((typeof song.label), 'string');

    await user.logout();
  });

  it('can not mint hybrid without songs', async function () {
    let ok = false;
    try {
      await user.mint_hybrid([1, 2]);
    } catch (e) {
      ok = true;
    }

    assert.equal((await user.get_resources({ filter: types.song })).length, 0);
    assert.ok(ok);

    await user.logout();
  });

  it('can mint hybrid with 2 songs', async function () {
    const price =
      (await user.get_price(types.song)) * 2 +
      (await user.get_price(types.chord)) * 4 +
      (await user.get_price(types.hybrid));

    await user.add_balance(price);
    
    await user.buy(types.chord);
    await user.buy(types.chord);

    await user.mint_song(await user.get_resources({ filter: types.chord }));

    await user.buy(types.chord);
    await user.buy(types.chord);

    await user.mint_song(await user.get_resources({ filter: types.chord }));

    let songs = await user.get_resources({ filter: types.song });

    await user.mint_hybrid(songs);

    songs = await user.get_resources({ filter: types.song });

    assert.equal(songs.length, 3);

    await user.logout();
  });

  it('can mint hybrid and burn 2 songs', async function () {
    const price =
      (await user.get_price(types.song)) * 2 +
      (await user.get_price(types.chord)) * 4;

    await user.add_balance(price);

    await user.buy(types.chord);
    await user.buy(types.chord);

    await user.mint_song(await user.get_resources({ filter: types.chord }));

    await user.buy(types.chord);
    await user.buy(types.chord);

    await user.mint_song(await user.get_resources({ filter: types.chord }));

    let songs = await user.get_resources({ filter: types.song });

    await user.mint_hybrid_and_burn(songs);

    songs = await user.get_resources({ filter: types.song });

    assert.equal(songs.length, 1);

    await user.logout();
  });

  it('mint and burn songs order', async function () {
    const price =
      (await user.get_price(types.song)) * 4 +
      (await user.get_price(types.chord)) * 8;

    await user.add_balance(price);

    await user.buy(types.chord);
    await user.buy(types.chord);
    await user.buy(types.chord);
    await user.buy(types.chord);
    await user.buy(types.chord);
    await user.buy(types.chord);
    await user.buy(types.chord);
    await user.buy(types.chord);

    await user.mint_song(await user.get_resources({ filter: types.chord, size: 2 }));
    await user.mint_song(await user.get_resources({ filter: types.chord, size: 2 }));
    await user.mint_song(await user.get_resources({ filter: types.chord, size: 2 }));
    await user.mint_song(await user.get_resources({ filter: types.chord, size: 2 }));

    let songs = await user.get_resources({ filter: types.song });

    await user.mint_hybrid_and_burn([ songs[1], songs[3] ]);

    songs = await user.get_resources({ filter: types.song });

    assert.equal(songs.length, 3);
    assert.ok(songs[0].id > songs[1].id);
    assert.ok(songs[1].id > songs[2].id);

    await user.logout();
  });

  it('minted song checks', async function () {
    const price =
      (await user.get_price(types.song)) +
      (await user.get_price(types.chord)) * 2;

    await user.add_balance(price);
    await user.buy(types.chord);
    await user.buy(types.chord);

    const song_id = await user.mint_song(await user.get_resources());

    const song = (await user.get_resources({ filter: types.song }))[0];

    for (const chord of song.chords)
      assert.ok(chord.notes.length > 0);

    assert.equal(song.id, song_id);
    assert.equal(song.parents.length, 0);
    assert.equal(song.generation, 1);
    assert.equal((typeof song.label), 'string');
    assert.ok(song.bpm > 0);
    assert.ok(song.bar_size > 0);
    assert.ok(song.beat_size > 0);
    assert.ok('key' in song.tonality);
    assert.equal((typeof song.instruments.kick), 'string');
    assert.equal((typeof song.instruments.snare), 'string');
    assert.equal((typeof song.instruments.hihat), 'string');
    assert.equal((typeof song.instruments.bass), 'string');
    assert.equal((typeof song.instruments.back), 'string');
    assert.equal((typeof song.instruments.lead), 'string');
    assert.ok(song.chords.length > 0);
    assert.ok(song.arpeggio.length >= 0);
    assert.ok(song.rhythm.kick[0].notes.length > 0);
    assert.ok(song.rhythm.snare[0].notes.length > 0);
    assert.ok(song.rhythm.hihat[0].notes.length > 0);
    assert.ok(song.rhythm.bass[0].notes.length > 0);
    assert.ok(song.rhythm.back[0].notes.length > 0);
    assert.ok(song.rhythm.lead[0].notes.length > 0);

    await user.logout();
  });

  it('minted custom song checks', async function () {
    const price =
      (await user.get_price(types.song)) +
      (await user.get_price(types.chord)) * 2 +
      (await user.get_price(types.rhythm)) +
      (await user.get_price(types.beat));

    await user.add_balance(price);
    await user.buy(types.chord);
    await user.buy(types.chord);
    await user.buy(types.rhythm);
    await user.buy(types.beat);

    const song_id = await user.mint_song(await user.get_resources());

    const song = (await user.get_resources({ filter: types.song }))[0];

    for (const chord of song.chords)
      assert.ok(chord.notes.length > 0);

    const url = new URL(song.asset_url);

    assert.equal(song.id, song_id);
    assert.equal(typeof song.asset_id, 'string');
    assert.equal(song.parents.length, 0);
    assert.equal(song.generation, 1);
    assert.equal((typeof song.label), 'string');
    assert.ok(song.bpm > 0);
    assert.ok(song.bar_size > 0);
    assert.ok(song.beat_size > 0);
    assert.ok('key' in song.tonality);
    assert.equal((typeof song.instruments.kick), 'string');
    assert.equal((typeof song.instruments.snare), 'string');
    assert.equal((typeof song.instruments.hihat), 'string');
    assert.equal((typeof song.instruments.bass), 'string');
    assert.equal((typeof song.instruments.back), 'string');
    assert.equal((typeof song.instruments.lead), 'string');
    assert.ok(song.chords.length > 0);
    assert.ok(song.arpeggio.length >= 0);
    assert.ok(song.rhythm.kick[0].notes.length > 0);
    assert.ok(song.rhythm.snare[0].notes.length > 0);
    assert.ok(song.rhythm.hihat[0].notes.length > 0);
    assert.ok(song.rhythm.bass[0].notes.length > 0);
    assert.ok(song.rhythm.back[0].notes.length > 0);
    assert.ok(song.rhythm.lead[0].notes.length > 0);

    await user.logout();
  });

  it('hybrid checks', async function () {
    const price =
      (await user.get_price(types.song)) * 2 +
      (await user.get_price(types.chord)) * 4 +
      (await user.get_price(types.hybrid));

    await user.add_balance(price);
    
    await user.buy(types.chord);
    await user.buy(types.chord);

    await user.mint_song(await user.get_resources({ filter: types.chord }));

    await user.buy(types.chord);
    await user.buy(types.chord);

    await user.mint_song(await user.get_resources({ filter: types.chord }));

    const hybrid_id = await user.mint_hybrid(await user.get_resources({ filter: types.song }));

    const songs = await user.get_resources({ filter: types.song });

    for (const chord of songs[0].chords)
      assert.ok(chord.notes.length > 0);

    const url = new URL(songs[0].asset_url);

    assert.equal(songs[0].id, hybrid_id);
    assert.equal(typeof songs[0].asset_id, 'string');
    assert.ok(songs[0].parents.includes(songs[1].id));
    assert.ok(songs[0].parents.includes(songs[2].id));
    assert.equal(songs[0].generation, 2);
    assert.equal((typeof songs[0].label), 'string');
    assert.ok(songs[0].bpm > 0);
    assert.ok(songs[0].bar_size > 0);
    assert.ok(songs[0].beat_size > 0);
    assert.ok('key' in songs[0].tonality);
    assert.equal((typeof songs[0].instruments.kick), 'string');
    assert.equal((typeof songs[0].instruments.snare), 'string');
    assert.equal((typeof songs[0].instruments.hihat), 'string');
    assert.equal((typeof songs[0].instruments.bass), 'string');
    assert.equal((typeof songs[0].instruments.back), 'string');
    assert.equal((typeof songs[0].instruments.lead), 'string');
    assert.ok(songs[0].chords.length > 0);
    assert.ok(songs[0].arpeggio.length >= 0);
    assert.ok(songs[0].rhythm.kick[0].notes.length > 0);
    assert.ok(songs[0].rhythm.snare[0].notes.length > 0);
    assert.ok(songs[0].rhythm.hihat[0].notes.length > 0);
    assert.ok(songs[0].rhythm.bass[0].notes.length > 0);
    assert.ok(songs[0].rhythm.back[0].notes.length > 0);
    assert.ok(songs[0].rhythm.lead[0].notes.length > 0);

    await user.logout();
  });

  it('can render minted song', async function () {
    const price =
      (await user.get_price(types.song)) +
      (await user.get_price(types.chord)) * 2;

    await user.add_balance(price);

    await user.buy(types.chord);
    await user.buy(types.chord);
    await user.mint_song(await user.get_resources({ filter: types.chord }));

    const sheet = render_sheet((await user.get_resources({ filter: types.song }))[0]);

    assert.equal((typeof sheet.instruments.kick), 'string');
    assert.equal((typeof sheet.instruments.snare), 'string');
    assert.equal((typeof sheet.instruments.hihat), 'string');
    assert.equal((typeof sheet.instruments.bass), 'string');
    assert.equal((typeof sheet.instruments.back), 'string');
    assert.equal((typeof sheet.instruments.lead), 'string');
    assert.ok(sheet.duration > 0);
    assert.ok(sheet.kick.length > 0);
    assert.ok(sheet.snare.length > 0);
    assert.ok(sheet.hihat.length > 0);
    assert.ok(sheet.bass.length > 0);
    assert.ok(sheet.back.length > 0);
    assert.ok(sheet.lead.length > 0);

    await user.logout();
  });

  it('can render hybrid', async function () {
    const price =
      (await user.get_price(types.song)) * 2 +
      (await user.get_price(types.chord)) * 4 +
      (await user.get_price(types.hybrid));

    await user.add_balance(price);
    
    await user.buy(types.chord);
    await user.buy(types.chord);

    await user.mint_song(await user.get_resources({ filter: types.chord }));

    await user.buy(types.chord);
    await user.buy(types.chord);

    await user.mint_song(await user.get_resources({ filter: types.chord }));

    await user.mint_hybrid(await user.get_resources({ filter: types.song }));

    const songs = await user.get_resources({ filter: types.song });
    const sheet = render_sheet(songs[2]);

    assert.equal((typeof sheet.instruments.kick), 'string');
    assert.equal((typeof sheet.instruments.snare), 'string');
    assert.equal((typeof sheet.instruments.hihat), 'string');
    assert.equal((typeof sheet.instruments.bass), 'string');
    assert.equal((typeof sheet.instruments.back), 'string');
    assert.equal((typeof sheet.instruments.lead), 'string');
    assert.ok(sheet.duration > 0);
    assert.ok(sheet.kick.length > 0);
    assert.ok(sheet.snare.length > 0);
    assert.ok(sheet.hihat.length > 0);
    assert.ok(sheet.bass.length > 0);
    assert.ok(sheet.back.length > 0);
    assert.ok(sheet.lead.length > 0);

    await user.logout();
  });

  it('can get resource by id', async function () {
    const price =
      (await user.get_price(types.song)) * 2 +
      (await user.get_price(types.chord)) * 4 +
      (await user.get_price(types.hybrid));

    await user.add_balance(price);
    
    await user.buy(types.chord);
    await user.buy(types.chord);

    await user.mint_song(await user.get_resources({ filter: types.chord }));

    await user.buy(types.chord);
    await user.buy(types.chord);

    await user.mint_song(await user.get_resources({ filter: types.chord }));

    await user.mint_hybrid(await user.get_resources({ filter: types.song }));

    const songs       = await user.get_resources({ filter: types.song });
    const hybrid_song = songs[2];

    const parent_0 = await get_resource_by_id(hybrid_song.parents[0]);
    const parent_1 = await get_resource_by_id(hybrid_song.parents[1]);

    assert.equal(parent_0.id, hybrid_song.parents[0]);
    assert.equal(parent_1.id, hybrid_song.parents[1]);

    await user.logout();
  });

  it('can get resource by asset id', async function () {
    const price =
      (await user.get_price(types.song)) * 2 +
      (await user.get_price(types.chord)) * 4 +
      (await user.get_price(types.hybrid));

    await user.add_balance(price);
    
    await user.buy(types.chord);
    await user.buy(types.chord);

    await user.mint_song(await user.get_resources({ filter: types.chord }));

    const song_0 = (await user.get_resources({ filter: types.song}))[0];
    const song_1 = await get_resource_by_asset_id(song_0.asset_id);

    assert.equal(song_0.id, song_1.id);
    assert.equal(song_0.asset_id, song_1.asset_id);

    await user.logout();
  });

  it('music util compatibility checks', async function () {
    const price =
      (await user.get_price(types.song)) +
      (await user.get_price(types.chord)) * 2 +
      (await user.get_price(types.rhythm)) +
      (await user.get_price(types.beat));

    await user.add_balance(price);
    await user.buy(types.chord);
    await user.buy(types.chord);
    await user.buy(types.rhythm);
    await user.buy(types.beat);

    const song_id = await user.mint_song(await user.get_resources());

    const song = (await user.get_resources({ filter: types.song }))[0];

    assert.equal(get_song_id(song), song_id);
    assert.equal((typeof get_song_label(song)), 'string');
    assert.equal(get_song_parents(song).length, 0);
    assert.equal((typeof get_song_bpm(song)), 'number');
    assert.equal(get_song_meter(song).length, 2);
    assert.equal((typeof get_song_meter(song)[0]), 'number');
    assert.equal((typeof get_song_meter(song)[1]), 'number');
    assert.equal((typeof get_song_tonality(song)), 'string');

    assert.equal(get_song_colors(song).length, 8);
    assert.equal((typeof get_song_colors(song)[0]), 'number');
    assert.equal((typeof get_song_colors(song)[1]), 'number');
    assert.equal((typeof get_song_colors(song)[2]), 'number');
    assert.equal((typeof get_song_colors(song)[3]), 'number');
    assert.equal((typeof get_song_colors(song)[4]), 'number');
    assert.equal((typeof get_song_colors(song)[5]), 'number');
    assert.equal((typeof get_song_colors(song)[6]), 'number');
    assert.equal((typeof get_song_colors(song)[7]), 'number');

    assert.equal(get_song_chords(song).length, 8);
    assert.ok(get_song_chords(song)[0].length >= 3);
    assert.ok(get_song_chords(song)[1].length >= 3);
    assert.ok(get_song_chords(song)[2].length >= 3);
    assert.ok(get_song_chords(song)[3].length >= 3);
    assert.ok(get_song_chords(song)[4].length >= 3);
    assert.ok(get_song_chords(song)[5].length >= 3);
    assert.ok(get_song_chords(song)[6].length >= 3);
    assert.ok(get_song_chords(song)[7].length >= 3);
    assert.ok(can_mint_hybrid(song));

    assert.equal(typeof get_song_asset_id(song), 'string');

    const url = new URL(get_song_asset_url(song));

    await user.logout();
  });

  it('get wallet address', async function () {
    let address = await user.get_wallet_address();
    assert.equal(typeof address, 'string');

    await user.logout();
  });

  it('get explorer url', async function () {
    let url_obj = new URL(await user.get_explorer_url());

    await user.logout();
  });

  it('mint hybrid balance check', async function () {
    let price = await user.get_price(types.hybrid);

    await user.add_balance(price - 1);
    assert.ok(!(await user.can_mint_hybrid()));

    await user.add_balance(1);
    assert.ok(await user.can_mint_hybrid());

    await user.logout();
  });

  it('get airdrop info and claim', async function () {
    await user.mint_resources([
      { quantity: 1, type: types.song, label: 'song', id: 'TEST_000' }
    ]);

    let info = await user.get_airdrop_info('test');

    assert.equal((typeof info.airdrop_exists),    'boolean');
    assert.equal((typeof info.user_in_whitelist), 'boolean');
    assert.equal((typeof info.allowed_claims),    'number');
    assert.equal((typeof info.songs_total),       'number');

    let ids = await user.airdrop_claim('test');

    assert.equal(ids.length, 1);
    assert.equal((typeof ids[0]), 'string');
  });
});

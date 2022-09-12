# clef

##  Content

- Ride smart contracts
  - `/contracts`
  - `/scripts`
  - `/test_ride`
- JS utilities
  - `/src_js`
  - `/test_js`
- Samples: `/static/samples`

##  Dev API

### Back-end interface
Back-end implementation for testing located in `./src_js/back_fake.js`

Implementation for blockchain interaction located in `./src_js/back_node.js`;
Blockchain node settings located in `./src_js/env.js`

```js
const { env, types, authenticate } = require('/back_fake.js');
```

- `env` - list of environment names.
  - `env.test` - testing-only environment.

- `types` - list of resource type names.
  - Available for purchase
    - `types.chord`
    - `types.rhythm`
    - `types.beat`
  - Other
    - `types.song`
    - `types.hybrid`
    - `types.tonality`

- `authenticate(options)` _async_ - Authenticate a user. Returns clearance object with following methods.
  For testing, `options` argument should be `{ env: env.test }`.
  ```js
  let user = await authenticate({ env: env.test });
  ```
  - Testing-only methods
    - `empty_stock()` _async_ - remove all stock resources.
    - `add_balance(balance)` _async_ - increase user balance.
  - Admin-only methods
    - `mint_resources(resources)` _async_ - add resources to stock.
      - `resources` argument should be an array of resources.
      - Each resource should have a `quantity` field.
      ```js
      await user.mint_resources([ {
        quantity: 8,
        type: types.chord,
        label: 'Am',
        notes: [ 0, 0, 0, 3, 7 ] } ]);
      ```
  - `get_balance()` _async_ - returns a number, user balance.
  - `get_resources(options)` _async_ - returns an array of user resources.
    - Each resource contains at least those fields:
      - `id` - integer number or string, unique resource id.
      - `type` - string, resource type name. One of `types`.
      - `label` - string, resource label.
    - `options` argument may contain following fields.
      - `filter` - resource type string or an array of resource type strings.
      - `size` - page size, maximum number of returned resources.
      - `after` - id of the resource to paginate after.
    ```js
    /*  Get all user resources. */
    let resources = await user.get_resources();

    /*  Get songs only. */
    let songs = await user.get_resources({ filter: types.song });

    /*  Get resources by pages. */
    let page0 = await user.get_resources({ filter: types.song, size: 10 });
    let page1 = await user.get_resources({ filter: types.song, size: 10, after: page0[page0.length - 1].id });
    ```
  - `buy(type)` _async_ - buy a resource. `type` is one of `types`.
    ```js
    await user.buy(types.chord);
    ```
  - `mint_song(resources)` _async_ - mint a new song from resources.
    - `resources` argument is an array of resources. Each resource should have a field `id`.
    ```js
    let chords = await user.get_resources({ filter: types.chord });
    await user.mint_song([ chords[0], chords[1] ]);
    ```
  - `mint_hybrid(songs)` _async_ - mint a new song from two other songs.
    - `songs` argument is an array of 2 songs. Each song should have a field `id`.
    ```js
    let songs = await user.get_resources({ filter: types.song });
    await user.mint_hybrid([ songs[0], songs[1] ]);
    ```

  - `mint_hybrid_and_purge(songs)` _async_ - mint a new song from two other songs and purge those songs.
    - `songs` argument is an array of 2 songs. Each song should have a field `id`.
    ```js
    let songs = await user.get_resources({ filter: types.song });
    await user.mint_hybrid_and_purge([ songs[0], songs[1] ]);
    ```

  - `get_resource_by_id(id)` _async_ - get a resource by id. Returns resource object, or null, if not found.
    ```js
    const song_id = '0001';

    const song = await user.get_resource_by_id(song_id);

    if (song != null) {
      console.log(JSON.stringify(song, null, '  '));
    }
    ```

  - `get_wallet_address()` _async_ - get user wallet address. Returns a string.
    To render an avatar, you can use `identity-img` like this:
    ```js
    const address     = await user.get_wallet_address();
    const avatar_size = 64;

    const identity_img = require('identity-img');

    const avatar_url = identity_img.create(
      address, {
        rows: 8, cells: 8,
        size: avatar_size });
    ```

  - `get_explorer_url()` _async_ - get explorer URL for user wallet. Returns a URL string.

  - `can_mint_hybrid()` _async_ - returns `true` if the user has enough balance to mint a hybrid; or `false` otherwise.
    Will check for both transaction `fee` and `payment`.

**Example**
```js
const { env, types, authenticate } = require('/back_fake.js');

authenticate({ env: env.test }).then(user => {
  /* Print user balance. */
  user.get_balance().then(balance => {
    console.log(`Balance: ${balance}`);
  });
  
  /* Buy a chord, then print all bought chords. */
  user.buy(types.chord).then(() => {
    user.get_resources({ filter: types.chord }).then(chords => {
      console.log('Bought chords:');
      console.log(JSON.stringify(chords, null, '  '));
    });
  });
});
```

*NOTE: Don't access resource internal elements directly, they may change in future. Use functions from music.js utility instead.*

For use cases see `./test_js/back_fake.test.js`

### Music
Music utility is located in `./src_js/music.js`.

```js
const { diatonic_minor,
        pitch_to_midi,
        beat_to_sec,
        render_sheet
        get_song_label,
        get_song_parents,
        get_song_bpm,
        get_song_meter,
        get_song_tonality,
        colors,
        get_song_colors,
        get_song_chords,
        get_chord_name,
        get_song_chord_names,
        get_song_generation,
        get_song_asset_id,
        get_song_asset_url,
        can_mint_hybrid } = require('/music.js');
```

- `diatonic_minor(key_note)` - returns an array of integer numbers representing diatonic minor scale.
- `pitch_to_midi(tonality, pitch)` - returns an integer representing a MIDI note from tonality and pitch.
  - `tonality` argument is an array of MIDI notes to define a tonality.
  - `pitch` argument is a number of steps from key note in specified tonality.
  ```js
  let tonality = diatonic_minor(0);
  let midi_key_note = pitch_to_midi(tonality, 0);
  let midi_note     = pitch_to_midi(tonality, 15);
  ```
- `beat_to_sec(bpm, beats)` - converts `beats` to seconds according to specified `bpm`.
  ```js
  /* duration = 0.5 */
  let duration = beat_to_sec(120, 4);
  ```
- `render_sheet(song)` - convert `song` to music sheet.
  - `song` argument should be a song resource returned from back-end.

  Music sheet is an object with following fields.
  - `duration` - total duration in seconds.
  - `instruments` - object with names for each instrument.
  - `kick`, `snare`, `hihat`, `bass`, `back`, `lead` - arrays of notes for each instrument.

  Each array's element is an object with following fields.
  - `time` - note attack time in seconds.
  - `note` - MIDI note pitch.
  - `duration` - note duration.
  - `velocity` - note velocity.
  If there is a pause before the first note, the array will have a first element with field `duration` value equal to zero.
  ```js
  let songs = await user.get_resources({ filter: types.song });
  let sheet = render_sheet(songs[0]);
  ```
- `get_song_id(song)` - returns song id: integer number or string.
- `get_song_label(song)` - returns song label.
- `get_song_parents(song)` - returns array of song parents' ids.
- `get_song_bpm(song)` - returns song BPM.
- `get_song_meter(song)` - returns song meter: array of two integers.
- `get_song_tonality(song)` - returns song tonality name: string.
- `get_song_colors(song)` - returns song colors: array of integer values. Each value is one of:
  - `colors.major`,
  - `colors.minor`,
  - `colors.neutral`,
  - `colors.weird`,
- `get_song_chords(song)` - returns song chords: array of chords. Each chord is an array of notes. Each note is an integer number of semitone steps from C.
- `get_chord_name(chord)` - returns chord name. `chord` is an array of notes.
- `get_song_chord_names(song)` - returns song chord names: array of strings.
- `get_song_generation(song)` - returns song generation: integer number.
- `get_song_asset_id(song)` - returns song NFT asset id: string.
- `get_song_asset_url(song)` - return song NFT asset url: string.
- `can_mint_hybrid(song)` - returns true if a hybrid can be minted from specified song; false otherwise.

*NOTE: Resource id and resource asset id are different. Asset id is a hash-identifier of NFT in blockchain.*

**Example**
```js
const { env, authenticate } = require('/back_fake.js');

const { render_sheet,
        get_song_label,
        get_song_parents,
        get_song_bpm,
        get_song_meter,
        get_song_tonality,
        colors,
        get_song_colors,
        get_song_chords,
        get_song_chord_names,
        get_song_generation,
        get_song_asset_id,
        get_song_asset_url,
        can_mint_hybrid } = require('/music.js');

authenticate({ env: env.test }).then(user => {
  const song_id = '0001';

  user.get_resource_by_id(song_id).then(song => {
    const sheet = render_sheet(song);

    const asset_id  = get_song_asset_id(song);
    const asset_url = get_song_asset_url(song);

    const label       = get_song_label(song);
    const parents     = get_song_parents(song);
    const bpm         = get_song_bpm(song);
    const meter       = get_song_meter(song);
    const tonality    = get_song_tonality(song);
    const colors      = get_song_colors(song);
    const chords      = get_song_chords(song);
    const generation  = get_song_generation(song);

    const chord_names = get_song_chord_names(song);
  });
});
```

For use cases see `./test_js/music.test.js`

### Audio
Audio utility is located in `./src_js/audio.js`.

```js
const { render_audio,
        render_song,
        play_song,
        stop,
        set_volume } = require('/audio.js');

const Tone = require('/Tone.js');
```

- `render_audio(Tone, sheet, log)` _async_ - render sheet to a buffer.
  - `Tone` argument is a `Tone.js` library interface.
  - `song` argument should be a sheet data returned by `render_sheet(song)`.
  - `log` argument is logging interface.
  ```js
  let buffer = await render_audio(Tone, sheet, (s) => { console.log(s); });
  ```
- `render_song(Tone, song, log)` _async_ - render song to a buffer.
  - `Tone` argument is a `Tone.js` library interface.
  - `song` argument should be a song resource returned from back-end.
  - `log` argument is logging interface.
  ```js
  let buffer = await render_song(Tone, song, (s) => { console.log(s); });
  ```
- `play_song(Tone, song, ready, log)` _async_ - render song and play.
  Promise returns when playback is done.
  - `Tone` argument is a `Tone.js` library interface.
  - `song` argument should be a song resource returned from back-end.
  - `ready` argument is a function called when audio buffer is ready.
  - `log` argument is logging interface.
  ```js
  console.log('Play');
  play_song(Tone, song,
      ()      => { console.log('Ready') },
      (s)     => { console.log(s); })
    .then(()  => { console.log('Done'); });
  ```
- `stop(Tone)` _async_ - stop playing.
  - `Tone` argument is a `Tone.js` library interface.
  ```js
  stop(Tone);
  ```
- `set_volume(value)` _async_ - set playback volume.
  - `value` - volume value from `0` to `1`, where `0` is silence, `1` is maximum volume.
  ```js
  set_volume(0.5);
  ```

### Song genome reference
*NOTE: This reference may change.*

Chord is defined as a list of notes. Each note is a number of semitone steps from tonality root. First note is bass, second note is lead.
```
chord {
  label:  string;
  notes:  integer[];
}
```

Rhythm is defined as a list of note durations. Every other duration defines a pause, so total number of durations is a multiple of 2.

*NOTE: In blockchain, rhythm notes are stored as an integer value for scale and a list of integer values for notes. Each note duartion is defined as note / scale.*
```
rhythm {
  label:  string;
  notes:  float[];
}
```

```
song {
  label:      string;
  parents:    token_id[];

  bpm:        integer;
  bar_size:   integer;
  beat_size:  integer;
  tonality:   integer;

  instruments {
    kick:     string;
    snare:    string;
    hihat:    string;
    bass:     string;
    back:     string;
    lead:     string;
  }

  chords:     chord[];
  melody:     integer[];

  rhythm {
    kick:     rhythm[];
    snare:    rhythm[];
    hihat:    rhythm[];
    bass:     rhythm[];
    back:     rhythm[];
    lead:     rhythm[];
  }
}
```

## Render `.wav`
- Install dependencies (`browser-run` and `browserify`)
```shell
npm install
```

- Run `wav` script
  - `generation` argument is a number specifying song generation.
  - `name` argument is a string specifying file names to create.
```shell
npm run wav -- --generation=2 --name=sample
```

- `sample.json` and `sample.wav` will be created from random song of 2nd generation.

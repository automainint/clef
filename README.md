# clef

##  Content
- Smart contracts documentation
  - [Library](docs/Contract%20Library.md)
  - [Claim Pool](docs/Contract%20Claim%20Pool.md)
- Ride smart contracts
  - `/contracts`
  - `/scripts`
  - `/test_ride`
- JS utilities
  - `/src_js`
  - `/test_js`
- Samples: `/static/samples`

##  SDK
SDK source code located in `./src_js/sdk.js`. You can use this SDK for integration with Clef.

### Dependencies
- [Tone.js](https://github.com/Tonejs/Tone.js) for audio rendering.

### API
```js
const {
  COLORS,
  get_song_name_by_asset_id,
  get_song_colors_by_asset_id,
  set_volume,
  play_song_by_asset_id,
  stop
} = require('sdk.js');
```
- `COLORS` - array of color values which can be returned by `get_song_colors_by_asset_id`.
  - `COLORS.major`, `COLORS.minor`, `COLORS.neutral`, `COLORS.weird`
- `get_song_name_by_asset_id(asset_id, options)` _async_ - returns string, song name.
  - `asset_id` argument - string, NFT asset ID.
  - `options` _optional_ argument - network settings.
  ```js
  const asset_id = 'CSB5QjKAYeY5BCK4EyLC66fKn5QWX73HAXhn4pNb9HD';
  const name = await get_song_name_by_asset_id(asset_id);
  console.log(`Song ${asset_id} name: ${name}`);
  ``` 
- `get_song_colors_by_asset_id(asset_id, options)` _async_ - returns array of song colors.
  - `asset_id` argument - string, NFT asset ID.
  - `options` _optional_ argument - network settings.
- `set_volume(volume)` _async_ - set audio playback volume.
  - `volume` argument - number, volume value from `0` to `1`.
  ```js
  await set_volume(0.7);
  ```
- `play_song_by_asset_id(Tone, asset_id, ready, options)` _async_ - play song.
  - `Tone` argument - Tone.js interface.
  - `asset_id` argument - string, NFT asset ID.
  - `ready` argument - _async_ function, called when song is ready to play.
  - `options` _optional_ argument - network settings.
  ```js
  const Tone = require('tone');
  const asset_id = 'CSB5QjKAYeY5BCK4EyLC66fKn5QWX73HAXhn4pNb9HD';
  console.log('Preparing song audio...');
  await play_song_by_asset_id(Tone, asset_id, async () => {
    console.log('Playing...');
  });
  console.log('Playback stopped.');
  ```
- `stop(Tone)` _async_ - stop audio playback.
  - `Tone` argument - Tone.js interface.
  ```js
  const Tone = require('tone');
  await stop(Tone);
  ```

Default network settings:
```js
const options = {
  fetch:    window.fetch,                         // fetch function
  clef_url: 'https://clef.one/',                  // for audio samples
  node_url: 'https://nodes.wavesnodes.com/',      // waves blockchain node
  library:  '3P4m4beJ6p1pMPHqCQMAXEdquUuXJz72CMe' // clef library contract address
};
```

##  Dev API

### Back-end interface
Back-end implementation for testing located in `./src_js/back_fake.js`

Implementation for blockchain interaction located in `./src_js/back_node.js`

```js
const { env,
        types,
        authenticate,
        get_resource_by_id,
        get_resource_by_asset_id } = require('back_fake.js');
```

- `env` - list of environment names.
  - `env.keeper` - use a _Keeper Wallet_ account.
  - `env.cloud` - use an _Email-based_ Waves.Exchange account.
  - `env.web` - use a _private key-_ or _seed phrase-based_ Waves.Exchange account.

- `types` - list of resource type names.
  - Available for purchase
    - `types.chord`
    - `types.rhythm`
    - `types.beat`
  - Other
    - `types.song`
    - `types.hybrid`
    - `types.arpeggio`

- `get_resource_by_id(id)` _async_ - get a resource by id. Returns resource object, or null, if not found.
  ```js
  const song_id = '1111111A';

  const song = await get_resource_by_id(song_id);

  if (song != null) {
    console.log(JSON.stringify(song, null, '  '));
  }
  ```

- `get_resource_by_asset_id(id)` _async_ - get a resource by asset id. Returns resource object, or null, if not found.
  ```js
  const asset_id = '3foobarfoobar';

  const song = await get_resource_by_asset_id(asset_id);

  if (song != null) {
    console.log(JSON.stringify(song, null, '  '));
  }
  ```

- `authenticate(options)` _async_ - Authenticate a user. Returns clearance object with following methods.
  ```js
  let user = await authenticate({ env: env.keeper });
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
  - `logout()` _async_ - sign out.
  - `get_balance()` _async_ - returns a number, user balance.
  - `get_resources(options)` _async_ - returns an array of user resources.
    - Each resource contains at least those fields:
      - `id` - string, unique resource id.
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

  - `get_airdrop_info(name)` _async_ - returns an object with fields `airdrop_exists`, `user_in_whitelist`, `allowed_claims` and `songs_total`.
    - `name` argument is a string, airdrop name.
    - `airdrop_exists` is `true` if specified airdrop exists; `false` otherwise.
    - `user_in_whitelist` is `true` if user whitelisted for specified airdrop; `false` otherwise.
    - `allowed_claims` is a number of songs user can claim from specified airdrop.
    - `songs_total` is a total number of songs left in specified airdrop.
    ```js
    let airdrop = 'test';
    let info = await user.get_airdrop_info(airdrop);
    console.log(`Allowed claims: ${info.allowed_claims}; songs total: ${info.songs_total}`);
    ```

  - `airdrop_claim(name)` _async_ - claim songs from an airdrop. Returns an array with claimed songs ids.
    - `name` argument is a string, airdrop name.
    ```js
    let airdrop = 'test';
    let ids = await user.airdrop_claim(airdrop);
    ```

**Example**
```js
const { env, types, authenticate } = require('back_fake.js');

authenticate({ env: env.keeper }).then(user => {
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
        can_mint_hybrid } = require('music.js');
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
- `get_song_id(song)` - returns song id: string.
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
- `get_song_asset_url(song)` - returns song NFT asset url: string.
- `can_mint_hybrid(song)` - returns true if a hybrid can be minted from specified song; false otherwise.

*NOTE: Resource id and resource asset id are different. Asset id is a hash-identifier of NFT in blockchain.*

**Example**
```js
const { get_resource_by_id } = require('back_fake.js');

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
        get_song_asset_url  } = require('music.js');

const song_id = '1111111A';

get_resource_by_id(song_id).then(song => {
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
```

For use cases see `./test_js/music.test.js`

### Audio
Audio utility is located in `./src_js/audio.js`.

```js
const { render_audio,
        render_song,
        play_song,
        stop,
        set_volume } = require('audio.js');

const Tone = require('tone');
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
  arpeggio:   integer[];

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

## Authors
- [Ekaterina Ivashneva](https://github.com/ekaterinaivashneva)
- [Mitya Selivanov](https://github.com/automainint)
- [Ilia Gromov](https://github.com/ipgromov)
- [Igor Smolkov](https://github.com/metanonum)


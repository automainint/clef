/* eslint-disable */

const env = require('./env.js').env;
const sdk = require('./sdk.js');

const { types }         = require('./types.js');
const { generate_name } = require('./generate_name.js');

import { Signer }         from '@waves/signer';
import { ProviderKeeper } from '@waves/provider-keeper';
import { ProviderCloud }  from '@waves.exchange/provider-cloud';
import { ProviderWeb }    from '@waves.exchange/provider-web';

const UPDATE_TIMEOUT  = 5000;

const TOKEN_WAVES             = 'WAVES';
const TOKEN_FREE_MIX          = '3Luy24HNZY5RLKaJ8sc6jmER7QD8v1r7HBjQKX54skf1';

const KEY_PRICE_HYBRID_TOKEN  = 'price_hybrid_token';
const KEY_PRICE_HYBRID_AMOUNT = 'price_hybrid_amount';

const TX_FEE_ASSET_ID     = TOKEN_WAVES;
const TX_FEE              = 500000;

//  No extra price for now.
const HYBRID_PRICE_EXTRA  = 0;

const CLAIM_FEE_ASSET_ID      = TOKEN_WAVES;
const CLAIM_FEE               = 500000;
const CLAIM_LIMIT             = 20;

let update_mutex = Promise.resolve();

let id_library    = env.keeper['W'].id_library;
let id_claim_pool = env.keeper['W'].id_claim_pool;
let network       = env.keeper['W'].network;
let node_url      = env.keeper['W'].node_url;

/*  FIXME
 *  Preload hack.
 */
let preload_done = () => {};
let preload = new Promise((release, reject_) => {
  preload_done = () => {
    preload_done = () => {};
    release();
  };
});

function debug_log(s) {
  //console.log(s);
}

function options_() {
  return sdk.adjust_options({
    log:      debug_log,
    node_url: node_url,
    library:  id_library
  });
}

function tx_info_wait(id) {
  return new Promise((resolve, reject) => {
    const { fetch, node_url, log } = options_();

    let attempt;
    let request = `${node_url}transactions/info/${id}`;

    attempt = () => {
      sdk.fetch_json_request(fetch, request, { method: 'GET' }, log)
        .then(resolve)
        .catch(error_ => {
          setTimeout(attempt, 2000);
        });
    };

    attempt();
  });
}

async function get_resource_by_id(id) {
  const opts = options_();

  const asset_id = await sdk.fetch_value(id, opts);

  return {
    type:     types.song,
    asset_id: asset_id,
    id:       id,
    label:    await sdk.get_song_name_by_asset_id(asset_id, opts),
    colors:   await sdk.get_song_colors_by_asset_id(asset_id, opts)
  };
}

async function get_resource_by_asset_id(asset_id) {
  const opts = options_();

  return {
    type:     types.song,
    asset_id: asset_id,
    id:       await sdk.fetch_value(asset_id, opts),
    label:    await sdk.get_song_name_by_asset_id(asset_id, opts),
    colors:   await sdk.get_song_colors_by_asset_id(asset_id, opts)
  };
}

/*  Rarity
 */

function get_song_rarity_by_asset_id(asset_id) {
  return new Promise((resolve, reject) => {
    if (network === 'testnet') {
      //  No rarity values on testnet.
      return;
    }

    const { fetch, node_url, library, log } = options_();

    let attempt;
    let request = `${node_url}addresses/data/${library}/rarity_${asset_id}`;

    attempt = () => {
      sdk.fetch_json_request(fetch, request, { method: 'GET' }, log)
        .then(data => { resolve(data.value); })
        .catch(error_ => { setTimeout(attempt, 5000); });
    };

    attempt();
  });
}

/*  Mintplace
 */

async function get_mintable_songs() {
  /*  Wait for auth.
   */
  await preload;

  if (network === 'testnet') {
    return [
      'CmapYtV9uuXy6QX6Jx5SAmEtveKi3YS2iST9JMEQwcib',
      '8vuNmbm5RnAJEqFcsGtaJcN9Fs4byUD2ydhKusDXApQX',
      '5tR6KaFB1HvH28mbYih8SZYT3sMfj4ojFhZ4XXBgYaMA',
      'CZHQabKEJghxAnSsDsTGcFwppQecWnTErupGMHEeDy5E',
      '3GYPBbysZsk9hgWD6u2kXViQTwivgA2jUZMxes81K2vU'
    ];
  }

  return [
    '4dMvh2X7dpqoprCyE1Gj9nukSs56CmBqS3Mb4YoHF1ms',
    '39JqNnG6Gvxckk9Rd3QmNfhDw829Tg2C6rqbYnd5FLF3',
    '2Ek7q9FWmcSTzqc5Wp7xjz7VdAu4Q9LcJ4V9ifymnHsP',
    '46JZS22b1pPhB2ZprQeSxDgdHSSLCgdseF7Atbv9isga',
    'FyaUN5UYUexmXzB6D2JsWWrHk36ajNDeF1ntfubGHtRP',
    'DFFdgf3Srq5dbTkoveiQzDnN2v8S6E6BT368XtSmZS9U',
    'FJ3UUTSALNk3gtS57vfAXRpLZPYpXdzGeRHtvrg9TMov',
    '9ayjaY6b5Pty2Qz7HEHYauVUTYisr7GWdvsUg9ZN1Z48',
    'BmYdiTQsXDGLC5k7s2QXniFzh4MDdLboSitv7YEJQzjr',
    '2TF8HkMKzSR9GFTxeeFkUFLPyhSqArz5J9MzzMFsdgmM'
  ];
}

async function get_mint_quantity(asset_id) {
  return await sdk.fetch_value(`SA_${asset_id}`, options_());
}

async function get_mint_price(asset_id) {
  const opts = options_();

  const token = await sdk.fetch_value(`ST_${asset_id}`, opts);

  let asset_name = '';
  let scale      = 1;

  if (token === '' || token === 'WAVES') {
    asset_name  = 'WAVES';
    scale       = 100000000;
  } else {
    const details = await sdk.fetch_json_request(
      opts.fetch,
      `${opts.node_url}assets/details/${token}`,
      { method: 'GET' },
      opts.log);

    asset_name  = details.name;
    scale       = 10 ** details.decimals;
  }

  const amount = await sdk.fetch_value(`SP_${asset_id}`, options_()) / scale;

  return {
    asset_name: asset_name,
    amount:     amount
  };
}

async function get_mint_type(asset_id) {
  /*  FIXME
   *  Add different types of assets.
   */

  return 'cover';
}

/*  Chart
 */

async function get_chart() {
  const opts = options_();

  const count = await sdk.fetch_value('count', opts);

  let chart = [];

  for (let n = 512; n < count; n += 100) {
    let ids = [];

    for (let i = n; i < n + 100 && i < count; i++) {
      ids.push(sdk.int_to_base58(i));
    }

    let asset_ids = await sdk.fetch_some_values(ids, opts);
    let keys      = [];

    for (let i = 0; i < asset_ids.length;) {
      if (asset_ids[i] == null) {
        asset_ids.splice(i, 1);
      } else {
        keys.push(`CN_${asset_ids[i]}`);
        i++;
      }
    }

    const likes = await sdk.fetch_some_values(keys, opts);

    for (let i = 0; i < likes.length; i++) {
      if (likes[i] != null && likes[i] > 0) {
        chart.push({asset_id: asset_ids[i], likes: likes[i]});
      }
    }
  }

  chart.sort((a, b) => {
    return b.likes - a.likes;
  });

  return chart;
}

/*  User API
 */

class clearance_handler {
  constructor() {
    this.ready    = false;
    this.address  = '';
    this.signer   = null;

    this.price_scale = 1;
  }

  async empty_stock() { }

  async add_balance(balance) { }

  async mint_resources(resources) { }

  update() {
    return new Promise((resolve, reject) => {
      update_mutex = update_mutex.then(async () => {
        try {
          /*  Wait for auth.
           */
          await preload;

          const { fetch, log, node_url, library } = options_();

          const last_update = Date.now();

          if (this.ready && last_update - this.last_update < UPDATE_TIMEOUT) {
            log('* UPDATE CACHED');
          } else {
            if (!this.ready) {
              try {
                const price_token = await sdk.fetch_json_request(
                  fetch,
                  `${node_url}addresses/data/${library}/${KEY_PRICE_HYBRID_TOKEN}`,
                  { method: 'GET' },
                  log);

                if (price_token.value === 'WAVES' || price_token.value === '') {
                  this.price_name   = 'WAVES';
                  this.price_token  = TOKEN_WAVES;
                  this.price_scale  = 10 ** 8;
                } else {
                  const details = await sdk.fetch_json_request(
                    fetch,
                    `${node_url}assets/details/${price_token.value}`,
                    { method: 'GET' },
                    log);

                  this.price_name   = details.name;
                  this.price_token  = price_token.value;
                  this.price_scale  = 10 ** details.decimals;
                }
              } catch (error_) {
                debug_log(error_);

                this.price_name   = 'WAVES';
                this.price_token  = TOKEN_WAVES;
                this.price_scale  = 10 ** 8;
              }

              try {
                const details = await sdk.fetch_json_request(
                  fetch,
                  `${node_url}assets/details/${TOKEN_FREE_MIX}`,
                  { method: 'GET' },
                  log);

                this.free_mix_token_scale = 10 ** details.decimals;
              } catch (error_) {
                this.free_mix_token_scale = 1;
              }

              try {
                const price_amount = await sdk.fetch_json_request(
                  fetch,
                  `${node_url}addresses/data/${id_library}/${KEY_PRICE_HYBRID_AMOUNT}`,
                  { method: 'GET' },
                  log);

                this.price_hybrid = price_amount.value;
              } catch (error_) {
                this.price_hybrid = 0;
              }
            }

            let response;

            try {
              if (this.price_token === TOKEN_WAVES) {
                response = await sdk.fetch_json_request(
                  fetch,
                  `${node_url}addresses/balance/${this.address}`,
                  { method: 'GET' },
                  log);
              } else {
                response = await sdk.fetch_json_request(
                  fetch,
                  `${node_url}assets/balance/${this.address}/${this.price_token}`,
                  { method: 'GET' },
                  log);
              }
            } catch (error_) {
              response = null;
            }

            if (response === null) {
              this.balance = 0;
            } else {
              this.balance = response.balance;
            }

            try {
              response = await sdk.fetch_json_request(
                fetch,
                `${node_url}assets/balance/${this.address}/${TOKEN_FREE_MIX}`,
                { method: 'GET' },
                log);

              this.free_mix_balance = response.balance;
            } catch (error_) {
              this.free_mix_balance = 0;
            }

            let v     = [];
            let after = null;

            const limit = 1000;

            while (true) {
              let request = `${node_url}assets/nft/${this.address}/limit/${limit}`;

              if (after) {
                request += `?after=${after}`;
              }

              const nfts = await sdk.fetch_json_request(fetch, request, { method: 'GET' }, log);

              for (const x of nfts) {
                v.push({
                  asset_id: x.assetId,
                  height:   x.issueHeight
                });
              }

              if (nfts.length < limit) {
                break;
              }

              after = nfts[nfts.length - 1].assetId;
            }

            v.sort((left, right) => {
              if (left.height < right.height)
                return 1;
              if (left.height > right.height)
                return -1;
              return 0;
            });

            this.nfts = [];

            for (const x of v) {
              this.nfts.push(x.asset_id);
            }

            this.ready        = true;
            this.last_update  = last_update;
          }

          resolve();
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  async get_balance() {
    await this.update();

    return {
      asset_name: this.price_name,
      amount:     this.balance / this.price_scale
    };
  }

  async get_free_mix_balance() {
    await this.update();

    return this.free_mix_balance / this.free_mix_token_scale;
  }

  async get_price(type) {
    if (type != types.hybrid) {
      throw new Error('Invalid entity type');
    }

    return {
      asset_name: this.price_name,
      amount:     this.price_hybrid / this.price_scale
    };
  }

  async get_resources(options) {
    const need_songs =  !('filter' in options) ||
                        options.filter === types.song ||
                        options.filter.includes(types.song);

    if (!need_songs) {
      return [];
    }

    await this.update();

    const size  = options?.size || 100;
    const after = options?.after;

    let first = 0;

    const sdk_opts = options_();

    if (after) {
      const after_asset_id = await sdk.fetch_value(after, sdk_opts);

      for (; first < this.nfts.length; first++) {
        if (this.nfts[first] === after_asset_id) {
          first++;
          break;
        }
      }
    }

    if (first >= this.nfts.length) {
      return [];
    }

    let songs = [];
    let keys  = [];

    for (let i = first; i < this.nfts.length; i++) {
      keys.push(`${this.nfts[i]}`);
    }

    const ids = await sdk.fetch_some_values(keys, sdk_opts);
    keys      = [];

    for (let i = 0; i < ids.length; i++) {
      songs.push(null);

      if (ids[i] !== null) {
        songs[i] = {
          asset_id: this.nfts[first + i],
          id:       ids[i]
        };
        keys.push(`${ids[i]}_SN`);
        keys.push(`${ids[i]}_SL`);
      }
    }

    if (keys.length === 0) {
      return [];
    }

    const names = await sdk.fetch_some_values(keys, sdk_opts);
    let j       = 0;

    for (let i = 0; i < songs.length; i++) {
      if (songs[i] !== null) {
        if (names[j] !== null) {
          songs[i].label  = sdk.get_song_name_by_asset_id(songs[i].asset_id, sdk_opts);
          songs[i].colors = sdk.get_song_colors_by_asset_id(songs[i].asset_id, sdk_opts);
        } else {
          songs[i] = null;
        }
        j += 2;
      }
    }

    let result = [];

    for (let i = 0; i < songs.length; i++) {
      if (songs[i] !== null) {
        result.push({
          type:       types.song,
          asset_id:   songs[i].asset_id,
          id:         songs[i].id,
          label:      await songs[i].label,
          colors:     await songs[i].colors
        });
      }
    }

    return result;
  }

  async buy(type) {
    throw new Error('Not implemented');
  }

  async mint_song(resources) {
    throw new Error('Not implemented');
    return '';
  }

  async mint_internal(tx_data) {
    if (!this.signer)
      throw new Error('No signer');

    let tx;

    try {
      [ tx ] = await this.signer
        .invoke(tx_data)
        .broadcast();
    } catch (error) {
      throw new Error(error.message);
    }

    const info = await tx_info_wait(tx.id);

    /*  @automainint
     *
     *  Must update to fetch new asset.
     */
    this.ready = false;

    let asset_id;

    if (info.stateChanges.issues.length != 0) {
      asset_id = info.stateChanges.issues[0].assetId;
    } else {
      for (const inv of info.stateChanges.invokes) {
        if (inv.stateChanges.issues != 0) {
          asset_id = inv.stateChanges.issues[0].assetId;
          break;
        }
      }
    }

    for (const x of info.stateChanges.data)
      if (x.key === asset_id)
        return x.value;

    throw new Error('Unknown error');
  }

  async mint_hybrid(songs) {
    if (songs.length != 2)
      throw new Error('Wrong resources');
    if (!('id' in songs[0]))
      throw new Error('Wrong resources');
    if (!('id' in songs[1]))
      throw new Error('Wrong resources');

    return await this.mint_internal({
      dApp: id_library,
      call: {
        function: 'mint_hybrid',
        args: [
          { type: 'string', value: songs[0].id },
          { type: 'string', value: songs[1].id }
        ],
      },
      payment: [
        { assetId:  this.price_token,
          /*  @automainint
           *
           *  Extra price will be returned if not needed.
           */
          amount:   this.price_hybrid + HYBRID_PRICE_EXTRA * this.price_scale }
      ],
      feeAssetId: TX_FEE_ASSET_ID,
      fee:        TX_FEE
    });
  }

  async mint_hybrid_with_free_mix_token(songs) {
    if (songs.length != 2)
      throw new Error('Wrong resources');
    if (!('id' in songs[0]))
      throw new Error('Wrong resources');
    if (!('id' in songs[1]))
      throw new Error('Wrong resources');

    return await this.mint_internal({
      dApp: id_library,
      call: {
        function: 'mint_hybrid',
        args: [
          { type: 'string', value: songs[0].id },
          { type: 'string', value: songs[1].id }
        ],
      },
      payment: [
        { assetId:  TOKEN_FREE_MIX,
          amount:   this.free_mix_token_scale }
      ],
      feeAssetId: TX_FEE_ASSET_ID,
      fee:        TX_FEE
    });
  }

  async mint_hybrid_and_burn(songs) {
    if (songs.length != 2)
      throw new Error("Wrong resources");
    if (!('asset_id' in songs[0]))
      throw new Error('Wrong resources');
    if (!('asset_id' in songs[1]))
      throw new Error('Wrong resources');

    return await this.mint_internal({
      dApp: id_library,
      call: {
        function: 'mint_hybrid_and_burn',
        args: [ ],
      },
      payment: [
        { assetId: songs[0].asset_id, amount: 1 },
        { assetId: songs[1].asset_id, amount: 1 }
      ],
      feeAssetId: TX_FEE_ASSET_ID,
      fee:        TX_FEE
    });
  }

  async mint_song_clone(song) {
    let [ token, price ] = await sdk.fetch_values(
      [ `ST_${song.asset_id}`, `SP_${song.asset_id}` ],
      options_());

    if (token === '' || token === 'WAVES') {
      //  Payment in WAVES
      token = null;
    }

    return await this.mint_internal({
      dApp: id_library,
      call: {
        function: 'store_mint_song',
        args: [
          { type: 'string', value: song.asset_id }
        ],
      },
      payment: [
        { assetId: token, amount: price }
      ],
      feeAssetId: TX_FEE_ASSET_ID,
      fee:        TX_FEE
    });
  }

  async like(asset_id) {
    if (!this.signer)
      throw new Error('No signer');

    const [ tx ] = await this.signer
      .invoke({
        dApp: id_library,
        call: {
          function: 'chart_like_add',
          args: [
            { type: 'string', value: asset_id }
          ],
        },
        payment:    [],
        feeAssetId: TX_FEE_ASSET_ID,
        fee:        TX_FEE
      })
      .broadcast();

    await tx_info_wait(tx.id);
  }

  async get_likes() {
    const opts = options_();
    
    const count = await sdk.fetch_value('count', opts);

    let liked_songs = [];

    for (let n = 512; n < count; n += 100) {
      let ids = [];

      for (let i = n; i < n + 100 && i < count; i++) {
        ids.push(sdk.int_to_base58(i));
      }

      let asset_ids = await sdk.fetch_some_values(ids, opts);
      let keys      = [];

      for (let i = 0; i < asset_ids.length;) {
        if (asset_ids[i] == null) {
          asset_ids.splice(i, 1);
        } else {
          keys.push(`CL_${asset_ids[i]}_${this.address}`);
          i++;
        }
      }

      const likes = await sdk.fetch_some_values(keys, opts);

      for (let i = 0; i < likes.length; i++) {
        if (likes[i] != null && likes[i]) {
          liked_songs.push(asset_ids[i]);
        }
      }
    }

    return liked_songs;
  }

  async get_wallet_address() {
    return this.address;
  }

  async get_explorer_url() {
    return `https://wavesexplorer.com/addresses/${this.address}?network=${network}`;
  }

  async can_mint_hybrid() {
    await this.update();

    return this.balance >= this.price_hybrid || this.free_mix_token_balance >= this.free_mix_token_scale;
  }

  async logout() {
    if (this.signer) {
      await this.signer.logout();
    }
  }

  async get_airdrop_info(airdrop_name) {
    const get_value = async (key, def) => {
      try {
        const { fetch, node_url, log } = options_();
        const response = await fetch_json_request(
          fetch,
          `${node_url}addresses/data/${id_claim_pool}/${airdrop_name}_${key}`,
          { method: 'GET' },
          log);
        return response.value;
      } catch (error_) {
        return def;
      }
    };

    const end = await get_value(`end`,  -1);

    if (end === -1)
      return {
        airdrop_exists:     false,
        user_in_whitelist:  false,
        allowed_claims:     0,
        songs_total:        0
      };

    const begin           = await get_value(`begin`, 0);
    const allowed_anyone  = await get_value('AA', -1);
    const allowed         = await get_value(`A_${this.address}`, allowed_anyone);

    if (allowed === -1)
      return {
        airdrop_exists:     true,
        user_in_whitelist:  false,
        allowed_claims:     0,
        songs_total:        end - begin
      };

    return {
      airdrop_exists:     true,
      user_in_whitelist:  true,
      allowed_claims:     allowed,
      songs_total:        end - begin
    };
  }

  async airdrop_claim(airdrop_name) {
    if (!this.signer)
      throw new Error('No signer');

    const get_value = async (key, def) => {
      try {
        const { fetch, node_url, log } = options_();
        const response = await fetch_json_request(
          fetch,
          `${node_url}addresses/data/${id_claim_pool}/${airdrop_name}_${key}`,
          { method: 'GET' },
          log);
        return response.value;
      } catch (error_) {
        return def;
      }
    };

    const begin           = await get_value(`begin`, 0);
    const end             = await get_value(`end`, 0);
    const allowed_anyone  = await get_value('AA', 0);
    const allowed         = await get_value(`A_${this.address}`, allowed_anyone);

    let amount = allowed;
    if (amount > CLAIM_LIMIT)
      amount = CLAIM_LIMIT;
    if (amount > end - begin)
      amount = end - begin;
    if (amount === 0)
      return [];

    let tx;

    try {
      [ tx ] = await this.signer
        .invoke({
          dApp: id_claim_pool,
          call: {
            function: 'claim',
            args: [
              { type: 'string',   value: airdrop_name },
              { type: 'integer',  value: amount }
            ],
          },
          feeAssetId: CLAIM_FEE_ASSET_ID,
          fee:        CLAIM_FEE
        })
        .broadcast();
    } catch (error) {
      throw new Error(error.message);
    }

    const info = await tx_info_wait(tx.id);

    /*  @automainint
     *
     *  Must update to fetch new asset.
     */
    this.ready = false;

    let assets = [];

    for (const transfer of info.stateChanges.transfers) {
      assets.push(transfer.asset);
    }

    return await sdk.fetch_values(assets, options_());
  }
};

async function adjust_node_url() {
  /*  @automainint
   *
   *  Adjust `node_url` according to user's current
   *  KeeperWallet extension settings.
   */

  if (!('KeeperWallet' in window) && document.readyState != 'complete') {
    /*  Make sure the page is loaded.
      */
    await new Promise((resolve) => {
      if (document.readyState != 'complete')
        window.addEventListener('load', resolve);
      else
        resolve();
    });
  }

  if (!('KeeperWallet' in window)) {
    return;
  }

  let wallet_api;
  let state;

  try {
    wallet_api  = await window.KeeperWallet.initialPromise;
    state       = await wallet_api.publicState();
  } catch (error) {
    return;
  }

  node_url = state.network.server;
}

async function authenticate(options) {
  try {
    let provider = null;

    if        (options.env.provider === 'keeper') {
      provider = new ProviderKeeper();
    } else if (options.env.provider === 'cloud') {
      provider = new ProviderCloud();
    } else if (options.env.provider === 'web') {
      provider = new ProviderWeb();
    }

    if (!provider) {
      throw new Error('Invalid environment');
    }

    await adjust_node_url();

    const signer = new Signer({
      NODE_URL: node_url
    });

    signer.setProvider(provider);

    const { address } = await signer.login();

    let chain_id = await signer.getNetworkByte();

    if (typeof chain_id === 'number') {
      chain_id = String.fromCharCode(chain_id);
    }

    debug_log(`Chain ID:    ${chain_id}`);

    if (!(chain_id in options.env)) {
      await signer.logout();
      throw new Error('Invalid chain ID');
    }

    id_library    = options.env[chain_id].id_library;
    id_claim_pool = options.env[chain_id].id_claim_pool;
    node_url      = options.env[chain_id].node_url;
    network       = options.env[chain_id].network;

    /*  FIXME
     *  Preload hack.
     */
    preload_done();

    debug_log(`Contract Library:    ${id_library}`);
    debug_log(`Contract Claim Pool: ${id_claim_pool}`);
    debug_log(`Node URL:            ${node_url}`);
    debug_log(`Network:             ${network}`);

    let user = new clearance_handler();

    user.signer   = signer;
    user.address  = address;

    await user.update();

    return user;

  } catch (error) {
    debug_log(error);

    if (error.message)
      throw new Error(error.message);

    throw new Error('Unknown error');
  }
}

const NOTE_SKIP = sdk.NOTE_SKIP;

export {
  env,
  types,
  NOTE_SKIP,
  authenticate,
  get_resource_by_id,
  get_resource_by_asset_id,
  get_song_rarity_by_asset_id,
  get_chart,

  get_mintable_songs,
  get_mint_quantity,
  get_mint_price,
  get_mint_type
};

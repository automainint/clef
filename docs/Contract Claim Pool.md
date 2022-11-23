# `contracts/claim_pool.ride`
Contract address
- Mainnet: `3PPhk52YuwKTFT2U865di1Pepj4bFHxubFY`
- Testnet: `3Mxdqvpx6gFBJRrjq1wHMWvJKLF7vPgfuYp`

##  Data entries
- `W_<Address>` - `true` if _Address_ is whitelisted to allow claims.
- For each _Airdrop_:
  - `<Airdrop>_A_<Address>` - integer value, how many assets can claim specified _Address_.
  - `<Airdrop>_begin` - integer value, start of the claim queue.
  - `<Airdrop>_end` - integer value, end of the claim queue.
  - `<Airdrop>_X_<Key>` - string value, _N-th_ asset id in queue, where _Key_ is an base58 representation of _N_.

To check if a user can claim assets, you can make request:
`<NODE URL>/addresses/data/<CONTRACT ADDRESS>/<AIRDROP>_A_<USER ADDRESS>`

**Example**
```js
const node_url      = 'https://nodes.wavesnodes.com/';
const contract_id   = '3PPhk52YuwKTFT2U865di1Pepj4bFHxubFY';
const user_address  = '3N6vMCMtqhxu8S8YbhsCtFoua5sowWMEje7';
const airdrop       = 'testairdrop';

let allowed = 0;

try {
  const response = await window.fetch(
    `${node_url}addresses/data/${contract_id}/${airdrop}_A_${user_address}`,
    { method: 'GET' });

  if (response.status === 200) {
    const data = await response.json();
    allowed = data.value;
  }

} catch (error) {
  console.error(error);
}

console.log(`User ${user_address} can claim ${allowed} assets.`);
```

##  Functions
- `whitelist_add (account: String)` - Add account to whitelist. Whitelisted accounts can put assets into the pool and allow accounts to claim assets.
- `whitelist_remove (account: String)` - Remove account from whitelist.
- `put_assets (airdrop: String)` - Put an asset to the pool for specified airdrop.
  - `airdrop` - airdrop name.
  - Payment
    - 1 to 10 assets.
- `allow (airdrop: String, amount: Int, accounts: List[String])` - Allow accounts to claim assets from specified airdrop.
  - `airdrop` - airdrop name.
  - `amount` - how many assets specified account can claim.
  - `accounts` - array of base58 account addresses.
- `claim (airdrop: String, amount: Int)` - Claim assets from the specified airdrop.
  - `airdrop` - airdrop name.
  - `amount` - how many assets to claim; must be in range from 1 to 20.

**To claim an asset, you can use this code**
```js
const node_url    = 'https://nodes.wavesnodes.com/';
const contract_id = '3PPhk52YuwKTFT2U865di1Pepj4bFHxubFY';
const airdrop     = 'testairdrop';

const signer = new Signer({ NODE_URL: node_url });

signer.setProvider(new ProviderKeeper());

const [ tx ] = await signer
  .invoke({
    dApp: contract_id,
    call: {
      function: 'claim',
      args: [
        { type: 'string',   value: airdrop },
        { type: 'integer',  value: 1 }
      ],
    },
    feeAssetId: 'WAVES',
    fee:        500000
  })
  .broadcast();

await signer.waitTxConfirm(tx, 1);
```

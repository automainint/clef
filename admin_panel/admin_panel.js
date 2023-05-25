async function fetch_decimals(asset_id) {
  if (asset_id === '' || asset_id === 'WAVES') {
    return 8;
  }

  const node_url = (await window.KeeperWallet.publicState()).network.server;

  const details = await (await window.fetch(`${node_url}assets/details/${asset_id}`)).json();

  return details.decimals;
}

async function on_mix_price_apply() {
  const asset_id  = document.getElementById('mix_price_asset_id').value;
  const amount    = document.getElementById('mix_price_amount').value;

  let scale = 10 ** await fetch_decimals(asset_id);

  window.KeeperWallet
    .signAndPublishTransaction({
      type: 16,
      data: {
        dApp: '3P4m4beJ6p1pMPHqCQMAXEdquUuXJz72CMe',
        call: {
          function: 'set_price_hybrid',
          args: [
            { type: 'string',   value: asset_id       },
            { type: 'integer',  value: amount * scale },
            { type: 'integer',  value: amount * scale },
            { type: 'integer',  value: 0              }
          ]
        }
      }
    });
}

document.getElementById('mix_price_apply').addEventListener('click', on_mix_price_apply);

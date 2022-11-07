/* eslint-disable */

const network_options = {
  /*  Mainnet options
   */
  'W': {
    id_library:     '3P4m4beJ6p1pMPHqCQMAXEdquUuXJz72CMe',
    id_claim_pool:  '3PPhk52YuwKTFT2U865di1Pepj4bFHxubFY',
    network:        'mainnet',
    node_url:       'https://nodes.wavesnodes.com/'
  },
  /*  Testnet options
   */
  'T': {
    id_library:     '3N4XDqsd3iMrXb6kS7R7Wwd4azMsqUXMvfe',
    id_claim_pool:  '3Mxdqvpx6gFBJRrjq1wHMWvJKLF7vPgfuYp',
    network:        'testnet',
    node_url:       'https://nodes-testnet.wavesnodes.com/'
  },
  /*  Custom network options
   */
  'R': {
    id_library:     '3M9xPiK77q2kjzct3TZsfAnfqJPovrXAdKV',
    id_claim_pool:  '3Mxdqvpx6gFBJRrjq1wHMWvJKLF7vPgfuYp',
    network:        'custom',
    node_url:       'http://localhost:6869/'
  }
};

module.exports = {
  env: {
    keeper: {
      ...network_options,
      provider: 'keeper'
    },
    cloud: {
      ...network_options,
      provider: 'cloud'
    },
    web: {
      ...network_options,
      provider: 'web'
    }
  }
};

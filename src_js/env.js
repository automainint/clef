/* eslint-disable */

const provider_options = {
  /*  Mainnet options
   */
  'W': {
    contract_id:  '3P4m4beJ6p1pMPHqCQMAXEdquUuXJz72CMe',
    network:      'mainnet',
    node_url:     'https://nodes.wavesnodes.com/'
  },
  /*  Testnet options
   */
  'T': {
    contract_id:  '3N4XDqsd3iMrXb6kS7R7Wwd4azMsqUXMvfe',
    network:      'testnet',
    node_url:     'https://nodes-testnet.wavesnodes.com/'
  },
  /*  Custom network options
   */
  'R': {
    contract_id:  '3M9xPiK77q2kjzct3TZsfAnfqJPovrXAdKV',
    network:      'custom',
    node_url:     'http://localhost:6869/'
  }
};

module.exports = {
  env: {
    keeper: {
      ...provider_options,
      provider: 'keeper'
    },
    cloud: {
      ...provider_options,
      provider: 'cloud'
    },
    web: {
      ...provider_options,
      provider: 'web'
    }
  }
};

/* eslint-disable */

const provider_options = {
  'R': {
    contract_id:  '3M9xPiK77q2kjzct3TZsfAnfqJPovrXAdKV',
    network:      'custom',
    node_url:     'http://localhost:6869/'
  },
  'T': {
    contract_id:  '3N4XDqsd3iMrXb6kS7R7Wwd4azMsqUXMvfe',
    network:      'testnet',
    node_url:     'https://nodes-testnet.wavesnodes.com/'
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

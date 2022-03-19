# Sunblock.finance repo


# Developer setup
To get started with developing against Sunblock a few steps need to be done.

1. Install hardhat
2. `yarn install`

## Start local development node
Run `npx hardhat node` to start the local node.

After which you can run two scripts to get the environment up.
1. `npx hardhat run --network localhost scripts/deploy-local.js`
2. `npx hardhat run --network localhost scripts/admin-local.js`

First script will deploy the contracts onto the node. The second script will
give the cube contract management rights for vehicle contracts so it can
deposit and withdraw funds from it.

## Gotcha 🤦🏻‍♂️
`Transaction decoding is not available for chainId 31337`

You will likely get this error after a restart of the node. You will need to `reset` the account
in metamask to get it back. You go to the account and go to `settings`. Now go to `Advanced` and there
you will see a `reset account` button. This will only remove transaction history and nothing else so
you can safely click it and the transactions should work again
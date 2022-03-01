// Copyright 2022 Kenth Fagerlund.
// SPDX-License-Identifier: MIT
import { initializeConnector } from '@web3-react/core'
import { MetaMask } from '@web3-react/metamask'

export const [metaMask, hooks] = initializeConnector<MetaMask>((actions) => new MetaMask(actions))
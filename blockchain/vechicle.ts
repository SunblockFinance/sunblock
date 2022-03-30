// Copyright 2022 Kenth Fagerlund.
// SPDX-License-Identifier: MIT
// ========== CONTRACT CALLS ============ //

import { ethers } from "ethers"

const provider = new ethers.providers.WebSocketProvider(
    `wss://ws-matic-mainnet.chainstacklabs.com`
  )

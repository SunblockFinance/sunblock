// Copyright 2022 Kenth Fagerlund.
// SPDX-License-Identifier: MIT
import { BigNumber, ethers } from 'ethers'
import { ABI_ERC20 } from '../contracts/abi/erc20'
import { ABI_SUNBLOCK_CUBE } from '../contracts/abi/sunblock'
import { CONTRACT_ADDRESS_CUBE, TOKEN_ADDRESS_USDT } from '../programs/polygon'
import { formatUSDTWeiToNumber } from '../utils/formaters'

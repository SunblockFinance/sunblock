// Copyright 2022 Kenth Fagerlund.
// SPDX-License-Identifier: MIT

import { Chip } from '@mui/material'
import { BigNumber, Contract, ethers } from 'ethers'
import { track } from 'insights-js'
import { useSnackbar } from 'notistack'
import React, { FC, useState } from 'react'
import ContractConnector from '../blockchain/ContractConnector'
import { hooks } from '../connectors/metamask'
import { ABI_ERC20 } from '../contracts/abi/erc20'
import { ABI_SUNBLOCK_CUBE } from '../contracts/abi/sunblock'
import { CONTRACT_ADDRESS_CUBE, TOKEN_ADDRESS_USDT } from '../programs/polygon'
import { formatUSDTWeiToNumber } from '../utils/formaters'

/**
 * CONSTANTS
 */
const TXT_NO_ALLOWANCE = 'No allowance given'

/**
 * VARIABLES
 */
let eth
const { useAccount, useProvider, useChainId } = hooks

const AllowancePill: FC<{ shareCost: number }> = ({ shareCost: shareCost }) => {
  const provider = useProvider()
  const chainid = useChainId()
  const { enqueueSnackbar } = useSnackbar()

  const erc20 = new ethers.Contract(TOKEN_ADDRESS_USDT, ABI_ERC20, provider)
  const sunblock = new ethers.Contract(
    CONTRACT_ADDRESS_CUBE,
    ABI_SUNBLOCK_CUBE,
    provider
  )
  /**
   * STATE
   */
  const [allowance, setAllowance] = useState(0)
  const [spendlimitWarning, setSpendlimitWarning] = useState(false)

  /**
   * LOCAL VARIABLES
   */

  const account = useAccount()

  // const {NotifyAllowanceIncresed: NotifyAllowanceIncreased, NotifyAllowanceRemoved}= useSnackbarNotifications()

  async function addAllowance(amount: number) {
    if (provider && chainid && chainid !== 0) {
      try {
        const connector = new ContractConnector(chainid)

        const shareprice = await connector.getSharePrice()
        const ethSharePrice = ethers.utils.parseUnits(shareprice.toString(), 6)

        const signer = provider.getSigner()
        connector.approveERC20Allowance(signer, ethSharePrice.mul(amount))
      } catch (error) {
        console.error
      }
    }
  }

  async function removeAllowance(): Promise<void> {
    try {
      const signer = provider?.getSigner()
      if (signer === undefined) return
      const rwContract: Contract = erc20.connect(signer)
      await rwContract
        .approve(CONTRACT_ADDRESS_CUBE, BigNumber.from(0))
        .catch((error: Error) => console.log(error))

      erc20
        ?.once('Approval', (to, spender, value) => {
          const ethValue = formatUSDTWeiToNumber(value)
          setAllowance(ethValue)
          track({
            id: 'approval-removed',
          })
        })
        .catch((error: Error) => console.log(error))
    } catch (error) {}
  }

  React.useEffect(() => {
    if (provider && chainid && account) {
      try {
        const cube = new ContractConnector(chainid)
        cube
          .getERC20Allowance(account)
          .then((amount) => {
            setAllowance(amount)
            if (amount === 0) {
              setSpendlimitWarning(true)
            } else {
              setSpendlimitWarning(false)
            }
          })
          .catch(console.error)
      } catch (error) {
        console.error
      }
    }

    return () => {
      setAllowance(-1)
      setSpendlimitWarning(false)
    }
  }, [chainid, provider, account])

  return (
    <Chip
      title="Revoke allowance for sunblock"
      onClick={() => {
        addAllowance(shareCost * 2)
      }}
      label={
        allowance < shareCost
          ? `Allowance to low. Click here to increse`
          : `Your allowance to us is ${allowance} USDT`
      }
      clickable={allowance < shareCost ? true : false}
      onDelete={allowance < shareCost ? undefined : removeAllowance}
      color={allowance < shareCost ? 'error' : 'default'}
    />
  )
}

export default AllowancePill

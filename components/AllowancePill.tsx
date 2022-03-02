// Copyright 2022 Kenth Fagerlund.
// SPDX-License-Identifier: MIT

import { Chip } from '@mui/material'
import { BigNumber, Contract, ethers } from 'ethers'
import React, { FC, useState } from 'react'
import { hooks } from '../connectors/metamask'
import { ABI_SUNBLOCK } from '../contracts/abi/sunblock'
import { ABI_ERC20, InvestmentVehicle } from '../programs/contracts'
import {
  CONTRACT_ADDRESS_SUNBLOCK,
  TOKEN_ADDRESS_DEMOERC20
} from '../programs/polygon'
import { formatWeiToNumber } from '../utils/formaters'

/**
 * CONSTANTS
 */
const TXT_NO_ALLOWANCE = 'No allowance given'

/**
 * VARIABLES
 */
let eth
const { useAccounts, useProvider } = hooks

const AllowancePill: FC<{ shareCost: number }> = ({ shareCost: shareCost }) => {
  const provider = useProvider()

  const erc20 = new ethers.Contract(
    TOKEN_ADDRESS_DEMOERC20,
    ABI_ERC20,
    provider
  )
  const sunblock = new ethers.Contract(
    CONTRACT_ADDRESS_SUNBLOCK,
    ABI_SUNBLOCK,
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

  const accounts = useAccounts()

  // const {NotifyAllowanceIncresed: NotifyAllowanceIncreased, NotifyAllowanceRemoved}= useSnackbarNotifications()

  async function addAllowance(amount: number) {

    const signer = provider?.getSigner()
    if (signer === undefined) return
    const add = await signer.getAddress()

    const vehicle: InvestmentVehicle = await new Contract(CONTRACT_ADDRESS_SUNBLOCK, ABI_SUNBLOCK, signer).vehicle()
    const sum = vehicle.unitcost.mul(amount)
    const erc20signed = new ethers.Contract(
      TOKEN_ADDRESS_DEMOERC20,
      ABI_ERC20,
      signer
    )
    await erc20signed.approve(CONTRACT_ADDRESS_SUNBLOCK, sum).catch((error:Error) => console.log(error))
    erc20signed.on('Approval', (to, spender, value) => {
      setAllowance(formatWeiToNumber(value))
      // NotifyAllowanceIncreased
    })
  }

  async function removeAllowance(): Promise<void> {
    try {
      const signer = provider?.getSigner()
      if (signer === undefined) return
      const rwContract:Contract = erc20.connect(signer)
      await rwContract.approve(CONTRACT_ADDRESS_SUNBLOCK, BigNumber.from(0)).catch((error:Error) => console.log(error))
      erc20?.on('Approval', (to, spender, value) => {
        const ethValue = Number.parseFloat(ethers.utils.formatEther(value))
        setAllowance(ethValue)
        // NotifyAllowanceRemoved
      }).catch((error:Error) => console.log(error))
    } catch (error) {}
  }

  async function updateAllowance(): Promise<void> {
    const signer = provider?.getSigner()
    if (signer === undefined) return
    const walletAddress = await signer?.getAddress()

    // If we get undefined here then the user is very likely not logged in to metamask
    if (walletAddress === undefined) return

    const amount: BigNumber = await erc20?.allowance(
      walletAddress,
      CONTRACT_ADDRESS_SUNBLOCK
    ).catch((error:Error) => console.log(error))
    const tokenNumber = formatWeiToNumber(amount)
    setAllowance(tokenNumber)
    try {
      if (tokenNumber > Number.MAX_SAFE_INTEGER) {
        setSpendlimitWarning(true)
      } else if (tokenNumber === 0) {
        setSpendlimitWarning(true)
      } else {
        setSpendlimitWarning(false)
      }
    } catch (error) {
      setAllowance(-1)
      setSpendlimitWarning(true)
    }
  }

  React.useEffect(() => {
    updateAllowance()


    return () => {
      // setAllowance(-1)
      // setSpendlimitWarning(false)
    }
  })

  return (

      <Chip
        title="Revoke allowance for sunblock"
        onClick={() => {
          addAllowance(shareCost * 2)
        }}
        label={
          allowance < shareCost
            ? `Allowance to low. Click here to increse`
            : `Your allowance to us is ${allowance} USDC`
        }
        clickable={allowance < shareCost ? true : false}
        onDelete={allowance < shareCost ? undefined : removeAllowance}
        color={allowance < shareCost ? 'error' : 'default'}
      />

  )
}

export default AllowancePill

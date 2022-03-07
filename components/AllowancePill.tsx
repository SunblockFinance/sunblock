// Copyright 2022 Kenth Fagerlund.
// SPDX-License-Identifier: MIT

import { Chip } from '@mui/material'
import { BigNumber, Contract, ethers } from 'ethers'
import { track } from 'insights-js'
import { useSnackbar } from 'notistack'
import React, { FC, useState } from 'react'
import { hooks } from '../connectors/metamask'
import { ABI_SUNBLOCK } from '../contracts/abi/sunblock'
import { ABI_ERC20, InvestmentVehicle } from '../programs/contracts'
import { BlockChainNetwork, useBlockchainSettings } from '../programs/polygon'
import { formatUSDCWeiToNumber } from '../utils/formaters'

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
  const {TOKEN_ADDRESS_USDC, CONTRACT_ADDRESS_SUNBLOCK} = useBlockchainSettings(BlockChainNetwork.PolygonMain)
  const provider = useProvider()
  const {enqueueSnackbar} = useSnackbar()
  const erc20 = new ethers.Contract(
    TOKEN_ADDRESS_USDC,
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
    const signerAddress = await signer.getAddress()

    const vehicle: InvestmentVehicle = await new Contract(CONTRACT_ADDRESS_SUNBLOCK, ABI_SUNBLOCK, signer).vehicle()
    const sum = vehicle.unitcost.mul(amount)
    const erc20signed = new ethers.Contract(
      TOKEN_ADDRESS_USDC,
      ABI_ERC20,
      signer
    )
    await erc20signed.approve(CONTRACT_ADDRESS_SUNBLOCK, sum).catch((error:Error) => console.log(error))
    erc20signed.on('Approval', (to, spender, value) => {
      if (spender !== CONTRACT_ADDRESS_SUNBLOCK) {
        console.log(`Ignoring approval for ${spender}. We expect it for ${CONTRACT_ADDRESS_SUNBLOCK}`)
      } else {
        const allowanceNumber = formatUSDCWeiToNumber(value)
        setAllowance(allowanceNumber)
        enqueueSnackbar(`📣 Update! Allowance to Sunblock is now ${allowanceNumber} USDC.`, {
          variant: 'success',
          anchorOrigin: { horizontal: 'center', vertical: 'top' },
        })
        track({
          id: "approval-added",
        })
      }
    })

  }


  async function removeAllowance(): Promise<void> {
    try {
      const signer = provider?.getSigner()
      if (signer === undefined) return
      const rwContract:Contract = erc20.connect(signer)
      await rwContract.approve(CONTRACT_ADDRESS_SUNBLOCK, BigNumber.from(0)).catch((error:Error) => console.log(error))
      erc20?.on('Approval', (to, spender, value) => {
        const ethValue = formatUSDCWeiToNumber(value)
        setAllowance(ethValue)
        track({
          id: "approval-removed",
        })
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
    const tokenNumber = formatUSDCWeiToNumber(amount)
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

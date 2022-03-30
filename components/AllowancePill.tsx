// Copyright 2022 Kenth Fagerlund.
// SPDX-License-Identifier: MIT

import { Chip } from '@mui/material'
import { BigNumber, Contract, ethers } from 'ethers'
import { track } from 'insights-js'
import { useSnackbar } from 'notistack'
import React, { FC, useState } from 'react'
import ContractConnector from '../blockchain/ContractConnector'
import { useGlobalState } from '../blockchain/networks'
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
const { useAccounts, useProvider } = hooks

const AllowancePill: FC<{ shareCost: number }> = ({ shareCost: shareCost }) => {
  const provider = useProvider()
  const { enqueueSnackbar } = useSnackbar()
  const [chainid, setChainid] = useGlobalState('chainid')

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

  const accounts = useAccounts()

  // const {NotifyAllowanceIncresed: NotifyAllowanceIncreased, NotifyAllowanceRemoved}= useSnackbarNotifications()

  async function addAllowance(amount: number) {
    const signer = provider?.getSigner()
    if (signer === undefined) return
    const signerAddress = await signer.getAddress()

    const contract = await new Contract(
      CONTRACT_ADDRESS_CUBE,
      ABI_SUNBLOCK_CUBE,
      signer
    )
    const cost: BigNumber = await contract.unitcost()
    console.log(cost)

    const sum = cost.mul(amount)
    const erc20signed = new ethers.Contract(
      TOKEN_ADDRESS_USDT,
      ABI_ERC20,
      signer
    )
    await erc20signed
      .approve(CONTRACT_ADDRESS_CUBE, sum)
      .catch((error: Error) => console.log(error))
    erc20signed.once('Approval', (to, spender, value) => {
      if (spender !== CONTRACT_ADDRESS_CUBE) {
        console.log(
          `Ignoring approval for ${spender}. We expect it for ${CONTRACT_ADDRESS_CUBE}`
        )
      } else {
        const allowanceNumber = formatUSDTWeiToNumber(value)
        setAllowance(allowanceNumber)
        enqueueSnackbar(
          `📣 Update! Allowance to Sunblock is now ${allowanceNumber} USDT.`,
          {
            variant: 'success',
            anchorOrigin: { horizontal: 'center', vertical: 'top' },
          }
        )
        track({
          id: 'approval-added',
        })
      }
    })
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

  // async function updateAllowance(): Promise<void> {
  //   const signer = provider?.getSigner()
  //   if (signer === undefined) return
  //   const walletAddress = await signer?.getAddress()

  //   // If we get undefined here then the user is very likely not logged in to metamask
  //   if (walletAddress === undefined) return

  //   const tokenNumber = await cube.getERC20Allowance(walletAddress)
  //   setAllowance(tokenNumber)
  //   try {
  //     if (tokenNumber > Number.MAX_SAFE_INTEGER) {
  //       setSpendlimitWarning(true)
  //     } else if (tokenNumber === 0) {
  //       setSpendlimitWarning(true)
  //     } else {
  //       setSpendlimitWarning(false)
  //     }
  //   } catch (error) {
  //     setAllowance(-1)
  //     setSpendlimitWarning(true)
  //   }
  // }

  React.useEffect(() => {
    if (provider && chainid !== 0) {
      const cube = new ContractConnector(chainid)
      const signer = provider.getSigner()
      const walletAddress = async () => signer.getAddress()

      // If we get undefined here then the user is very likely not logged in to metamask
      if (walletAddress === undefined) return

      ;async () => {
        const walletAddress = await signer.getAddress()
        const amount = await cube.getERC20Allowance(walletAddress)

        setAllowance(amount)
        try {
          if (amount > Number.MAX_SAFE_INTEGER) {
            setSpendlimitWarning(true)
          // deepcode ignore DuplicateIfBody: <False positive. Spending limit is true and false, not identical>
          } else if (amount === 0) {
            setSpendlimitWarning(true)
          } else {
            setSpendlimitWarning(false)
          }
        } catch (error) {
          setAllowance(-1)
          setSpendlimitWarning(true)
        }
      }
    }

    return () => {
      setAllowance(-1)
      setSpendlimitWarning(false)
    }
  }, [chainid, provider])

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

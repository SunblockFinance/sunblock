// Copyright (c) 2022 Kenth Fagerlund
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { BigNumber, ethers } from 'ethers'
import { useSnackbar } from 'notistack'
import { FC, useEffect, useRef, useState } from 'react'
import {
  ABI_ERC20,
  ABI_SUNBLOCK,
  InvestmentVehicle
} from '../programs/contracts'
import {
  CONTRACT_ADDRESS_SUNBLOCK,
  TOKEN_ADDRESS_DEMOERC20
} from '../programs/polygon'

let eth: any

export const PurchaseShares: FC = () => {
  const DEFAULT_SHARE_VALUE = 10
  const TXT_NO_ALLOWANCE = 'No allowanced'

  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  // What is the users current allowance
  const [allowance, setAllowance] = useState(0)
  const [allowanceNeeded, setAllowanceNeeded] = useState(false)
  const [spendlimitWarning, setSpendlimitWarning] = useState(Boolean)
  const [shareAmount, setShareAmount] = useState(DEFAULT_SHARE_VALUE)
  const [basketPrice, setBasketPrice] = useState('TESTING')
  const [investmentVehicle, setInvestmentVehicle] =
    useState<InvestmentVehicle>()
  const provider = useRef<ethers.providers.Web3Provider>()

  useEffect(() => {
    eth = (window as any).ethereum
    eth.on('accountsChanged', () =>  {
      updateAllowance()
    })

    if (!provider.current) {
      provider.current = new ethers.providers.Web3Provider(eth)
    }
    updateAllowance()
    updateInvestmentVehicle()
    return () => {}
  }, [])

  async function updateAllowance(): Promise<void> {
    const signer = provider.current?.getSigner()
    const walletAddress = await signer?.getAddress().catch((err) => {
      setAllowance(0)
      setSpendlimitWarning(false)
      return
    })
    // If we get undefined here then the user is very likely not logged in to metamask
    if (walletAddress === undefined) return

    const erc20 = new ethers.Contract(
      TOKEN_ADDRESS_DEMOERC20,
      ABI_ERC20,
      signer
    )
    const amount: BigNumber = await erc20.allowance(
      walletAddress,
      CONTRACT_ADDRESS_SUNBLOCK
    )

    const allowanceWai = amount
    const tokenAmount = ethers.utils.formatEther(allowanceWai)
    const tokenNumber = Number.parseInt(tokenAmount)
    setAllowance(tokenNumber)
    try {
      if (tokenNumber > Number.MAX_SAFE_INTEGER) {
        setSpendlimitWarning(true)
        setAllowanceNeeded(false)
      } else if (tokenNumber === 0) {
        setSpendlimitWarning(true)
        setAllowanceNeeded(true)
      } else {
        setSpendlimitWarning(false)
        setAllowanceNeeded(false)
      }
    } catch (error) {
      setAllowance(-1)
      setSpendlimitWarning(true)
    }
  }

  async function updateInvestmentVehicle() {
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS_SUNBLOCK,
      ABI_SUNBLOCK,
      provider.current
    )
    const vehicle: InvestmentVehicle = await contract.vehicle()
    setInvestmentVehicle(vehicle)
  }

  function removeAllowance() {
    //TODO #3 Implement removal of allowance
  }

  async function addAllowance(amount: number) {
    const signer = provider.current!.getSigner()
    const add = await signer.getAddress()

    // If we get undefined here then the user is very likely not logged in to metamask
    if (add === undefined) return

    const erc20 = new ethers.Contract(
      TOKEN_ADDRESS_DEMOERC20,
      ABI_ERC20,
      signer
    )

    const contract = new ethers.Contract(
      CONTRACT_ADDRESS_SUNBLOCK,
      ABI_SUNBLOCK,
      signer
    )

    const vehicle: InvestmentVehicle = await contract.vehicle()
    const sum = vehicle.unitcost.mul(amount)
    await erc20.approve(CONTRACT_ADDRESS_SUNBLOCK, sum)
    erc20.on('Approval', (to, spender, value) => {
      updateAllowance()
      enqueueSnackbar(`👍 Done! Allowance is now ${allowance}. Thanks for the trust!`, {
        variant: 'success',
        anchorOrigin: { horizontal: 'center', vertical: 'top' },
      })
    })
  }

  async function purchaseShare(amount: number) {

    const signer = provider.current?.getSigner()
    const sunblockContract = new ethers.Contract(
      CONTRACT_ADDRESS_SUNBLOCK,
      ABI_SUNBLOCK,
      signer
    )
    try {
      await sunblockContract.buyShares(TOKEN_ADDRESS_DEMOERC20, amount)
    } catch (error) {
      console.log(error)
      enqueueSnackbar("🙁 That didn't work as expected... Try again?", {
        variant: 'error',
        anchorOrigin: { horizontal: 'center', vertical: 'top' },
      })
    }
    sunblockContract.on(
      'Investment',
      async (shareCount, price, address, event) => {
        console.log(`Event: ${event} for address ${address}`)
        console.log(event)
        enqueueSnackbar(`👍 Done! You now got ${shareCount} shares. Nice!`, {
          variant: 'success',
          anchorOrigin: { horizontal: 'center', vertical: 'top' },
        })
      }
    )
  }

  const purchaseButton = (
    <Button
      color="warning"
      onClick={() => purchaseShare(shareAmount)}
      size="small"
      variant="contained"
    >
      Buy shares
    </Button>
  )
  const allowanceButton = (
    <Button
      onClick={() => addAllowance((shareAmount*2))}
      size="small"
      variant="contained"
    >
      Approve spend
    </Button>
  )

  return (
    <Stack direction="column">
      <Stack direction="row" spacing={2}>
        <TextField
          id="outlined-helperText"
          label="Shares"
          defaultValue={shareAmount.toString()}
          onChange={(v) => {
            const numValue = Number.parseInt(v.target.value)
            const weiSize = investmentVehicle?.unitcost.mul(numValue)
            const ethSize = ethers.utils.formatEther(weiSize!)
            const basketNum = Number.parseInt(ethSize)
            setBasketPrice(ethSize)

            //Check if we have enough allowance to make the purchase
            if (basketNum > allowance) {
              setAllowanceNeeded(true)
              setSpendlimitWarning(true)
            } else {
              setAllowanceNeeded(false)
              setSpendlimitWarning(false)
            }
          }}
          type="number"
          helperText={`Cost: ${basketPrice}`}
        />
        {allowanceNeeded ? allowanceButton : purchaseButton}
      </Stack>
      <Box sx={{ paddingTop: 2 }}>
        <Chip
          title="Revoke allowance for sunblock"
          label={allowance === 0 ? TXT_NO_ALLOWANCE : `Your allowance to us is ${allowance} USDC`}
          clickable={allowance === 0 ? true : false}
          onDelete={allowance === 0 ? undefined : removeAllowance}
          color={spendlimitWarning ? 'error' : 'default'}
        />
      </Box>
    </Stack>
  )
}

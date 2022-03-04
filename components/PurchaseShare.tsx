// Copyright (c) 2022 Kenth Fagerlund
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { TransactionResponse } from '@ethersproject/abstract-provider'
import {
  alpha,
  Backdrop,
  Button,
  CircularProgress,
  colors
} from '@mui/material'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { ethers } from 'ethers'
import { track } from 'insights-js'
import { useSnackbar } from 'notistack'
import React, { FC, useEffect, useState } from 'react'
import { getUSDCBalance } from '../blockchain/query'
import { hooks } from '../connectors/metamask'
import {
  ABI_SUNBLOCK,
  InvestmentVehicle
} from '../programs/contracts'
import {
  CONTRACT_ADDRESS_SUNBLOCK
} from '../programs/polygon'
import { formatWeiToNumber } from '../utils/formaters'
import AllowancePill from './AllowancePill'


const { useProvider, useAccount, useIsActive } = hooks

let eth: any

export const PurchaseShares: FC = () => {
  const closeSpinner = () => {
    setOpen(false)
  }
  const openSpinner = () => {
    setOpen(!open)
  }

  const DEFAULT_SHARE_VALUE = 10

  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const provider = useProvider()
  const account = useAccount()
  const isactive = useIsActive()
  const vehicle = useInvestmentVehicle()
  const [open, setOpen] = useState(false)

  // What is the users current allowance

  const [usdc, setUsdc] = useState(0)
  const [activeTx, setActiveTx] = useState<TransactionResponse>()
  const [stopPurchase, setStopPurchase] = useState(false)
  const [shareAmount, setShareAmount] = useState(DEFAULT_SHARE_VALUE)
  const [basketPrice, setBasketPrice] = useState(0)
  const [balance, setBalance] = useState(0)


  const isUnderfunded = shareAmount > Number(balance)

  async function purchaseShare(amount: number) {
    if (provider === undefined) return
    const signer = provider.getSigner()
    const signerAddress = await signer.getAddress()
    const sunblockContract = new ethers.Contract(
      CONTRACT_ADDRESS_SUNBLOCK,
      ABI_SUNBLOCK,
      signer
    )
    try {
      const response: TransactionResponse = await sunblockContract.buyShares(
        amount
      )
      setActiveTx(response)
      openSpinner()
    } catch (error) {
      closeSpinner()
      enqueueSnackbar("🙁 That didn't work as expected... Try again?", {
        variant: 'error',
        anchorOrigin: { horizontal: 'center', vertical: 'top' },
      })
    }
    sunblockContract.on('SharesIssued', async (_address: string, amount) => {
      if (signerAddress !== _address) {
        return
      }
      closeSpinner()
      enqueueSnackbar(`👍 Done! You now got ${amount} new share(s). Nice!`, {
        variant: 'success',
        anchorOrigin: { horizontal: 'center', vertical: 'top' },
      })
      track({
        id: "share-issued",
        parameters: {
          contract: CONTRACT_ADDRESS_SUNBLOCK,
          amount: amount,
        }
      })

    })
  }

  const handleShareTextUpdate = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (!vehicle) {
      console.log("Ain't got no vehicle!")
      return
    }
    const sharesNum = Number.parseInt(e.target.value)

    if (Number.isNaN(sharesNum) || sharesNum < 0) {
      setShareAmount(0)
      return
    }
    const totalWeiCost = vehicle.unitcost.mul(sharesNum)

    setBasketPrice(formatWeiToNumber(totalWeiCost!))
    setShareAmount(sharesNum)

    // Check if price is over wallet holding. Disable if to expensive
    if (basketPrice > usdc) {
      setStopPurchase(true)
    } else {
      setStopPurchase(false)
    }
  }

  useEffect(() => {
      if (vehicle) {
        const totalWeiCost = vehicle.unitcost.mul(DEFAULT_SHARE_VALUE)
        setBasketPrice(formatWeiToNumber(totalWeiCost!))
      }

    return () => {
      setBasketPrice(0)
    }
  }, [vehicle])

  useEffect(() => {
    if(provider){
      getUSDCBalance(provider).then((amount) => {
        console.log("Setting balance to ", amount);
        setBalance(amount)
      })
    }
    return () => {
      setBalance(0)
    }

  },[provider])

  return (
    <Stack direction="column">
      <Stack direction="row" spacing={2}>
        <TextField
          id="outlined-helperText"
          label="Shares"
          defaultValue={shareAmount.toString()}
          onChange={handleShareTextUpdate}
          type="number"
          helperText={`Total cost: ${basketPrice}`}
        />
        <Button
          color="warning"
          onClick={() => {
            purchaseShare(shareAmount)
          }}
          size="small"
          variant="contained"
          disabled={isUnderfunded || shareAmount === 0}
        >
          {isUnderfunded ? `Low funds 🙁` : `Buy shares`}
        </Button>
      </Stack>

      <Box sx={{ paddingTop: 2 }}>
        <AllowancePill shareCost={basketPrice} />
      </Box>
      <Backdrop
        sx={{
          backgroundColor: alpha(colors.deepPurple[900], 0.9),
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={open}
        onClick={closeSpinner}
      >
        <Stack direction="column" spacing={4} alignItems="center">
          <h3>Transaction in progress...</h3>
          <CircularProgress color="inherit" />
          <Button
            target="_blank"
            rel="noopener"
            variant="outlined"
            href={`https://polygonscan.com/tx/${activeTx?.hash}`}
          >
            See on polyscan
          </Button>
        </Stack>
      </Backdrop>
    </Stack>
  )
}
//TODO: URL HARDCODED ABOVE!!

function useInvestmentVehicle() {
  const isActive = useIsActive()
  const provider = useProvider()
  const [vehicle, setVehicle] = useState<InvestmentVehicle>()

  useEffect(() => {
    const getVehicle = async () => {
      const signer = provider?.getSigner()
      if (signer === undefined) return
      const address = await signer!.getAddress()
      const sunblock = new ethers.Contract(
        CONTRACT_ADDRESS_SUNBLOCK,
        ABI_SUNBLOCK,
        signer
      )
      const vehicle: InvestmentVehicle = await sunblock
        .vehicle()
        .catch((error: Error) => console.log(error))
      setVehicle(vehicle)


    }
    if (isActive) {
      getVehicle()
    } else setVehicle(undefined)
    return () => {}
  }, [provider, isActive])
  return vehicle
}

// function useTokenBalance() {
//   const isActive = useIsActive()

//   const [balance, setBalance] = useState('')
//   const provider = useProvider()

//   useEffect(() => {
//     // const getBalance = async () => {
//     //   try {
//     //     const signer = provider?.getSigner()
//     //     if (signer === undefined) return
//     //     const signerAddress = await signer.getAddress()

//     //     const erc20 = new ethers.Contract(
//     //       TOKEN_ADDRESS_USDC,
//     //       ABI_ERC20,
//     //       provider
//     //     )
//     //     const amount: BigNumber = await erc20.balanceOf(signerAddress)
//     //     erc20.on('Transfer', (from, to, amount, event) => {
//     //       if (from == signerAddress && to == CONTRACT_ADDRESS_SUNBLOCK) {
//     //         ;async () => {
//     //           const newBalance = await erc20.balanceOf(signerAddress)
//     //           newBalance(newBalance)
//     //         }
//     //       }
//     //     })
//     //     console.log("Balance is ", formatWeiToString(amount));

//     //     setBalance(formatWeiToString(amount))
//     //   } catch (error) {
//     //     console.log(error)
//     //   }
//     // }
//     if (isActive) {
//       getUSDCBalance(provider).then((amount) => {
//         setBalance(amount)
//       })
//     } else setBalance('')
//     return () => {
//       setBalance('')
//     }
//   }, [provider, isActive])
//   return balance
// }

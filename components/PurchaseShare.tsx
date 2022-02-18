import { Box, Button, Chip, Stack, TextField } from '@mui/material'
import { BigNumber, ethers } from 'ethers'
import Moralis from 'moralis'
import { useSnackbar } from 'notistack'
import { FC, useEffect, useState } from 'react'
import { useMoralis, useWeb3ExecuteFunction } from 'react-moralis'
import { ABI_ERC20, ABI_SUNBLOCK } from '../programs/contracts'
import {
  CONTRACT_ADDRESS_SUNBLOCK,
  TOKEN_ADDRESS_DEMOERC20
} from '../programs/polygon'
export const PurchaseShares: FC = () => {
  const DEFAULT_SHARE_VALUE = 10
  const TXT_NO_ALLOWANCE = "No allowanced"

  

  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  // What is the users current allowance
  const [allowance, setAllowance] = useState('')
  const [spendlimitWarning, setSpendlimitWarning] = useState(Boolean)
  const [shareAmount, setShareAmount] = useState(DEFAULT_SHARE_VALUE)

  useEffect(() => {
    /**
     * Loading allowance data
     */
    const fetchAllowance = async () => {
      const allowance = await getAllowance()
      try {
        setAllowance(allowance.toNumber().toString())
        setSpendlimitWarning(false)
      } catch (error) {
        setAllowance('Danger! Unlimited spendlimit')
        setSpendlimitWarning(true)
      }
    }
    fetchAllowance()
  }, [])

  /**
   *  Used to check how much allows our contract has been given by the logged in user.
   *
   * @returns amount, in wei, the contract is allowed to withdraw from the account
   */
  async function getAllowance(): Promise<BigNumber> {
    const w3 = await Moralis.enableWeb3()
    const signer = w3.getSigner()
    const walletAddress = signer.getAddress()
    const erc20 = new ethers.Contract(
      TOKEN_ADDRESS_DEMOERC20,
      ABI_ERC20,
      signer
    )
    const amount = await erc20.allowance(
      walletAddress,
      CONTRACT_ADDRESS_SUNBLOCK
    )
    return amount
  }

  function removeAllowance() {
    //TODO #3 Implement removal of allowance
  }

  async function addAllowance(amount: BigNumber) {
    const w3 = await Moralis.enableWeb3()
    const signer = w3.getSigner()
    const erc20 = new ethers.Contract(
      TOKEN_ADDRESS_DEMOERC20,
      ABI_ERC20,
      signer
    )
    erc20.approve(CONTRACT_ADDRESS_SUNBLOCK, ethers.constants.MaxUint256)
  }

  async function purchaseShare(amount: number) {
    //TODO: #4 Validate buyshare amount with allowance
    //TODO: #5 Consume investment event from the chain
    const w3 = await Moralis.enableWeb3()
    const signer = w3.getSigner()
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
  const { isAuthenticated } = useMoralis()

  const { data, error, fetch, isFetching, isLoading } = useWeb3ExecuteFunction()
  const options = {
    abi: ABI_SUNBLOCK,
    contractAddress: CONTRACT_ADDRESS_SUNBLOCK,
    functionName: 'buyShares',
    params: {
      _token: TOKEN_ADDRESS_DEMOERC20,
      _shareCount: 1,
    },
  }

  return (
    <Stack direction="column">
      <Stack direction="row" spacing={2}>
        <TextField
          id="outlined-helperText"
          label="Shares"
          defaultValue={shareAmount.toString()}
          onChange={(v) => setShareAmount(Number.parseInt(v.target.value))}
          helperText="Each share is 10 USDC"
          type="number"
        />
        <Button
          // onClick={() => getAllowence()}
          // onClick={() => requestAllowence()}
          onClick={() => purchaseShare(shareAmount)}
          size="small"
          variant="contained"
        >
          Buy shares
        </Button>
      </Stack>
      <Box sx={{ paddingTop: 2 }}>
        <Chip
          title="Revoke allowance for sunblock"
          label={(allowance === "0"?TXT_NO_ALLOWANCE:allowance)}
          clickable={(allowance === "0"?true:false)}
          onDelete={(allowance === "0"?undefined:removeAllowance)}
          color={spendlimitWarning ? 'error' : 'default'}
        />
      </Box>
    </Stack>
  )
}

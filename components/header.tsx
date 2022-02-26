// Copyright (c) 2022 Kenth Fagerlund
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import FaceIcon from '@mui/icons-material/Face'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import { Contract, ethers } from 'ethers'
import Image from 'next/image'
import { FC, useEffect, useRef, useState } from 'react'
import { ABI_ERC20 } from '../programs/contracts'
import { TOKEN_ADDRESS_DEMOERC20 } from '../programs/polygon'

let eth: any

export const Header: FC = () => {
  const signMsg =
    'Just making sure you are you. No transaction is made, thus, cost no gas fee!'

  const [currentAccount, setCurrentAccount] = useState('')
  const [usdc, setUsdc] = useState('USDC')
  const provider = useRef<ethers.providers.Web3Provider>()

  /**
   * Load up metamask and populate some header values
   */
  useEffect(() => {
    eth = (window as any).ethereum

    eth.on('accountsChanged', function (accounts: any) {
      accounts[0] !== '' ? setCurrentAccount(accounts[0]) : setCurrentAccount('')
      updateUSDC();
    })

    if (!provider.current) {
      provider.current = new ethers.providers.Web3Provider(eth)
      setCurrentAddress()
    }
    updateUSDC();

  }, [])

  /**
   * Will get the current address of the signer
   */
  async function setCurrentAddress(): Promise<void> {

    //TODO: Check that metamask is cocnnected here
    const signer = await provider.current!.getSigner()
    const add = await signer.getAddress().catch((err) => {
      return
    })
    setCurrentAccount(add?add:'Not logged in')

  }

  /**
   * Retreives the balance of supported token of investment vehicle
   */
  async function updateUSDC(): Promise<void> {
    const signer = provider.current!.getSigner()
    const contract = await new Contract(
      TOKEN_ADDRESS_DEMOERC20,
      ABI_ERC20, provider.current
    )
    const add = await signer.getAddress().catch((err) => {
      return
    })
    if (add === undefined) return
    const balance = await contract.balanceOf(add)
    let res = ethers.utils.formatEther(balance)
    res = (+res).toFixed(4);
    setUsdc(res)
  }

  async function authfunc() {
    await provider.current!.send('eth_requestAccounts', [])
  }

  const authenticatebtn = (
    <Button onClick={authfunc} variant="contained">
      Connect to wallet
    </Button>
  )
  const authID = (
    <Chip
      icon={<FaceIcon />}
      label={currentAccount}
      variant="filled"
      color="warning"
      sx={{
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}
    />
  )

  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      justifyContent="space-between"
      alignItems="center"
      sx={{ width: '100%' }}
    >
      <Image
        src="/Sunblock-logos/Sunblock-logos_white.png"
        alt="Sunblock logo"
        width="263"
        height="80"
      />
      {usdc}
      {currentAccount !== '' ? authID : authenticatebtn}
    </Stack>
  )
}

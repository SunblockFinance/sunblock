// Copyright (c) 2022 Kenth Fagerlund
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import FaceIcon from '@mui/icons-material/Face'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Moralis from 'moralis'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'

export const Header: FC = () => {
  const signMsg =
    'Just making sure you are you. No transaction is made, thus, cost no gas fee!'

  const [currentAccount, setCurrentAccount] = useState('not connected')


  useEffect(() => {

    if (!Moralis.enableWeb3()) {
      Moralis.enableWeb3()
    }

    const enableEmitter = Moralis.onWeb3Enabled(() => {
      setCurrentAddress()
    })
    const accEmitter = Moralis.onAccountChanged(() => {
      setCurrentAddress()
    })
    const conEmitter = Moralis.onConnect(() => {
      setCurrentAddress()
    })
    return () => {
      accEmitter()
      enableEmitter()
      conEmitter()
    }
  }, [])

  async function setCurrentAddress(): Promise<void> {
    //TODO: Check that metamask is cocnnected here
    const w3 = Moralis.web3!
    const signer = w3.getSigner()
    const longAddress = await signer.getAddress()
    const shortAddress = longAddress.slice(0, 15  ).concat('... and so on');
    setCurrentAccount(shortAddress)
  }

  async function authfunc() {
    await Moralis.enableWeb3()
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
      sx={{overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}
    />
  )

  return (
    <Stack
      direction={{xs:'column', md:'row'}}
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

      {(currentAccount !== 'not connected') ? authID : authenticatebtn}
    </Stack>
  )
}

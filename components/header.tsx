import FaceIcon from '@mui/icons-material/Face'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Moralis from 'moralis'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'

export const Header: FC = () => {
  const signMsg =
    'Just making sure you are you. No transaction is made, thus, cost no gas fee!'

  const [currentAccount, setCurrentAccount] = useState('nobody')

  const { isAuthenticated } = useMoralis()

  useEffect(() => {
    const enableEmitter = Moralis.onWeb3Enabled(() => {
      getCurrentAddress()
    })
    const accEmitter = Moralis.onAccountChanged(() => {
      getCurrentAddress()
    })
    return () => {
      accEmitter()
      enableEmitter()
    }
  }, [])

  async function getCurrentAddress(): Promise<void> {
    //TODO: Check that metamask is cocnnected here
    const w3 = Moralis.web3!
    const signer = w3.getSigner()
    const longAddress = await signer.getAddress()
    const shortAddress = longAddress.slice(0, 10  ).concat('... and so on');
    setCurrentAccount(shortAddress)
  }

  const authfunc = () => {
    Moralis.authenticate({ signingMessage: signMsg })
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
      onDelete={Moralis.User.logOut}
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

      {isAuthenticated ? authID : authenticatebtn}
    </Stack>
  )
}

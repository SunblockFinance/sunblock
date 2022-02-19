import FaceIcon from '@mui/icons-material/Face'
import { Button, Chip, Stack } from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'

export const Header: FC = () => {
  const signMsg =
    'Just making sure you are you. No transaction is made, thus, cost no gas fee!'

  const [currentAccount, setCurrentAccount] = useState('nobody')

  const {
    isAuthenticated,
    authenticate,
    user,
    logout,
    isWeb3Enabled,
    web3,
    Moralis,
  } = useMoralis()

  useEffect(() => {
    const unsub = Moralis.onWeb3Enabled((args) => {
      Moralis.User.currentAsync().then((user) => {
        const address = user ? user.get('ethAddress') : 'emptys'
        setCurrentAccount(address)
      })
    })
    return () => {
      unsub()
    }
  }, [Moralis, user])

  Moralis.onAccountChanged((account) => {
    setCurrentAccount(account ? account : '')
  })

  const authfunc = () => {
    authenticate({ signingMessage: signMsg })
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
      onDelete={logout}
      variant="filled"
      color="warning"
    />
  )

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ width: '100%' }}
    >
      <img height={70} src="./Sunblock-logos/Sunblock-logos_white.png" />

      {isAuthenticated ? authID : authenticatebtn}
    </Stack>
  )
}

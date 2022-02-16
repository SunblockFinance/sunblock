import FaceIcon from '@mui/icons-material/Face'
import { Button, Chip, Stack } from '@mui/material'
import { FC } from 'react'
import { useMoralis } from 'react-moralis'


export const Header: FC = () => {


  const signMsg = "Just making sure you are you. No transaction is made, thus, cost no gas fee!"
  const {isAuthenticated, authenticate, user, logout} = useMoralis()

  const authenticatebtn = <Button onClick={authenticate} variant='contained'>Connect to wallet</Button>
  const authID = <Chip icon={<FaceIcon />} label={user?.get('ethAddress')} onDelete={logout} variant="outlined" />


  return (

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{  width:'100%' }}
      >
        <img height={200} src="./logo_transparent.png" />

        {isAuthenticated?authID:authenticatebtn}
      </Stack>

  )
}

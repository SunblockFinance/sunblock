import { Stack } from '@mui/material'
import { blueGrey } from '@mui/material/colors'
import { FC } from 'react'
import { WalletBox } from './WalletBox'

export const Header: FC = () => {
  const background = blueGrey[900]
  return (

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{  width:'100%' }}
      >
        <img height={200} src="./logo_transparent.png" />
        <WalletBox />
      </Stack>

  )
}

// Copyright (c) 2022 Kenth Fagerlund
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import FaceIcon from '@mui/icons-material/Face'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import { track } from 'insights-js'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'
import { hooks, metaMask } from '../connectors/metamask'
import { shortenAddress } from '../utils/formaters'
import { AlertDialog, Contracts, WhoAreWe } from './AlertDialog'

let eth: any
const { useAccount, useError, useIsActive, useProvider } = hooks

export const Header: FC = () => {
  const account = useAccount()
  const isActive = useIsActive()
  const error = useError()
  const [openHelp, setOpenHelp] = useState(false)
  const [openContract, setOpenContract] = useState(false)

  const signMsg =
    'Just making sure you are you. No transaction is made, thus, cost no gas fee!'

  const [currentAccount, setCurrentAccount] = useState('')
  const [usdc, setUsdc] = useState(0)

  useEffect(() => {
    void metaMask.connectEagerly()
  }, [])

  const authenticatebtn = (
    <Button
      onClick={async () => {
        metaMask.activate(80001) //TODO: Parameter this bad boy
      }}
      variant="contained"
    >
      Connect to wallet
    </Button>
  )
  const authID = (
    <>
      <Chip
        icon={<FaceIcon />}
        label={`${shortenAddress(account!)} `}
        variant="filled"
        color="warning"
        sx={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      />
    </>
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
      <Stack direction="row">
        <Button
          onClick={() => {
            setOpenHelp(true)
            track({
              id: "open-help",
            })
          }}
          color="warning"
        >
          What is Sunblock?
        </Button>
        <Button
          onClick={() => {
            setOpenContract(true)
            track({
              id: "open-contract",
            })
          }}
        >
          Contracts and addresses
        </Button>
        <AlertDialog active={openHelp} title="What is Sunblock" content={WhoAreWe} />
        <AlertDialog active={openContract} title="Contracts and wallets" content={Contracts} />
      </Stack>
      {isActive ? authID : authenticatebtn}
    </Stack>
  )
}

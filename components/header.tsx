// Copyright (c) 2022 Kenth Fagerlund
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import FaceIcon from '@mui/icons-material/Face'
import { Avatar, Tooltip } from '@mui/material'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'
import { NetworkDetails, networks } from '../blockchain/networks'
import { hooks, metaMask } from '../connectors/metamask'
import { shortenAddress } from '../utils/formaters'
import { AlertDialog, Contracts, WhoAreWe } from './AlertDialog'
import styles from './header.module.css'

const { useAccount, useError, useIsActive, useProvider, useChainId } = hooks

export const Header: FC = () => {
  const account = useAccount()
  const isActive = useIsActive()
  const chainid = useChainId()
  const [openHelp, setOpenHelp] = useState(false)
  const [openContract, setOpenContract] = useState(false)
  const [chain, setChain] = useState<NetworkDetails>()


  // ==== MENU CONTROLS ==== // //TODO:Clean this up this mess later!
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  useEffect(() => {
    if(chainid) {
      setChain(networks[chainid])
    }

    return () => {
      setChain(undefined)
    }
  }, [chainid])

  useEffect(() => {
    if (!isActive) {
      metaMask.connectEagerly()
    }
  },[isActive])

  const authenticatebtn = (
    <Button
      onClick={async () => {
        metaMask.activate(chainid) //TODO: Parameter this bad boy
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
        src="/sunblock-logo/sunblock-text-side-transparent.svg"
        alt="Sunblock logo"
        width="263"
        height="100"
        priority
      />
      <Stack direction="row">
        <Button
          href="https://docs.sunblock.finance"
          target="_blank"
          color="warning"
        >
          <span className={styles.inprogress}>What is Sunblock?</span>
        </Button>
        <Button
          onClick={() => {
            setOpenContract(true)
          }}
        >
          Contracts and addresses
        </Button>

        <AlertDialog
          active={openHelp}
          title="What is Sunblock"
          content={WhoAreWe}
        />
        <AlertDialog
          active={openContract}
          title="Contracts and wallets"
          content={Contracts}
        />
      </Stack>
      <Tooltip title={`Connected to ${chain?.chain.name} network`}>
      <Avatar src={chain?.chain.logo}></Avatar>
      </Tooltip>
      {isActive ? authID : authenticatebtn}

    </Stack>
  )
}

// Copyright (c) 2022 Kenth Fagerlund
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import FaceIcon from '@mui/icons-material/Face'
import { Avatar, Menu, MenuItem } from '@mui/material'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import { track } from 'insights-js'
import Image from 'next/image'
import { FC, useState } from 'react'
import { useGlobalState } from '../blockchain/networks'
import { hooks, metaMask } from '../connectors/metamask'
import { shortenAddress } from '../utils/formaters'
import { AlertDialog, Contracts, WhoAreWe } from './AlertDialog'
import styles from './header.module.css'

const { useAccount, useError, useIsActive, useProvider, useChainId } = hooks

export const Header: FC = () => {
  const account = useAccount()
  const isActive = useIsActive()
  const [openHelp, setOpenHelp] = useState(false)
  const [openContract, setOpenContract] = useState(false)
  const [chainid, setChainid] = useGlobalState('chainid')


  // ==== MENU CONTROLS ==== // //TODO:Clean this up this mess later!
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = (event: any) => {
    if (event.target.attributes[3]) {
      const chosenNetwork: number = Number(event.target.attributes[3].nodeValue)
      if (chosenNetwork) {
        setChainid(chosenNetwork)
      }
    }

    setAnchorEl(null)
  }

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
            track({
              id: 'open-contract',
            })
          }}
        >
          Contracts and addresses
        </Button>
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          Switch Network
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          {/* // DON'T HARDCODE THESE VALUES... */}
          <MenuItem value="137" onClick={handleClose}>
            <Avatar sx={{ background: '#2f2f2f' }}>
              <Image
                src="/crypto-icons/matic.svg"
                height={20}
                width={20}
                alt="Polygon Logo"
              />
            </Avatar>
            &nbsp;Polygon
          </MenuItem>
          <MenuItem value="43113" onClick={handleClose}>
            <Avatar sx={{ background: '#2f2f2f' }}>
              <Image
                src="/crypto-icons/avax.svg"
                height={20}
                width={20}
                alt="Polygon Logo"
              />
            </Avatar>
            &nbsp;Avalanche Fuji
          </MenuItem>
        </Menu>

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
      {isActive ? authID : authenticatebtn}
    </Stack>
  )
}

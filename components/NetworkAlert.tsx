// Copyright 2022 Kenth Fagerlund.
// SPDX-License-Identifier: MIT
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material'
import { BigNumber } from 'ethers'
import { hexStripZeros } from 'ethers/lib/utils'
import { track } from 'insights-js'
import { FC, useEffect, useState } from 'react'
import { hooks } from '../connectors/metamask'
import { CHAINID } from '../programs/polygon'

const { useProvider, useChainId } = hooks

const NetworkAlert: FC = () => {
  const [open, setOpen] = useState(false)
  const provider = useProvider()
  const chainID = useChainId()

  useEffect(() => {
    if (chainID != CHAINID && chainID != undefined) {
      setOpen(true)
      track({
        id: "network-wrong",
        parameters: {
          userChain: chainID.toString()
        }
      })
    }
    return () => {
      setOpen(false)
    }
  }, [chainID])


  const handleNetworkSwitch = async () => {
    try {
      const formattedChainId = hexStripZeros(
        BigNumber.from(CHAINID).toHexString()
      )
      await provider?.send('wallet_switchEthereumChain', [
        { chainId: formattedChainId },
      ])
      track({
        id: "network-switch",
      })
    } catch (switchError: any) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        console.log(
          'This network is not available in your metamask, please add it'
        )
      }
      console.log('Failed to switch to the network')
    }
  }

  const handleClose = () => {
    setOpen(false)
  }
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'🤷‍♂️ Wrong network 🤷‍♂️'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Like a lawyer in the wrong courtroom, We have no idea where the
            contracts are on this network. If you want Sunblock on this network,
            give us a shout.{' '}
            <p> Until then, do you wish for us to switch to Polygon for now?</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No thank you.</Button>
          <Button onClick={handleNetworkSwitch} autoFocus>
            Yes please!
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default NetworkAlert

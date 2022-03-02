// Copyright 2022 Kenth Fagerlund.

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
import { FC, useEffect, useState } from 'react'
import { hooks, metaMask } from '../connectors/metamask'


const {useProvider, useChainId} = hooks

// SPDX-License-Identifier: MIT
const NetworkAlert: FC = () => {
  const [open, setOpen] = useState(false)
  const provider = useProvider()
  const chainID = useChainId()

  useEffect(() => {
      console.log("Chain ID found is ", chainID);

    if (chainID != 80001 && chainID != undefined) {
        setOpen(true)
    } else {
        if (open) {
            metaMask.connectEagerly()
            setOpen(false)
        }
    }

  }, [chainID, open])



  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleNetworkSwitch = async () => {
    try {
        const formattedChainId = hexStripZeros(BigNumber.from(80001).toHexString());
        await provider?.send("wallet_switchEthereumChain", [{ chainId:formattedChainId}])
      console.log("You have succefully switched to Binance Test network")
      } catch (switchError:any) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
         console.log("This network is not available in your metamask, please add it")
        }
        console.log("Failed to switch to the network")
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
          {"🤷‍♂️ Wrong network 🤷‍♂️"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Like a lawyer in the wrong courtroom, We have no idea where the contracts are on
            this network. If you want Sunblock on this network, give us a shout. <p> Until then, do you wish for
            us to switch to Polygon for now?</p>
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

// Copyright 2022 Kenth Fagerlund.
// SPDX-License-Identifier: MIT
import {
  Avatar,
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material'
import { BigNumber } from 'ethers'
import { hexStripZeros } from 'ethers/lib/utils'
import { FC, useEffect, useState } from 'react'
import { networks } from '../blockchain/networks'
import { hooks, metaMask } from '../connectors/metamask'

const { useProvider, useChainId, useIsActive } = hooks

const NetworkAlert: FC = () => {
  const [open, setOpen] = useState(false)
  const provider = useProvider()
  const active = useIsActive()

  const chainID = useChainId()
  useEffect(() => {
    if (chainID != undefined && !networks[chainID]) {
      setOpen(true)
    } else {
      setOpen(false)
    }
    return () => {
      setOpen(false)
    }
  }, [chainID])

  const handleNetworkSwitch = (e: any): void => {
    const attributes: NamedNodeMap = e.target.attributes
    const chosenChain = Number(attributes.getNamedItem('chain')?.value)

    if (chosenChain) {
      if (!provider) {
        metaMask.activate(chainID) //Hmm.. Not sure if this is a hack.. Let's watch and see
      }
      try {
        const formattedChainId = hexStripZeros(
          BigNumber.from(chosenChain).toHexString()
        )
        provider!
          .send('wallet_switchEthereumChain', [{ chainId: formattedChainId }])
          .then()
          .catch(() => console.error)
      } catch (switchError: any) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
          console.log(
            'This network is not available in your metamask, please add it'
          )
        }
      }
    } else {
    }
  }

  const handleClose = () => {
    setOpen(false)
  }

  const polygonChain = { chain: 137 }
  const avalancheChain = { chain: 43114 }
  const fantomChain = { chain: 250 }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'🤷‍♂️ Unsupported network 🤷‍♂️'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Like a lawyer in the wrong courtroom, we have no idea where the
            contracts are on this network. If you want Sunblock on this network,
            give us a shout. Until then, click one of the networks below that we
            support and we will help you switch to it.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <ButtonGroup
            color="info"
            variant="outlined"
            aria-label="outlined primary button group"
          >
            <Button {...polygonChain} onClick={handleNetworkSwitch}>
              <Avatar src="/crypto-icons/matic.svg" />
              &nbsp;Polygon
            </Button>
            <Button {...avalancheChain} onClick={handleNetworkSwitch}>
              <Avatar src="/crypto-icons/avax.svg" />
              &nbsp;Avalanche
            </Button>
            <Button {...fantomChain} onClick={handleNetworkSwitch}>
              <Avatar src="/svg/fantom.svg" />
              &nbsp;Fantom
            </Button>
          </ButtonGroup>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default NetworkAlert

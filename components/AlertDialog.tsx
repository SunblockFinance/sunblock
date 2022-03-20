// Copyright 2022 Kenth Fagerlund.

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Link,
    Typography
} from '@mui/material'
import { FC, ReactChild, useEffect, useState } from 'react'

// SPDX-License-Identifier: MIT
export const AlertDialog: FC<{
  title: string
  content: ReactChild
  active: boolean
}> = (data) => {
  const [open, setOpen] = useState(false)
  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    setOpen(data.active)
  }, [data.active])

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{data.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {data.content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          Got it.
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export const Contracts = (
  <>
    <p>
      <ol>
        <li>
          <Link href="https://polygonscan.com/address/0x19b20dfF4cf302d217A30ADa7954c7d2D0131179" target="_blank">
            Sunblock Contract
          </Link>
        </li>
        <li>
          <Link href="https://polygonscan.com/address/0x1FFe3875819d27EFD9b0ece0E3E0C8a87e3E73cb" target="_blank">
            Investment Wallet
          </Link>
        </li>
        <li>
          <Link href="https://polygonscan.com/address/0x19697686F5aC6d5e55E0DE72214471599245D230" target="_blank">
            Reward wallet
          </Link>
        </li>
        <li>
          <Link href="https://polygonscan.com/address/0xfE9Ae6A05dE748F9175c71a87AC0f9dfcE9A43c6" target="_blank">
            Manager wallet
          </Link>
        </li>
        <li>
          <Link href="https://github.com/SunblockFinance" target="_blank">
            Source code
          </Link>
        </li>
      </ol>
    </p>
  </>
)

export const WhoAreWe = (
  <>
    Sunblock is a way for investors with modest resources to be able to invest
    in expensive protocols like StrongBlock. <br />
    <h2>How does it work?</h2>
    <p>
      Each of us put in $10USDT per share. When we have reached enough to buy 10
      STRONG (including gas and swap fees) then Sunblock will move the funds
      over to Etherum network and purchase a StrongBlock node. This will repeate
      as long as we have enough funds for another node.
    </p>
    <p>
      As soon as we got the node up and running, it will start giving out
      rewards. We will distributed the rewards on a regular schedule (usually
      one time per week) to reduce the gas fees. 90% goes to the community, and
      10% goes to Sunblock so I can warrant the late nights to my wife.
    </p>
    <p>Thats pretty much it. Nice and simple.</p>
    <h2>Q & A</h2>
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Why should I trust you 🤨</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          <p>Short: You should not! Trust no-one on the internet.</p>
          <p>
            Long: All I can do is to earn the trust and be as transparent as
            possible. All contracts and wallets are there for you to see and as
            for me, Kenth Fagerlund, well you can do your research and see if I
            can be trusted. 🕵️‍♀️
          </p>
          <p>
            You can chat with me anytime over Discord or Twitter (Hong Kong time
            zone). Ill be as responsive I can, but I have a full time job and
            kids so forgive me if Im silent an hour or so while I give my kids
            breakfast 😀
          </p>
          <p>
            I really wish that this whole thing could be done through smart
            contracts that I can remove my ownership from, however, buying nodes
            is an manual proccess. Noting I can change.
          </p>
          <p>
            The original idea that came from EasyBlock follows the same trust
            scheme and it has worked so far, but its up to you to decide.
          </p>
        </Typography>
      </AccordionDetails>
    </Accordion>
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Who will own all those nodes?</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          <p>Short: Sunblock</p>
          <p>
            Long: Strongblock doesnt allow me to setup a multisig wallet at the
            moment so I cant share the credentials with the community. Im open
            to any suggestion to stop me from owning it all.
          </p>
        </Typography>
      </AccordionDetails>
    </Accordion>
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Can I see the contracts and wallet addresses?</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          <p>Sure!</p>
          <p>
            <ol>
              <li>
                <Link href="https://polygonscan.com/address/0xBF901Eb7354a22a8746c91E80d1e5D34C4D0596a" target="_blank">
                  Sunblock Contract
                </Link>
              </li>
              <li>
                <Link href="https://polygonscan.com/address/0x1FFe3875819d27EFD9b0ece0E3E0C8a87e3E73cb" target="_blank">
                  Investment Wallet
                </Link>
              </li>
              <li>
                <Link href="https://polygonscan.com/address/0x19697686F5aC6d5e55E0DE72214471599245D230" target="_blank">
                  Reward wallet
                </Link>
              </li>
              <li>
                <Link href="https://polygonscan.com/address/0xfE9Ae6A05dE748F9175c71a87AC0f9dfcE9A43c6" target="_blank">
                  Manager wallet
                </Link>
              </li>
              <li>
                <Link href="https://github.com/SunblockFinance" target="_blank">
                  Source code
                </Link>
              </li>
            </ol>
          </p>
        </Typography>
      </AccordionDetails>
    </Accordion>
  </>
)

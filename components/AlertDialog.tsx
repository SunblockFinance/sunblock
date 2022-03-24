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
          <Link href="https://polygonscan.com/address/0x21A281CE0258A9F7E38B6df5439F6E118BBAabCc" target="_blank">
            Sunblock CUBE Contract
          </Link>
        </li>
        <li>
          <Link href="https://polygonscan.com/address/0xBBF075ADD207cbf1360d3E0bB0C8C81b016EE4c9" target="_blank">
            Strongblock Investment Vehicle
          </Link>
        </li>
        <li>
          <Link href="https://polygonscan.com/address/0x9f5f595018215754Bd64446d8F369eA0726fDFf9" target="_blank">
            Yieldnode Investment Vehicle
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
    in protocols that might be out of reach for the average user. <br />
    <h2>How does it work?</h2>
    <p>
      First we, as a community, decide in what we want to invest in and how much our target amount should be.
      It could be anything but preferably something that has an high entry bar. Then we deposit minimum 10USDT
      and it goes to that next investment. 10USDT gives you one share. <b>Think of it as a community run savings account.</b>
    </p>
    <p>
      When the target amount is reached then Sunblock will, automatically, move the funds
      to the investment vehicle&#42;. More on investment vehicles below.
    </p>
    <p>
      The funds sent to the investment vehicle is then used to invest in the target investment it
      is set to invest in, lets say StrongBlock. This vehicles is now ONLY used for that and the rewards
      from the investments goes right back to the vehicle.
    </p>
    <p>
      Then, on a regular schedule, the rewards from all vehicles are collected by, what we call the cube,
      and is then distributed to all share holders, aka sunbathers.
    </p>
    <h2>Fees</h2>
    <p>
      Yes, 10% is taken from the incoming rewards, and ONLY the rewards. No rewards, no fees.
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
            possible. Ive tried to make the contracts in a way that I interact with the funds
            as little as technically possible.
            </p>
            <p>
              If I can build it all on contract then it will be done.
            Only if we absolutly need to do manual purchase, like with strongblock then it will be handled
            with open wallets. All contracts and wallets are there for you to see and as
            for me, Kenth Fagerlund, well you can do your research and see if I can be trusted. 🕵️‍♀️
          </p>
          <p>
            You can chat with me anytime over Discord or Twitter (Hong Kong time
            zone). Ill be as responsive I can, but I have a full time job and
            kids so forgive me if Im silent an hour or so while I give my kids
            breakfast 😀
          </p>
          <p>
            I really wish that this whole thing could be done through smart
            contracts that I can remove my ownership from. I intend to make sure
            that the DAO part of this will give all shareholders comfort as they will
            decide how the money is moved around. This will be added very very soon.
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
                <Link href="https://polygonscan.com/address/0x21A281CE0258A9F7E38B6df5439F6E118BBAabCc" target="_blank">
                  Sunblock CUBE Contract
                </Link>
              </li>
              <li>
                <Link href="https://polygonscan.com/address/0xBBF075ADD207cbf1360d3E0bB0C8C81b016EE4c9" target="_blank">
                  Strongblock Investment Vehicle
                </Link>
              </li>
              <li>
                <Link href="https://polygonscan.com/address/0x9f5f595018215754Bd64446d8F369eA0726fDFf9" target="_blank">
                  Yieldnode Investment Vehicle
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

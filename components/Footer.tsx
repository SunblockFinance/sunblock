// Copyright (c) 2022 Kenth Fagerlund
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import GitHubIcon from '@mui/icons-material/GitHub'
import TelegramIcon from '@mui/icons-material/Telegram'
import TwitterIcon from '@mui/icons-material/Twitter'
import { IconButton, Stack } from '@mui/material'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import { FC } from 'react'
//https://t.me/sunblock_finance
export const Footer: FC = ({ children }) => {
  return (
    <>
      <Stack direction="row" justifyContent="center" spacing={4}>
        <IconButton href="https://github.com/SunblockFinance" target="_blank">
          {' '}
          <GitHubIcon color="action" />
        </IconButton>
        <IconButton href="https://twitter.com/SunblockFinance" target="_blank">
          {' '}
          <TwitterIcon color="action" />
        </IconButton>
        <IconButton href="https://t.me/sunblock_finance" target="_blank">
          {' '}
          <TelegramIcon color="action" />
        </IconButton>
        <IconButton target="_blank" href="https://discord.gg/6x2ndn5anT">
          <Image
            src="/social/discord.svg"
            alt="discord"
            height={20}
            width={20}
          />
        </IconButton>
      </Stack>
      <Typography variant="subtitle2" color={'GrayText'} sx={{ fontSize: 12 }}>
        Use of sunblock.finance (the “Site”) and the Sunblock protocol (the
        “Protocol”) is strictly at your own risk. Before using the Protocol,
        users should fully understand and accept the risks involved, which
        include, but are not limited to, front-end errors, bugs, hacks,
        regulatory and tax uncertainty, and total loss of funds. Do not deploy
        funds you cannot afford to lose. The Protocol is unaudited yet and
        involves a substantial degree of risk. No representations or warranties
        are made as to the safety of funds deployed, and sunblock.finance will
        not be liable or responsible for any losses incurred. By using the Site
        or the Protocol, you represent and warrant that your use does not
        violate any law, rule or regulation in your jurisdiction of residence.
        We are not affiliated with Strongblock and not liable for any losses
        which could be incurred by them.
      </Typography>
    </>
  )
}

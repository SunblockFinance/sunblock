// Copyright (c) 2022 Kenth Fagerlund
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import GitHubIcon from '@mui/icons-material/GitHub'
import TelegramIcon from '@mui/icons-material/Telegram'
import TwitterIcon from '@mui/icons-material/Twitter'
import { IconButton, Stack, Tooltip } from '@mui/material'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import { FC } from 'react'
//https://t.me/sunblock_finance
export const Footer: FC = ({ children }) => {
  return (
    <>
      <Stack direction="row" justifyContent="center" spacing={4}>
      <Tooltip title="Documentation" placement="top" arrow>
      <IconButton href="https://docs.sunblock.finance" target="_blank">
          {' '}
          <Image
            src="/svg/gitbook.svg"
            alt="gitbook logo"
            height={20}
            width={20}
          />
        </IconButton>
        </Tooltip>
        <Tooltip title="Github" placement="top" arrow>
        <IconButton href="https://github.com/SunblockFinance" target="_blank">
          {' '}
          <GitHubIcon color="action" />
        </IconButton>
        </Tooltip>
        <Tooltip title="Twitter" placement="top" arrow>
        <IconButton href="https://twitter.com/SunblockFinance" target="_blank">
          {' '}
          <TwitterIcon color="action" />
        </IconButton>
        </Tooltip>
        <Tooltip title="Signal" placement="top" arrow>
        <IconButton href="https://signal.group/#CjQKIMyRLW1F7QuJb7NXSTiXGz1EtNsL_pY0WCRceI3pXHzWEhDVARhYf8FY9rE4F8VlkpRS" target="_blank">
          {' '}
          <Image
            src="/svg/signal-logo.svg"
            alt="signal logo"
            height={20}
            width={20}
          />
        </IconButton>
        </Tooltip>
        <Tooltip title="Telegram" placement="top" arrow>
        <IconButton href="https://t.me/sunblock_finance" target="_blank">
          {' '}
          <TelegramIcon color="action" />
        </IconButton>
        </Tooltip>
        <Tooltip title="Discord" placement="top" arrow>
        <IconButton target="_blank" href="https://discord.gg/6x2ndn5anT">
          <Image
            src="/discord-logo.svg"
            alt="discord"
            height={20}
            width={20}
          />
        </IconButton>
        </Tooltip>
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

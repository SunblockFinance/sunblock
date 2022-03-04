// Copyright 2022 Kenth Fagerlund.

import { Container, Skeleton } from '@mui/material'
import { FC } from 'react'
import { TwitterTimelineEmbed } from 'react-twitter-embed'

// SPDX-License-Identifier: MIT
export const Updates: FC = () => {
  return (
    <Container maxWidth='md' >
 <TwitterTimelineEmbed
      noHeader
      onLoad={function noRefCheck(){}}
      options={{
        height: 400,
      }}
      screenName="SunblockFinance"
      sourceType="profile"
      theme="dark"
      tweetLimit={10}
      placeholder={<Skeleton />}
    />
    </Container>
  )
}

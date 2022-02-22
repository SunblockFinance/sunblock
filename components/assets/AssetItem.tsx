// Copyright (c) 2022 Kenth Fagerlund
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Avatar from '@mui/material/Avatar'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import { grey } from '@mui/material/colors'
import { FC } from 'react'

export const AssetItem: FC<{avatar?:string,  title:string, value:string}> = (data) => {
    const avatarbg = grey[50]
  return (
    <Card sx={{ width: '100%' }}>
      <CardHeader
        avatar={
          <Avatar src={data.avatar} sx={{ bgcolor: avatarbg }} aria-label="recipe"/>
        }
        title={data.title}
        subheader={data.value}
      />
    </Card>
  )
}

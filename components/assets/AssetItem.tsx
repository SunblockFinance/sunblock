import { Avatar, Card, CardHeader } from '@mui/material'
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

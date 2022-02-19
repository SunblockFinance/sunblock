import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import Avatar from '@mui/material/Avatar'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import { FC } from 'react'

export const HeroItem: FC<{
  title: string
  subtitle?: string
  promote?: boolean
}> = (data) => {
  const standard = {
    borderRadius: '15px',
    width: '100%',
    backgroundColor: 'rgba(77,156,175,0.3)',
    backdropFilter: 'blur(10px)',
  }
  const promoted = {
    borderRadius: '15px',
    width: '100%',
    backgroundColor: 'rgba(77,156,175,0.3)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0px 0px 20px 10px #7b4add ',
  }
  const style = data.promote ? promoted : standard

  return (
    <Card variant="outlined" sx={style}>
      <CardHeader
        avatar={
          <Avatar sx={{ backgroundColor: 'whitesmoke' }}>
            <AccountBalanceWalletIcon />
          </Avatar>
        }
        title={data.title}
        subheader={data.subtitle}
        titleTypographyProps={{ sx: { fontSize: 21, fontWeight: 'bold' } }}
      />
      <CardContent sx={{ justifyContent: 'center', display: 'flex' }}>
        {data.children}
      </CardContent>
    </Card>
  )
}

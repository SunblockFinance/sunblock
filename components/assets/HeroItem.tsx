import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import {
  Avatar,
  Card,
  CardContent,
  CardHeader
} from '@mui/material'
import { grey } from '@mui/material/colors'
import { FC } from 'react'

export const HeroItem: FC<{ title:string, subtitle?:string, promote?:boolean}> = (data) => {
  const avatarbg = grey[50]
  const cardbg = '#4d9daf'
  const standard = { borderRadius:'15px',  width:'100%', backgroundColor:'rgba(77,156,175,0.7)', backdropFilter: "blur(10px)"}
  const promoted = { borderRadius:'15px', width:'100%', backgroundColor:'rgba(77,156,175,0.7)', backdropFilter: "blur(10px)", boxShadow:'0px 0px 20px 10px #e65100'}
  const style = (data.promote?promoted:standard)
  return (
    <Card
      variant="outlined"
      sx={style}
    >

          <CardHeader
            avatar={
              <Avatar sx={{ backgroundColor: 'whitesmoke' }}>
                <AccountBalanceWalletIcon />
              </Avatar>
            }
            title={data.title}
            subheader={data.subtitle}
            titleTypographyProps={{sx:{fontSize:21, fontWeight:'bold'}}}
          />
        <CardContent sx={{justifyContent:'center', display:'flex'}}>
          {data.children}
        </CardContent>

    </Card>
  )
}

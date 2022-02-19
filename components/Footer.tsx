import Typography from '@mui/material/Typography'
import { FC } from 'react'

export const Footer: FC = ({children}) => {
  return (
    <Typography variant='subtitle2' color={'GrayText'} sx={{fontSize:12}}>
    Use of sunblock.finance (the “Site”) and the Sunblock protocol (the “Protocol”) is strictly at your own risk. Before using the Protocol, users should fully understand and accept the risks involved, which include, but are not limited to, front-end errors, bugs, hacks, regulatory and tax uncertainty, and total loss of funds. Do not deploy funds you cannot afford to lose. The Protocol is unaudited yet and involves a substantial degree of risk. No representations or warranties are made as to the safety of funds deployed, and sunblock.finance will not be liable or responsible for any losses incurred. By using the Site or the Protocol, you represent and warrant that your use does not violate any law, rule or regulation in your jurisdiction of residence. We are not affiliated with Strongblock and not liable for any losses which could be incurred by them.
    </Typography>
  )
}
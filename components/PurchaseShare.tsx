import { Button, Stack, TextField } from '@mui/material'
import { Moralis } from 'moralis'
import { FC } from 'react'
import { useMoralis } from 'react-moralis'

const transfer = async () => {
  const web3Provider = await Moralis.enableWeb3()
  const options:Moralis.TransferOptions = {
    type: 'erc20',
    amount: Moralis.Units.Token('0.05', 18),
    receiver: '0x02687FdEDac11e50b980aFe00710611D7c014F2d',
    contractAddress: '0xfe4F5145f6e09952a5ba9e956ED0C25e3Fa4c7F1',
  }
  let result = await Moralis.transfer(options)
}

export const PurchaseShares: FC = () => {

  const { isAuthenticated } = useMoralis()

  return (
    <Stack direction="row" spacing={2}>
      <TextField
        id="outlined-helperText"
        label="Shares"
        defaultValue="10"
        helperText="Each share is 10 USDC"
        type="number"
      />
      <Button onClick={transfer} disabled={!isAuthenticated} size="small" variant="contained">
        Buy shares
      </Button>
    </Stack>
  )
}

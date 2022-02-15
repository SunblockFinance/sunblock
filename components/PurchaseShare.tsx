import { Button, Stack, TextField } from '@mui/material'
import { FC } from 'react'
export const PurchaseShares: FC = () => {
  return (
      <Stack direction='column'>
      <Stack direction='row' spacing={2}>
          <TextField
              id="outlined-helperText"
              label="Shares"
              defaultValue="10"
              helperText="Each share is 10 USDC"
              type="number"
            />
            <Button size='small' variant="contained">Buy shares</Button>
      </Stack>


      </Stack>
  )
}

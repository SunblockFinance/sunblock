
import { Box, Stack } from '@mui/material';
import {
    WalletDisconnectButton, WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { FC } from 'react';
export const WalletBox: FC = () => {
  return (
    <Box width={300}>
      <Stack direction="row" justifyContent="end">
        <Stack spacing={1} direction="column">
          <WalletMultiButton/>
          <WalletDisconnectButton />
        </Stack>
      </Stack>
    </Box>
  )
}

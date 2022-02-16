import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import {
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  SolletExtensionWalletAdapter,
  SolletWalletAdapter,
  TorusWalletAdapter
} from '@solana/wallet-adapter-wallets'
import { clusterApiUrl } from '@solana/web3.js'
import { AppProps } from 'next/app'
import React, { FC, useMemo } from 'react'
import { MoralisProvider } from 'react-moralis'

// Use require instead of import since order matters
require('@solana/wallet-adapter-react-ui/styles.css')
// require('../styles/globals.css');

const App: FC<AppProps> = ({ Component, pageProps }) => {
  // Can be set to 'devnet', 'testnet', or 'mainnet-beta'
  const network = WalletAdapterNetwork.Devnet

  // You can also provide a custom RPC endpoint
  const endpoint = useMemo(() => clusterApiUrl(network), [network])

  // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
  // Only the wallets you configure here will be compiled into your application, and only the dependencies
  // of wallets that your users connect to will be loaded
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      new TorusWalletAdapter(),
      new LedgerWalletAdapter(),
      new SolletWalletAdapter({ network }),
      new SolletExtensionWalletAdapter({ network }),
    ],
    [network]
  )

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: 'dark',
        },
      }),
    ['dark']
  )

  const appid = process.env.NEXT_PUBLIC_APPID
  const severurl = process.env.NEXT_PUBLIC_SERVER_URL

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MoralisProvider appId={appid} serverUrl={severurl}>
        <Component {...pageProps} />
      </MoralisProvider>
    </ThemeProvider>
  )
}

export default App

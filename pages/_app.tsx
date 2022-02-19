import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { AppProps } from 'next/app'
import { SnackbarProvider } from 'notistack'
import React, { FC } from 'react'
import { MoralisProvider } from 'react-moralis'


const App: FC<AppProps> = ({ Component, pageProps }) => {


  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: 'dark',
        },
      }),
    []
  )

  const appid = process.env.NEXT_PUBLIC_APPID!
  const severurl = process.env.NEXT_PUBLIC_SERVER_URL!

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MoralisProvider appId={appid} serverUrl={severurl}>
      <SnackbarProvider maxSnack={3}>
        <Component {...pageProps} />
        </SnackbarProvider>
      </MoralisProvider>
    </ThemeProvider>
  )
}

export default App

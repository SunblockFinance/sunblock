// Copyright (c) 2022 Kenth Fagerlund
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { AppProps } from 'next/app';
import { SnackbarProvider } from 'notistack';
import React, { FC, useEffect, useState } from 'react';
import { metaMask } from '../connectors/metamask';


const App: FC<AppProps> = ({ Component, pageProps }) => {

  /**
   * Make sure we are connected
   */
   useEffect(() => {
    void metaMask.connectEagerly()
  }, [])


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

  const [allowance, setAllowance] = useState('default')

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider maxSnack={3}>
        <Component {...pageProps} />
        </SnackbarProvider>
    </ThemeProvider>
  )
}

export default App

// Copyright (c) 2022 Kenth Fagerlund
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { init, trackPages } from 'insights-js'
import { AppProps } from 'next/app'
import { SnackbarProvider } from 'notistack'
import React, { FC, useEffect } from 'react'
import { useGlobalState } from '../blockchain/networks'
import { hooks, metaMask } from '../connectors/metamask'


const App: FC<AppProps> = ({ Component, pageProps }) => {
  const {useIsActive, useChainId} = hooks

  const [globalChainid, setGlobalChainid] = useGlobalState('chainid')
  const currentChainID = useChainId()

  /**
   * Make sure we are connected
   */
  useEffect(() => {
    void metaMask.connectEagerly()
    const insightkey = process.env.INSIGHT_KEY
    if (insightkey) init(insightkey)
    trackPages()
  }, [])

  useEffect(() => {
    if (currentChainID) {
      console.log("Setting global chainID to ", currentChainID);

      setGlobalChainid(currentChainID)
    }

  }, [currentChainID,setGlobalChainid])

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: 'dark',
        },
      }),
    []
  )


  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider maxSnack={3}>
          <Component {...pageProps} />
        </SnackbarProvider>
      </ThemeProvider>
    </React.StrictMode>
  )
}

export default App

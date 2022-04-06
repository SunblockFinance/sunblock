// Copyright (c) 2022 Kenth Fagerlund
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { AppProps } from 'next/app'
import Script from 'next/script'
import { SnackbarProvider } from 'notistack'
import React, { FC, useEffect } from 'react'
import { hooks, metaMask } from '../connectors/metamask'

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const { useIsActive, useChainId } = hooks

  const currentChainID = useChainId()

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

  return (
    <>
    <Script
        id='tutorial'
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(g,u,i,d,e,s){g[e]=g[e]||[];var f=u.getElementsByTagName(i)[0];var k=u.createElement(i);k.async=true;k.src='https://static.userguiding.com/media/user-guiding-'+s+'-embedded.js';f.parentNode.insertBefore(k,f);if(g[d])return;var ug=g[d]={q:[]};ug.c=function(n){return function(){ug.q.push([n,arguments])};};var m=['previewGuide','finishPreview','track','identify','triggerNps','hideChecklist','launchChecklist'];for(var j=0;j<m.length;j+=1){ug[m[j]]=ug.c(m[j]);}})(window,document,'script','userGuiding','userGuidingLayer','992724127ID');`,
        }}
      />
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider maxSnack={3}>
          <Component {...pageProps} />
        </SnackbarProvider>
      </ThemeProvider>
    </React.StrictMode>
    </>
  )

}

export default App

// Copyright (c) 2022 Kenth Fagerlund
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { HeroRow } from '../components/assets/HeroRow'
import { Footer } from '../components/Footer'
import { Header } from '../components/header'
import { TabMenu } from '../components/navigation/TabMenu'

// import styles from '../styles/Home.module.css';

const Home: NextPage = () => {

  return (
    <div
      style={{
        backgroundImage: 'url(/background-neon.jpeg)',
        backgroundPosition:'fixed',
        backgroundSize:'100%',
        backgroundRepeat:'no-repeat',
        backgroundColor:"#252e83"
      }}
    >
      <Head>
        <title>Sunblock finance</title>
        <meta name="description" content="Sunblock finance" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>

        <Stack
          direction="column"
          spacing={2}
          justifyItems="center"
          alignItems="center"
        >
          <Stack spacing={4} sx={{marginRight:3, marginLeft:3}}>
            <Header />
            <HeroRow />
            <TabMenu />

          </Stack>
          <Container>
            <Footer />
          </Container>
        </Stack>
      </main>
    </div>
  )
}

export default Home

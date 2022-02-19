import { Container, Stack } from '@mui/material'
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
      <Container sx={{justifyContent:'center'}}>
      {/* <Alert variant="filled" severity="error" sx={{width:'100%', borderStyle:'double'}}>
      Development version! Do not use!!
      </Alert> */}
      </Container>
        <Stack
          direction="column"
          spacing={2}
          justifyItems="center"
          alignItems="center"
        >
          <Stack spacing={4}>
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

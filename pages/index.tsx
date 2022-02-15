import { Container, Stack } from '@mui/material'
import { NextPage } from 'next'
import Head from 'next/head'
import { AssetGroup } from '../components/assets/AssetGroup'
import { HeroRow } from '../components/assets/HeroRow'
import { Footer } from '../components/Footer'
import { Header } from '../components/header'
// import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  //   const style = {
  //     background-image: url('./assets/space-bg.jpg'),
  //     background-size: cover;
  //     background-position: top;
  //     min-height: 100%;
  //     height: 100vh;
  //     position: relative;
  // }

  return (
    <div
      style={{
        backgroundImage: 'url(/background-neon.jpeg)',
        minHeight: '100%',
        backgroundSize: 'cover',
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
          <Stack spacing={4}>
            <Header />
            <HeroRow />
            <AssetGroup />
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

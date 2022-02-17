import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Container, Stack, Tab } from '@mui/material'
import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { AssetGroup } from '../components/assets/AssetGroup'
import { HeroRow } from '../components/assets/HeroRow'
import { Footer } from '../components/Footer'
import { Header } from '../components/header'
import { History } from '../components/personal/History'

// import styles from '../styles/Home.module.css';

const Home: NextPage = () => {


  const [value, setValue] = React.useState('1')

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <div
      style={{
        backgroundImage: 'url(/background-sun.webp)',
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
          <Stack spacing={4}>
            <Header />
            <HeroRow />
            <Box sx={{ width: '100%', typography: 'body1' }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab label="Community stats" value="1" />
                    <Tab label="Personal stats" value="2" />
                    <Tab label="History" value="3" />
                  </TabList>
                </Box>
                <TabPanel value="1"> <AssetGroup /></TabPanel>
                <TabPanel value="2"> <AssetGroup /></TabPanel>
                <TabPanel value="3"> <History /></TabPanel>
              </TabContext>
            </Box>

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

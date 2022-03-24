// Copyright (c) 2022 Kenth Fagerlund
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { TabContext, TabList, TabPanel } from '@mui/lab'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import React, { FC } from 'react'
import { AssetGroup } from '../assets/AssetGroup'
import { Updates } from '../assets/Updates'
import { StatsOverview } from '../statistics/StatsOverview'

export const TabMenu: FC = () => {
  const [value, setValue] = React.useState('1')
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }
  const handleClose = () => {

  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }} >

      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }} >

          <TabList  onChange={handleChange} aria-label="lab API tabs example" >

            <Tab label="Community stats" value="1" />
            <Tab label="Investment Stats" value="2" />
            <Tab label="Sunblock updates" value="3" />

          </TabList>
        </Box>
        <TabPanel value="1">
          {' '}
          <AssetGroup />
        </TabPanel>
        <TabPanel value="2">
          {' '}
          <StatsOverview />
        </TabPanel>
        <TabPanel value="3">
          {' '}
          <Updates />
        </TabPanel>
      </TabContext>
    </Box>
  )
}

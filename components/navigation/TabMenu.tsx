import { TabContext, TabList, TabPanel } from "@mui/lab"
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import React, { FC } from "react"
import { AssetGroup } from "../assets/AssetGroup"
import { History } from '../personal/History'

export const TabMenu: FC = () => {
    const [value, setValue] = React.useState("1")
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue)
      }

    return (
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
    )
}
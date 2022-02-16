import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp'
import { ListItemText, Stack } from '@mui/material'
import { FC } from 'react'

export const HistoryCell: FC<{index:number}> = (data) => {
    return (
        <Stack direction='row' spacing={2}>
            <AddCircleOutlineSharpIcon color='success' />
            <ListItemText primary={`Transaction ${data.index + 1}`} secondary="Total 100 => 120 (+20)"/>
        </Stack>


    )
}

/*
Buy shares
Total 100 => 120 (+20)
Incoming reward
*/
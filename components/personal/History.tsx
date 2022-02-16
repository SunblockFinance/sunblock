import { Box, ListItem, ListItemButton } from '@mui/material';
import { FC } from 'react';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { HistoryCell } from './HistoryCell';

export  const History: FC = () => {
    return (
        <Box
      sx={{ outlineStyle:'solid', outlineColor:'gray', borderRadius:'5px', backgroundColor:'rgba(56,71,80,0.5)', backdropFilter: "blur(8px)", padding:'20px', width:'100%'  }}
    >
      <FixedSizeList
        height={300}
        width={'100%'}
        itemSize={46}
        itemCount={200}
        overscanCount={5}
      >
        {renderRow}
      </FixedSizeList>
    </Box>
    )
}

function renderRow(props: ListChildComponentProps) {
    const { index, style } = props;

    return (
      <ListItem style={style} key={index} component="div" disablePadding>
        <ListItemButton>
          <HistoryCell index={index}/>
        </ListItemButton>
      </ListItem>
    );
  }
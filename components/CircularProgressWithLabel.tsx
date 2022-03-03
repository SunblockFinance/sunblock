// Copyright 2022 Kenth Fagerlund.

import { Box, CircularProgress, CircularProgressProps, Typography } from "@mui/material"

// SPDX-License-Identifier: MIT
export function CircularProgressWithLabel(
    props: CircularProgressProps & { value: number },
  ) {
    return (
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress size={100} variant="determinate" {...props} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="caption"
            fontSize={20}
            component="div"
            color="text.secondary"
          >{`${Math.round(props.value)}%`}</Typography>
        </Box>
      </Box>
    );
  }
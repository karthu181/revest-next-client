"use client";

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: 0, 
        },
      },
    },
  },
});

export default theme;

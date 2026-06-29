'use client';

import { createTheme } from '@mui/material/styles';

// Obsidian Flux Light Design System
export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0058c3',
      light: '#0070f3',
      dark: '#004397',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#505f76',
      light: '#d0e1fb',
      dark: '#38485d',
      contrastText: '#ffffff',
    },
    error: {
      main: '#ba1a1a',
      light: '#ffdad6',
      dark: '#93000a',
      contrastText: '#ffffff',
    },
    background: {
      default: '#faf8ff',
      paper: '#ffffff',
    },
    text: {
      primary: '#131b2e',
      secondary: '#414754',
    },
    divider: '#c1c6d7',
  },
  typography: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontSize: '48px',
      fontWeight: 700,
      lineHeight: '56px',
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '32px',
      fontWeight: 600,
      lineHeight: '40px',
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '24px',
      fontWeight: 600,
      lineHeight: '32px',
    },
    h4: {
      fontSize: '20px',
      fontWeight: 600,
      lineHeight: '28px',
    },
    h5: {
      fontSize: '16px',
      fontWeight: 600,
      lineHeight: '24px',
    },
    h6: {
      fontSize: '14px',
      fontWeight: 600,
      lineHeight: '20px',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
    },
    body1: {
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '24px',
    },
    body2: {
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '20px',
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
    '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 24px',
          fontSize: '14px',
          fontWeight: 600,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          },
        },
        outlined: {
          borderWidth: '1px',
          borderColor: '#e2e8f0',
          '&:hover': {
            borderWidth: '1px',
            backgroundColor: '#f8fafc',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
        outlined: {
          border: '1px solid #e2e8f0',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            backgroundColor: '#f1f5f9',
            '&:hover': {
              backgroundColor: '#ffffff',
            },
            '&.Mui-focused': {
              backgroundColor: '#ffffff',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#0070f3',
                borderWidth: '2px',
              },
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          backgroundColor: '#f1f5f9',
          color: '#64748b',
          fontWeight: 500,
        },
      },
    },
  },
});

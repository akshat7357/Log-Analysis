'use client';

import { useState } from 'react';
import { Box } from '@mui/material';
import { TopNavbar } from './TopNavbar';
import { Sidebar } from './Sidebar';

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f8fafc' }}>
      <TopNavbar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
      <Sidebar isOpen={sidebarOpen} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: sidebarOpen ? '240px' : '0px',
          mt: '64px',
          p: { xs: 2, sm: 3, md: 4 },
          bgcolor: '#f8fafc',
          minHeight: 'calc(100vh - 64px)',
          transition: 'margin-left 0.3s ease',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

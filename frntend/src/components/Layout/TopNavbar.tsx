'use client';

import { useRouter, usePathname } from 'next/navigation';
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  InputBase,
  IconButton,
  Badge,
  Avatar,
  Tabs,
  Tab,
  alpha,
} from '@mui/material';
import {
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  Help as HelpIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';

const mainTabs = [
  { label: 'Dashboard', path: '/' },
  { label: 'Requests', path: '/requests' },
  { label: 'Infrastructure', path: '/infrastructure' },
];

interface TopNavbarProps {
  toggleSidebar: () => void;
  sidebarOpen: boolean;
}

export const TopNavbar = ({ toggleSidebar, sidebarOpen }: TopNavbarProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const currentTab = mainTabs.findIndex((tab) => {
    if (tab.path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(tab.path);
  });

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    router.push(mainTabs[newValue].path);
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ minHeight: '64px !important', px: 3 }}>
        {/* Menu Toggle Button */}
        <IconButton
          onClick={toggleSidebar}
          sx={{
            mr: 2,
            color: '#64748b',
            '&:hover': {
              bgcolor: alpha('#000000', 0.04),
            },
          }}
        >
          <MenuIcon />
        </IconButton>

        {/* Logo and Brand */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mr: 4 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: 1,
              bgcolor: '#0070f3',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 700, fontSize: '16px' }}>
              F
            </Typography>
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              fontSize: '18px',
              color: '#0f172a',
            }}
          >
            Formedics
          </Typography>
        </Box>

        {/* Navigation Tabs */}
        <Tabs
          value={currentTab === -1 ? false : currentTab}
          onChange={handleTabChange}
          sx={{
            mr: 'auto',
            '& .MuiTab-root': {
              minHeight: '64px',
              textTransform: 'none',
              fontSize: '14px',
              fontWeight: 500,
              color: '#64748b',
              px: 2,
              '&.Mui-selected': {
                color: '#0070f3',
                fontWeight: 600,
              },
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#0070f3',
              height: 3,
            },
          }}
        >
          {mainTabs.map((tab) => (
            <Tab key={tab.path} label={tab.label} />
          ))}
        </Tabs>

        {/* Search Bar */}
        <Box
          sx={{
            position: 'relative',
            borderRadius: 2,
            backgroundColor: alpha('#000000', 0.04),
            '&:hover': {
              backgroundColor: alpha('#000000', 0.06),
            },
            marginRight: 2,
            width: '280px',
          }}
        >
          <Box
            sx={{
              padding: '0 12px',
              height: '100%',
              position: 'absolute',
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <SearchIcon sx={{ color: '#64748b', fontSize: 20 }} />
          </Box>
          <InputBase
            placeholder="Search logs, traces, or services..."
            sx={{
              color: '#0f172a',
              width: '100%',
              fontSize: '14px',
              '& .MuiInputBase-input': {
                padding: '10px 12px 10px 40px',
                transition: 'width 0.2s',
              },
            }}
          />
        </Box>

        {/* Right Actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            sx={{
              color: '#64748b',
              '&:hover': {
                bgcolor: alpha('#000000', 0.04),
              },
            }}
          >
            <HelpIcon fontSize="small" />
          </IconButton>
          <IconButton
            sx={{
              color: '#64748b',
              '&:hover': {
                bgcolor: alpha('#000000', 0.04),
              },
            }}
          >
            <Badge badgeContent={3} color="error">
              <NotificationsIcon fontSize="small" />
            </Badge>
          </IconButton>
          <IconButton
            sx={{
              color: '#64748b',
              '&:hover': {
                bgcolor: alpha('#000000', 0.04),
              },
            }}
          >
            <SettingsIcon fontSize="small" />
          </IconButton>
          <Avatar
            sx={{
              width: 32,
              height: 32,
              bgcolor: '#0070f3',
              fontSize: '14px',
              fontWeight: 600,
              ml: 1,
              cursor: 'pointer',
            }}
          >
            JD
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

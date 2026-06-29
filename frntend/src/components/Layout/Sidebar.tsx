'use client';

import { useRouter, usePathname } from 'next/navigation';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  ViewList as ViewListIcon,
} from '@mui/icons-material';

interface SidebarProps {
  isOpen: boolean;
}

export const Sidebar = ({ isOpen }: SidebarProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { label: 'Formedics Enterprise', path: '/', icon: <DashboardIcon />, section: 'OVERVIEW' },
    { label: 'Dashboard', path: '/', icon: <DashboardIcon /> },
    // { label: 'Requests', path: '/requests', icon: <ViewListIcon /> },
  //   { label: 'Users', path: '/users', icon: <PersonIcon /> },
  //   { label: 'Files', path: '/files', icon: <FolderIcon /> },
  //   { label: 'Cloud', path: '/cloud', icon: <CloudIcon /> },
  //   { label: 'API Monitoring', path: '/monitoring', icon: <CodeIcon />, section: 'TOOLS' },
  //   { label: 'Analytics', path: '/analytics', icon: <BarChartIcon /> },
  //   { label: 'Reports', path: '/reports', icon: <DescriptionIcon /> },
  //   { label: 'Settings', path: '/settings', icon: <SettingsIcon /> },
  ];

  return (
    <Box
      sx={{
        width: isOpen ? 240 : 0,
        height: 'calc(100vh - 64px)',
        bgcolor: '#ffffff',
        borderRight: isOpen ? '1px solid #e2e8f0' : 'none',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        left: 0,
        top: '64px',
        overflowY: 'auto',
        overflowX: 'hidden',
        transition: 'width 0.3s ease',
      }}
    >
      {/* Navigation */}
      {isOpen && (
        <List sx={{ px: 2, py: 2, flexGrow: 1 }}>
          {navItems.map((item, index) => (
          <Box key={`${item.path}-${index}`}>
            {item.section && (
              <Typography
                variant="caption"
                sx={{
                  px: 2,
                  py: 1,
                  display: 'block',
                  color: '#94a3b8',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  mt: index > 0 ? 2 : 0,
                }}
              >
                {item.section}
              </Typography>
            )}
            {item.label !== 'Formedics Enterprise' && (
              <ListItem disablePadding sx={{ mb: 0.25 }}>
                <ListItemButton
                  onClick={() => router.push(item.path)}
                  sx={{
                    borderRadius: 1.5,
                    py: 1.25,
                    px: 1.5,
                    bgcolor: pathname === item.path ? 'rgba(0, 112, 243, 0.08)' : 'transparent',
                    '&:hover': {
                      bgcolor: pathname === item.path ? 'rgba(0, 112, 243, 0.12)' : 'rgba(0, 0, 0, 0.04)',
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 36,
                      color: pathname === item.path ? '#0070f3' : '#64748b',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    slotProps={{
                      primary: {
                        style: {
                          fontWeight: pathname === item.path ? 600 : 500,
                          fontSize: '13px',
                          color: pathname === item.path ? '#0070f3' : '#475569',
                        },
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            )}
          </Box>
        ))}
        </List>
      )}
    </Box>
  );
};

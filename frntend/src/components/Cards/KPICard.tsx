'use client';

import { Card, CardContent, Typography, Box, Skeleton } from '@mui/material';
import * as Icons from '@mui/icons-material';

interface KPICardProps {
  title: string;
  value: number | string;
  icon: string;
  trend?: number;
  trendLabel?: string;
  loading?: boolean;
}

const formatNumber = (num: number | string): string => {
  if (typeof num === 'string') return num;
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
};

const formatPercentage = (num: number): string => {
  return `${num.toFixed(1)}%`;
};

export const KPICard = ({ title, value, icon, trend, trendLabel, loading }: KPICardProps) => {
  if (loading) {
    return (
      <Card sx={{ height: '100%', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
        <CardContent sx={{ p: 3 }}>
          <Skeleton variant="text" width="60%" sx={{ mb: 2 }} />
          <Skeleton variant="text" width="40%" height={40} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="50%" />
        </CardContent>
      </Card>
    );
  }

  const IconComponent = (Icons as Record<string, React.ComponentType>)[icon] || Icons.Info;
  const trendColor = trend && trend > 0 ? '#10b981' : trend && trend < 0 ? '#ef4444' : '#64748b';

  return (
    <Card
      sx={{
        height: '100%',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        transition: 'all 0.2s',
        '&:hover': {
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          transform: 'translateY(-2px)',
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="body2"
            sx={{
              color: '#64748b',
              fontWeight: 600,
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              mb: 1,
            }}
          >
            {title}
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography
            variant="h3"
            sx={{
              color: '#0f172a',
              fontWeight: 600,
              fontSize: { xs: '28px', sm: '32px' },
              lineHeight: 1.2,
            }}
          >
            {typeof value === 'number' ? formatNumber(value) : value}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {trend !== undefined ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                  bgcolor: trend > 0 ? 'rgba(16, 185, 129, 0.1)' : trend < 0 ? 'rgba(239, 68, 68, 0.1)' : 'rgba(100, 116, 139, 0.1)',
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: trendColor,
                    fontWeight: 600,
                    fontSize: '13px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.3,
                  }}
                >
                  {trend > 0 ? '↑' : trend < 0 ? '↓' : '→'} {formatPercentage(Math.abs(trend))}
                </Typography>
              </Box>
              {trendLabel && (
                <Typography variant="caption" sx={{ color: '#64748b', fontSize: '12px' }}>
                  {trendLabel}
                </Typography>
              )}
            </Box>
          ) : (
            <Box />
          )}

          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 1.5,
              bgcolor: 'rgba(0, 112, 243, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0070f3',
              '& svg': {
                fontSize: 22,
              },
            }}
          >
            <IconComponent />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

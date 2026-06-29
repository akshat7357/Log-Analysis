'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Alert,
  CircularProgress,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from '@mui/material';
import { AppLayout } from '@/components/Layout/AppLayout';
import { KPICard } from '@/components/Cards/KPICard';
import { AreaChart } from '@/components/Charts/AreaChart';
import { DonutChart } from '@/components/Charts/DonutChart';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchDashboardCards } from '@/store/slices/dashboardSlice';
import { fetchChartsData } from '@/store/slices/chartsSlice';

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { cards } = useAppSelector((state) => state.dashboard);
  const { lineChart, barChart, pieChart } = useAppSelector((state) => state.charts);

  useEffect(() => {
    dispatch(fetchDashboardCards());
    dispatch(fetchChartsData());
  }, [dispatch]);

  const areaChartData = lineChart.data?.data.map((item) => ({
    name: item.date,
    value: item.value,
  })) || [];

  const donutChartData = [
    { name: 'API Success', value: 89, color: '#0070f3' },
    { name: 'Client Errors', value: 8, color: '#f59e0b' },
    { name: 'Server Errors', value: 3, color: '#ef4444' },
  ];

  const services = [
    { name: 'Monthly API-12', status: 'Running', health: 100, color: '#10b981' },
    { name: 'Payment Gateway', status: 'Running', health: 98, color: '#10b981' },
    { name: 'User Support', status: 'Running', health: 95, color: '#f59e0b' },
    { name: 'Link Aggregator', status: 'Running', health: 92, color: '#f59e0b' },
  ];

  const recentRequests = [
    {
      id: 1,
      endpoint: '/api/v1/users/profile',
      method: 'GET',
      status: 200,
      duration: 234,
      timestamp: '2 mins ago',
      error: null,
    },
    {
      id: 2,
      endpoint: '/api/v1/auth/login',
      method: 'POST',
      status: 401,
      duration: 145,
      timestamp: '5 mins ago',
      error: 'Invalid credentials',
    },
    {
      id: 3,
      endpoint: '/api/v1/products/list',
      method: 'GET',
      status: 200,
      duration: 567,
      timestamp: '8 mins ago',
      error: null,
    },
    {
      id: 4,
      endpoint: '/api/v1/orders/create',
      method: 'POST',
      status: 500,
      duration: 1200,
      timestamp: '12 mins ago',
      error: 'Database connection timeout',
    },
    {
      id: 5,
      endpoint: '/api/v1/payments/process',
      method: 'POST',
      status: 200,
      duration: 892,
      timestamp: '15 mins ago',
      error: null,
    },
  ];

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return 'rgba(16, 185, 129, 0.1)';
    if (status >= 400 && status < 500) return 'rgba(245, 158, 11, 0.1)';
    return 'rgba(239, 68, 68, 0.1)';
  };

  const getStatusTextColor = (status: number) => {
    if (status >= 200 && status < 300) return '#10b981';
    if (status >= 400 && status < 500) return '#f59e0b';
    return '#ef4444';
  };

  const getMethodColor = (method: string) => {
    const colors: Record<string, string> = {
      GET: '#3b82f6',
      POST: '#10b981',
      PUT: '#f59e0b',
      DELETE: '#ef4444',
      PATCH: '#8b5cf6',
    };
    return colors[method] || '#64748b';
  };

  const handleRequestClick = (requestId: number) => {
    router.push(`/requests/${requestId}`);
  };

  return (
    <AppLayout>
      <Box>
        {/* Header */}
        <Box sx={{ mb: 5 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 600,
              fontSize: { xs: '24px', sm: '32px' },
              lineHeight: '40px',
              letterSpacing: '-0.01em',
              color: '#0f172a',
              mb: 1,
            }}
          >
            Enterprise Overview
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#64748b',
              fontSize: '16px',
              lineHeight: '24px',
            }}
          >
            Monitor your key metrics and analytics in real-time
          </Typography>
        </Box>

        {/* Error Alert */}
        {cards.error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
            {cards.error}
          </Alert>
        )}

        {/* KPI Cards */}
        {cards.loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }, gap: 3, mb: 5 }}>
            {cards.data?.map((card) => (
              <KPICard
                key={card.id}
                title={card.title}
                value={card.value}
                icon={card.icon}
                trend={card.trend}
                trendLabel={card.trendLabel}
              />
            ))}
          </Box>
        )}

        {/* Charts Section */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' }, gap: 3, mb: 5 }}>
          <AreaChart
            data={areaChartData}
            title="API Requests Over Time"
            color="#0070f3"
          />
          <DonutChart
            data={donutChartData}
            title="Request Distribution"
          />
        </Box>

        {/* Service Health and Catalog Section */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: 3, mb: 5 }}>
          {/* Service Health */}
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 600,
                fontSize: '20px',
                lineHeight: '28px',
                color: '#0f172a',
                mb: 3,
              }}
            >
              Service Health
            </Typography>

            <Box
              sx={{
                bgcolor: 'background.paper',
                borderRadius: 2,
                border: '1px solid #e2e8f0',
                overflow: 'hidden',
              }}
            >
              {services.map((service, index) => (
                <Box
                  key={service.name}
                  sx={{
                    p: 3,
                    borderBottom: index < services.length - 1 ? '1px solid #e2e8f0' : 'none',
                    '&:hover': {
                      bgcolor: '#faf8ff',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Box>
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: 500,
                          color: '#0f172a',
                          mb: 0.5,
                        }}
                      >
                        {service.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#64748b', fontSize: '13px' }}>
                        {service.status}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: service.color,
                        fontWeight: 600,
                        fontSize: '14px',
                      }}
                    >
                      {service.health}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={service.health}
                    sx={{
                      height: 6,
                      borderRadius: 1,
                      bgcolor: '#e2e8f0',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: service.color,
                        borderRadius: 1,
                      },
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Box>

          {/* Service Catalog Table */}
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 600,
                fontSize: '20px',
                lineHeight: '28px',
                color: '#0f172a',
                mb: 3,
              }}
            >
              Service Catalog
            </Typography>

            <TableContainer
              component={Paper}
              sx={{
                border: '1px solid #e2e8f0',
                borderRadius: 2,
                boxShadow: 'none',
              }}
            >
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ bgcolor: '#f8fafc' }}>
                    <TableCell sx={{ fontWeight: 600, color: '#475569', fontSize: '12px' }}>SERVICE</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#475569', fontSize: '12px' }}>STATUS</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#475569', fontSize: '12px' }}>UPTIME</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[
                    { name: 'Main', status: 'Healthy', uptime: '99.9%' },
                    { name: 'Auth', status: 'Healthy', uptime: '99.8%' },
                    { name: 'Database', status: 'Warning', uptime: '98.5%' },
                    { name: 'Cache', status: 'Healthy', uptime: '99.9%' },
                  ].map((item) => (
                    <TableRow
                      key={item.name}
                      sx={{
                        '&:hover': { bgcolor: '#faf8ff' },
                        cursor: 'pointer',
                      }}
                    >
                      <TableCell sx={{ fontSize: '13px', color: '#0f172a' }}>{item.name}</TableCell>
                      <TableCell>
                        <Chip
                          label={item.status}
                          size="small"
                          sx={{
                            bgcolor: item.status === 'Healthy' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                            color: item.status === 'Healthy' ? '#10b981' : '#f59e0b',
                            fontWeight: 600,
                            fontSize: '11px',
                            height: '20px',
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ fontSize: '13px', color: '#64748b' }}>{item.uptime}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>

        {/* Recent API Requests Table */}
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              fontSize: '20px',
              lineHeight: '28px',
              color: '#0f172a',
              mb: 3,
            }}
          >
            Recent API Requests
          </Typography>

          <TableContainer
            component={Paper}
            sx={{
              border: '1px solid #e2e8f0',
              borderRadius: 2,
              boxShadow: 'none',
            }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#f8fafc' }}>
                  <TableCell sx={{ fontWeight: 600, color: '#475569', fontSize: '13px' }}>STATUS</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#475569', fontSize: '13px' }}>ENDPOINT</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#475569', fontSize: '13px' }}>METHOD</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#475569', fontSize: '13px' }}>DURATION</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#475569', fontSize: '13px' }}>TIMESTAMP</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#475569', fontSize: '13px' }}>ERROR</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentRequests.map((request) => (
                  <TableRow
                    key={request.id}
                    onClick={() => handleRequestClick(request.id)}
                    sx={{
                      cursor: 'pointer',
                      '&:hover': {
                        bgcolor: '#faf8ff',
                      },
                    }}
                  >
                    <TableCell>
                      <Chip
                        label={request.status}
                        sx={{
                          bgcolor: getStatusColor(request.status),
                          color: getStatusTextColor(request.status),
                          fontWeight: 600,
                          fontSize: '12px',
                          height: '24px',
                          borderRadius: '6px',
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 500,
                          color: '#0f172a',
                          fontSize: '13px',
                          fontFamily: 'monospace',
                        }}
                      >
                        {request.endpoint}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={request.method}
                        size="small"
                        sx={{
                          bgcolor: `${getMethodColor(request.method)}15`,
                          color: getMethodColor(request.method),
                          fontWeight: 600,
                          fontSize: '11px',
                          height: '22px',
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ color: '#64748b', fontSize: '13px' }}>
                        {request.duration}ms
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ color: '#64748b', fontSize: '13px' }}>
                        {request.timestamp}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {request.error ? (
                        <Typography variant="body2" sx={{ color: '#ef4444', fontSize: '12px' }}>
                          {request.error}
                        </Typography>
                      ) : (
                        <Typography variant="body2" sx={{ color: '#10b981', fontSize: '12px' }}>
                          -
                        </Typography>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </AppLayout>
  );
}

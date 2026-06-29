'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Button,
  Alert,
} from '@mui/material';
import { AppLayout } from '@/components/Layout/AppLayout';
import FilterListIcon from '@mui/icons-material/FilterList';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchRequests, setSelectedRequest } from '@/store/slices/requestsSlice';
import type { Request } from '@/store/slices/requestsSlice';

const DUMMY_REQUESTS: Request[] = [
  {
    id: 1,
    method: 'GET',
    endpoint: '/api/v1/users/profile',
    status: 200,
    duration: 234,
    time: '2 days ago',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ***' },
    body: { userId: '12345' },
    response: { success: true, user: { id: '12345', name: 'John Doe' } },
  },
  {
    id: 2,
    method: 'POST',
    endpoint: '/api/v1/auth/login',
    status: 401,
    duration: 145,
    time: '2 days ago',
    headers: { 'Content-Type': 'application/json' },
    body: { email: 'user@example.com', password: '***' },
    response: { error: 'Invalid credentials' },
  },
  {
    id: 3,
    method: 'GET',
    endpoint: '/api/v1/products/list',
    status: 200,
    duration: 567,
    time: '3 days ago',
    headers: { 'Content-Type': 'application/json' },
  },
  {
    id: 4,
    method: 'DELETE',
    endpoint: '/api/v1/users/delete/user',
    status: 200,
    duration: 89,
    time: '3 days ago',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ***' },
  },
  {
    id: 5,
    method: 'POST',
    endpoint: '/api/v1/orders/create',
    status: 500,
    duration: 1200,
    time: '5 days ago',
    headers: { 'Content-Type': 'application/json' },
    body: { orderId: '67890', items: [] },
    response: { error: 'Internal server error' },
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

export default function RequestsPage() {
  const dispatch = useAppDispatch();
  const { requests, selectedRequest, loading, error } = useAppSelector((state) => state.requests);
  const [showPayloadExplorer, setShowPayloadExplorer] = useState(false);
  const [activeTab, setActiveTab] = useState<'headers' | 'body' | 'response'>('headers');

  useEffect(() => {
    dispatch(fetchRequests());
  }, [dispatch]);

  const handleRowClick = (requestId: number) => {
    const request = (requests.data || DUMMY_REQUESTS).find((r) => r.id === requestId);
    if (request) {
      dispatch(setSelectedRequest(request));
      setShowPayloadExplorer(true);
    }
  };

  const displayRequests = requests.data || DUMMY_REQUESTS;

  const renderTabContent = () => {
    if (!selectedRequest) return null;

    switch (activeTab) {
      case 'headers':
        return selectedRequest.headers || {};
      case 'body':
        return selectedRequest.body || {};
      case 'response':
        return selectedRequest.response || {};
      default:
        return {};
    }
  };

  return (
    <AppLayout>
      <Box>
        {/* Header */}
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 600,
                fontSize: { xs: '24px', sm: '32px' },
                lineHeight: '40px',
                color: '#0f172a',
                mb: 1,
              }}
            >
              Live Request Timeline
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#64748b',
                fontSize: '16px',
              }}
            >
              Monitor API requests in real-time
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<FilterListIcon />}
              sx={{
                borderColor: '#e2e8f0',
                color: '#64748b',
                textTransform: 'none',
                '&:hover': {
                  borderColor: '#cbd5e1',
                  bgcolor: '#f8fafc',
                },
              }}
            >
              Filter
            </Button>
            <Button
              variant="outlined"
              startIcon={<CalendarTodayIcon />}
              sx={{
                borderColor: '#e2e8f0',
                color: '#64748b',
                textTransform: 'none',
                '&:hover': {
                  borderColor: '#cbd5e1',
                  bgcolor: '#f8fafc',
                },
              }}
            >
              Export
            </Button>
          </Box>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ display: 'grid', gridTemplateColumns: showPayloadExplorer ? '1fr 400px' : '1fr', gap: 3 }}>
          {/* Request Table */}
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
                  <TableCell sx={{ fontWeight: 600, color: '#475569', fontSize: '13px' }}>DURATION</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#475569', fontSize: '13px' }}>TIME</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayRequests.map((request) => (
                  <TableRow
                    key={request.id}
                    onClick={() => handleRowClick(request.id)}
                    sx={{
                      cursor: 'pointer',
                      '&:hover': {
                        bgcolor: '#faf8ff',
                      },
                      bgcolor: selectedRequest?.id === request.id ? '#f8fafc' : 'transparent',
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
                      <Typography variant="body2" sx={{ fontWeight: 500, color: '#0f172a', fontSize: '14px', fontFamily: 'monospace' }}>
                        {request.endpoint}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ color: '#64748b', fontSize: '13px' }}>
                        {request.duration}ms
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ color: '#64748b', fontSize: '13px' }}>
                        {request.time}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Payload Explorer */}
          {showPayloadExplorer && selectedRequest && (
            <Paper
              sx={{
                border: '1px solid #e2e8f0',
                borderRadius: 2,
                boxShadow: 'none',
                height: 'fit-content',
                maxHeight: '80vh',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Header */}
              <Box
                sx={{
                  p: 2,
                  borderBottom: '1px solid #e2e8f0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  bgcolor: '#f8fafc',
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '16px', color: '#0f172a' }}>
                  Payload Explorer
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => setShowPayloadExplorer(false)}
                  sx={{ color: '#64748b' }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>

              {/* Tabs */}
              <Box sx={{ borderBottom: '1px solid #e2e8f0', display: 'flex', gap: 0 }}>
                {(['headers', 'body', 'response'] as const).map((tab) => (
                  <Box
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    sx={{
                      px: 3,
                      py: 1.5,
                      cursor: 'pointer',
                      borderBottom: activeTab === tab ? '2px solid #0070f3' : 'none',
                      color: activeTab === tab ? '#0070f3' : '#64748b',
                      fontSize: '13px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      '&:hover': {
                        color: '#0070f3',
                      },
                    }}
                  >
                    {tab === 'headers' ? 'REQUEST HEADERS' : tab === 'body' ? 'REQUEST BODY' : 'RESPONSE'}
                  </Box>
                ))}
              </Box>

              {/* Content */}
              <Box sx={{ p: 3, overflow: 'auto', flexGrow: 1 }}>
                <Typography variant="body2" sx={{ color: '#64748b', mb: 2, fontSize: '12px' }}>
                  {selectedRequest.endpoint}
                </Typography>
                <Box
                  component="pre"
                  sx={{
                    bgcolor: '#f8fafc',
                    p: 2,
                    borderRadius: 1,
                    fontSize: '12px',
                    fontFamily: 'monospace',
                    color: '#0f172a',
                    overflow: 'auto',
                    border: '1px solid #e2e8f0',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {JSON.stringify(renderTabContent(), null, 2)}
                </Box>
              </Box>
            </Paper>
          )}
        </Box>

        {/* Recent Critical Errors */}
        <Box sx={{ mt: 5 }}>
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
            Recent Critical Errors
          </Typography>

          <Box
            sx={{
              bgcolor: 'background.paper',
              borderRadius: 2,
              border: '1px solid #e2e8f0',
              overflow: 'hidden',
            }}
          >
            {[
              {
                title: 'Database connection timeout in production',
                message: 'Connection to primary database failed after 5 retries',
                time: '2 hrs ago',
              },
              {
                title: 'Unexpected response from external API',
                message: 'External service API returned 503 for 3 minutes',
                time: '5 hrs ago',
              },
            ].map((errorItem, index) => (
              <Box
                key={index}
                sx={{
                  p: 3,
                  borderBottom: index === 0 ? '1px solid #e2e8f0' : 'none',
                  display: 'flex',
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    bgcolor: 'rgba(239, 68, 68, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ef4444',
                    flexShrink: 0,
                    fontSize: '20px',
                  }}
                >
                  ⚠
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 500,
                      color: '#0f172a',
                      mb: 0.5,
                    }}
                  >
                    {errorItem.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#64748b', fontSize: '13px' }}>
                    {errorItem.message}
                  </Typography>
                </Box>
                <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '12px' }}>
                  {errorItem.time}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </AppLayout>
  );
}

export const API_ENDPOINTS = {
  DASHBOARD_CARDS: '/api/dashboard/cards',
  DASHBOARD_CHARTS: '/api/dashboard/charts',
  DASHBOARD_TABLE: '/api/dashboard/table',
  LOGS_DETAIL: '/api/logs/:id',
} as const;

export const STATUS_COLORS = {
  healthy: '#4caf50',
  degraded: '#ff9800',
  down: '#f44336',
} as const;

export const LOG_LEVELS = {
  info: { color: '#2196f3', label: 'Info' },
  warning: { color: '#ff9800', label: 'Warning' },
  error: { color: '#f44336', label: 'Error' },
} as const;

export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [5, 10, 25, 50, 100];

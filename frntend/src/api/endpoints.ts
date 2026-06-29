export const API_ENDPOINTS = {
  DASHBOARD_CARDS: '/dashboard/cards',
  DASHBOARD_CHARTS: '/dashboard/charts',
  DASHBOARD_TABLE: '/dashboard/table',
  LOGS_DETAIL: (id: number | string) => `/logs/${id}`,
} as const;

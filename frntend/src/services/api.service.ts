import apiClient from '@/api/axios.config';
import { API_ENDPOINTS } from '@/api/endpoints';
import type {
  KPICard,
  LineChartData,
  BarChartData,
  PieChartData,
  TableResponse,
} from '@/types/dashboard.types';
import type { LogsResponse } from '@/types/logs.types';
import {
  mockDashboardService,
  mockLogsService,
} from './mock-data.service';

// Toggle between mock and real API
const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true';

export const dashboardService = {
  getCards: async (): Promise<KPICard[]> => {
    if (USE_MOCK_DATA) {
      return mockDashboardService.getCards();
    }
    const response = await apiClient.get<KPICard[]>(API_ENDPOINTS.DASHBOARD_CARDS);
    return response.data;
  },

  getCharts: async (): Promise<{
    lineChart: LineChartData;
    barChart: BarChartData;
    pieChart: PieChartData;
  }> => {
    if (USE_MOCK_DATA) {
      return mockDashboardService.getCharts();
    }
    const response = await apiClient.get(API_ENDPOINTS.DASHBOARD_CHARTS);
    return response.data;
  },

  getTableData: async (params: {
    page: number;
    pageSize: number;
    search?: string;
    sortField?: string;
    sortDirection?: 'asc' | 'desc';
  }): Promise<TableResponse> => {
    if (USE_MOCK_DATA) {
      return mockDashboardService.getTableData(params);
    }
    const response = await apiClient.get<TableResponse>(API_ENDPOINTS.DASHBOARD_TABLE, {
      params,
    });
    return response.data;
  },
};

export const logsService = {
  getLogDetails: async (id: number | string): Promise<LogsResponse> => {
    if (USE_MOCK_DATA) {
      return mockLogsService.getLogDetails(id);
    }
    const response = await apiClient.get<LogsResponse>(API_ENDPOINTS.LOGS_DETAIL(id));
    return response.data;
  },
};

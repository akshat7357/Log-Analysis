import type {
  KPICard,
  LineChartData,
  BarChartData,
  PieChartData,
  TableResponse,
  TableRow,
} from '@/types/dashboard.types';
import type { LogsResponse } from '@/types/logs.types';

// Dummy KPI Cards Data
export const mockKPICards: KPICard[] = [
  {
    id: '1',
    title: 'Total Users',
    value: 1240000,
    icon: 'People',
    trend: 12.5,
    trendLabel: 'vs last month',
  },
  {
    id: '2',
    title: 'Active Sessions',
    value: 45280,
    icon: 'TrendingUp',
    trend: 8.2,
    trendLabel: 'vs last week',
  },
  {
    id: '3',
    title: 'API Requests',
    value: 8920000,
    icon: 'Api',
    trend: -3.1,
    trendLabel: 'vs yesterday',
  },
  {
    id: '4',
    title: 'Revenue',
    value: 392000,
    icon: 'AttachMoney',
    trend: 15.8,
    trendLabel: 'vs last month',
  },
];

// Dummy Line Chart Data
export const mockLineChartData: LineChartData = {
  name: 'API Requests Over Time',
  data: [
    { date: '2026-06-01', value: 245000 },
    { date: '2026-06-05', value: 278000 },
    { date: '2026-06-10', value: 312000 },
    { date: '2026-06-15', value: 289000 },
    { date: '2026-06-20', value: 334000 },
    { date: '2026-06-25', value: 398000 },
  ],
};

// Dummy Bar Chart Data
export const mockBarChartData: BarChartData = {
  name: 'Requests by Service',
  data: [
    { category: 'Authentication', value: 2890000 },
    { category: 'Payment', value: 1450000 },
    { category: 'User Management', value: 3120000 },
    { category: 'Analytics', value: 1460000 },
  ],
};

// Dummy Pie Chart Data
export const mockPieChartData: PieChartData = {
  name: 'Request Status Distribution',
  data: [
    { label: 'Success', value: 78, color: '#10b981' },
    { label: 'Client Error', value: 15, color: '#f59e0b' },
    { label: 'Server Error', value: 5, color: '#ef4444' },
    { label: 'Timeout', value: 2, color: '#6b7280' },
  ],
};

// Dummy Table Data
const generateMockTableRows = (count: number = 50): TableRow[] => {
  const services = [
    'Monthly API-12',
    'Payment Gateway',
    'User Support',
    'Link Aggregator',
    'Authentication Service',
    'Data Warehouse',
    'Email Delivery',
    'SMS Gateway',
    'Analytics Engine',
    'Storage Service',
  ];

  const statuses: Array<'healthy' | 'degraded' | 'down'> = ['healthy', 'degraded', 'down'];

  return Array.from({ length: count }, (_, index) => {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const totalRequests = Math.floor(Math.random() * 100000) + 10000;
    const successRate = status === 'healthy' ? 0.95 : status === 'degraded' ? 0.75 : 0.4;
    const successCount = Math.floor(totalRequests * successRate);
    const failureCount = totalRequests - successCount;

    return {
      id: index + 1,
      serviceName: services[index % services.length],
      status,
      totalRequests,
      successCount,
      failureCount,
      lastUpdated: new Date(
        Date.now() - Math.floor(Math.random() * 3600000)
      ).toISOString(),
    };
  });
};

const allMockTableRows = generateMockTableRows(50);

// Mock Dashboard Service
export const mockDashboardService = {
  getCards: async (): Promise<KPICard[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockKPICards;
  },

  getCharts: async (): Promise<{
    lineChart: LineChartData;
    barChart: BarChartData;
    pieChart: PieChartData;
  }> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 700));
    return {
      lineChart: mockLineChartData,
      barChart: mockBarChartData,
      pieChart: mockPieChartData,
    };
  },

  getTableData: async (params: {
    page: number;
    pageSize: number;
    search?: string;
    sortField?: string;
    sortDirection?: 'asc' | 'desc';
  }): Promise<TableResponse> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 400));

    let filteredData = [...allMockTableRows];

    // Apply search filter
    if (params.search) {
      const searchLower = params.search.toLowerCase();
      filteredData = filteredData.filter((row) =>
        row.serviceName.toLowerCase().includes(searchLower)
      );
    }

    // Apply sorting
    if (params.sortField && params.sortDirection) {
      filteredData.sort((a, b) => {
        const aValue = a[params.sortField as keyof TableRow];
        const bValue = b[params.sortField as keyof TableRow];

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return params.sortDirection === 'asc'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return params.sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
        }

        return 0;
      });
    }

    // Apply pagination
    const start = (params.page - 1) * params.pageSize;
    const end = start + params.pageSize;
    const paginatedData = filteredData.slice(start, end);

    return {
      data: paginatedData,
      pagination: {
        page: params.page,
        pageSize: params.pageSize,
        total: filteredData.length,
      },
    };
  },
};

// Mock Logs Service
export const mockLogsService = {
  getLogDetails: async (id: number | string): Promise<LogsResponse> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    return {
      serviceInfo: {
        id: Number(id),
        name: 'Monthly API-12',
        status: 'healthy',
        lastUpdated: new Date().toISOString(),
        uptime: 99.8,
      },
      requestLogs: [
        {
          id: `req_1_${id}`,
          timestamp: new Date(Date.now() - 60000).toISOString(),
          level: 'info',
          message: 'GET /api/v1/users processed successfully',
          statusCode: 200,
          executionTime: 45,
          endpoint: '/api/v1/users',
          method: 'GET',
        },
        {
          id: `req_2_${id}`,
          timestamp: new Date(Date.now() - 120000).toISOString(),
          level: 'info',
          message: 'POST /api/v1/auth/login processed successfully',
          statusCode: 200,
          executionTime: 123,
          endpoint: '/api/v1/auth/login',
          method: 'POST',
        },
        {
          id: `req_3_${id}`,
          timestamp: new Date(Date.now() - 180000).toISOString(),
          level: 'warning',
          message: 'GET /api/v1/data slow response',
          statusCode: 200,
          executionTime: 2340,
          endpoint: '/api/v1/data',
          method: 'GET',
        },
      ],
      errorLogs: [
        {
          id: `err_1_${id}`,
          timestamp: new Date(Date.now() - 300000).toISOString(),
          level: 'error',
          message: 'Database connection timeout',
          stackTrace: 'Error: Connection timeout\n  at Database.connect (/app/db.js:45)\n  at async handler (/app/routes.js:12)',
          statusCode: 500,
          errorType: 'DatabaseError',
        },
      ],
      pagination: {
        page: 1,
        pageSize: 20,
        total: 4,
      },
    };
  },
};

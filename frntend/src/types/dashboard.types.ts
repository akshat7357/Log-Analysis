export interface KPICard {
  id: string;
  title: string;
  value: number;
  icon: string;
  trend?: number;
  trendLabel?: string;
}

export interface LineChartData {
  name: string;
  data: Array<{
    date: string;
    value: number;
  }>;
}

export interface BarChartData {
  name: string;
  data: Array<{
    category: string;
    value: number;
  }>;
}

export interface PieChartData {
  name: string;
  data: Array<{
    label: string;
    value: number;
    color: string;
  }>;
}

export interface TableRow {
  id: number;
  serviceName: string;
  status: 'healthy' | 'degraded' | 'down';
  totalRequests: number;
  successCount: number;
  failureCount: number;
  lastUpdated: string;
}

export interface TableResponse {
  data: TableRow[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
  };
}

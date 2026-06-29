export interface ServiceInfo {
  id: number;
  name: string;
  status: 'healthy' | 'degraded' | 'down';
  lastUpdated: string;
  uptime: number;
}

export interface RequestLog {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error';
  message: string;
  requestPayload?: Record<string, unknown>;
  responsePayload?: Record<string, unknown>;
  statusCode: number;
  executionTime: number;
  endpoint?: string;
  method?: string;
}

export interface ErrorLog {
  id: string;
  timestamp: string;
  level: 'error' | 'warning';
  message: string;
  stackTrace?: string;
  statusCode?: number;
  errorType?: string;
}

export interface LogsResponse {
  serviceInfo: ServiceInfo;
  requestLogs: RequestLog[];
  errorLogs: ErrorLog[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
  };
}

import { NextRequest, NextResponse } from 'next/server';
import type { LogsResponse } from '@/types/logs.types';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const response: LogsResponse = {
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

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch log details' },
      { status: 500 }
    );
  }
}

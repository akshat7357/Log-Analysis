import { NextRequest, NextResponse } from 'next/server';
import type { TableResponse, TableRow } from '@/types/dashboard.types';

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

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');
    const search = searchParams.get('search') || '';
    const sortField = searchParams.get('sortField') || '';
    const sortDirection = (searchParams.get('sortDirection') || 'asc') as 'asc' | 'desc';

    let filteredData = [...allMockTableRows];

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filteredData = filteredData.filter((row) =>
        row.serviceName.toLowerCase().includes(searchLower)
      );
    }

    // Apply sorting
    if (sortField) {
      filteredData.sort((a, b) => {
        const aValue = a[sortField as keyof TableRow];
        const bValue = b[sortField as keyof TableRow];

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortDirection === 'asc'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
        }

        return 0;
      });
    }

    // Apply pagination
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginatedData = filteredData.slice(start, end);

    const response: TableResponse = {
      data: paginatedData,
      pagination: {
        page,
        pageSize,
        total: filteredData.length,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch table data' },
      { status: 500 }
    );
  }
}

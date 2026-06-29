import { NextResponse } from 'next/server';
import type {
  LineChartData,
  BarChartData,
  PieChartData,
} from '@/types/dashboard.types';

const mockLineChartData: LineChartData = {
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

const mockBarChartData: BarChartData = {
  name: 'Requests by Service',
  data: [
    { category: 'Authentication', value: 2890000 },
    { category: 'Payment', value: 1450000 },
    { category: 'User Management', value: 3120000 },
    { category: 'Analytics', value: 1460000 },
  ],
};

const mockPieChartData: PieChartData = {
  name: 'Request Status Distribution',
  data: [
    { label: 'Success', value: 78, color: '#10b981' },
    { label: 'Client Error', value: 15, color: '#f59e0b' },
    { label: 'Server Error', value: 5, color: '#ef4444' },
    { label: 'Timeout', value: 2, color: '#6b7280' },
  ],
};

export async function GET() {
  try {
    return NextResponse.json({
      lineChart: mockLineChartData,
      barChart: mockBarChartData,
      pieChart: mockPieChartData,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch charts data' },
      { status: 500 }
    );
  }
}

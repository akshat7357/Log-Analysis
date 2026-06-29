import { NextResponse } from 'next/server';
import type { KPICard } from '@/types/dashboard.types';


const mockKPICards: KPICard[] = [
   {
    id: '1',
    title: 'Total Traces',
    value: 1240000,
    icon: 'People',
    trend: 12.5,
    trendLabel: 'vs last month',
  },
  {
    id: '2',
    title: 'Resolved',
    value: 45280,
    icon: 'TrendingUp',
    trend: 8.2,
    trendLabel: 'vs last week',
  },
  {
    id: '3',
    title: 'Active',
    value: 8920000,
    icon: 'Api',
    trend: -3.1,
    trendLabel: 'vs yesterday',
  },
{
  id: '4',
  title: 'Avg MTTR',
  value: '<1 MN',
  icon: 'AccessTime',
  trend: 15.8,
  trendLabel: 'vs last month',
}
];
export async function GET() {
  try {
    return NextResponse.json(mockKPICards);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch dashboard cards' },
      { status: 500 }
    );
  }
}

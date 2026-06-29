# API Integration Guide

## Overview

The Next.js application is now fully integrated with your backend APIs using Redux Toolkit for state management.

## API Configuration

### Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5173/api
```

For production, update to your production API URL.

### Axios Client

Located at `src/api/axios.config.ts`, configured with:
- Base URL from environment variables
- 30-second timeout
- Request/response interceptors for logging (dev mode only)
- Error handling for common HTTP status codes

## Redux Slices

### 1. Dashboard Cards Slice
**File:** `src/store/slices/dashboardSlice.ts`

**Action:** `fetchDashboardCards()`

**Endpoint:** `GET /dashboard/cards`

**Response Type:** `KPICard[]`

**Usage:**
```typescript
import { fetchDashboardCards } from '@/store/slices/dashboardSlice';

dispatch(fetchDashboardCards());

// Access state
const { cards } = useAppSelector((state) => state.dashboard);
// cards.data - array of KPI cards
// cards.loading - boolean loading state
// cards.error - error message if any
```

### 2. Charts Data Slice
**File:** `src/store/slices/chartsSlice.ts`

**Action:** `fetchChartsData()`

**Endpoint:** `GET /dashboard/charts`

**Response Type:** 
```typescript
{
  lineChart: LineChartData;
  barChart: BarChartData;
  pieChart: PieChartData;
}
```

**Usage:**
```typescript
import { fetchChartsData } from '@/store/slices/chartsSlice';

dispatch(fetchChartsData());

// Access state
const { lineChart, barChart, pieChart } = useAppSelector((state) => state.charts);
```

### 3. Table Data Slice
**File:** `src/store/slices/tableSlice.ts`

**Action:** `fetchTableData(params?)`

**Endpoint:** `GET /dashboard/table`

**Parameters:**
- `page?: number`
- `pageSize?: number`
- `search?: string`
- `sortField?: string`
- `sortDirection?: 'asc' | 'desc'`

**Additional Actions:**
- `setPage(page: number)`
- `setPageSize(pageSize: number)`
- `setSearch(search: string)`
- `setSort({ field: string; direction: 'asc' | 'desc' })`

**Usage:**
```typescript
import { fetchTableData, setPage, setSearch } from '@/store/slices/tableSlice';

// Fetch data
dispatch(fetchTableData({ page: 1, pageSize: 10 }));

// Update filters
dispatch(setSearch('auth'));
dispatch(setPage(2));

// Access state
const { data, loading, pagination, filters } = useAppSelector((state) => state.table);
```

## Services

**File:** `src/services/api.service.ts`

Provides typed API methods:
- `dashboardService.getCards()`
- `dashboardService.getCharts()`
- `dashboardService.getTableData(params)`
- `logsService.getLogDetails(id)`

## Current Implementation

The Dashboard page (`src/app/page.tsx`) now:

1. ✅ Fetches KPI cards from API on mount
2. ✅ Fetches charts data from API on mount
3. ✅ Shows loading state with CircularProgress
4. ✅ Displays error alerts if API calls fail
5. ✅ Renders actual data from Redux store

## Testing the Integration

### With Your Backend API

1. Start your backend API server on port 5173
2. Ensure the following endpoints are available:
   - `GET http://localhost:5173/api/dashboard/cards`
   - `GET http://localhost:5173/api/dashboard/charts`
   - `GET http://localhost:5173/api/dashboard/table`

3. The Next.js app will automatically fetch data on page load

### API Response Formats

**Dashboard Cards:**
```json
[
  {
    "id": "1",
    "title": "Total Users",
    "value": 1240000,
    "icon": "People",
    "trend": 12.5,
    "trendLabel": "vs last month"
  }
]
```

**Charts Data:**
```json
{
  "lineChart": { /* chart data */ },
  "barChart": { /* chart data */ },
  "pieChart": { /* chart data */ }
}
```

**Table Data:**
```json
{
  "data": [ /* table rows */ ],
  "pagination": {
    "page": 1,
    "pageSize": 10,
    "total": 100
  }
}
```

## TypeScript Types

All types are defined in `src/types/`:
- `dashboard.types.ts` - KPICard, LineChartData, BarChartData, PieChartData, TableRow, TableResponse
- `api.types.ts` - Generic API response types
- `logs.types.ts` - Log-related types

## Error Handling

The Redux slices handle errors gracefully:
- Network errors
- API errors (4xx, 5xx)
- Timeout errors

Errors are stored in the state and displayed to users via Alert components.

## Next Steps

To complete the integration:

1. **Add Chart Components** - Create actual chart components using the fetched data
2. **Add Table Component** - Implement the data table with pagination
3. **Add Other Pages** - Migrate Analytics, Reports, Logs pages
4. **Add Loading Skeletons** - Replace CircularProgress with skeleton loaders
5. **Add Error Boundaries** - Implement React error boundaries

## Development Tips

- Check browser console for API request/response logs (dev mode only)
- Use Redux DevTools to inspect state changes
- Set `NEXT_PUBLIC_API_BASE_URL` to switch between different API environments
- All API calls are client-side due to 'use client' directive

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { dashboardService } from '@/services/api.service';
import type { LineChartData, BarChartData, PieChartData } from '@/types/dashboard.types';

interface ChartsState {
  lineChart: {
    data: LineChartData | null;
    loading: boolean;
    error: string | null;
  };
  barChart: {
    data: BarChartData | null;
    loading: boolean;
    error: string | null;
  };
  pieChart: {
    data: PieChartData | null;
    loading: boolean;
    error: string | null;
  };
}

const initialState: ChartsState = {
  lineChart: {
    data: null,
    loading: false,
    error: null,
  },
  barChart: {
    data: null,
    loading: false,
    error: null,
  },
  pieChart: {
    data: null,
    loading: false,
    error: null,
  },
};

export const fetchChartsData = createAsyncThunk(
  'charts/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      const data = await dashboardService.getCharts();
      return data;
    } catch (error) {
      return rejectWithValue('Failed to fetch charts data');
    }
  }
);

const chartsSlice = createSlice({
  name: 'charts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChartsData.pending, (state) => {
        state.lineChart.loading = true;
        state.barChart.loading = true;
        state.pieChart.loading = true;
        state.lineChart.error = null;
        state.barChart.error = null;
        state.pieChart.error = null;
      })
      .addCase(fetchChartsData.fulfilled, (state, action) => {
        state.lineChart.loading = false;
        state.barChart.loading = false;
        state.pieChart.loading = false;
        state.lineChart.data = action.payload.lineChart;
        state.barChart.data = action.payload.barChart;
        state.pieChart.data = action.payload.pieChart;
      })
      .addCase(fetchChartsData.rejected, (state, action) => {
        state.lineChart.loading = false;
        state.barChart.loading = false;
        state.pieChart.loading = false;
        const error = action.payload as string;
        state.lineChart.error = error;
        state.barChart.error = error;
        state.pieChart.error = error;
      });
  },
});

export default chartsSlice.reducer;

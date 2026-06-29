import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { dashboardService } from '@/services/api.service';
import type { KPICard } from '@/types/dashboard.types';

interface DashboardState {
  cards: {
    data: KPICard[] | null;
    loading: boolean;
    error: string | null;
  };
}

const initialState: DashboardState = {
  cards: {
    data: null,
    loading: false,
    error: null,
  },
};

export const fetchDashboardCards = createAsyncThunk(
  'dashboard/fetchCards',
  async (_, { rejectWithValue }) => {
    try {
      const data = await dashboardService.getCards();
      return data;
    } catch (error) {
      return rejectWithValue('Failed to fetch dashboard cards');
    }
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardCards.pending, (state) => {
        state.cards.loading = true;
        state.cards.error = null;
      })
      .addCase(fetchDashboardCards.fulfilled, (state, action) => {
        state.cards.loading = false;
        state.cards.data = action.payload;
      })
      .addCase(fetchDashboardCards.rejected, (state, action) => {
        state.cards.loading = false;
        state.cards.error = action.payload as string;
      });
  },
});

export default dashboardSlice.reducer;

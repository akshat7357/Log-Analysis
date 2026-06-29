import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import apiClient from '@/api/axios.config';

export interface Request {
  id: number;
  method: string;
  endpoint: string;
  status: number;
  duration: number;
  time: string;
  headers?: Record<string, string>;
  body?: any;
  response?: any;
}

interface RequestsState {
  requests: {
    data: Request[] | null;
  };
  selectedRequest: Request | null;
  loading: boolean;
  error: string | null;
}

const initialState: RequestsState = {
  requests: {
    data: null,
  },
  selectedRequest: null,
  loading: false,
  error: null,
};

export const fetchRequests = createAsyncThunk('requests/fetchRequests', async () => {
  const response = await apiClient.get('/requests');
  return response.data;
});

const requestsSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {
    setSelectedRequest: (state, action: PayloadAction<Request>) => {
      state.selectedRequest = action.payload;
    },
    clearSelectedRequest: (state) => {
      state.selectedRequest = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.requests.data = action.payload;
      })
      .addCase(fetchRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch requests';
      });
  },
});

export const { setSelectedRequest, clearSelectedRequest } = requestsSlice.actions;
export default requestsSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { dashboardService } from '@/services/api.service';
import type { TableRow } from '@/types/dashboard.types';

interface TableState {
  data: TableRow[];
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    pageSize: number;
    total: number;
  };
  filters: {
    search: string;
    status: string;
  };
  sort: {
    field: string;
    direction: 'asc' | 'desc';
  };
}

const initialState: TableState = {
  data: [],
  loading: false,
  error: null,
  pagination: {
    page: 1,
    pageSize: 10,
    total: 0,
  },
  filters: {
    search: '',
    status: 'all',
  },
  sort: {
    field: 'id',
    direction: 'asc',
  },
};

export const fetchTableData = createAsyncThunk(
  'table/fetchData',
  async (
    params: {
      page?: number;
      pageSize?: number;
      search?: string;
      sortField?: string;
      sortDirection?: 'asc' | 'desc';
    } = {},
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState() as { table: TableState };
      const {
        pagination,
        filters,
        sort,
      } = state.table;

      const data = await dashboardService.getTableData({
        page: params.page ?? pagination.page,
        pageSize: params.pageSize ?? pagination.pageSize,
        search: params.search ?? filters.search,
        sortField: params.sortField ?? sort.field,
        sortDirection: params.sortDirection ?? sort.direction,
      });

      return data;
    } catch (error) {
      return rejectWithValue('Failed to fetch table data');
    }
  }
);

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.page = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pagination.pageSize = action.payload;
      state.pagination.page = 1;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.filters.search = action.payload;
      state.pagination.page = 1;
    },
    setSort: (state, action: PayloadAction<{ field: string; direction: 'asc' | 'desc' }>) => {
      state.sort = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTableData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTableData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.pagination = {
          ...state.pagination,
          ...action.payload.pagination,
        };
      })
      .addCase(fetchTableData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setPage, setPageSize, setSearch, setSort } = tableSlice.actions;
export default tableSlice.reducer;

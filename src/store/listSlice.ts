import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api';

export const fetchCalculations = createAsyncThunk(
    'list/fetchCalculations',
    async (filters: { status?: string; date_from?: string; date_to?: string } | undefined, { rejectWithValue }) => {
        try {
            const response = await api.reagentCalculations.reagentCalculationsList(filters);
            return response.data;
        } catch (error) {
            return rejectWithValue('Ошибка при загрузке списка заявок');
        }
    }
);

const listSlice = createSlice({
    name: 'list',
    initialState: {
        items: [] as any[],
        loading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCalculations.pending, (state) => { state.loading = true; })
            .addCase(fetchCalculations.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchCalculations.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default listSlice.reducer;
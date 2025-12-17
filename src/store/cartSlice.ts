import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api';

interface CartState {
    count: number;
    calculation_id: number | null;
    loading: boolean;
    error: string | null;
}

const initialState: CartState = {
    count: 0,
    calculation_id: null,
    loading: false,
    error: null,
};

export const fetchCarticonAsync = createAsyncThunk(
    'cart/fetchCartCount',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.reagentCalculations.reagentCalculationsCartIconList();
            return response.data;
        } catch (error) {
            return rejectWithValue(0);
        }
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        incrementCartCount: (state, action: { payload: number }) => {
            state.count += action.payload;
        },
        resetCartCount: (state) => {
            state.count = 0;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCarticonAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCarticonAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.calculation_id = action.payload.calculation_id
                state.count = action.payload.processes_count;
            })
            .addCase(fetchCarticonAsync.rejected, (state) => {
                state.loading = false;
                state.count = 0;
            });
    },
});

export const { incrementCartCount, resetCartCount } = cartSlice.actions;
export default cartSlice.reducer;
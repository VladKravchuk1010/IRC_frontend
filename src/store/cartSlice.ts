import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api';

interface CartState {
    count: number;
    calculation_id: number;
    loading: boolean;
    error: string | null;
}

const initialState: CartState = {
    count: 0,
    calculation_id: 0,
    loading: false,
    error: null,
};

export const fetchActiveCalculationStatus = createAsyncThunk(
    'cart/fetchActiveCalculationStatus',
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
            .addCase(fetchActiveCalculationStatus.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchActiveCalculationStatus.fulfilled, (state, action) => {
                state.loading = false;
                state.calculation_id = action.payload.calculation_id
                state.count = action.payload.processes_count;
            })
            .addCase(fetchActiveCalculationStatus.rejected, (state) => {
                state.loading = false;
                state.count = 0;
            })
            // .addMatcher(
            //     (action) => action.type.endsWith('addProcessToCalculation/fulfilled'),
            //     (state) => {state.count += 1}
            // )
    },
});

export const { incrementCartCount, resetCartCount } = cartSlice.actions;
export default cartSlice.reducer;
import { createSlice, type PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { type ChemicalProcess } from '../api/Api';
import { api } from '../api';
import { MOCK_PROCESSES } from '../api/mock';
import type { RootState } from './store';
import { logoutUserAsync } from './userSlice';


interface FilterState {
    search: string;
    minMass: number | null;
    maxMass: number | null;
    processes: ChemicalProcess[];
    loading: boolean;
}

const initialState: FilterState = {
    search: '',
    minMass: null,
    maxMass: null,
    processes: [],
    loading: false,
};

export const getProcessesList = createAsyncThunk<
    ChemicalProcess[],
    void,
    {
        state: RootState;
        rejectValue: string;
    }
>(
    'processes/getProcessesList',
    async (_, { getState, rejectWithValue }) => {

        const state = getState() as RootState;
        const { search, minMass, maxMass } = state.filter;
        
        const params: Record<string, any> = {}


        if (search && search.trim() !== '') {
            params.search = search;
        }
        
        if (minMass !== null && ! isNaN(minMass) && minMass >0) {
            params.min_mass = minMass;
        }

        if (maxMass !== null && ! isNaN(maxMass) && maxMass >0) {
            params.max_mass = maxMass;
        }

        try {
            const response = await api.chemicalProcesses.chemicalProcessesList(params);

            return response.data;
        } catch (error) {
            return rejectWithValue('Ошибка при загрузке данных');
        }
    }
);

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFilters: (state, action: PayloadAction<FilterState>) => {
            state.search = action.payload.search;
            state.minMass = action.payload.minMass;
            state.maxMass = action.payload.maxMass;
        },
        resetFilters: (state) => {
            state.search = initialState.search;
            state.minMass = initialState.minMass;
            state.maxMass = initialState.maxMass;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProcessesList.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProcessesList.fulfilled, (state, action) => {
                state.loading = false;
                state.processes = action.payload;
            })
            .addCase(getProcessesList.rejected, (state) => {
                state.loading = false;
                state.processes = MOCK_PROCESSES.filter((item) =>
                    item.name.toLocaleLowerCase().startsWith(state.search.toLocaleLowerCase())
                );
            })
            .addCase(logoutUserAsync.fulfilled, () => {
                return initialState;
            });
    },
});

// Экспорт экшенов (действий)
export const { setFilters, resetFilters } = filterSlice.actions;

// Экспорт редюсера
export default filterSlice.reducer;

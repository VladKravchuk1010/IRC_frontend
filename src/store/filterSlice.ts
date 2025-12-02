import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type FilterState } from '../types';

// Начальное состояние
const initialState: FilterState = {
    search: '',
    minMass: '',
    maxMass: '',
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        // Устанавливает все фильтры сразу
        setFilters: (state, action: PayloadAction<FilterState>) => {
            state.search = action.payload.search;
            state.minMass = action.payload.minMass;
            state.maxMass = action.payload.maxMass;
        },
        // Сбрасывает все фильтры к начальному состоянию
        resetFilters: (state) => {
            state.search = initialState.search;
            state.minMass = initialState.minMass;
            state.maxMass = initialState.maxMass;
        },
    },
});

// Экспорт экшенов (действий)
export const { setFilters, resetFilters } = filterSlice.actions;

// Экспорт редюсера
export default filterSlice.reducer;

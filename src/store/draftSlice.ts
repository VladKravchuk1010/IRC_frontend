import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { api } from '../api';
import type {
    ChemicalProcessInCalculation,
    ChemicalProcessInCalculationDelete,
    ReagentCalculationCreate
} from '../api/Api';

interface  DraftState {
    id: number | null;
    target_mass: string;
    safety_factor: string;
    calculation_date: string;
    processes: ChemicalProcessInCalculation[];
    count: number;
    error: string | null;
    loading: boolean;
    isDraft: boolean;
}

const initialState:  DraftState = {
    id: null,
    target_mass: '',
    safety_factor: '',
    calculation_date: new Date().toISOString().split('T')[0],
    processes: [],
    count: 0,
    error: null,
    loading: false,
    isDraft: false,
};

export const getDraft = createAsyncThunk(
    ' Draft/getDraft',
    async (appId: number) => {
        const response = await api.reagentCalculations.reagentCalculationsRead(appId);
        return response.data;
    }
);

export const addProcessToDraft = createAsyncThunk<
    ChemicalProcessInCalculation,
    { processId: number; quantity: number; appId: number | null },
    { rejectValue: string }
>(
    ' Draft/addProcessToDraft',
    async ({ processId }, { rejectWithValue }) => {
        try {
            const response = await api.chemicalProcesses.chemicalProcessesAddToCartCreate(processId);
            return response.data as ChemicalProcessInCalculation;
        } catch (error) {
            return rejectWithValue('Не удалось добавить услугу в расчет.');
        }
    }
);

export const deleteDraft = createAsyncThunk(
    ' Draft/deleteDraft',
    async (appId: number) => {
        const response = await api.reagentCalculations.reagentCalculationsDelete(appId.toString());
        return response.data;
    }
);

export const updateDraft = createAsyncThunk(
    ' Draft/updateDraft',
    async ({ appId, data }: { appId: number; data: ReagentCalculationCreate }) => {
        const response = await api.reagentCalculations.reagentCalculationsUpdate(appId.toString(), data);
        return response.data;
    }
);

export const deleteProcessFromDraft = createAsyncThunk(
    ' Draft/deleteProcessFromDraft',
    async (data: ChemicalProcessInCalculationDelete) => {
        await api.calculationProcesses.calculationProcessesDeleteDelete(data);
        return data.process_id;
    }
);

export const formDraft = createAsyncThunk(
    'Draft/formDraft',
    async (appId: number, { rejectWithValue }) => {
        try {
            const response = await api.reagentCalculations.reagentCalculationsFormUpdate(appId.toString());
            return response.data;
        } catch (error) {
            return rejectWithValue('Не удалось сформировать заявку');
        }
    }
);

// В extraReducers для finalizeDraft.fulfilled просто вызывай resetDraft()
// или делай navigate на список заявок, так как черновика больше нет.

const DraftSlice = createSlice({
    name: ' Draft',
    initialState,
    reducers: {
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        setDraftData: (state, action: PayloadAction<Partial< DraftState>>) => {
            return { ...state, ...action.payload };
        },
        setProcesses: (state, action: PayloadAction<ChemicalProcessInCalculation[]>) => {
            state.processes = action.payload;
            state.count = state.processes.reduce((sum, item) => sum + (item.quantity || 0), 0);
        },
        resetDraft: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDraft.pending, (state) => {
                state.loading = true;
            })
            .addCase(getDraft.fulfilled, (state, action) => {
                const draft = action.payload;
                state.id = draft.id || null;
                state.target_mass = draft.target_mass;
                state.safety_factor = draft.safety_factor || '';
                state.calculation_date = draft.calculation_date;
                state.processes = draft.processes || [];
                state.count = state.processes.length;
                state.isDraft = draft.status === 'DRAFT';
                state.loading = false;
            })
            .addCase(getDraft.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Ошибка загрузки';
            })
            .addCase(addProcessToDraft.fulfilled, (state, action) => {
                state.loading = false;
                const newItem = action.payload;
                

                if
                    (newItem.calculation && !state.id) {
                    state.id = newItem.calculation;
                }
                const existingIndex = state.processes.findIndex(p => p.process === newItem.process);
                if (existingIndex > -1) {
                    state.processes[existingIndex] = newItem;
                } else {
                    state.processes.push(newItem);
                }
                state.count = state.processes.length;
            })
            .addCase(deleteDraft.fulfilled, (state) => {
                return initialState;
            })
            .addCase(updateDraft.fulfilled, (state, action) => {
                state.target_mass = action.payload.target_mass;
                state.safety_factor = action.payload.safety_factor || '';
                state.calculation_date = action.payload.calculation_date;
                state.error = null;
            })
            .addCase(deleteProcessFromDraft.fulfilled, (state, action) => {
                state.processes = state.processes.filter(p => p.process !== action.payload);
                state.count = state.processes.length;
            })
            .addCase(formDraft.fulfilled, () => {
                resetDraft()    
            })
            // .addCase(fetchActiveDraft.fulfilled, (state, action) => {
            //     if (action.payload) {
            //         state.id = action.payload.id ?? null;

            //         state.target_mass = action.payload.target_mass || '';

            //         const payloadData = action.payload as any;
            //         state.processes = payloadData.processes || [];
            //         state.count = state.processes.length;

            //         state.isDraft = action.payload.status === 'DRAFT';
            //     }
            // })
    },
});

export const { setError, setDraftData, setProcesses, resetDraft } = DraftSlice.actions;
export default DraftSlice.reducer;
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { api } from '../api';
import type {
    ChemicalProcessInCalculation,
    ChemicalProcessInCalculationDelete,
    ReagentCalculationCreate
} from '../api/Api';
import { logoutUserAsync } from './userSlice';

interface DraftState {
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

const initialState: DraftState = {
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

export const addProcessToCalculation = createAsyncThunk<
    ChemicalProcessInCalculation,
    { processId: number; quantity: number; appId: number | null },
    { rejectValue: string }
>(
    ' Draft/addProcessToCalculation',
    async ({ processId }, { rejectWithValue }) => {
        try {
            const response = await api.chemicalProcesses.chemicalProcessesAddToCartCreate(processId);
            return response.data as ChemicalProcessInCalculation;
        } catch (error) {
            return rejectWithValue('Не удалось добавить услугу в расчет.');
        }
    }
);

export const updateReagentCalculation = createAsyncThunk(
    ' Draft/updateReagentCalculation',
    async ({ appId, data }: { appId: number; data: ReagentCalculationCreate }) => {
        const response = await api.reagentCalculations.reagentCalculationsUpdate(appId.toString(), data);
        return response.data;
    }
);

export const deleteProcessFromCalculation = createAsyncThunk(
    ' Draft/deleteProcessFromCalculation',
    async (data: ChemicalProcessInCalculationDelete) => {
        await api.calculationProcesses.calculationProcessesDeleteDelete(data);
        return data.process_id;
    }
);

export const formReagentCalculation = createAsyncThunk(
    'Draft/formReagentCalculation',
    async (appId: number, { rejectWithValue }) => {
        try {
            const response = await api.reagentCalculations.reagentCalculationsFormUpdate(appId.toString());
            return response.data;
        } catch (error) {
            return rejectWithValue('Не удалось сформировать заявку');
        }
    }
);


export const deleteEntireDraft = createAsyncThunk(
    'draft/deleteEntireDraft',
    async(appId: number, { dispatch }) => {
        await api.reagentCalculations.reagentCalculationsDelete(appId);
        dispatch(resetDraft());
}
);

export const updateProcessQuantityAsync = createAsyncThunk<
    { processId: number; quantity: number; calculation_result: string | null },
    { calculationId: number; processId: number; quantity: number, calculation_result: string | null },             
    { rejectValue: string }
>(
    'draft/updateProcessQuantityAsync',
    async ({ calculationId, processId, quantity }, { rejectWithValue }) => {
        try {
            const updateData = {
                calculation_id: calculationId,
                process_id: processId,
                quantity: quantity
            };

            const response = await api.calculationProcesses.calculationProcessesUpdate(updateData as any);

            return {
                processId,
                quantity,
                calculation_result: response.data?.calculation_result || null
            };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Ошибка обновления количества');
        }
    }
);

const DraftSlice = createSlice({
    name: ' Draft',
    initialState,
    reducers: {
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        setDraftData: (state, action: PayloadAction<Partial<DraftState>>) => {
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
            .addCase(addProcessToCalculation.fulfilled, (state, action) => {
                state.loading = false;
                const newItem = action.payload;


                if(newItem.calculation && !state.id) {
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
            .addCase(updateReagentCalculation.fulfilled, (state, action) => {
                state.target_mass = action.payload.target_mass;
                state.safety_factor = action.payload.safety_factor || '';
                state.calculation_date = action.payload.calculation_date;
                state.error = null;
            })
            .addCase(deleteProcessFromCalculation.fulfilled, (state, action) => {
                state.processes = state.processes.filter(p => p.process !== action.payload);
                state.count = state.processes.length;
            })
            .addCase(formReagentCalculation.fulfilled, (state) => {
                return initialState
            })
            .addCase(logoutUserAsync.fulfilled, () => {
                return initialState;
            })
            .addCase(deleteEntireDraft.fulfilled, (state) => {
                return initialState;
            })
            .addCase(updateProcessQuantityAsync.fulfilled, (state, action) => {
                const process = state.processes.find(p => p.process === action.payload.processId);
                if (process) {
                    process.quantity = action.payload.quantity;
                    process.calculation_result = action.payload.calculation_result;
                }
            });


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
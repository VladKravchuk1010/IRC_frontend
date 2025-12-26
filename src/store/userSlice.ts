import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { api } from '../api';
import type { UserLogin, UserProfile, UserRegistration } from '../api/Api';

interface ExtendedUserProfile extends UserProfile {
    is_staff?: boolean;
}

interface UserState extends ExtendedUserProfile {
    isAuthenticated: boolean;
    error?: string | null;
    loading: boolean;
}

const initialState: UserState = {
    id: undefined,
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    isAuthenticated: false,
    error: null,
    loading: false,
};

interface LoginResponse {
    username: string;
    session_key: string;
    message?: string;
    user_id?: number;
    is_staff?: boolean;
    is_superuser?: boolean;
}


export const fetchUserOnStartup = createAsyncThunk<UserProfile, void>(
    'user/fetchUserOnStartup',
    async (_, { rejectWithValue }) => {
        const sessionKey = localStorage.getItem('session_key');
        if (!sessionKey) return rejectWithValue('Нет ключа сессии');

        try {
            const response = await api.user.userProfileList();
            return response.data;
        } catch (error) {
            localStorage.removeItem('session_key');
            return rejectWithValue('Ключ сессии недействителен.');
        }
    }
);

export const registerUserAsync = createAsyncThunk<{ message?: string; user_id?: number }, UserRegistration>(
    'user/registerUserAsync',
    async (registrationData, { rejectWithValue }) => {
        try {
            const response = await api.user.userRegisterCreate(registrationData);
            return response.data;
        } catch (error) {
            return rejectWithValue('Ошибка регистрации. Проверьте данные.');
        }
    }
);

export const loginUserAsync = createAsyncThunk<
    LoginResponse,
    UserLogin,
    { rejectValue: string }
>(
    'user/loginUserAsync',
    async (credentials, { rejectWithValue, dispatch }) => {
        try {
            const response = await api.user.userLoginCreate(credentials);

            const { session_key, username } = response.data;

            if (!session_key) {
                return rejectWithValue('Сервер не вернул ключ сессии.');
            }

            localStorage.setItem('session_key', session_key);

            dispatch(fetchUserOnStartup());

            return {
                ...response.data,
                session_key,
                username
            };
        } catch (error: any) {
            const message = error.response?.data?.detail || 'Ошибка авторизации.';
            return rejectWithValue(message);
        }
    }
);

export const logoutUserAsync = createAsyncThunk('user/logoutUserAsync', async () => {
    try {
        await api.user.userLogoutCreate({});
    } finally {
        localStorage.removeItem('session_key');
    }
});

export const updateUserProfile = createAsyncThunk(
    'user/updateUserProfile',
    async (profileData: UserProfile, { rejectWithValue }) => {
        try {
            const response = await api.user.userProfileUpdate(profileData);
            return response.data;
        } catch (error) {
            return rejectWithValue('Ошибка при обновлении профиля');
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearError: (state) => { state.error = null; }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserOnStartup.fulfilled, (state, action: PayloadAction<UserProfile>) => {
                state.isAuthenticated = true;
                Object.assign(state, action.payload);
            })
            .addCase(fetchUserOnStartup.rejected, (state) => {
                state.isAuthenticated = false;
                state.username = '';
            })

            .addCase(loginUserAsync.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.username = action.payload.username;
                state.is_staff = action.payload.is_staff;
                state.error = null;
            })
            .addCase(loginUserAsync.rejected, (state, action) => {
                state.error = action.payload as string;
            })

            .addCase(updateUserProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateUserProfile.fulfilled, (state, action: PayloadAction<UserProfile>) => {
                state.loading = false;
                Object.assign(state, action.payload);
                state.error = null;
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(logoutUserAsync.fulfilled, () => initialState);
    },
});

export const { clearError } = userSlice.actions;
export default userSlice.reducer;
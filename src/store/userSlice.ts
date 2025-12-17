import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { api } from '../api';
import type { RootState } from './store';
import type { UserLogin, UserProfile, UserRegistration } from '../api/Api';

interface UserState {
    username: string;
    isAuthenticated: boolean;
    error?: string | null;
    sessionKey: string | null;
}

const initialState: UserState = {
    username: '',
    isAuthenticated: false,
    error: null,
    sessionKey: null,
};

export const fetchUserOnStartup = createAsyncThunk<
    UserProfile,
    void
>(
    'user/fetchUserOnStartup',
    async (_, { rejectWithValue }) => {
        const sessionKey = localStorage.getItem('session_key');
        if (!sessionKey) {
            return rejectWithValue('Нет ключа сессии');
        }

        try {
            const response = await api.user.userProfileList();
            return response.data;
        } catch (error) {
            localStorage.removeItem('session_key');
            return rejectWithValue('Ключ сессии недействителен.');
        }
    }
);

export const registerUserAsync = createAsyncThunk<
    { message?: string; user_id?: number },
    UserRegistration,
    { rejectValue: string }
>(
    'user/registerUserAsync',
    async (registrationData: UserRegistration, { rejectWithValue }) => {
        try {
            const response = await api.user.userRegisterCreate(registrationData);
            return response.data;
        } catch (error) {
            let errorMessage = 'Ошибка регистрации. Проверьте введенные данные.';
            return rejectWithValue(errorMessage);
        }
    }
);

export const loginUserAsync = createAsyncThunk<
    { username: string; session_key: string },
    UserLogin,
    { rejectValue: string }
>(
    'user/loginUserAsync',
    async (credentials: UserLogin, { rejectWithValue }) => {
        try {
            const response = await api.user.userLoginCreate(credentials);

            const { session_key, username } = response.data;

            if (!session_key) {
                return rejectWithValue('Сервер не вернул ключ сессии.');
            }

            localStorage.setItem('session_key', session_key);

            return { username, session_key };
        } catch (error) {
            let errorMessage = 'Ошибка авторизации. Проверьте введенные данные.';
            return rejectWithValue(errorMessage);
        }
    }
);

export const logoutUserAsync = createAsyncThunk<
    void,
    void,
    { rejectValue: string; state: RootState }
>(
    'user/logoutUserAsync',
    async (_, { rejectWithValue }) => {
        try {
            await api.user.userLogoutCreate({});
            return;
        } catch (error) {
            return rejectWithValue('Ошибка при выходе из системы.');
        }
    }
);

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
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUserAsync.pending, (state) => {
                state.error = null;
            })
            .addCase(loginUserAsync.fulfilled, (state, action: PayloadAction<{ username: string }>) => {
                const { username } = action.payload;
                state.username = username;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(loginUserAsync.rejected, (state, action) => {
                state.error = action.payload as string;
                state.isAuthenticated = false;
                state.username = '';
            })

            .addCase(logoutUserAsync.fulfilled, (state) => {
                state.username = '';
                state.isAuthenticated = false;
                state.error = null;
            })
            .addCase(logoutUserAsync.rejected, (state, action) => {
                state.username = '';
                state.isAuthenticated = false;
                state.error = action.payload as string;
            })
            .addCase(registerUserAsync.pending, (state) => {
                state.error = null;
            })
            .addCase(registerUserAsync.fulfilled, (state, action) => {
                state.error = 'Регистрация прошла успешно! Теперь войдите в систему.';
            })
            .addCase(registerUserAsync.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            .addCase(fetchUserOnStartup.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.username = action.payload.username as string;
            })
            .addCase(fetchUserOnStartup.rejected, (state) => {
                state.isAuthenticated = false;
            });
    },
});

export const { clearError } = userSlice.actions;
export default userSlice.reducer;
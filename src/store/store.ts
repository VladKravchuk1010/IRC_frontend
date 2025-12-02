import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './filterSlice';

export const store = configureStore({
    reducer: {
        // Добавляем наш слайс
        filter: filterReducer,
        // Здесь будут добавляться другие слайсы (например, auth, cart и т.д.)
    },
});

// Типы для useSelector и useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

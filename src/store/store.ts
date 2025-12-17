import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './filterSlice';
import userReducer from './userSlice';
import draftReducer from './draftSlice'
import cartReducer from './cartSlice'
import listReducer from './listSlice'

export const store = configureStore({
    reducer: {
        filter: filterReducer,
        user: userReducer,
        draft: draftReducer,
        cart: cartReducer,
        list: listReducer
    },
});

// Типы для useSelector и useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from '@reduxjs/toolkit';
import authorizedReducer from './authorizedSlice';
import tokenReducer from './tokenSlice';
import filesReducer from './filesSlice';

const store = configureStore({
    reducer: {
        isAuth: authorizedReducer,
        token: tokenReducer,
        files: filesReducer
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
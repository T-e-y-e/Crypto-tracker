import { configureStore } from '@reduxjs/toolkit'
import currencyReducer from '../features/currencySlice'

export const store = configureStore({
    reducer: {
        coin: currencyReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { apiSlice } from './api/apislice'
import { authSlice } from '../featcher/auth/authSlice'

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (defaultMiddelware) =>
        defaultMiddelware().concat(apiSlice.middleware)
})


setupListeners(store.dispatch)
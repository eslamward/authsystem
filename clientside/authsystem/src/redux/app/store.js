
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { apiSlice } from './api/apislice'

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (defaultMiddelware) =>
        defaultMiddelware().concat(apiSlice.middleware)
})


setupListeners(store.dispatch)
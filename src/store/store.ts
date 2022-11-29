import {configureStore} from '@reduxjs/toolkit'
import {api} from '../api/api'
import shopSlice from './shopSlice'
import {localStorageMiddleware} from '../middleware/localStorageMiddleware'

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        shop: shopSlice
    },
    middleware: getDefaultMiddleware => [
        ...getDefaultMiddleware(),
        api.middleware,
        localStorageMiddleware
    ]
})
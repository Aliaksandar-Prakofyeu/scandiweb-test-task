import {configureStore} from '@reduxjs/toolkit'
import {api} from '../api/api'
import shop from './shop'
import {localStorageMiddleware} from '../middleware/localStorageMiddleware'

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        shop: shop
    },
    middleware: getDefaultMiddleware => [
        ...getDefaultMiddleware(),
        api.middleware,
        localStorageMiddleware
    ]
})
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query'
import {GET_NAV_DATA, GET_PROD, GET_SINGLE_CAT} from './queries'
import {Category, NavData, NavDataResponse, Product, ProductResponse, SingleCategoryResponse} from '../types/types'


const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:4000',
    prepareHeaders: headers => {
        headers.set('Content-Type', 'application/json')
        return headers
    }
})


export const api = createApi({
    reducerPath: 'api',
    baseQuery,
    endpoints: builder => ({
        getNavData: builder.query<NavData, void>({
            query: () => ({
                url: '',
                method: 'POST',
                body: {query: GET_NAV_DATA}
            }),
            transformResponse: (response: NavDataResponse) => response.data
        }),
        getSingleCat: builder.query<Category, string | undefined>({
            query: catName => ({
                url: '',
                method: 'POST',
                body: {query: GET_SINGLE_CAT(catName)}
            }),
            transformResponse: (response: SingleCategoryResponse) => {
                const sortedProducts = response.data.category.products.sort(
                    (x, y) => x.name > y.name ? 1 : -1
                )
                return {...response.data.category, products: sortedProducts}
            }
        }),
        getProduct: builder.query<Product, string>({
            query: id => ({
                url: '',
                method: 'POST',
                body: {query: GET_PROD(id)}
            }),
            transformResponse: (response: ProductResponse) => response.data.product
        })
    })
})

export const {getNavData, getSingleCat, getProduct} = api.endpoints
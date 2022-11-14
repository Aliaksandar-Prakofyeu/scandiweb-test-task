import {Middleware} from '@reduxjs/toolkit'
import {Cart, RootState} from '../types/types'
import {CART_KEY, CURRENCY_KEY} from '../api/const'

export const localStorageMiddleware: Middleware = store => next => (action: { type: string }) => {
    const result = next(action)
    const state = store.getState() as RootState
    if (action.type?.toLocaleLowerCase().includes('cart')){
        const cProducts: Cart[] = state.shop.cart.products
        localStorage.setItem(CART_KEY, JSON.stringify(cProducts))
    } if (action.type === 'shop/setCurrency') {
        const {currency} = state.shop
        localStorage.setItem(CURRENCY_KEY, JSON.stringify(currency))
    }
    return result
}
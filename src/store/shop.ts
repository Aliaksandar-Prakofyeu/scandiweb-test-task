import {AddToCartPayload, Currency, ShopState, UpdateCartPayload} from '../types/types'
import {CART_KEY, CURRENCY_KEY} from '../api/const'
import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {getSpecificProductInCart} from '../components/Cart/cartUtils/getSpecificProductInCart'

const initialState: ShopState = {
    category: '',
    currency: JSON.parse(localStorage.getItem(CURRENCY_KEY) || 'null'),
    cart: {
        products: JSON.parse(localStorage.getItem(CART_KEY) || '[ ]'),
        isShow: false
    },
    countOnPage: 6
}

const shop = createSlice({
    name: 'shop',
    initialState,
    reducers: {
        setCategory: (state, action: PayloadAction<string>) => {
            state.category = action.payload
        },
        setCurrency: (state, action: PayloadAction<Currency>) => {
            state.currency = action.payload
        },
        addToCart: (state, action: PayloadAction<AddToCartPayload>) => {
            const {options, id, prices} = action.payload
            const specificProduct = getSpecificProductInCart(state.cart.products, id, options)
            if (specificProduct) {
                specificProduct.quantity += 1
            } else {
                state.cart.products.unshift({options, id, prices, quantity: 1})
            }
        },
        setIsShow: (state, action: PayloadAction<boolean>) => {
            state.cart.isShow = action.payload
        },
        updateCart: (state, action: PayloadAction<UpdateCartPayload>) => {
            const {newQuantity, options, id} = action.payload
            const specificProduct = getSpecificProductInCart(state.cart.products, id, options)
            if (!specificProduct) return
            if (newQuantity < 1) {
                const deleteInd = state.cart.products.indexOf(specificProduct)
                state.cart.products.splice(deleteInd, 1)
            } else {
                specificProduct.quantity = newQuantity
            }
        }
    }
})

export const {setCategory, setCurrency, addToCart, setIsShow, updateCart} = shop.actions
export default shop.reducer
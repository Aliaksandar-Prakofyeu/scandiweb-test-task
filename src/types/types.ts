import {store} from '../store/store'

export interface NavData {
    categories: Category[]
    currencies: Currency[]
}

export interface NavDataResponse {
    data: NavData
}

export interface ProductResponse {
    data: {
        product: Product
    }
}

export interface SingleCategoryResponse {
    data: {
        category: Category
    }
}

export interface Currency {
    label: string
    symbol: string
}

export interface Category{
    name: string
    products: Product[]
}

export interface Product {
    id: string
    name: string
    inStock: boolean
    gallery: string[]
    description: string
    category: string
    attributes: AttributeSet[]
    prices: Price[]
    brand: string
}

export interface AttributeSet {
    id: string
    name: string
    type: string
    items: Attribute[]
}

export interface Attribute {
    displayValue: string
    value: string
    id: string
}

export interface Price {
    amount: number
    currency: Currency
}

export type Cart = {
    id: Product["id"]
    options: Record<string, string>
    prices: Price[]
    quantity: number
}

export type ShopState = {
    category: string
    currency: Currency | null
    cart: {
        products: Cart[]
        isShow: boolean
    }
    countOnPage: number
}

export type AddToCartPayload = Omit<Cart, 'quantity'>

export type UpdateCartPayload = { newQuantity: number} & Omit<Cart, 'quantity' | 'prices'>

export type Store = typeof StorageManager

export type RootState = ReturnType<typeof store.getState>







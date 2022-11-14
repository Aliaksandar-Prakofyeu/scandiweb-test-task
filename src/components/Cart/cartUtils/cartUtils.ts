import {Cart, Currency, Product} from '../../../types/types'


export const getSpecificProductInCart = (cart: Cart[], id: Product['id'], options: Cart['options']): Cart | undefined => {
    return cart.find(i => i.id === id && Object.entries(i.options).every(
        ([attributeId, optionId]) => options[attributeId] === optionId))
}

export const calculateQuantitiyCart = (cartProducts: Cart[]): number => {
    return cartProducts.reduce((account, current) => account + current.quantity, 0)
}

export const calculateTotalCost = (cart: Cart[],
                                   currentCurrencyLabel: Currency['label'] | undefined): number | string => {
    return cart.reduce((account, current) => {
        const cost = current.prices.find(i => i.currency.label === currentCurrencyLabel)
        if (cost) {
            return account + cost.amount * current.quantity
        }
        return account
    }, 0).toFixed(2)
}



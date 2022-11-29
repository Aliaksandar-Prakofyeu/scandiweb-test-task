import {Cart, Currency} from '../../../types/types'

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
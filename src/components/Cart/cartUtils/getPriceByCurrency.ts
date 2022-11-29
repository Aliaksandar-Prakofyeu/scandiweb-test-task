import {Price} from '../../../types/types'


export const getPriceByCurrency = (prices: Price[], selectedCurrencySign: string | undefined): Price | undefined => {
    return prices.find(i => i.currency.label === selectedCurrencySign)
}

export class calculateTotalCost {
}
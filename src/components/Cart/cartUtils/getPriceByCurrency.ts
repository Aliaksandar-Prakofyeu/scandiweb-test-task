import {Price} from '../../../types/types'


export const getPriceByCurrency = (prices: Price[], selectedCurrencySign: string | undefined): Price => {
    // @ts-ignore
    return prices.find(i => i.currency.label === selectedCurrencySign)
}


import {Cart, Product} from '../../../types/types'

export const getSpecificProductInCart = (cart: Cart[], id: Product['id'], options: Cart['options']): Cart | undefined => {
    return cart.find(i => i.id === id && Object.entries(i.options).every(
        ([attributeId, optionId]) => options[attributeId] === optionId))
}
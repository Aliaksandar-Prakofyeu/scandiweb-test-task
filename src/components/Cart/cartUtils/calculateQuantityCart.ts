import {Cart} from '../../../types/types'

export const calculateQuantityCart = (cartProducts: Cart[]): number => {
    return cartProducts.reduce((acc, cur) => acc + cur.quantity, 0)
}
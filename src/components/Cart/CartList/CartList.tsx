import {Component, ReactNode} from 'react'
import {Cart} from '../../../types/types'
import styled from 'styled-components'
import CartItem from './CartItem/CartItem'
import {nanoid} from '@reduxjs/toolkit'

const StyledCartList = styled.div`

`

type Props = { cartProds: Cart[] }

class CartList extends Component<Props> {
    render(): ReactNode {
        const {cartProds} = this.props
        return (
            <StyledCartList>
                {cartProds.map(({options, id, quantity}) => (
                    <CartItem options={options} id={id} quantity={quantity} key={nanoid(4)}/>
                ))}
            </StyledCartList>
        )
    }
}

export default CartList
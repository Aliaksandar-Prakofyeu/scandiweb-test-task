import {Component, ReactNode} from 'react'
import {RootState} from '../../../../../types/types'
import {connect, ConnectedProps} from 'react-redux'
import styled from 'styled-components'
import CartList from '../../../../Cart/CartList/CartList'
import {calculateQuantityCart} from '../../../../Cart/cartUtils/calculateQuantityCart'
import {calculateTotalCost} from '../../../../Cart/cartUtils/calculateTotalCost'

const StyledContent = styled.div`
  .title {
    margin-bottom: 32px;
    line-height: 1.6;
  }

  .total-price {
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    margin-bottom: 32px;

    .total-price__title {
      font-weight: 500;
      font-family: ${props => props.theme.fonts.roboto};
    }

    .total-price__amount {
      font-weight: 700;
      font-family: ${props => props.theme.fonts.raleway};
    }
  }
`

type Props = ConnectedProps<typeof connector>

class CartMenuContent extends Component<Props> {
    render(): ReactNode {
        const {cartItems, selectedCurr} = this.props

        const totalPrice = calculateTotalCost(cartItems, selectedCurr?.label)
        const cartItemsCount = calculateQuantityCart(cartItems)
        return (
            <StyledContent>
                <div className="title">
                    <strong>My Bag</strong>, {cartItemsCount} item(s)
                </div>
                <CartList cartProds={cartItems}/>
                <div>
                    <div className="total-price">
                        <span className="total-price__title">Total</span>
                        <span className="total-price__amount">{selectedCurr?.symbol}{totalPrice}</span>
                    </div>
                </div>
            </StyledContent>
        )
    }
}

const mapState = (state: RootState) => ({
    cartItems: state.shop.cart.products,
    selectedCurr: state.shop.currency
})

const connector = connect(mapState)

export default connector(CartMenuContent)
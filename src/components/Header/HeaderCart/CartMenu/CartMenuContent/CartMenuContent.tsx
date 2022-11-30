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

  .total__price {
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    margin-bottom: 32px;

    .total__price_title {
      font-weight: 500;
      font-family: ${props => props.theme.fonts.roboto};
    }

    .total__price_amount {
      font-weight: 700;
      font-family: ${props => props.theme.fonts.raleway};
    }
  }

  .cart__list {
    max-height: 420px;
    overflow-y: auto;
    margin-bottom: 40px;

    .cart__item {
      padding: 0;
      gap: 8px;
      overflow: hidden;
      border: none;

      &:not(:last-child) {
        margin-bottom: 40px;
      }

      .cart__item_info {
        .item__title {
          display: inline;
          margin-bottom: 5px;
          font-size: 16px;
          line-height: 1.6;

          .item__brand {
            font-weight: 300;
          }

          .item__name {
            font-weight: 300;
          }
        }

        .item__price {
          margin-bottom: 8px;
          font-size: 16px;
          font-weight: 500;
          line-height: 1.6;
        }
      }

      .attr__name {
        font-family: inherit;
        font-size: 14px;
        font-weight: 400;
        text-transform: none;
      }

      .attr__val {
        .attr__btn {
          cursor: default;

          &.text {
            padding: 0 2px;
            height: 24px;
            margin-right: 8px;
            min-width: 24px;
            max-width: min-content;
            font-size: 14px;
            font-weight: 400;
          }

          &.color {
            width: 20px;
            height: 20px;
            margin-right: 5px;
          }
        }
      }

      .item__quantity {
        .button {
          width: 24px;
          height: 24px;

          img {
            width: 10px;
            height: 10px;
          }
        }

        .quantity {
          font-size: 16px;
        }
      }

      .item__image {
        flex-basis: 121px;
      }
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
                    <div className="total__price">
                        <span className="total__price_title">Total</span>
                        <span className="total__price_amount">{selectedCurr?.symbol}{totalPrice}</span>
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
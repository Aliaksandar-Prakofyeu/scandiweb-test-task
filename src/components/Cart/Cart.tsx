import {Component, ReactNode} from 'react'
import {withRouter, WithRouterProps} from '../tools/hoc/withRouter'
import {connect, ConnectedProps} from 'react-redux'
import {RootState} from '../../types/types'
import styled from 'styled-components'
import {calculateTotalCost} from './cartUtils/calculateTotalCost'
import {TAX} from '../../api/const'
import CartList from './CartList/CartList'
import Button from '../tools/ui/Button'
import {calculateQuantityCart} from './cartUtils/calculateQuantityCart'

const StyledCart = styled.div`
  padding: 80px 0;

  .cart__empty {
    font-weight: 700;
    font-size: 32px;
  }

  .cart__title {
    margin-bottom: 55px;
    font-size: 32px;
    font-weight: 700;
    line-height: 1.25;
    text-transform: uppercase;
  }

  .total {
    margin-bottom: 12px;

    tr {
      font-size: 24px;
      line-height: 1.116;
    }

    td {
      padding: 4px 0;

      &:last-child {
        padding-left: 3px;
        font-weight: 700;
      }
    }
  }
`

type Props = WithRouterProps & ConnectedProps<typeof connector>

class Cart extends Component<Props> {


    render(): ReactNode {
        const {cartProds, selectedCurr} = this.props
        const totalCost = calculateTotalCost(cartProds, selectedCurr?.label)
        const taxCost = ((Number(totalCost) * TAX) / 100).toFixed(2)
        const cartProdsCount = calculateQuantityCart(cartProds)
        if (cartProds.length === 0) {
            return (
                <StyledCart>
                    <div className="cart__empty">Cart is Empty</div>
                </StyledCart>
            )
        }
        return (
            <StyledCart>
                <h1 className="cart__title">Cart</h1>
                <CartList cartProds={cartProds}/>
                <table className="total">
                    <tbody>
                    <tr>
                        <td>Tax {TAX}%</td>
                        <td>
                            {selectedCurr?.symbol}
                            {taxCost}
                        </td>
                    </tr>
                    <tr>
                        <td>Quantity:</td>
                        <td>{cartProdsCount}</td>
                    </tr>
                    <tr>
                        <td>Total:</td>
                        <td>
                            {selectedCurr?.symbol}
                            {totalCost}
                        </td>
                    </tr>
                    </tbody>
                </table>
                <Button child="Order"
                        variant="contained"
                        width="279px"
                        height="43px"
                        disabled={cartProds.length === 0}/>
            </StyledCart>
        )

    }
}

const mapState = (state: RootState) => ({
    cartProds: state.shop.cart.products,
    selectedCurr: state.shop.currency
})


const connector = connect(mapState)

export default connector(withRouter(Cart))
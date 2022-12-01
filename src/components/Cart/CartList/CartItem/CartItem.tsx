import {Component, ReactNode} from 'react'
import {Cart, RootState} from '../../../../types/types'
import {connect, ConnectedProps} from 'react-redux'
import {getProduct} from '../../../../api/api'
import {updateCart} from '../../../../store/shop'
import styled from 'styled-components'
import CartItemInfo from './CartItemInfo'
import CartItemQuantity from './CartItemQuantity'
import CartItemImage from './CartItemImage'

const StyledCartItem = styled.div`
  display: flex;
  gap: 24px;
  padding: 24px 0;
  border-top: 1px solid #e5e5e5;

  &:last-child {
    border-bottom: 1px solid #e5e5e5;
  }
`

type CartItemProps = {
    id: Cart['id']
    options: Cart['options']
    quantity: Cart['quantity']
}

type Props = CartItemProps & ConnectedProps<typeof connector>

class CartItem extends Component<Props> {
    async componentDidMount(): Promise<void> {
        const {id, fetchProduct, productResponse} = this.props
        if (!productResponse.data) {
            await fetchProduct(id)
        }
    }

    handleUpdateCart = (newQuantity: number): void => {
        const {dispatchUpdateCart, options, id} = this.props
        dispatchUpdateCart({newQuantity, options, id})
    }

    render(): ReactNode {
        const {quantity, productResponse, selectedCurr, options} = this.props
        const {data} = productResponse
        return (
            <StyledCartItem className="cart__item">
                {data && (
                    <>
                        <CartItemInfo productData={data} options={options} selectedCurr={selectedCurr}/>
                        <CartItemQuantity updateCart={this.handleUpdateCart} quantity={quantity}/>
                        <CartItemImage gallery={data.gallery} productName={data.name}/>
                    </>
                )}
            </StyledCartItem>
        )

    }
}

const mapState = (state: RootState, {id}: CartItemProps) => ({
    productResponse: getProduct.select(id)(state),
    selectedCurr: state.shop.currency
})

const mapDispatch = {
    fetchProduct: getProduct.initiate,
    dispatchUpdateCart: updateCart
}

const connector = connect(mapState, mapDispatch)

export default connector(CartItem)


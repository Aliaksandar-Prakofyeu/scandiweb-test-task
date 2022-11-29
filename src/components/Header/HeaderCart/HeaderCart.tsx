import {Component, ReactNode} from 'react'
import {connect, ConnectedProps} from 'react-redux'
import {RootState} from '../../../types/types'
import {setIsShow} from '../../../store/shopSlice'
import styled from 'styled-components'
import HeaderCartButton from './HeaderCartButton'
import CartMenu from './CartMenu/CartMenu'
import {calculateQuantityCart} from '../../Cart/cartUtils/calculateQuantityCart'

const StyledHeaderCart = styled.div`
  position: relative;
`

type Props = ConnectedProps<typeof connector>

class HeaderCart extends Component<Props> {
    render(): ReactNode {
        const {isOpenCart, cartItemsCount, setIsShow} = this.props
        const toggleShow = (): void => {
            if (isOpenCart) {
                setIsShow(false)
            } else {
                setIsShow(true)
            }
        }
        return (
            <StyledHeaderCart>
                <HeaderCartButton cartItemsCount={cartItemsCount} toggleShow={toggleShow}/>
                {isOpenCart &&
                    (<CartMenu handleClose={() => setIsShow(false)} cartItemsCount={cartItemsCount}/>
                    )}
            </StyledHeaderCart>
        )
    }
}

const mapState = (state: RootState) => ({
    isOpenCart: state.shop.cart.isShow,
    cartItemsCount: calculateQuantityCart(state.shop.cart.products)
})

const mapDispatch = {
    setIsShow: setIsShow
}

const connector = connect(mapState, mapDispatch)

export default connector(HeaderCart)
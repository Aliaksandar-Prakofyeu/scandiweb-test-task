import {Component, ReactNode} from 'react'
import {connect, ConnectedProps} from 'react-redux'
import {RootState} from '../../types/types'
import {getProduct} from '../../api/api'
import {setCategory, setIsShow} from '../../store/shopSlice'
import styled from 'styled-components'
import ProductImage from './ProductImage'
import ProductInfo from './ProductInfo'

const StyledProductPage = styled.div`
  display: flex;
  padding: 80px 0;
`

type OwnProps = { id: string }

type Props = OwnProps & ConnectedProps<typeof connector>

class ProductPage extends Component<Props> {
    async componentDidMount(): Promise<void> {
        const {id, selectedCat, isShowCart, fetchProduct, setIsShowCart, setSelectedCat} = this.props
        if (isShowCart) {
            setIsShowCart(false)
        }
        const response = await fetchProduct(id)
        if (response.data && response.data.category !== selectedCat) {
            setSelectedCat(response.data.category)
        }
    }

    componentDidUpdate(prevProps: Props): void {
        const {id, isShowCart, setIsShowCart} = this.props
        if (prevProps.id === id) return
        if (isShowCart) {
            setIsShowCart(false)
        }
    }

    render(): ReactNode {
        const {prodResponse} = this.props
        const {data} = prodResponse
        return (
            <>
                {data && (
                    <StyledProductPage>
                        <ProductImage gallery={data.gallery} productName={data.name}/>
                        <ProductInfo product={data}/>
                    </StyledProductPage>
                )}
            </>
        )
    }
}

const mapState = (state: RootState, {id}: OwnProps) => ({
    prodResponse: getProduct.select(id)(state),
    selectedCat: state.shop.category,
    isShowCart: state.shop.cart.isShow
})

const mapDispatch = {
    setSelectedCat: setCategory,
    setIsShowCart: setIsShow,
    fetchProduct: getProduct.initiate
}

const connector = connect(mapState, mapDispatch)

export default connector(ProductPage)
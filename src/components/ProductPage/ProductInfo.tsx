import {Component, ReactNode} from 'react'
import styled from 'styled-components'
import {Product, RootState} from '../../types/types'
import {connect, ConnectedProps} from 'react-redux'
import {getPriceByCurrency} from '../Cart/cartUtils/getPriceByCurrency'
import Attribute from '../Cart/CartList/CartItem/Attribute'
import Button from '../tools/ui/Button'
import {parseHTML} from '../tools/utils/parseHTML'
import {addToCart} from '../../store/shopSlice'


const StyledProductInfo = styled.div`
  margin-left: 100px;

  .prod__brand {
    margin-bottom: 16px;
    font-size: 30px;
    font-weight: 600;
    line-height: 1;
  }

  .prod__name {
    margin-bottom: 43px;
    font-size: 30px;
    font-weight: 400;
    line-height: 1;
  }

  .prod__price {
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: 700;
  }

  .prod__description {
      max-width: 292px;
    margin-top: 40px;
    font-family: ${props => props.theme.fonts.roboto};
    font-size: 16px;
    line-height: 1.6;
    & > * {
      font-size: inherit;
    }
  }
`

type Props = { product: Product } & ConnectedProps<typeof connector>

type State = {
    selProd: {
        id: Product['id']
        prices: Product['prices']
        options: Record<string, string>
    }
}

class ProductInfo extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            selProd: {
                id: props.product.id,
                prices: props.product.prices,
                options: props.product.attributes.reduce((acc, curr) => ({
                        ...acc, [curr.id]: curr.items[0].id
                    }), {}
                )
            }
        }
    }

    handleSelOpt = (attrId: string, optionId: string): void => {
        this.setState(({selProd}) => ({
            selProd: {
                id: selProd.id,
                prices: selProd.prices,
                options: {...selProd.options, [attrId]: optionId}
            }
        }))
    }

    handleAddToCart = (): void => {
        const {addProdToCart} = this.props
        const {selProd} = this.state
        addProdToCart(selProd)
    }

    render(): ReactNode {
        const {product: {attributes, brand, description, inStock, name, prices}, selectedCurr} = this.props
        const {selProd} = this.state
        const price = getPriceByCurrency(prices, selectedCurr?.label)
        return (
            <StyledProductInfo>
                <h2 className="prod__brand">{brand}</h2>
                <h1 className="prod__name">{name}</h1>
                {attributes.map(a => (
                    <Attribute attrData={a}
                               selOptId={selProd.options[a.id]}
                               selOpt={this.handleSelOpt}
                               key={a.id}/>
                ))}
                <div className="attr__name">Price:</div>
                <div className="prod__price">
                    {price?.currency.symbol}
                    {price?.amount}
                </div>
                <Button child="Add to Cart"
                        variant="contained"
                        disabled={!inStock}
                        onClick={this.handleAddToCart}
                        width="292px"
                        height="52px"/>
                <div className="prod__description">{parseHTML(description)}</div>
            </StyledProductInfo>
        )
    }
}

const mapState = (state: RootState) => ({
    selectedCurr: state.shop.currency
})

const mapDispatch = {
    addProdToCart: addToCart
}

const connector = connect(mapState, mapDispatch)

export default connector(ProductInfo)
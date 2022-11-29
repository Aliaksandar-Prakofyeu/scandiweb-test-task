import {Component, ReactNode} from 'react'
import {Cart, Currency, Product} from '../../../../types/types'
import {getPriceByCurrency} from '../../cartUtils/getPriceByCurrency'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import Attribute from './Attribute'

const StyledCartItemInfo = styled.div`
  flex: 1 1;
  .item__title{
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 10px;
    line-height: 1.4;
    font-size: 30px;
    .item__brand{
      font-weight: 600;
    }
    .item__name{
      font-weight: 400;
    }
  }
  .price{
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: 700;
    line-height: 1;
  }
`

type Props = {
    productData: Product
    options: Cart['options']
    selectedCurr: Currency | null
}

class CartItemInfo extends Component<Props> {
    render(): ReactNode {
        const {productData, options, selectedCurr} = this.props
        const price = getPriceByCurrency(productData.prices, selectedCurr?.label)?.amount


        return (
            <StyledCartItemInfo>
                <Link to={`/product/${productData.id}`} className="item__title">
                    <span className="item__brand">{productData.brand}</span>{' '}
                    <span className="item__name">{productData.name}</span>
                </Link>
                <div className="price">
                    {selectedCurr?.symbol}
                    {price}
                </div>
                <div className="item__attributes">
                    {productData.attributes.map(a => (
                        <Attribute key={a.id} attrData={a}
                                   selOptId={options[a.id]}/>
                    ))}
                </div>
            </StyledCartItemInfo>
        )
    }
}

export default CartItemInfo
import {Component, memo, ReactNode} from 'react'
import styled, {css} from 'styled-components'
import {Product, RootState} from '../../../types/types'
import {connect, ConnectedProps} from 'react-redux'
import {addToCart} from '../../../store/shop'
import {getPriceByCurrency} from '../../Cart/cartUtils/getPriceByCurrency'
import {Link} from 'react-router-dom'
import Button from '../../tools/ui/Button'
import CartIcon from '../../../assets/whiteCart.svg'

const StyledCategoryItem = styled.div<{ inStock: boolean }>`
  position: relative;
  padding: 16px;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 4px 35px rgba(168, 172, 176, 0.19);

    .cart__btn {
      opacity: 1;
      pointer-events: initial;
    }
  }

  &::after {
    ${props => (props.inStock ? '' : cover)}
  }

  .content {
    display: flex;
    flex-direction: column;
    height: 100%;

    .img {
      flex: 1;
      display: flex;
      position: relative;
      margin-bottom: 24px;

      img {
        object-fit: contain;
        width: 100%;
        max-width: 100%;
        height: auto;
        max-height: 330px;
      }

      .out__of {
        position: absolute;
        top: 50%;
        left: 50%;
        width: fit-content;
        color: #8d8f9a;
        font-size: 24px;
        text-align: center;
        text-transform: uppercase;
        transform: translate(-50%, -50%);
      }
    }
  }

  .cart__btn {
    position: absolute;
    padding: 14px 15px 14px 13px;
    bottom: 72px;
    right: 31px;
    border-radius: 50%;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
  }

  .name {
    font-weight: 300;
    line-height: 1.6;
  }

  .price {
    font-size: 18px;
    font-weight: 500;
    line-height: 1.6;
  }

`
const cover = css`
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.5);
  pointer-events: none;
`

type Props = { product: Product } & ConnectedProps<typeof connector>

class CategoryItem extends Component<Props> {
    render(): ReactNode {
        const {
            product: {id, inStock, name, prices, brand, gallery, attributes},
            selectedCurr, addToCart
        } = this.props
        const price = getPriceByCurrency(prices, selectedCurr?.label)

        const handleAddToCart = (): void => {
            const options = attributes.reduce((option, attribute) => ({
                ...option, [attribute.id]: attribute.items[0].id
            }), {})
            addToCart({options, prices, id: id})
        }
        return (
            <StyledCategoryItem inStock={inStock}>
                <Link to={`/product/${id}`} className="content">
                    <div className="img">
                        <img src={gallery[0]} width={354} height={330} alt={name + 1}/>
                        {!inStock && (<span className="out__of">Out of stock</span>)}
                    </div>
                    <div className="name">{brand} {name}</div>
                    <span className="price">
                            {price?.currency.symbol}
                        {(Math.round(price?.amount * 100) / 100).toFixed(2)}
                        </span>
                </Link>
                {inStock && (
                    <Button child={<img src={CartIcon} alt="cart icon"/>}
                            variant="contained"
                            className="cart__btn"
                            onClick={handleAddToCart}
                            width="52px"
                            height="52px"/>
                )}
            </StyledCategoryItem>
        )
    }
}

const mapState = (state: RootState) => ({selectedCurr: state.shop.currency})
const mapDispatch = {addToCart: addToCart}

const connector = connect(mapState, mapDispatch)

export default memo(connector(CategoryItem))
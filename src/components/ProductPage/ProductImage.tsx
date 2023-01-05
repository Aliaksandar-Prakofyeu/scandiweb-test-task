import {Component, ReactNode} from 'react'
import {Product} from '../../types/types'
import styled, {css} from 'styled-components'

const StyledProductImage = styled.div<{ inStock: boolean }>`
  display: flex;
  flex-direction: row-reverse;
  
  .main__img{
    &::after {
      ${props => (props.inStock ? '' : cover)}
    }
    display: flex;
    position: relative;
    max-width: 610px;
    max-height: 511px;
    
    img{
      object-fit: contain;
      width: 100%;
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
  .img__menu{
    display: flex;
    flex-direction: column;
    gap: 40px;
    max-height: 511px;
    direction: rtl;
    overflow-y: auto;
    overflow-x: hidden;
    &::-webkit-scrollbar{
      width: 0.5rem;
    }
    &::-webkit-scrollbar-thumb{
      background-color: ${props => props.theme.main.color};
    }
    .menu__img{
      display: flex;
      border: 1px solid transparent;
      cursor: pointer;
      &.active{
        border-color: ${props => props.theme.main.color};
      }
      img{
        object-fit: cover;
      }
    }
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

type Props = {
    gallery: Product['gallery']
    productName: Product['name']
    inStock: Product['inStock']
}

type State = { imgIndex: number }

class ProductImage extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {imgIndex: 0}
    }

    setShowImg = (imgIndex: number): void => {
        this.setState({imgIndex})
    }

    render(): ReactNode {
        const {gallery, productName, inStock} = this.props
        const {imgIndex} = this.state
        return (
            <StyledProductImage inStock={inStock}>
                <div className="main__img">
                    <img src={gallery[imgIndex]}
                         width={610}
                         height={511}
                         alt={productName}

                    />
                    {!inStock && (<span className="out__of">Out of stock</span>)}
                </div>
                <ul className="img__menu" role="menu">
                    {gallery.map((imgSrc, index) => (
                        <li className={`menu__img ${imgSrc === gallery[imgIndex] ?
                            'active' : ''}`}
                            role="menuitem"
                            key={imgSrc}
                            onClick={() => this.setShowImg(index)}>
                            <img src={imgSrc} width={79} height={80} alt={productName}/>
                        </li>
                    ))}
                </ul>
            </StyledProductImage>
        )
    }
}

export default ProductImage
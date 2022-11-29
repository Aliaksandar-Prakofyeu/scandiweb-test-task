import {Component, ReactNode} from 'react'
import {Product} from '../../types/types'
import styled from 'styled-components'

const StyledProductImage = styled.div`
  display: flex;
  flex-direction: row-reverse;
  .main__img{
    img{
      object-fit: contain;
      width: 100%;
    }
  }
  .img__menu{
    display: flex;
    flex-direction: column;
    gap: 40px;
    max-height: 511px;
    direction: rtl;
    overflow-y: auto;
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

type Props = {
    gallery: Product['gallery']
    productName: Product['name']
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
        const {gallery, productName} = this.props
        const {imgIndex} = this.state
        return (
            <StyledProductImage>
                <div className="main__img">
                    <img src={gallery[imgIndex]}
                         width={610}
                         height={511}
                         alt={productName}
                    />
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
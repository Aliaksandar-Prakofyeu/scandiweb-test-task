import {Component, ReactNode} from 'react'
import {Product} from '../../../../types/types'
import styled from 'styled-components'
import LeftArr from '../../../../assets/Larrow.svg'
import RightArr from '../../../../assets/Rarrow.svg'

const StyledCartItemImage = styled.div`
  display: flex;
  flex-basis: 200px;
  position: relative;

  img {
    width: 100%;
    height: auto;
    object-fit: contain;
  }
`
const StyledButtonGroup = styled.div`
  position: absolute;
  bottom: 16px;
  right: 8px;

  .arrow__btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
    width: 24px;
    height: 24px;
    background: rgba(0, 0, 0, 0.73);
    border: none;
    cursor: pointer;

    &:disabled {
      cursor: default;
      background: rgba(0, 0, 0, 0.3);
    }

    & > svg {
      width: 8px;
      height: 14px;
    }
  }
`

type State = {
    imgIndex: number
}

type Props = {
    gallery: Product['gallery']
    productName: string
}

class CartItemImage extends Component<Props, State> {
    constructor(p: Props) {
        super(p)
        this.state = {imgIndex: 0}
    }

    handleChangeImage = (newIndex: number): void => {
        const {gallery} = this.props
        if (newIndex >= gallery.length || newIndex < 0) return
        this.setState({imgIndex: newIndex})
    }

    render(): ReactNode {
        const {imgIndex} = this.state
        const {gallery, productName} = this.props
        return (
            <StyledCartItemImage>
                <img src={gallery[imgIndex]} alt={productName} width={200} height={288}/>
                {gallery.length > 1 && (
                    <StyledButtonGroup>
                        <button type="button"
                                className="arrow__btn"
                                onClick={() => this.handleChangeImage(imgIndex - 1)}
                                disabled={imgIndex === 0}>
                            <img src={LeftArr} alt={'left'}/>
                        </button>
                        <button type="button"
                                className="arrow__btn"
                                onClick={() => this.handleChangeImage(imgIndex - 1)}
                                disabled={imgIndex === 0}>
                            <img src={RightArr} alt={'right'}/>
                        </button>
                    </StyledButtonGroup>
                )}
            </StyledCartItemImage>
        )
    }
}

export default CartItemImage
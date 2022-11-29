import cartLogo from '../../../assets/VectorHeaderCartLogo.svg'
import {Component, ReactNode} from 'react'
import styled from 'styled-components'

const StyledHeaderCartButton = styled.button`
  background-color: transparent;
  border-radius: 50%;
  cursor: pointer;
  border: none;
  width: 40px;
  height: 40px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease-in;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  .items__count {
    position: absolute;
    top: 0;
    right: -3px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #1d1f22;
    color: #fff;
    font-size: 14px;
    font-family: ${props => props.theme.fonts.roboto};
    font-weight: 700;
    text-align: center;
    line-height: 1.44;
  }

  img {
    width: 20px;
    height: 20px;
  }
`

type Props = {
    cartItemsCount: number
    toggleShow: () => void
}

class HeaderCartButton extends Component<Props> {
    render(): ReactNode {
        const {cartItemsCount, toggleShow} = this.props
        return (
            <StyledHeaderCartButton onClick={toggleShow}>
                <img src={cartLogo} alt="cart logo"/>
                {cartItemsCount > 0 && (
                    <span className="items__count">{cartItemsCount}</span>
                )}
            </StyledHeaderCartButton>
        )
    }
}

export default HeaderCartButton




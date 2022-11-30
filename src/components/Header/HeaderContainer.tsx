import {Component, ReactNode} from 'react'
import styled from 'styled-components'
import Categories from './Categories/Categories'
import logo from '../../assets/logo.svg'
import Wrapper from '../Wrapper/Wrapper'
import CurrencySelect from './CurrencySelect/CurrencySelect'
import HeaderCart from './HeaderCart/HeaderCart'


const StyledHeaderContainer = styled.header`
  display: flex;
  place-items: center;
  position: sticky;
  top: 0;
  height: 80px;
  width: 100%;
  z-index: 15;
  background-color: #fff;

  .header__wrapper {
    display: flex;
    align-items: center;
    padding: 0 101px;
    justify-content: space-between;

    .header__active {
      display: flex;
      align-items: center;
      gap: 11px;
      height: 40px;
    }
  }
`

class HeaderContainer extends Component {
    render(): ReactNode {
        return (
            <StyledHeaderContainer>
                <Wrapper className="header__wrapper">
                    <Categories/>
                    <img src={logo} alt={'shop logo'}/>
                    <div className="header__active">
                        <CurrencySelect/>
                        <HeaderCart/>
                    </div>
                </Wrapper>
            </StyledHeaderContainer>
        )
    }
}

export default HeaderContainer
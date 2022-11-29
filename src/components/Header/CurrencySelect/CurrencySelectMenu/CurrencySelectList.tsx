import React, {Component, ReactNode, RefObject} from 'react'
import {connect, ConnectedProps} from 'react-redux'
import {Currency, RootState} from '../../../../types/types'
import styled from 'styled-components'
import {getNavData} from '../../../../api/api'
import {setCurrency} from '../../../../store/shopSlice'


const StyledCurrencySelect = styled.div`
  position: absolute;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.6;
  padding: 20px 0;
  background-color: ${props => props.theme.main.backgroundColor};
  top: 30px;
  left: -20px;
  width: 114px;
  box-shadow: 0 4px 35px rgb(168 172 176/ 19%);

  .currency__item {
    padding: 8px 20px;
    cursor: pointer;
    user-select: none;
    transition: background-color 0.3s ease;

    &.active {
      background-color: #EEEEEE;

      &:hover {
        background-color: #EEEEEE;
      }

      &:hover {
        background-color: #EEEEEE;
      }
    }
  }
`

type Props = {
    toggleDropClose: () => void
    dropOpenRef: RefObject<HTMLDivElement>
} & ConnectedProps<typeof connector>

class CurrencySelectList extends Component<Props> {
    componentDidMount(): void {
        document.addEventListener('click', this.handleClickOutside)
    }

    componentWillUnmount(): void {
        document.addEventListener('click', this.handleClickOutside)
    }


    handleClickOutside = (e: MouseEvent): void => {
        const {dropOpenRef, toggleDropClose} = this.props
        const isDropOpen = dropOpenRef.current
        const target = e.target as HTMLElement
        if (isDropOpen && !isDropOpen.contains(target) && isDropOpen.parentElement !== target) {
            toggleDropClose()
        }
    }

    handleCurrencySelect = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, newCurrency: Currency): void => {
        e.stopPropagation()
        const {dispatchCurrency, toggleDropClose} = this.props
        dispatchCurrency(newCurrency)
        toggleDropClose()
    }


    render(): ReactNode {
        const {selectedCurr, currencies} = this.props
        if (!currencies) return null
        return (
            <StyledCurrencySelect>
                {currencies.map(currency => (
                    <li
                        className={`currency__item 
                        ${currency.label === selectedCurr?.label ? 'active' : ''}`}
                        role="menuitem"
                        onClick={e => this.handleCurrencySelect(e, currency)}
                        key={currency.label}
                    >
                        {currency.symbol} {currency.label}
                    </li>))}
            </StyledCurrencySelect>
        )
    }
}

const mapState = (state: RootState) => ({
    selectedCurr: state.shop.currency,
    currencies: getNavData.select()(state).data?.currencies
})

const mapDispatch = {
    dispatchCurrency: setCurrency
}

const connector = connect(mapState, mapDispatch)

export default connector(CurrencySelectList)


import {Component, createRef, ReactNode, RefObject} from 'react'
import styled from 'styled-components'
import downArrow from './../../../assets/VectorDownArrow.svg'
import {RootState} from '../../../types/types'
import {connect, ConnectedProps} from 'react-redux'
import CurrencySelectList from './CurrencySelectMenu/CurrencySelectList'

const StyledCurrency = styled.div`
  position: relative;

  button {
    display: flex;
    align-items: center;
    gap: 10px;
    border: none;
    background: transparent;
    cursor: pointer;
    .sign {
      font-size: 18px;
      font-weight: 500;
    }
    .arrow{
      display: flex;
      width: 8px;
      height: 4px;
    }
  }
`
type Props = ConnectedProps<typeof connector>
type State = { isDropOpen: boolean }

class CurrencySelect extends Component<Props, State> {
    dropOpenRef: RefObject<HTMLDivElement>

    constructor(props: Props) {
        super(props)
        this.state = {isDropOpen: false}
        this.dropOpenRef = createRef<HTMLDivElement>()
    }

    toggleDropOpen = (): void => {
        this.setState(state => ({isDropOpen: !state.isDropOpen}))
    }

    toggleDropClose = (): void => {
        this.setState(({isDropOpen: false}))
    }

    render(): ReactNode {
        const {isDropOpen} = this.state
        const {selectedCurr} = this.props
        return (
            <StyledCurrency ref={this.dropOpenRef}>
                <button type="button" onClick={this.toggleDropOpen}>
                    <span className="sign" role="button">{selectedCurr?.symbol}</span>
                    <img src={downArrow} className="arrow" alt="arrow" style={{
                        transform: isDropOpen ? "rotateZ(180deg)" : "rotateZ(0deg)",}}/>
                </button>
                {isDropOpen && (
                    <CurrencySelectList toggleDropClose={this.toggleDropClose} dropOpenRef={this.dropOpenRef}/>
                )}
            </StyledCurrency>
        )
    }
}

const mapState = (state: RootState) => ({
    selectedCurr: state.shop.currency
})

const connector = connect(mapState)

export default connector(CurrencySelect)
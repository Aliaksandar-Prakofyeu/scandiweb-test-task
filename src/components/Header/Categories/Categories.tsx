import {Component, ReactNode} from 'react'
import styled from 'styled-components'
import {connect, ConnectedProps} from 'react-redux'
import {RootState} from '../../../types/types'
import {getNavData} from '../../../api/api'
import {setCurrency} from '../../../store/shop'
import CategoryItem from './Category/CategoryItem'

const StyledCategories = styled.nav`
  align-self: flex-end;
  .list {
    display: flex;
    justify-content: space-between;
    text-transform: uppercase;
    font-family: ${props => props.theme.fonts.raleway};
    font-size: 16px;
    font-weight: 600;
    line-height: 1.2;
  }
`

type Props = ConnectedProps<typeof connector>

class Categories extends Component<Props> {
    async componentDidMount(): Promise<void> {
        const {fetchNavData, dispatchCurrency, selectedCurrency} = this.props
        const response = await fetchNavData()
        if (response.data && !selectedCurrency) {
            const {currencies} = response.data
            dispatchCurrency(currencies[0])
        }
    }

    render(): ReactNode {
        const {navDataResp} = this.props
        const {data} = navDataResp
        return (
            <StyledCategories>
                {data && (
                    <ul className="list">
                        {data.categories.map(category => (
                            <CategoryItem category={category} key={category.name}/>
                        ))}
                    </ul>)}
            </StyledCategories>
        )
    }
}

const mapState = (state: RootState) => ({
    navDataResp: getNavData.select()(state),
    selectedCurrency: state.shop.currency
})

const mapDispatch = {
    fetchNavData: getNavData.initiate,
    dispatchCurrency: setCurrency
}

const connector = connect(mapState, mapDispatch)


export default connector(Categories)
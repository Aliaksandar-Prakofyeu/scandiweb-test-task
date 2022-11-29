import {Component, ReactNode} from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import {RootState, Category} from '../../../../types/types'
import {connect, ConnectedProps} from 'react-redux'

const StyledCategory = styled.li`
    padding: 32px 16px 32px;
    border-bottom: 2px solid transparent;
    &.active{
      color: ${props => props.theme.main.color};
      border-bottom: 2px solid  ${props => props.theme.main.color};
    }
`
type Props = {
    category: Category
} & ConnectedProps<typeof connector>

class CategoryItem extends Component<Props>{
    render(): ReactNode{
        const {category, selectedCategory} = this.props
        const isActive = category.name === selectedCategory

        return (
            <StyledCategory className={isActive ? 'active' : ''}>
                <Link to={`/category/${category.name}`}>{category.name}</Link>
            </StyledCategory>
        )
    }
}

const mapState = (state: RootState) => ({
    selectedCategory: state.shop.category
})

const connector = connect(mapState)

export default connector(CategoryItem)
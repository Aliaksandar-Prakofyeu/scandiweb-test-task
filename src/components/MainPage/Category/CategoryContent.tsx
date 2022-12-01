import React, {Component, ReactNode} from 'react'
import {Category} from '../../../types/types'
import styled from 'styled-components'
import CategoryItem from './CategoryItem'
import Button from '../../tools/ui/Button'

const StyledCategoryContent = styled.div`
  padding: 80px 0;

  .cat__title {
    margin-bottom: 103px;
    text-transform: capitalize;
    line-height: 1.6;
    font-size: 42px;
  }
  .cat__products{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 103px 40px;
  }
  .cat__show__btn{
    display: block;
    width: 140px;
    height: 43px;
    margin: 30px auto 0;
  }
`

type Props = {
    catData: Category | undefined
    countOnPage: number
}

type State = {
    page: number
}

class CategoryContent extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {page: 1}
    }

    handleNextPage = (): void => {
        this.setState(state => ({page: state.page + 1}))
    }

    render(): ReactNode {
        const {catData, countOnPage} = this.props
        const {page} = this.state
        const amountOfShown = countOnPage * page
        return (
            <StyledCategoryContent>
                {catData &&
                    <>
                        <h1 className="cat__title">{catData.name}</h1>
                        <div className="cat__products">
                            {catData.products?.slice(0, amountOfShown).map(p => (
                                <CategoryItem product={p} key={p.id}/>
                            ))}
                        </div>
                        {catData.products.length > amountOfShown && (
                            <Button child="Show all"
                                    variant="contained"
                                    className="cat__show__btn"
                                    onClick={this.handleNextPage}/>
                        )}
                    </>
                }
            </StyledCategoryContent>
        )
    }
}

export default CategoryContent
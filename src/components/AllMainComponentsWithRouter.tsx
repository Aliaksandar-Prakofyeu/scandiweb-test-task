import {Component, ReactNode} from 'react'
import {Route, Routes} from 'react-router-dom'
import {CATEGORY_KEY, PRODUCT_KEY} from '../api/const'
import MainPage from './MainPage/MainPage'
import ProductPageContainer from './ProductPage/ProductPageContainer'
import Cart from './Cart/Cart'
import styled from 'styled-components'

const StyledAllMainComponentsWithRouter = styled.div`
  padding: 0 101px;
`

class AllMainComponentsWithRouter extends Component {
    render(): ReactNode {
        return (
            <StyledAllMainComponentsWithRouter>
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path={`/category/:${CATEGORY_KEY}`} element={<MainPage/>}/>
                    <Route path={`/product/:${PRODUCT_KEY}`} element={<ProductPageContainer/>}/>
                    <Route path="/cart" element={<Cart/>}/>
                </Routes>
            </StyledAllMainComponentsWithRouter>
        )

    }
}

export default AllMainComponentsWithRouter
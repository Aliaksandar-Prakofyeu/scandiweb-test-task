import {Component, ReactNode} from 'react'
import {Route, Routes} from 'react-router-dom'
import {CATEGORY_KEY, PRODUCT_KEY} from '../api/const'
import MainPage from './MainPage/MainPage'
import ProductPageContainer from './ProductPage/ProductPageContainer'
import Cart from './Cart/Cart'

class AllMainComponentsWithRouter extends Component {
    render(): ReactNode {
        return (
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path={`/category/:${CATEGORY_KEY}`} element={<MainPage/>}/>
                <Route path={`/product/:${PRODUCT_KEY}`} element={<ProductPageContainer/>}/>
                <Route path='/cart' element={<Cart/>}/>
            </Routes>
        )

    }
}

export default AllMainComponentsWithRouter
import {Component, ReactNode} from 'react'
import {withRouter, WithRouterProps} from '../tools/hoc/withRouter'
import {PRODUCT_KEY} from '../../api/const'
import ProductPage from './ProductPage'


type Props = WithRouterProps

class ProductPageContainer extends Component<Props> {
    render(): ReactNode {
        const {params} = this.props
        const id = params[PRODUCT_KEY]
        return (
            id && <ProductPage id={id}/>
        )
    }
}

export default withRouter(ProductPageContainer)
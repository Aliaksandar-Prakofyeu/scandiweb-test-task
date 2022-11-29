import React from 'react'
import {withRouter, WithRouterProps} from '../tools/hoc/withRouter'
import CategoryContainer from './Category/CategoryContainer'
import {CATEGORY_KEY} from '../../api/const'

type Props = WithRouterProps

class MainPage extends React.Component<Props> {
    render(): React.ReactNode {
        const {params} = this.props
        return <CategoryContainer catName={params[CATEGORY_KEY]}/>
    }
}

export default withRouter(MainPage)
import {Component, ReactElement, ReactNode} from 'react'
import HeaderContainer from '../Header/HeaderContainer'
import Wrapper from '../Wrapper/Wrapper'


type Props = {child: ReactElement}

class Layout extends Component<Props>{
    render(): ReactNode{
        const {child} = this.props
        return (
            <>
                <HeaderContainer/>
                <main>
                    <Wrapper>{child}</Wrapper>
                </main>
            </>
        )
    }
}

export default Layout
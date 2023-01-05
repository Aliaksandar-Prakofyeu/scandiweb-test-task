import {Component, ReactNode} from 'react'
import HeaderContainer from './components/Header/HeaderContainer'
import AllMainComponentsWithRouter from './components/AllMainComponentsWithRouter'
import Wrapper from './styles/Wrapper/Wrapper'


class App extends Component {
    render(): ReactNode {
        return (
            <>
                <HeaderContainer/>
                <Wrapper>
                    <AllMainComponentsWithRouter/>
                </Wrapper>
            </>
        )
    }
}

export default App

import {Component, ReactNode} from 'react'
import HeaderContainer from './components/Header/HeaderContainer'
import AllMainComponentsWithRouter from './components/AllMainComponentsWithRouter'
import Wrapper from './components/Wrapper/Wrapper'


class App extends Component {
    render(): ReactNode {
        return (
            <Wrapper>
                <HeaderContainer/>
                <AllMainComponentsWithRouter/>
            </Wrapper>
        )
    }
}

export default App

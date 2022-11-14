import {Component} from 'react'
import HeaderContainer from './components/Header/HeaderContainer'
import AllMainComponentsWithRouter from './components/AllMainComponentsWithRouter'


class App extends Component {
    render() {
        return (
            <>
                <HeaderContainer />
                <AllMainComponentsWithRouter/>
            </>
        )
    }
}

export default App

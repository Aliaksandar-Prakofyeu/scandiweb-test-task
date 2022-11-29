import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {store} from './store/store'
import GlobalStyle from './styles/GlobalStyle'
import {ThemeProvider} from 'styled-components'
import theme from './theme/theme'

createRoot(document.getElementById('root') as HTMLElement).render(
    <BrowserRouter>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <GlobalStyle/>
                <App/>
            </ThemeProvider>
        </Provider>
    </BrowserRouter>
)



import {createGlobalStyle} from 'styled-components'

export default  createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body{
    font-size: 16px;
    font-family: ${props => props.theme.fonts.raleway};
    color: ${props => props.theme.main.textColor};
  }
  img{
    display: inline-block;
  }
  ul, li{
    list-style: none;
  }
  a{
    color: inherit;
    text-decoration: none;
    &:visited{
      color: inherit;
    }
  }
`



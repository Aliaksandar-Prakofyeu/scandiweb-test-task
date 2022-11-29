import {Component, CSSProperties, ReactNode} from 'react'
import styled, {css} from 'styled-components'


type ButtonStyleProps = Pick<Props, 'variant' | 'width' | 'height' | 'isActive' | 'disabled'>

const Outline = css<ButtonStyleProps>`
  border: 1px solid ${props => props.theme.main.textColor};
  color: ${props => props.theme.main.textColor};
  background: transparent;

  &.text {
    border: 1px solid ${props => props.theme.main.textColor};
    background-color: ${props =>
            props.isActive ? props.theme.main.textColor : 'transparent'};
    color: ${props => (props.isActive ? '#fff' : props.theme.main.textColor)};
    font-size: inherit;
    cursor: pointer;
  }
`

const Contained = css<ButtonStyleProps>`
  background: ${({theme, disabled}) =>
          !disabled ? theme.main.color : '#666'};
  cursor: ${props => (props.disabled ? 'default' : 'pointer')};
  border: none;
  color: #fff;

  &.color {
    background-color: transparent;
    border: 1px solid #fff;
    outline: 1px solid ${({theme, isActive}) => (
            isActive ? theme.main.color : 'transparent'
    )};
  }
`


const StyledButton = styled.button<ButtonStyleProps>`
  font-family: ${props => props.theme.fonts.raleway};
  font-weight: 600;
  font-size: 14px;
  width: ${props => props.width || 'initial'};
  height: ${props => props.height || 'initial'};
  text-transform: uppercase;
  cursor: pointer;
  ${props => (props.variant === 'contained' ? Contained : Outline)}
`


type Props = {
    child: ReactNode
    variant: 'outline' | 'contained'
    disabled?: boolean
    isActive?: boolean
    className?: string
    style?: CSSProperties
    width?: string
    height?: string
    onClick?: () => void

}

class Button extends Component<Props> {
    render(): ReactNode {
        const {
            child,
            variant,
            disabled,
            isActive,
            className,
            style,
            width,
            height,
            onClick
        } = this.props
        return (
            <StyledButton
                variant={variant}
                disabled={disabled}
                isActive={isActive}
                className={className}
                style={style}
                width={width}
                height={height}
                onClick={onClick}>
                {child}
            </StyledButton>
        )
    }
}

export default Button
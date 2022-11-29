import React, {Component, ReactNode} from 'react'
import {AttributeSet} from '../../../../types/types'
import styled from 'styled-components'
import Button from '../../../tools/ui/Button'

const StyledAttribute = styled.div`
  &:not(:last-child){
    margin-bottom: 24px;
  }
  .attr__name {
    margin-bottom: 8px;
    font-size: 18px;
    font-family: ${props => props.theme.fonts.robotoCondensed};
    font-weight: 700;
    text-transform: uppercase;
  }
  .attr__val{
    .attr__btn{
      font-family: sans-serif;
      &.text{
        margin-right: 12px;
        width: 63px;
        height: 45px;
        font-size: 16px;
        font-weight: 400;
        letter-spacing: 0.05em;
      }
      &.color{
        margin-right: 8px;
        width: 36px;
        height: 36px;
      }
    }
  }
`

type Props = {
    attrData: AttributeSet
    selOptId: string
    selOpt?: (attrId: string, optVal: string) => void
}

class Attribute extends Component<Props>{
    render(): ReactNode{
        const{attrData:{name, type, items, id: attrId}, selOptId, selOpt} = this.props
        const isColor = type === 'swatch'

        return(
            <StyledAttribute>
                <div className='attr__name'>{name}:</div>
                <div className='attr__val'>
                    {items.map(i => {
                        const className = isColor ? 'color' : 'text'
                        const displayText = isColor ? '' : i.value
                        const style = isColor ? {backgroundColor: i.value} : undefined
                        return(
                            <Button variant={isColor ? 'contained' : 'outline'}
                                    isActive={selOptId === i.id}
                                    key={i.id}
                                    style={style}
                                    className={`attr__btn ${className}`}
                                    onClick={() => selOpt?.(attrId, i.id)}
                                    child={displayText}
                            />
                        )
                    })}
                </div>
            </StyledAttribute>
        )
    }
}

export default Attribute
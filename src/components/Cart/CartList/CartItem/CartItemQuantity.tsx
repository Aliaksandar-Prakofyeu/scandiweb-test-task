import {Component, ReactNode} from 'react'
import styled from 'styled-components'
import Button from '../../../tools/ui/Button'
import Minus from '../../../../assets/minus.svg'
import Plus from '../../../../assets/plus.svg'

const StyledCartItemQuantity = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  .button{
    width: 45px;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    & > img {
      width: 15px;
      height: 15px;
    }
  }
  .quantity {
    font-weight: 500;
    font-size: 24px;
  }
`

type Props = {
    updateCart: (newQty: number) => void
    quantity: number
}

class CartItemQuantity extends Component<Props>{
    render(): ReactNode{
        const {updateCart, quantity} = this.props
        return(
            <StyledCartItemQuantity className='item__quantity'>
                <Button child={<img src={Plus}  alt='plus'/>}
                        className='button'
                        variant='outline'
                        onClick={() => updateCart(quantity + 1)}/>
                <span className='quantity'>{quantity}</span>
                <Button child={<img src={Minus}  alt='minus'/>}
                        className='button'
                        variant='outline'
                        onClick={() => updateCart(quantity - 1)}/>
            </StyledCartItemQuantity>
        )
    }
}

export default CartItemQuantity
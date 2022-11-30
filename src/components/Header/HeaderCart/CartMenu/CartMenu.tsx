import React, {Component, ReactNode} from 'react'
import Modal from '../../../tools/Modal'
import styled from 'styled-components'
import CartMenuContent from './CartMenuContent/CartMenuContent'
import {withRouter, WithRouterProps} from '../../../tools/hoc/withRouter'
import Button from '../../../tools/ui/Button'

const StyledCartMenu = styled.div`
  position: absolute;
  top: 80px;
  right: 0;
  width: 325px;
  max-height: 677px;
  padding: 32px 16px;
  background-color: #fff;
  z-index: 13;
  .buttons__container{
    & > *:first-child{
      margin-right: 12px;
    }
  }
`

const StyledOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  cursor: pointer;
  z-index: 11;
  background-color: rgba(0,0,0,0.3);
`

const StyledWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  max-width: 1300px;
  width: 100%;
  transform: translateX(calc(-50% - 15px));
  z-index: 12;
`



type Props = {
    handleClose: () => void
    cartItemsCount: number
} & WithRouterProps


class CartMenu extends Component<Props> {
    componentDidMount(): void {
        document.body.style.overflow = 'hidden'
    }

    componentWillUnmount(): void {
        document.body.style.overflow = 'initial'
    }

    openCartPage = (): void => {
        const {handleClose, navigate} = this.props
        handleClose()
        navigate('/cart')
    }

    render(): ReactNode {
        const {handleClose, cartItemsCount} = this.props
        const isItemsInCart = cartItemsCount > 0
        return (
            <Modal>
                <StyledOverlay onClick={handleClose}/>
                <StyledWrapper>
                    <StyledCartMenu>
                        {isItemsInCart ? (
                            <>
                                <CartMenuContent/>
                                <div className='buttons__container'>
                                    <Button child={'View Bag'}
                                            variant={'outline'}
                                            width={'140px'}
                                            height={'43px'}
                                            onClick={this.openCartPage}/>
                                    <Button child={'Check Out'}
                                            variant={'contained'}
                                            width={'140px'}
                                            height={'43px'}/>
                                </div>
                            </>
                        ) : (<div>Cart is empty</div>)}
                    </StyledCartMenu>
                </StyledWrapper>
            </Modal>
        )
    }
}

export default withRouter(CartMenu)
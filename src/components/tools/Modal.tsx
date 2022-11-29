import {Component, ReactNode, ReactPortal} from 'react'
import {createPortal} from 'react-dom'

const modalRoot = document.getElementById('modal-root')

type Props = {
    children: ReactNode
}

class Modal extends Component<Props>{
    containerEl: HTMLDivElement

    constructor(props: Props) {
        super(props)
        this.containerEl = document.createElement('div')
    }

    componentDidMount(): void{
        if(!modalRoot) throw new Error('#modal-root is not defined')
        modalRoot.append(this.containerEl)
    }

    componentWillUnmount(): void {
        if (!modalRoot) throw new Error("#modal-root is not defined")
        this.containerEl.remove()
    }

    render(): ReactPortal {
        const { children } = this.props
        return createPortal(children, this.containerEl)
    }
}

export default Modal
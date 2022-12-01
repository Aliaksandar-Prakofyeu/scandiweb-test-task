import {Component, memo, ReactNode} from 'react'
import {connect, ConnectedProps} from 'react-redux'
import {RootState} from '../../../types/types'
import {getSingleCat} from '../../../api/api'
import {setCategory} from '../../../store/shop'
import CategoryContent from './CategoryContent'

type OwnProps = { catName: string | undefined }
type Props = OwnProps & ConnectedProps<typeof connector>

class CategoryContainer extends Component<Props> {
    async componentDidMount(): Promise<void> {
        const {fetchCat, setSelectedCat, catName} = this.props
        const response = await fetchCat(catName)
        if (response.data) {
            setSelectedCat(catName || response.data.name)
        }
    }

    async componentDidUpdate(prevProps: Props): Promise<void> {
        const {catName, fetchCat, setSelectedCat, selectedCat} = this.props
        if (catName === prevProps.catName) return
        const {data} = await  fetchCat(catName)
        if (data && data.name !== selectedCat){
            setSelectedCat(data.name)
        }
    }

    componentWillUnmount(): void {
        const{setSelectedCat} = this.props
        setSelectedCat('')
    }

    render(): ReactNode {
        const{catResponse, countOnPage} = this.props
        const {data} = catResponse
        return (
            <CategoryContent catData={data} countOnPage={countOnPage}/>
        )
    }
}

const mapState = (state: RootState, {catName}: OwnProps) => ({
    catResponse: getSingleCat.select(catName)(state),
    selectedCat: state.shop.category,
    countOnPage: state.shop.countOnPage
})

const mapDispatch = {
    fetchCat: getSingleCat.initiate,
    setSelectedCat: setCategory
}

const connector = connect(mapState, mapDispatch)

export default memo(connector(CategoryContainer))
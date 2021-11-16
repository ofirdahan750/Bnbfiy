//eslint-disable-next-line
import React, { useState, useEffect,useCallback,useRef} from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import { utilService } from '../services/utilService'
import { StayList } from '../cmps/ExploreCmps/StayList.jsx'
import { StayFilter } from '../cmps/ExploreCmps/StayFilter.jsx'
import { loadStays } from '../store/actions/stayActions.js'
import { PageLoader } from '../cmps/commonCmps/PageLoader.jsx'
import moment from "moment"
import { useParams } from 'react-router'

export const StayApp = () => {
    const [isPriceFilterOpen, setPriceFilterModal] = useState(false)
    const [filteredStays, setStay] = useState(null)
    const dispatch = useDispatch()
    const {city} = useParams()

    const guestsAmount = useRef(1)

    const { stays } = useSelector(state => state.stayModule)
    const { trips } = useSelector(state => state.tripModule)

    useEffect(() => {
        dispatch(loadStays())
    }, [city])
    useEffect(() => {
        if (trips){
        guestsAmount.current = trips.guest.adults + trips.guest.kids + trips.guest.infants
    }
    }, [trips])

    useEffect(() => {
        setStay(getFilterStays())
        return () => {
            setStay(null)
        }
    }, [stays])
    
    const priceFilterModalToggle = () => {
        setPriceFilterModal(pervToggle => !pervToggle)
    }
    const getFilterStays = useCallback(
        () => {
            let stayFiltered
            stayFiltered = (!city) ? stays : stays.filter(stay => stay.loc.city === city)
        
            if (trips && trips.guest)  {
                stayFiltered =  stayFiltered.filter(stay => stay.capacity >= guestsAmount.current)
            }
            return stayFiltered
        },
        [stays],
    )
    


    const stayLength = () => {
        if(!filteredStays) return
        return utilService.getAmount(filteredStays.length, 'stay')
    }
    const tripsDate = () => {
        if (!trips || !trips.startDate && !trips.endDate) return ''
        return  ` · ${moment(trips.startDate).format('MMM-DD')}-${moment(trips.endDate).format('MMM-DD')}`
    }
    const dynamicHeadline = () => {
        return (!city) ? `Top-rated places to stay` : `Stays in ${city}`
    }

  
    if(!filteredStays) return <div>loading...</div>
    return (
        <section className="main-explore main-layout full">
            <div className="main-explore-wrapper">

                <div className="explore-headline">
                    <p className="explore-headline-criteria">{stayLength()}{tripsDate()}{utilService.getAmount(guestsAmount.current, 'guest')}</p>
                    <h2>{dynamicHeadline()}</h2>
                    <div className="explore-filter-btn">
                        <button onClick={() => priceFilterModalToggle()}>Price</button>
                    </div>
                </div>
                {isPriceFilterOpen && <StayFilter minPrice={18} />}
                <StayList stays={filteredStays} />
            </div>

        </section>
    )}





// export class _StayApp extends Component {
//     state = {
//         isPriceFilterOpen: false,
//         filteredStays: null
//     }
//     async componentDidMount() {
//         await this.props.loadStays()
//         const city = this.props.match.params.city
//         if (city) this.setState({ filteredStays: this.getFilterStays(city) })
//     }

//     getFilterStays = (city) => {
//         const { stays } = this.props
//         return stays.filter(stay => {
//             return stay.loc.city === city
//         })
//     }



//     priceFilterModalToggle = () => {
//         this.setState({
//             isPriceFilterOpen: !this.state.isPriceFilterOpen
//         })
//     }


//     render() {
//         const { stays, trips } = this.props
//         const staysToShow = this.state.filteredStays ? this.state.filteredStays : stays
//         console.log('staysToShow:', staysToShow.length)
//         const guestsAmount = (trips) ? (trips.guest) ? utilService.getAmount(trips.guest, 'guest') : '' : ''
//         const stayLength = utilService.getAmount(staysToShow.length, 'stay')
//         const tripsDate = (trips) ? (trips.startDate && trips.endDate) ? ` · ${moment(trips.startDate).format('MMM-DD')}-${moment(trips.endDate).format('MMM-DD')}` : '' : ''
//         const dynamicHeadline = (!this.props.match.params.city) ? `Top-rated places to stay` : `Stays in ${this.props.match.params.city}`
//         const { isPriceFilterOpen } = this.state
//         console.log('this.props.isLoading:', this.props.isLoading)
//         return (
//             <section className="main-explore main-layout full">
//                 <div className="main-explore-wrapper">

//                             <div className="explore-headline">
//                                 <p className="explore-headline-criteria">{`${stayLength}${tripsDate}${guestsAmount}`}</p>
//                                 <h2>{dynamicHeadline}</h2>
//                                 <div className="explore-filter-btn">
//                                     <button onClick={this.priceFilterModalToggle}>Price</button>
//                                 </div>
//                             </div>
//                             {isPriceFilterOpen && <StayFilter />}
//                             <StayList stays={staysToShow} />
//                 </div>

//             </section>
//         )
//     }
// }

// function mapStateToProps(state) {
//     return {
//         stays: state.stayModule.stays,
//         trips: state.tripsModule.trips,
//         isLoading: state.systemModule.isLoading

//     }
// }

// const mapDispatchToProps = {
//     loadStay,
//     loadStays

// }

// export const StayApp = connect(mapStateToProps, mapDispatchToProps)(_StayApp)
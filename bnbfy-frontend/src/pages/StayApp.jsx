//eslint-disable-next-line
import React, { useState, useEffect,useCallback, useRef} from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import { utilService } from '../services/utilService'
import { StayList } from '../cmps/ExploreCmps/StayList.jsx'
import { StayFilter } from '../cmps/ExploreCmps/StayFilter.jsx'
import { loadStay, loadStays } from '../store/actions/stayActions.js'
import { PageLoader } from '../cmps/commonCmps/PageLoader.jsx'
import moment from "moment"
import { useParams } from 'react-router'

export const StayApp = () => {
    const [isPriceFilterOpen, setPriceFilterModal] = useState(false)
    const [filteredStays, setStay] = useState(null)
    const dispatch = useDispatch()
    const {city} = useParams()

    const { stays } = useSelector(state => state.stayModule)
    const { trip } = useSelector(state => state.tripModule)

    useEffect(() => {
        dispatch(loadStays())
    }, [city])

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
        
            if (trip && trip.guest)  {
                const guestTotal =  trip.guest.adults + trip.guest.kids + trip.guest.infants
                stayFiltered =  stayFiltered.filter(stay => stay.capacity >= guestTotal)
            }
            stayFiltered =  utilService.sortByRate(stays)
            return stayFiltered
        },
        [stays],
    )
    
    const guestsAmount = () => {
            if (!trip || !trip.guest) return ''
            return utilService.getAmount(trip.guest, 'guest')
    }

    const stayLength = () => {
        if(!filteredStays) return
        return utilService.getAmount(filteredStays.length, 'stay')
    }
    const tripDate = () => {
        if (!trip || !trip.startDate && !trip.endDate) return ''
        return  ` · ${moment(trip.startDate).format('MMM-DD')}-${moment(trip.endDate).format('MMM-DD')}`
    }
    const dynamicHeadline = () => {
        return (!city) ? `Top-rated places to stay` : `Stays in ${city}`
    }

  
    if(!filteredStays) return <div>loading...</div>
    return (
        <section className="main-explore main-layout full">
            <div className="main-explore-wrapper">

                <div className="explore-headline">
                    <p className="explore-headline-criteria">{stayLength()}{tripDate()}{guestsAmount()}</p>
                    <h2>{dynamicHeadline()}</h2>
                    <div className="explore-filter-btn">
                        <button onClick={() => priceFilterModalToggle()}>Price</button>
                    </div>
                </div>
                {isPriceFilterOpen && <StayFilter />}
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
//         const { stays, trip } = this.props
//         const staysToShow = this.state.filteredStays ? this.state.filteredStays : stays
//         console.log('staysToShow:', staysToShow.length)
//         const guestsAmount = (trip) ? (trip.guest) ? utilService.getAmount(trip.guest, 'guest') : '' : ''
//         const stayLength = utilService.getAmount(staysToShow.length, 'stay')
//         const tripDate = (trip) ? (trip.startDate && trip.endDate) ? ` · ${moment(trip.startDate).format('MMM-DD')}-${moment(trip.endDate).format('MMM-DD')}` : '' : ''
//         const dynamicHeadline = (!this.props.match.params.city) ? `Top-rated places to stay` : `Stays in ${this.props.match.params.city}`
//         const { isPriceFilterOpen } = this.state
//         console.log('this.props.isLoading:', this.props.isLoading)
//         return (
//             <section className="main-explore main-layout full">
//                 <div className="main-explore-wrapper">

//                             <div className="explore-headline">
//                                 <p className="explore-headline-criteria">{`${stayLength}${tripDate}${guestsAmount}`}</p>
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
//         trip: state.tripModule.trip,
//         isLoading: state.systemModule.isLoading

//     }
// }

// const mapDispatchToProps = {
//     loadStay,
//     loadStays

// }

// export const StayApp = connect(mapStateToProps, mapDispatchToProps)(_StayApp)
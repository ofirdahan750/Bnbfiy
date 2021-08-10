import React, { useState, useEffect, } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import moment from "moment"

import { CitySearchModal } from '../HomeCmps/CitySearchModal.jsx'
import { GuestChoose } from '../HomeCmps/GuestChoose.jsx'
import { DateRangePicker } from '../commonCmps/DateRangePicker.jsx'


import { loadStays } from '../../store/actions/stayActions.js'
import { updateTrip } from '../../store/actions/tripActions.js'

import { utilService } from '../../services/utilService.js'

import search from '../../assets/svg/button/search_btn.svg'

export const TripSettings = () => {
    const [isModalOpen, setToggleModal] = useState({
        isLocationChooseOpen: false,
        isDatePickerOpen: false,
        isGuestChooseOpen: false
    })
    const dispatch = useDispatch()
    const { stays } = useSelector(state => state.stayModule)
    const { trips } = useSelector(state => state.tripModule)
    const [trip, setTrip] = useState({
        inputLocation: '',
        startDate: trips.startDate || '',
        endDate: trips.endDate || '',
        guest: trips.guest || {
            adults: 0,
            kids: 0,
            infants: 0
        }
    })
    useEffect(() => {
        if (trips) {
            dispatch(updateTrip(trip))
        }
    }, [trip])
    useEffect(() => {
        dispatch(loadStays())
    }, [])



    const getAllStays = () => {
        const arr = stays.filter(item => item.loc.city.toLowerCase().includes(trip.inputLocation.toLowerCase()))
            .map(arr => arr.loc.city).filter((value, index, self) => self.indexOf(value) === index)
        return arr
    }
    const setDate = (startDate, endDate) => {
        setTrip(pervState => ({
            ...pervState,
            startDate,
            endDate
        }))
        if (startDate && endDate) {
            setToggleModal({
                isLocationChooseOpen: false,
                isDatePickerOpen: false,
                isGuestChooseOpen: true
            })
        }
    }
    const guestUpdate = (guest) => {
        setTrip(pervState => ({
            ...pervState,
            guest
        }))
    }


    const handleChange = (ev) => {
        const field = ev.target.name
        const value = (ev.target.type === 'number') ? +ev.target.value : ev.target.value
        setTrip(prevFields => ({ ...prevFields, [field]: value }))
    }
    const onClickModalInput = (country) => {
        setTrip(prevFields => ({ ...prevFields, inputLocation: country }))
        setToggleModal({
            isLocationChooseOpen: false,
            isDatePickerOpen: true,
            isGuestChooseOpen: false
        })
    }

    const onToggleChoose = (choose) => {
        setToggleModal(prevFields => 
            ({         isLocationChooseOpen: false,
                isDatePickerOpen: false,
                isGuestChooseOpen: false, [choose]: !prevFields[choose]  }
                ))
    }


    const { inputLocation, startDate, endDate, guest } = trip
    const { adults, kids, infants } = guest
    const { isLocationChooseOpen, isDatePickerOpen, isGuestChooseOpen } = isModalOpen
    const guestAmount = utilService.getAmount((adults + kids + infants), 'guest', true)
    const filterPlaces = getAllStays()
    return (
        <div className="filter-warper">
            <button className="filter-warper-input-txt" onClick={() => onToggleChoose('isLocationChooseOpen')}>
                <div className="picker-date-btn-first-line">Location</div>
                <input onChange={() => setTrip(prevFields => ({ ...prevFields, isLocationChooseOpen: true }))} placeholder="Where are you going?" type="search" list="places" name={'inputLocation'} value={inputLocation} onChange={handleChange} autoComplete="off" />
            </button>
            {isLocationChooseOpen && filterPlaces && <CitySearchModal
                countrys={filterPlaces}
                onClickModalInput={onClickModalInput} />}


            <button className="picker-date-btn" onClick={() => onToggleChoose('isDatePickerOpen')}>
                <div className="picker-date-btn-first-line">Pick a Date</div>
                {startDate && `${moment(startDate).format('LL')}`}
                {!startDate && <div><div className="picker-date-btn-sec-line">Check-in</div> </div>}
            </button>

            <button className="picker-date-btn" onClick={() => onToggleChoose('isDatePickerOpen')}>
                <div className="picker-date-btn-first-line">Pick a Date</div>
                {endDate && `${moment(endDate).format('LL')}`}

                {!endDate && <div><div className="picker-date-btn-sec-line">Check-out</div> </div>}
            </button>
            <div className="flex" style={{ position: "absolute", zIndex: 20, top: '100%', right: "13%" }}>
                {isDatePickerOpen && <DateRangePicker setDate={setDate} onToggleChoose={onToggleChoose}
                />}</div>

            <button className="is-guest-choose" onClick={() => onToggleChoose('isGuestChooseOpen')}>
                <div className="picker-date-btn-first-line">Guests</div>
                {guestAmount ? guestAmount : <div className="picker-date-btn-sec-line">Add guests</div>}
            </button>
            {isGuestChooseOpen && <GuestChoose
                guestUpdate={guestUpdate}
                guest={trip.guest} />}
            <Link className="search-warrper flex flex-end align-center" to={`/stay/${inputLocation.split(',')[0]}`}>
                <button className="search-btn flex justify-center" onClick={() => dispatch(updateTrip(trip))}>
                    <img src={search} alt="" /></button>
            </Link>
        </div>
    )
}

/// ///////////////////Old code on class : ////////////////////////////////


// export class _TripSettings extends Component {
//     state = {
//         trip: {
//             startDate: '',
//             endDate: '',
//             guest: {
//                 adults: 0,
//                 kids: 0,
//                 infants: 0
//             },
//             countrys: '',
//         },
//         isDatePickerOpen: false,
//         isGuestChooseOpen: false,
//         isLocationChooseOpen: false

//     }
//     async componentDidMount() {
//         await this.props.loadStays()
//     }

//     handleChange = (ev) => {
//         console.log('ev:', ev)
//         this.setState(prevState => ({
//             trip: {
//                 ...prevState.trip,
//                 countrys: ev.target.value
//             }
//         }))
//         this.onFoucesModal()
//         // console.log(this.state.countrys)
//     }

//     onClickTxtModal = (val) => {
//         console.log('val:', val)
//         this.setState((prevState => ({
//             trip: {
//                 ...prevState.trip,
//                 countrys: val
//             },
//         })))
//         this.onToggleChoose('date-picker')
//     }



//     onToggleChoose = (choose) => {
//         if (choose === 'location') this.setState({
//             isLocationChooseOpen: !this.state.isLocationChooseOpen,
//             isDatePickerOpen: false,
//             isGuestChooseOpen: false
//         })
//         if (choose === 'guest') this.setState({
//             isGuestChooseOpen: !this.state.isGuestChooseOpen,
//             isDatePickerOpen: false,
//             isLocationChooseOpen: false
//         })
//         if (choose === 'date-picker') this.setState({
//             isDatePickerOpen: !this.state.isDatePickerOpen,
//             isGuestChooseOpen: false,
//             isLocationChooseOpen: false
//         })
//     }
//     onClearBtn = (ev, type) => {
//         ev.stopPropagation()

//         switch (type) {
//             case 'txt-btn':
//                 ev.target.value = ''
//                 break
//             case 'guest-btn':
//                 this.setState((prevState => ({
//                     trip: {
//                         ...prevState.trip,
//                         guest: {
//                             adults: 0,
//                             kids: 0,
//                             infants: 0
//                         }
//                     },
//                     isGuestChooseOpen: false
//                 })))


//                 break;
//             default:
//                 console.log('no good')

//         }
//     }

//     guestUpdate = (guest) => {
//         this.setState(prevState => ({
//             trip: {
//                 ...prevState.trip,
//                 guest
//             }
//         }))
//     }


//     setDate = (startDate, endDate) => {
//         this.setState(prevState => ({
//             trip: {
//                 ...prevState.trip,
//                 startDate,
//                 endDate
//             }
//         }))
//     }
//     onFoucesModal = () => {
//         this.setState({
//             isLocationChooseOpen: true,
//             isDatePickerOpen: false,
//             isGuestChooseOpen: false
//         })
//     }

//     render() {
//         const { trip, isGuestChooseOpen, isDatePickerOpen, isLocationChooseOpen } = this.state
//         const guestAmount = utilService.getAmount(trip.guest,'guest', true)
//         const filterPlaces = this.getAllStays()
//         return (
//             <div className="filter-warper">
//                 <button className="filter-warper-input-txt" onClick={() => this.onToggleChoose('location')}>
//                     {/* <button className="btn-clear-search" onClick={(e) => this.onClearBtn(e, 'guest-btn')}></button> */}
//                     <div className="picker-date-btn-first-line">Location</div>
//                     <input onClick={() => this.onFoucesModal } placeholder="Where are you going?" type="search" list="places" value={trip.countrys} onChange={this.handleChange} autoComplete="off" />
//                 </button>
//                 {isLocationChooseOpen && filterPlaces && <CitySearchModal
//                     // guestUpdate={this.guestUpdate}
//                     countrys={filterPlaces}
//                     onClickTxtModal={this.onClickTxtModal} />}
//                 {/* <input autoFocus onClick={() => this.setState({ isGuestChooseOpen: false, isDatePickerOpen: false })} className="filter-warper-input-txt" placeholder="Where are you going?" type="search" list="places" onChange={this.handleChange} autoComplete="off" />

//                 <datalist id="places">
//                     {filterPlaces.map((place, key) =>
//                         <option key={key} value={place} />
//                     )}
//                 </datalist> */}

//                 <button className="picker-date-btn" onClick={() => this.onToggleChoose('date-picker')}>
//                     <div className="picker-date-btn-first-line">Pick a Date</div>
//                     {trip.startDate  && `${moment(trip.startDate).format('LL')}`}
//                     {!trip.startDate && <div><div className="picker-date-btn-sec-line">Check-in</div> </div>}
//                 </button>

//                 <button className="picker-date-btn" onClick={() => this.onToggleChoose('date-picker')}>
//                     <div className="picker-date-btn-first-line">Pick a Date</div>
//                     {trip.endDate && `${moment(trip.endDate).format('LL')}`}

//                     {!trip.endDate &&<div><div className="picker-date-btn-sec-line">Check-out</div> </div>}
//                 </button>
//                 <div className="flex" style={{ position: "absolute", zIndex: 20, top: '100%', right: "13%" }}>
//                     {isDatePickerOpen && <DateRangePicker style={{ backgroundColor: 'red' }} setDate={this.setDate}
//                         onToggleChoose={this.onToggleChoose} />}</div>

//                 <button className="is-guest-choose" onClick={() => this.onToggleChoose('guest')}>
//                     {/* <button className="btn-clear-search" onClick={(e) => this.onClearBtn(e, 'guest-btn')}></button> */}
//                     <div className="picker-date-btn-first-line">Guests</div>
//                     {guestAmount ? guestAmount : <div className="picker-date-btn-sec-line">Add guests</div>}
//                 </button>
//                 {isGuestChooseOpen && <GuestChoose
//                     guestUpdate={this.guestUpdate}
//                     guest={trip.guest} />}
//                 <Link className="search-warrper flex flex-end align-center" to={`/stay/${this.state.trip.countrys.split(',')[0]}`}>
//                     <button className="search-btn flex justify-center" onClick={() => this.props.updateTrip(trip)}>
//                         <img src={search} alt="" /></button>
//                 </Link>
//             </div>
//         )
//     }

// }

// const mapStateToProps = state => {
//     return {
//         stays: state.stayModule.stays,
//         currstay: state.stayModule.currstay
//     }
// }
// const mapDispatchToProps = {
//     loadStays,
//     updateTrip
// }

// export const TripSettings = connect(mapStateToProps, mapDispatchToProps)(_TripSettings)
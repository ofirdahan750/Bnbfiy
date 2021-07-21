import React, { useEffect, useCallback, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { loadStays, loadStay } from '../store/actions/stayActions'
import { TripSettings } from '../cmps/HomeCmps/TripSettings'
import { PopularPlaces } from '../cmps/HomeCmps/PopularPlaces'
import { StayList } from '../cmps/ExploreCmps/StayList'

export const HomePage = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadStays())
    }, [])
    const { stays } = useSelector(state => state.stayModule)


return (

    <div className="main-homepage">
        <div className="trip-filter ">
            <TripSettings />
        </div>
        <div className="hero-text">Come, stay and enjoy your day<span>.</span></div>
        <div className="hero-sector">
            <div className="hero-image">
            </div>
        </div>
        <div className="main-homepage-wrapper">
            <div className="popular-places">
                <h2 className="popular-places-headline" >Popular Places</h2>
                <PopularPlaces />
            </div>
            <div className="see-all flex flex-end">
                <Link className="see-all clean-list" to='/stay'>See All</Link>
            </div>
            <div className="top-rated">
                <h2>Top Rated Stays</h2>
                <StayList stays={stays} isTopRated={true} />
            </div>
            <div className="see-all flex flex-end">
                <Link className="see-all clean-list" to='/stay'>See All</Link>
            </div>
        </div>
        <div className="home-banner">
            <div className="content-banner">
                <h2>"Home is where your story begins."</h2>
                <h5>-Annie Danielson</h5>
                <Link className="clean-list" to="/stay"> <button>Let's go! <i className="far fa-hand-point-left"></i></button></Link>
                <div className="content-banner-2"><h4>"And all you need is a passport!"</h4></div>
            </div>
        </div>
    </div>

)
}
// class _HomePage extends Component {
//     state = {
//         popular: [{
//             name: 'New York',
//             pic: NewYork
//         }, {
//             name: 'Madrid',
//             pic: Madrid
//         },
//         {
//             name: 'Tel Aviv',
//             pic: TelAviv
//         },
//         {
//             name: 'Paris',
//             pic: Paris
//         }
//         ]
//         ,
//     }
//     async componentDidMount() {
//         await this.props.loadStays()
//     }

//     render() {
//         return (
//             <div className="main-homepage">
//                 <div className="trip-filter ">
//                     <TripSettings />
//                 </div>
//                 <div className="hero-text">Come, stay and enjoy your day<span>.</span></div>
//                 <div className="hero-sector">
//                     <div className="hero-image">
//                     </div>
//                 </div>
//                 <div className="main-homepage-wrapper">
//                     <div className="popular-places">
//                         <h2 className="popular-places-headline" >Popular Places</h2>
//                         <PopularPlaces popularLoc={this.state.popular} />
//                     </div>
//                     <div className="see-all flex flex-end">
//                         <Link className="see-all clean-list" to='/stay'>See All</Link>
//                     </div>
//                     <div className="top-rated">
//                         <h2>Top Rated Stays</h2>
//                         <TopRated stays={this.props.stays} topRatedIds={this.state.topRatedIds} />
//                     </div>
//                     <div className="see-all flex flex-end">
//                         <Link className="see-all clean-list" to='/stay'>See All</Link>
//                     </div>
//                 </div>
//                 <div className="home-banner">
//                     <div className="content-banner">
//                         <h2>"Home is where your story begins."</h2>
//                         <h5>-Annie Danielson</h5>
//                         <Link className="clean-list" to="/stay"> <button>Let's go! <i className="far fa-hand-point-left"></i></button></Link>
//                         <div className="content-banner-2"><h4>"And all you need is a passport!"</h4></div>
//                     </div>
//                 </div>
//                             </div>

//         )
//     }
// }

// const mapStateToProps = state => {
//     return {
//         stays: state.stayModule.stays,
//         currstay: state.stayModule.currstay,
//         isLoading: state.systemModule.isLoading
//     }
// }
// const mapDispatchToProps = {
//     loadStays,
//     loadStay
// }

// export const HomePage = connect(mapStateToProps, mapDispatchToProps)(_HomePage)
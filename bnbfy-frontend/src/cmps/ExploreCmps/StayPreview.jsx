import { NavLink } from 'react-router-dom'
import '../../assets/styles/font/fontawesome/css/all.css'
import { utilService } from '../../services/utilService.js'
import { ImgCarusel } from './ImgCarusel.jsx'



export function StayPreview({ stay }) {
    const reviewLength = utilService.getAmount(stay.reviews.length, 'review')
    return (
        <article className="explore-card">
            <ImgCarusel stayId={stay._id} imgs={stay.imgUrls} />
            <NavLink to={`/stay/details/${stay._id}`} className="clean-list" >
                <div className="rate-title">
                    <i className="rate-star fas fa-star"></i>
                    <span className="rate-span">
                        <span className="rate-span-avg">{stay.avgRate}</span>
                        <span className="rate-span-length">({reviewLength})</span>
                    </span>
                </div>
                <h3 className="explore-card-title">{(stay.name.length <= 30) ? stay.name : `${stay.summary.substring(0, 25)}...`} • {stay.loc.city}</h3>
                <h3 className="explore-card-title">{`${stay.summary.substring(0, 20)}...`}</h3>
                <p className="explore-card-price"><span>${stay.price}</span> / night</p>

            </NavLink>
        </article >
    )
}
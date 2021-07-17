import { StayPreview } from './StayPreview.jsx'
import { utilService } from '../../services/utilService.js'





export function StayList({ stays }) {
    // const sortedRateStay = utilService.sortByRate(stays,stays.length)
    // console.log(sortedRateStay[0])
    return (
        <div className="stay-list grid">
            {stays.map(stay =>
                <StayPreview
                    key={stay._id}
                    stay={stay}
                />)}
        </div>
    )
}

import { StayPreview } from './StayPreview.jsx'
import { utilService } from '../../services/utilService.js'





export function StayList({ stays,isTopRated =false }) {
    let sortedRateStay = utilService.sortByRate(stays,4)
    if(isTopRated) sortedRateStay = sortedRateStay.slice(0,4)
    return (
        <div className="stay-list grid">
            {sortedRateStay.map(stay =>
                <StayPreview
                    key={stay._id}
                    stay={stay}
                />)}
        </div>
    )
}

import { Link } from 'react-router-dom';
import spain from '../../assets/img/popular/spain.jpg'
import Madrid from '../../assets/img/popular/Madrid.jpg'
import TelAviv from '../../assets/img/popular/TelAviv.jpg'
import Paris from '../../assets/img/popular/Paris.jpg'
import NewYork from '../../assets/img/popular/newYork.jpg'


export function PopularPlaces() {
    const popularLoc = [
        {
            name: 'New York',
            pic: NewYork
        },
         {
            name: 'Madrid',
            pic: Madrid
        }
        ,
        {
            name: 'Tel Aviv',
            pic: TelAviv
        }
        ,
        {
            name: 'Paris',
            pic: Paris
        }
    ]
    return (
        <div className="popular-places-list grid ">
            {popularLoc.map(location =>
                <div key={location.name} className="popular-places-preview" >
                    <Link to={`/stay/${location.name}`} className="clean-list">
                        <img src={location.pic} />
                        <h5 className="popular-places-preview-location"> {location.name}</h5>
                    </Link>
                </div>)}
        </div>
    )
}
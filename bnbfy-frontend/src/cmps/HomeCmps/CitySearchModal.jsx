import '../../assets/styles/font/fontawesome/css/all.css'
export function CitySearchModal({ countrys, onClickModalInput }) {


    return (
        <div className="location-choose-modal flex column">
            {(countrys.length) ? countrys.map((country, idx) =>
                <button className="flex location-choose-modal-warpper " name={'inputLocation'} value={country} onClick={() => onClickModalInput(country)}  key={idx} >
                    <div className="location-choose-modal-svg flex justify-center align-center"><i className="fas fa-map-marker-alt" ></i></div>
                    <div className="location-choose-modal-text" >{country}</div>
                </button>
            ) : <div>No location found</div>}

        </div>
    )

}
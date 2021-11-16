
export function updateTrip(trips) {
    return async dispatch => {
        try {
            dispatch({ type:'SET_TRIP', trips })
        } catch (err) {
            dispatch({ type:'SET_ERR', err })
            console.log('tripActions: err in trip stays', err)
        }
    }
}
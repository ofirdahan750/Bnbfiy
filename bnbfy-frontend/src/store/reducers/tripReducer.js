const initialState = {
    trips: {
        inputLocation: '',
        startDate: '',
        endDate: '',
        guest: {
            adults: 0,
            kids: 0,
            infants: 0,
        }

    }
}

export function tripReducer(state = initialState, action = {}) {

    switch (action.type) {
        case 'SET_TRIP':
            return { ...state, trips: { ...action.trips } }
        case 'SET_ERR':
            return { ...state, err: { ...action.err } }
        default:
            return state
    }
}
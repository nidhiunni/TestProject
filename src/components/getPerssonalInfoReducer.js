const initialState = {
    data: [],
}
export default function (state = initialState, action) {
    console.log("reducersagaaaa")
    switch (action.type) {
        case 'SET_PERSONAL': {
            return {
                ...state,
                data: action.payload

            }
            break;
        }

    }
    return state
}
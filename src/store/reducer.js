
const initialState = {auth: false};


const reducer = (state = initialState, action) => {
    if (action.type === 'SIGN') {
        return {
            auth: !state.auth
        }
    }
    return state
}

export default reducer;
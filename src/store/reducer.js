import * as actionTypes from './actions/actionTypes';

const initialState = { auth: false };

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SIGN:
            console.log('signed in reducer', state);
            return {
                auth: !state.auth
            }
    }
    return state

}

export default reducer;
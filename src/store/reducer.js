import * as actionTypes from './actions/actionTypes';

const initialState = {
	address: null,
	auth: false,
	web3: null,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
    case actionTypes.SET_ACCOUNT:
      console.log('Redux::set account');
      return {...state, address: action.address}
    case actionTypes.SIGN:
		  console.log('Redux::sign')
      return {...state, auth: true};
    case actionTypes.TURN_ON_WEB3:
      console.log('Redux::Turn on Web3');
      return {...state, web3: action.web3};
    default:
      return state;
  }
}

export default reducer;

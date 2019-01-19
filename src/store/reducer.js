import web3 from 'web3';

const initialState = {
	address: null,
	auth: false,
	web3: null,
};

const reducer = (state = initialState, action) => {
	if (action.type === 'SIGN') {
		console.log('Redux::sign')
		return {...state, auth: !state.auth};
	}
	// if (action.type === 'WEB3') {
	// 	console.log('Redux::web3')
	// 	let provider;
	// 	if (typeof window.ethereum !== 'undefined'
	// 		|| (typeof window.web3 !== 'undefined')) {
	// 		// Already has web3!
	// 		console.log('Backstage Web3 Enabled');
	// 		// Web3 browser user detected. You can now use the provider.
	// 		provider = window['ethereum'] || window.web3.currentProvider
	// 	} else {
			
	// 	}

	// 	// const w3 = 
	// 	return {...state, web3: w3}
	// }

	return state;
}

export default reducer;

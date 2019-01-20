import * as actionTypes from './actionTypes';
import Web3 from 'web3';



export const setAuthTrue = () => {
	return {
		type: actionTypes.SIGN,
	}
}

const handleSignMessage = async ({ publicAddress, nonce, web3 }) => {
	let signature;
	try {
		signature = await web3.eth.personal.sign(
			web3.utils.fromUtf8(`I am signing my one-time nonce: ${nonce}`),
			publicAddress,
		);
	} catch (err) {
		console.error(err);
	}
	return ({ signature });
}

const handleSignup = async (publicAddress) => {
	console.log('signing up')
	const response = await fetch('http://localhost:3001/users/' + publicAddress, {
		method: 'POST',
	})
	if (response.status !== 200 && response.status !== 201) {
		throw new Error('Creating or editing a post failed!');
	}
	return response.json()
}

const handleAuthenticate = async ({ publicAddress, signature, address }) => {
	const response = await fetch(`http://localhost:3001/auth`, {
		body: JSON.stringify({ publicAddress, signature, address }),
		headers: {
			'Content-Type': 'application/json'
		},
		method: 'POST'
	})
	const token = await response.json();
	// console.log(token)
	if (token.error) {
		return false;
	}
	return true;
}

const setAccount = (account) => {
	return {
		type: actionTypes.SET_ACCOUNT,
		address: account,
	}
}

const setWeb3 = web3 => {
	return {
		type: actionTypes.TURN_ON_WEB3,
		web3,
	}
}

const verificationFailed = () => {
	return {
		type: actionTypes.VERIFICATION_FAILED,
		verificationFailed: true,
	}
}

const turnOnWeb3 = () => {
	return async (dispatch) => {
		if (window.ethereum) {
			window.web3 = new Web3(window.ethereum);
			try {
				// Request account access if needed
				await window.ethereum.enable();
				const accounts = await window.web3.eth.getAccounts();
				dispatch(setAccount(accounts[0]));
				dispatch(setWeb3(window.web3));
				console.log('ENABLED');
				return true;
			} catch (error) {
				console.log('USER DENIED');
			}
		}
		else if (window.web3) {
			window.web3 = new Web3(window.web3.currentProvider);
			const accounts = await window.web3.eth.getAccounts();
			dispatch(setAccount(accounts[0]));
			dispatch(setWeb3(window.web3));
			console.log('ENABLED');
			return true;
		}
		else {
			console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
		}
	}
}

const pollForWeb3 = (getState) => {
	return new Promise((resolve) => {
		const { web3 } = getState();
		if (web3 === null) {
			setTimeout(() => {
				pollForWeb3(getState);
			}, 2000);
		}
		resolve(true);
	})
}

export const buy = () => {
	return async (dispatch, getState) => {
		let state = getState();
		if (!state.web3) {
			const enabled = await dispatch(turnOnWeb3());
			console.log('Enabled ', enabled)
		}

		await pollForWeb3(getState);

		state = getState();

		if (state.web3) {
			
		}
	}
}

export const sign = (economyAddress) => {
	return async (dispatch, getState) => {
		let state = getState();
		if (!state.web3) {
			const enabled = await dispatch(turnOnWeb3());
			console.log('Enabled ', enabled)
		}

		await pollForWeb3(getState);

		// refresh state
		state = getState();

		if (state.web3) {
			// Check for balance and prompt to buy right away.
			// const bal = await state.web3.eth
			const publicAddress = state.address;
			const response = await fetch('http://localhost:3001/users/' + publicAddress)
			const resData = await response.json();
			const user = resData.user ? resData.user : await handleSignup(publicAddress);
			// console.log(user);
			const { signature } = await handleSignMessage(
				{
					publicAddress: publicAddress,
					nonce: user.nonce,
					web3: state.web3
				}
			);

			const authStatus = await handleAuthenticate(
				{
					publicAddress,
					signature,
					address: economyAddress
				}
			)

			if (!authStatus) {
				dispatch(verificationFailed());
			} else {
				dispatch(setAuthTrue());
			}
		}
	}
}

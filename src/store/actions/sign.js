import * as actionTypes from './actionTypes';
import Web3 from 'web3';

export const setAuthTrue = () => {
	return {
		type: actionTypes.SIGN,
	}
}

const handleSignMessage = async ({ publicAddress, nonce, state }) => {
	let signature;
	try {
		signature = await state.web3.eth.personal.sign(
			nonce,
			publicAddress
		);
	} catch (err) {
		console.error(err);
	}
	return signature;
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

const verification = (data, signature, state) => {
	return state.address === recoverAddress(data, signature, state);
}

const stdWeb3 = () => {
  const w3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io'));
  return w3;
}

const recoverAddress = (data, sig, state) => {
	const res = state.web3.eth.accounts.recover(data, sig);
	return res;
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

export const sign = () => {
	return async (dispatch, getState) => {
		let state = getState();
		if (!state.web3) {
			const enabled = await dispatch(turnOnWeb3());
			console.log('Enabled ', enabled)
		}
		const data = Web3.utils.toHex('Hello World');

		await pollForWeb3(getState);

		// refresh state
		state = getState();

		if (state.web3) {
			const signature = await handleSignMessage(
				{
					publicAddress: state.address,
					nonce: data,
					state,
				}
			);

			if (signature === null) {
				console.log('User denied signing the message');
			}
			
			// Verify steps on signature
			const verified = verification(data, signature, state);
			if (verified) {
				dispatch(setAuthTrue());
			} else {
				console.error('Verification failed');
			}
		}
	}
}

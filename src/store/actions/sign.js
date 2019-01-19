import * as actionTypes from './actionTypes';
import Web3 from 'web3';

let web3 = null;

export const setAuthTrue = () => {
    return {
        type: actionTypes.SIGN,
    }
}

const handleSignMessage = async ({ publicAddress, nonce }) => {
    let signature;
    try {
        signature = await web3.eth.personal.sign(
            web3.utils.fromUtf8(`I am signing my one-time nonce: ${nonce}`),
            publicAddress,
        );
    } catch (err) {
        console.error(err);
    }
    return ({ publicAddress, signature });
}

export const sign = () => {
    return async dispatch => {
        if (!window.web3) {
            window.alert("Please install MetaMask first.");
            return;
        }
        if (!web3) {
            web3 = new Web3(window.web3.currentProvider);
        }
        const accounts = await web3.eth.getAccounts();
        const publicAddress = accounts[0].toLowerCase();
        const {  signature } = await handleSignMessage(
            {
                publicAddress: publicAddress,
                nonce: 'hi',
            }
        );
        // Verify steps on signature
        // TODO 
        dispatch(setAuthTrue());
    }
}

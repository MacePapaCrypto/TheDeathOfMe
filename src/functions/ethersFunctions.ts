import { BigNumber, ethers } from 'ethers';
import { useContext } from 'react';
import { Context } from '../Store';
import poapABI from '../contractABIs/poapABI.json';


declare const window:any;
let provider:any = undefined;
let poapContract:any = undefined;
const FANTOM_NETWORK_ID = "250";

//Provider and Initialization
export const initializeEthers = async (dispatch:any) => {
  try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner(0);
    const addr = await signer.getAddress();

    if (window.ethereum.networkVersion === FANTOM_NETWORK_ID) {
      dispatch({type:"onFantomNetwork", content:true});
    }
    dispatch({type: 'walletContextDetected', content: true });
    dispatch({type: 'triggerAll', content: false});

    poapContract = new ethers.Contract(
      "0x5FEA5F328A516ad268cb3CF84037c155643BF650",
      poapABI,
      signer
    );

    console.log(poapContract);

    return addr;
  } catch (error) {
    console.log(error);
    dispatch({type: 'walletContextDetected', content: false });
    dispatch({type:"onFantomNetwork", content: false});
    return undefined;
  }
}

export const checkNetwork = () => {
  try {
    return (window.ethereum.networkVersion === FANTOM_NETWORK_ID);
  } catch {
    return false;
  }
}

/*export const checkTotalSupply = async (dispatch:any) => {
  try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    const supplyOfBB = await bbContract.totalSupply();
    console.log(supplyOfBB.toNumber());
    dispatch({type: 'totalBBSupply', content: supplyOfBB.toNumber()});
  } catch(error) {
    return console.log(error);
  }
}*/

export const mint = async (dispatch:any) => {
  dispatch({type: 'isMinting', content: true});
  try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const cost = 2;
    const connectedPoapContract = await poapContract.connect(signer);
    const tx = await connectedPoapContract.mint(
      {"value": ethers.utils.parseUnits(cost.toString(),'ether')}
    );
    dispatch({type: 'isMinting', content: false});
  } catch(error) {
    dispatch({type: 'isMinting', content: false});
    return console.log(error);
  }
}
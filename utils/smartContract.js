import { ethers } from "ethers";
import {
  FACTORY_CONTRACT_ABI,
  MANTLE_FACTORY_CONTRACT_ADDRESS,
  HARSH_ABI,
} from "../constants/index";
import { useNetwork } from "wagmi";

export const callContract = async (props) => {
  const { uri, supply, price, address} = props;
  if (ethereum) {
    try {
      // request for account access
      await ethereum.request({ method: "eth_requestAccounts" });
    } catch {
      console.log("User denied account access");
    }
    const provider = new ethers.providers.Web3Provider(ethereum);
    console.log("provider", provider);
    const signer = provider.getSigner();
    console.log("signer", signer);
    const contract = new ethers.Contract(
      // Polygon: 0x441d78a685da0dA6623363965Ab0AaF499Ba42dc
      // Mantle: 0x039a8561e235cf960bfed66aad74441e3594abb4
      "0xD0B8a123377C79eC69a63885485eC5AB202960b8",
      FACTORY_CONTRACT_ABI,
      signer
    );
    console.log("contract", contract);

    try {
      console.log("FINGERS CROSSED");
      console.log(address);
      const tx = await contract.createCourse(
        uri,
        supply,
        price,
        address
      );
      console.log("tx", tx);
      const receipt = await tx.wait();
      console.log(receipt);
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("Please install MetaMask!");
  }
};

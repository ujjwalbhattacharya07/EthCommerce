const { ethers } = require("hardhat");
require("@nomiclabs/hardhat-etherscan");

async function main() {
  await hre.run("verify:verify", {
    address: "0xF05B8f643979eBD9769a65bdc8A752F64E1b011f",
    constructorArguments: [
      "https://gateway.pinata.cloud/ipfs/QmUPjADFGEKmfohdTaNcWhp7VGk26h5jXDA7v3VtTnTLcW",
      100,
      ethers.utils.parseEther("0.01"),
      "0x276F740dB3e6cf7D5c752fe3D3647FC29b107EBF",
      "0xB9f9Af07fAd74C23F35CAeC708515782a15911Ba",
    ],
    contract: "contracts/Course.sol:Course",
  });
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

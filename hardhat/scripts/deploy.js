const hre = require("hardhat");

async function main() {
  const Contract = await hre.ethers.getContractFactory("FactoryCourse");
  const contract = await Contract.deploy(
    "0x4E476F7FB84c785557cDECdbf8CADEbE8EA57C37"
  );
  await contract.deployed();
  console.log("contract deployed to:", contract.address);

  console.log("Sleeping.....");
  // Wait for etherscan to notice that the contract has been deployed
  await sleep(100000); // 100 seconds

  // Verify the contract after deploying
  await hre.run("verify:verify", {
    address: contract.address,
    constructorArguments: ["0x4E476F7FB84c785557cDECdbf8CADEbE8EA57C37"],
    contract: "contracts/FactoryCourse.sol:FactoryCourse",
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


  // 0xF05B8f643979eBD9769a65bdc8A752F64E1b011f

  // factory contract address mumbai: 0x276F740dB3e6cf7D5c752fe3D3647FC29b107EBF
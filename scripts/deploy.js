// Copyright 2022 Kenth Fagerlund.
// SPDX-License-Identifier: MIT
async function main() {
    // We get the contract to deploy
    const Greeter = await ethers.getContractFactory("Sunblock");
    const greeter = await Greeter.deploy();

    console.log("Greeter deployed to:", greeter.address);
  }

  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
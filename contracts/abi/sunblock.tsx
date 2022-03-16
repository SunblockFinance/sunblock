// Copyright 2022 Kenth Fagerlund.
// SPDX-License-Identifier: MIT
export const ABI_SUNBLOCK = [
	  {
		"anonymous": false,
		"inputs": [
		  {
			"indexed": false,
			"internalType": "address",
			"name": "previousAdmin",
			"type": "address"
		  },
		  {
			"indexed": false,
			"internalType": "address",
			"name": "newAdmin",
			"type": "address"
		  }
		],
		"name": "AdminChanged",
		"type": "event"
	  },
	  {
		"anonymous": false,
		"inputs": [
		  {
			"indexed": true,
			"internalType": "address",
			"name": "beacon",
			"type": "address"
		  }
		],
		"name": "BeaconUpgraded",
		"type": "event"
	  },
	  {
		"anonymous": false,
		"inputs": [
		  {
			"indexed": false,
			"internalType": "address",
			"name": "collector",
			"type": "address"
		  },
		  {
			"indexed": false,
			"internalType": "uint256",
			"name": "amount",
			"type": "uint256"
		  },
		  {
			"indexed": false,
			"internalType": "address",
			"name": "vehicle",
			"type": "address"
		  }
		],
		"name": "CollectedReward",
		"type": "event"
	  },
	  {
		"anonymous": false,
		"inputs": [
		  {
			"indexed": false,
			"internalType": "address",
			"name": "shareholder",
			"type": "address"
		  }
		],
		"name": "NewShareholder",
		"type": "event"
	  },
	  {
		"anonymous": false,
		"inputs": [
		  {
			"indexed": false,
			"internalType": "address",
			"name": "account",
			"type": "address"
		  }
		],
		"name": "Paused",
		"type": "event"
	  },
	  {
		"anonymous": false,
		"inputs": [
		  {
			"indexed": false,
			"internalType": "address",
			"name": "holderAddress",
			"type": "address"
		  },
		  {
			"indexed": false,
			"internalType": "uint256",
			"name": "rewardShare",
			"type": "uint256"
		  }
		],
		"name": "RewardIssued",
		"type": "event"
	  },
	  {
		"anonymous": false,
		"inputs": [
		  {
			"indexed": false,
			"internalType": "uint256",
			"name": "_holderno",
			"type": "uint256"
		  },
		  {
			"indexed": false,
			"internalType": "uint256",
			"name": "rewardBalance",
			"type": "uint256"
		  }
		],
		"name": "RewardsDepleted",
		"type": "event"
	  },
	  {
		"anonymous": false,
		"inputs": [
		  {
			"indexed": true,
			"internalType": "bytes32",
			"name": "role",
			"type": "bytes32"
		  },
		  {
			"indexed": true,
			"internalType": "bytes32",
			"name": "previousAdminRole",
			"type": "bytes32"
		  },
		  {
			"indexed": true,
			"internalType": "bytes32",
			"name": "newAdminRole",
			"type": "bytes32"
		  }
		],
		"name": "RoleAdminChanged",
		"type": "event"
	  },
	  {
		"anonymous": false,
		"inputs": [
		  {
			"indexed": true,
			"internalType": "bytes32",
			"name": "role",
			"type": "bytes32"
		  },
		  {
			"indexed": true,
			"internalType": "address",
			"name": "account",
			"type": "address"
		  },
		  {
			"indexed": true,
			"internalType": "address",
			"name": "sender",
			"type": "address"
		  }
		],
		"name": "RoleGranted",
		"type": "event"
	  },
	  {
		"anonymous": false,
		"inputs": [
		  {
			"indexed": true,
			"internalType": "bytes32",
			"name": "role",
			"type": "bytes32"
		  },
		  {
			"indexed": true,
			"internalType": "address",
			"name": "account",
			"type": "address"
		  },
		  {
			"indexed": true,
			"internalType": "address",
			"name": "sender",
			"type": "address"
		  }
		],
		"name": "RoleRevoked",
		"type": "event"
	  },
	  {
		"anonymous": false,
		"inputs": [
		  {
			"indexed": false,
			"internalType": "address",
			"name": "holder",
			"type": "address"
		  },
		  {
			"indexed": false,
			"internalType": "uint256",
			"name": "sharesIssued",
			"type": "uint256"
		  }
		],
		"name": "SharesIssued",
		"type": "event"
	  },
	  {
		"anonymous": false,
		"inputs": [
		  {
			"indexed": false,
			"internalType": "address",
			"name": "targetVehicle",
			"type": "address"
		  },
		  {
			"indexed": false,
			"internalType": "uint256",
			"name": "targetAmount",
			"type": "uint256"
		  }
		],
		"name": "TargetVehicleFunded",
		"type": "event"
	  },
	  {
		"anonymous": false,
		"inputs": [
		  {
			"indexed": false,
			"internalType": "address",
			"name": "account",
			"type": "address"
		  }
		],
		"name": "Unpaused",
		"type": "event"
	  },
	  {
		"anonymous": false,
		"inputs": [
		  {
			"indexed": true,
			"internalType": "address",
			"name": "implementation",
			"type": "address"
		  }
		],
		"name": "Upgraded",
		"type": "event"
	  },
	  {
		"inputs": [],
		"name": "DEFAULT_ADMIN_ROLE",
		"outputs": [
		  {
			"internalType": "bytes32",
			"name": "",
			"type": "bytes32"
		  }
		],
		"stateMutability": "view",
		"type": "function"
	  },
	  {
		"inputs": [],
		"name": "GOVERNOR_ROLE",
		"outputs": [
		  {
			"internalType": "bytes32",
			"name": "",
			"type": "bytes32"
		  }
		],
		"stateMutability": "view",
		"type": "function"
	  },
	  {
		"inputs": [],
		"name": "MANAGER_ROLE",
		"outputs": [
		  {
			"internalType": "bytes32",
			"name": "",
			"type": "bytes32"
		  }
		],
		"stateMutability": "view",
		"type": "function"
	  },
	  {
		"inputs": [],
		"name": "PAUSER_ROLE",
		"outputs": [
		  {
			"internalType": "bytes32",
			"name": "",
			"type": "bytes32"
		  }
		],
		"stateMutability": "view",
		"type": "function"
	  },
	  {
		"inputs": [],
		"name": "UPGRADER_ROLE",
		"outputs": [
		  {
			"internalType": "bytes32",
			"name": "",
			"type": "bytes32"
		  }
		],
		"stateMutability": "view",
		"type": "function"
	  },
	  {
		"inputs": [
		  {
			"internalType": "uint256",
			"name": "_shareAmount",
			"type": "uint256"
		  }
		],
		"name": "buyShares",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	  },
	  {
		"inputs": [
		  {
			"internalType": "address",
			"name": "_vehicle",
			"type": "address"
		  },
		  {
			"internalType": "uint256",
			"name": "_amount",
			"type": "uint256"
		  }
		],
		"name": "collectRewards",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	  },
	  {
		"inputs": [],
		"name": "distributeRewards",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	  },
	  {
		"inputs": [
		  {
			"internalType": "bytes32",
			"name": "role",
			"type": "bytes32"
		  }
		],
		"name": "getRoleAdmin",
		"outputs": [
		  {
			"internalType": "bytes32",
			"name": "",
			"type": "bytes32"
		  }
		],
		"stateMutability": "view",
		"type": "function"
	  },
	  {
		"inputs": [
		  {
			"internalType": "bytes32",
			"name": "role",
			"type": "bytes32"
		  },
		  {
			"internalType": "address",
			"name": "account",
			"type": "address"
		  }
		],
		"name": "grantRole",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	  },
	  {
		"inputs": [
		  {
			"internalType": "bytes32",
			"name": "role",
			"type": "bytes32"
		  },
		  {
			"internalType": "address",
			"name": "account",
			"type": "address"
		  }
		],
		"name": "hasRole",
		"outputs": [
		  {
			"internalType": "bool",
			"name": "",
			"type": "bool"
		  }
		],
		"stateMutability": "view",
		"type": "function"
	  },
	  {
		"inputs": [
		  {
			"internalType": "address",
			"name": "_fundingInstrument",
			"type": "address"
		  },
		  {
			"internalType": "uint256",
			"name": "_unitcost",
			"type": "uint256"
		  }
		],
		"name": "initialize",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	  },
	  {
		"inputs": [],
		"name": "investmentHeld",
		"outputs": [
		  {
			"internalType": "uint256",
			"name": "",
			"type": "uint256"
		  }
		],
		"stateMutability": "view",
		"type": "function"
	  },
	  {
		"inputs": [],
		"name": "pause",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	  },
	  {
		"inputs": [],
		"name": "paused",
		"outputs": [
		  {
			"internalType": "bool",
			"name": "",
			"type": "bool"
		  }
		],
		"stateMutability": "view",
		"type": "function"
	  },
	  {
		"inputs": [],
		"name": "proxiableUUID",
		"outputs": [
		  {
			"internalType": "bytes32",
			"name": "",
			"type": "bytes32"
		  }
		],
		"stateMutability": "view",
		"type": "function"
	  },
	  {
		"inputs": [
		  {
			"internalType": "bytes32",
			"name": "role",
			"type": "bytes32"
		  },
		  {
			"internalType": "address",
			"name": "account",
			"type": "address"
		  }
		],
		"name": "renounceRole",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	  },
	  {
		"inputs": [
		  {
			"internalType": "bytes32",
			"name": "role",
			"type": "bytes32"
		  },
		  {
			"internalType": "address",
			"name": "account",
			"type": "address"
		  }
		],
		"name": "revokeRole",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	  },
	  {
		"inputs": [],
		"name": "rewardsHeld",
		"outputs": [
		  {
			"internalType": "uint256",
			"name": "",
			"type": "uint256"
		  }
		],
		"stateMutability": "view",
		"type": "function"
	  },
	  {
		"inputs": [
		  {
			"internalType": "address",
			"name": "_target",
			"type": "address"
		  },
		  {
			"internalType": "uint256",
			"name": "_amount",
			"type": "uint256"
		  }
		],
		"name": "setInvestmentTarget",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	  },
	  {
		"inputs": [],
		"name": "shareHolderCount",
		"outputs": [
		  {
			"internalType": "uint256",
			"name": "",
			"type": "uint256"
		  }
		],
		"stateMutability": "view",
		"type": "function"
	  },
	  {
		"inputs": [
		  {
			"internalType": "address",
			"name": "",
			"type": "address"
		  }
		],
		"name": "shareholder",
		"outputs": [
		  {
			"internalType": "uint256",
			"name": "shares",
			"type": "uint256"
		  }
		],
		"stateMutability": "view",
		"type": "function"
	  },
	  {
		"inputs": [],
		"name": "sharesIssued",
		"outputs": [
		  {
			"internalType": "uint256",
			"name": "",
			"type": "uint256"
		  }
		],
		"stateMutability": "view",
		"type": "function"
	  },
	  {
		"inputs": [
		  {
			"internalType": "bytes4",
			"name": "interfaceId",
			"type": "bytes4"
		  }
		],
		"name": "supportsInterface",
		"outputs": [
		  {
			"internalType": "bool",
			"name": "",
			"type": "bool"
		  }
		],
		"stateMutability": "view",
		"type": "function"
	  },
	  {
		"inputs": [],
		"name": "targetAmount",
		"outputs": [
		  {
			"internalType": "uint256",
			"name": "",
			"type": "uint256"
		  }
		],
		"stateMutability": "view",
		"type": "function"
	  },
	  {
		"inputs": [],
		"name": "targetVehicle",
		"outputs": [
		  {
			"internalType": "contract ISunblockInvestmentVehicle",
			"name": "",
			"type": "address"
		  }
		],
		"stateMutability": "view",
		"type": "function"
	  },
	  {
		"inputs": [],
		"name": "unitcost",
		"outputs": [
		  {
			"internalType": "uint256",
			"name": "",
			"type": "uint256"
		  }
		],
		"stateMutability": "view",
		"type": "function"
	  },
	  {
		"inputs": [],
		"name": "unpause",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	  },
	  {
		"inputs": [
		  {
			"internalType": "address",
			"name": "newImplementation",
			"type": "address"
		  }
		],
		"name": "upgradeTo",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	  },
	  {
		"inputs": [
		  {
			"internalType": "address",
			"name": "newImplementation",
			"type": "address"
		  },
		  {
			"internalType": "bytes",
			"name": "data",
			"type": "bytes"
		  }
		],
		"name": "upgradeToAndCall",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	  }
	]

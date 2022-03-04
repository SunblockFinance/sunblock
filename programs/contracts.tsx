import { BigNumber } from "ethers"


export type InvestmentVehicle = {
  identifier: BigNumber
  paymentInstrument: string
  unitcost: BigNumber
  investmentPool: string
  manager: string
  managementFee: BigNumber
};
/**
 * ABI for main contract on sunblock
 */
export const ABI_SUNBLOCK = [
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
				"name": "newManager",
				"type": "address"
			}
		],
		"name": "changeManager",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "identifier",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "paymentInstrument",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "investmentPool",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "manager",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "unitcost",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "managementFee",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "payer",
				"type": "address"
			}
		],
		"name": "DepositMade",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "depositRewards",
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
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "",
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
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
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
		"inputs": [
			{
				"internalType": "address",
				"name": "_tokenAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "recoverToken",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
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
				"name": "amount",
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
				"name": "holders",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "totalAmount",
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
				"name": "token",
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
				"name": "recoveryAddress",
				"type": "address"
			}
		],
		"name": "TokenRecovered",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
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
		"inputs": [],
		"name": "investmentsHeld",
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
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
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
		"inputs": [],
		"name": "vehicle",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "identifier",
				"type": "uint256"
			},
			{
				"internalType": "contract IERC20",
				"name": "paymentInstrument",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "unitcost",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "investmentPool",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "manager",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "managementFee",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

export const ABI_ERC20 = [
  {
  "constant": true,
  "inputs": [],
  "name": "name",
  "outputs": [
  {
  "name": "",
  "type": "string"
  }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
  },
  {
  "constant": false,
  "inputs": [
  {
  "name": "_spender",
  "type": "address"
  },
  {
  "name": "_value",
  "type": "uint256"
  }
  ],
  "name": "approve",
  "outputs": [
  {
  "name": "",
  "type": "bool"
  }
  ],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
  },
  {
  "constant": true,
  "inputs": [],
  "name": "totalSupply",
  "outputs": [
  {
  "name": "",
  "type": "uint256"
  }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
  },
  {
  "constant": false,
  "inputs": [
  {
  "name": "_from",
  "type": "address"
  },
  {
  "name": "_to",
  "type": "address"
  },
  {
  "name": "_value",
  "type": "uint256"
  }
  ],
  "name": "transferFrom",
  "outputs": [
  {
  "name": "",
  "type": "bool"
  }
  ],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
  },
  {
  "constant": true,
  "inputs": [],
  "name": "decimals",
  "outputs": [
  {
  "name": "",
  "type": "uint8"
  }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
  },
  {
  "constant": true,
  "inputs": [
  {
  "name": "_owner",
  "type": "address"
  }
  ],
  "name": "balanceOf",
  "outputs": [
  {
  "name": "balance",
  "type": "uint256"
  }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
  },
  {
  "constant": true,
  "inputs": [],
  "name": "symbol",
  "outputs": [
  {
  "name": "",
  "type": "string"
  }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
  },
  {
  "constant": false,
  "inputs": [
  {
  "name": "_to",
  "type": "address"
  },
  {
  "name": "_value",
  "type": "uint256"
  }
  ],
  "name": "transfer",
  "outputs": [
  {
  "name": "",
  "type": "bool"
  }
  ],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
  },
  {
  "constant": true,
  "inputs": [
  {
  "name": "_owner",
  "type": "address"
  },
  {
  "name": "_spender",
  "type": "address"
  }
  ],
  "name": "allowance",
  "outputs": [
  {
  "name": "",
  "type": "uint256"
  }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
  },
  {
  "payable": true,
  "stateMutability": "payable",
  "type": "fallback"
  },
  {
  "anonymous": false,
  "inputs": [
  {
  "indexed": true,
  "name": "owner",
  "type": "address"
  },
  {
  "indexed": true,
  "name": "spender",
  "type": "address"
  },
  {
  "indexed": false,
  "name": "value",
  "type": "uint256"
  }
  ],
  "name": "Approval",
  "type": "event"
  },
  {
  "anonymous": false,
  "inputs": [
  {
  "indexed": true,
  "name": "from",
  "type": "address"
  },
  {
  "indexed": true,
  "name": "to",
  "type": "address"
  },
  {
  "indexed": false,
  "name": "value",
  "type": "uint256"
  }
  ],
  "name": "Transfer",
  "type": "event"
  }
  ]

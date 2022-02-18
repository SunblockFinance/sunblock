
/**
 * ABI for main contract on sunblock
 */
export const ABI_SUNBLOCK = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_fee',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'shareAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'investmentInUSD',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'shareHolder',
        type: 'address',
      },
    ],
    name: 'Investment',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'shareHolder',
        type: 'address',
      },
    ],
    name: 'RewardCollected',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_tokenAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_tokenPrice',
        type: 'uint256',
      },
    ],
    name: 'addPurchaseToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_token',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_shareCount',
        type: 'uint256',
      },
    ],
    name: 'buyShares',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'claimFees',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'claimRewards',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'claimableReward',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'depositRewards',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_tokenAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_tokenPrice',
        type: 'uint256',
      },
    ],
    name: 'editPurchaseToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'fee',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'feeCollector',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'holders',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'manager',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'newInvestments',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'nodeCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'nodeHolders',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'nodeHoldersCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'purchaseTokens',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'purchaseTokensPrice',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'rewardToken',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_tokenAddress',
        type: 'address',
      },
    ],
    name: 'setDepositToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_fee',
        type: 'uint256',
      },
    ],
    name: 'setFee',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_address',
        type: 'address',
      },
    ],
    name: 'setFeeCollector',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_address',
        type: 'address',
      },
    ],
    name: 'setManager',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_count',
        type: 'uint256',
      },
    ],
    name: 'setNodeCount',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_address',
        type: 'address',
      },
    ],
    name: 'setNodeHolder',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'shareCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'sharePurchaseEnabled',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'toggleSharePurchaseEnabled',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalInvestmentsInUSD',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalRewardsDistributedInUSD',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalShareCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'totalUserRewards',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_targetAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_shareAmount',
        type: 'uint256',
      },
    ],
    name: 'transferSharesFromManager',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_token',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'withdrawToManager',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
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

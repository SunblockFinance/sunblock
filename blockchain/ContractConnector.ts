// Copyright 2022 Kenth Fagerlund.
// SPDX-License-Identifier: MIT
// ========== CONTRACT CALLS ============ //

import { BigNumber, Contract, ethers } from 'ethers'
import {
  JsonRpcProvider,
  JsonRpcSigner
} from 'ethers/node_modules/@ethersproject/providers'
import { ABI_ERC20 } from '../contracts/abi/erc20'
import { ABI_SUNBLOCK_CUBE } from '../contracts/abi/sunblock'
import { ABI_VEHICLE } from '../contracts/abi/vehicle'
import { formatUSDTWeiToNumber } from '../utils/formaters'
import { DEFAULT_CHAINID, NetworkDetails, networks } from './networks'

export interface ContractEvent {
  event: string
  data: any
}

export type eventCallback = (event: ContractEvent) => void

class ContractConnector {
  network: NetworkDetails
  provider: JsonRpcProvider
  cube: Contract
  token: Contract
  callback: eventCallback | undefined

  constructor(
    chainid: number | undefined,
    eventCallback?: (event: ContractEvent) => void
  ) {
    /**
     * Set Network
     */

    const chosenNetwork = networks[chainid || DEFAULT_CHAINID] // We default to Polygon main if user not connected
    this.callback = eventCallback
    if (chosenNetwork !== undefined) {
      this.network = chosenNetwork
    } else {
      throw `ChainID ${chainid} is currently not supported.`
    }

    /**
     * Create provider
     */
    if (this.network.providerURL.startsWith('wss')) {
      this.provider = new ethers.providers.WebSocketProvider(
        this.network.providerURL
      )
    } else if (this.network.providerURL.startsWith('http')) {
      this.provider = new ethers.providers.JsonRpcProvider(
        this.network.providerURL
      )
    } else {
      console.log(this.network.providerURL)
      throw new Error('Invalid provider URL')
    }

    /**
     * Create Cube contract. Read only
     */
    this.cube = new ethers.Contract(
      this.network.cubeContract,
      ABI_SUNBLOCK_CUBE,
      this.provider
    )

    /**
     * ERC20 token used for transactions with Cube and vehicles
     */
    this.token = new ethers.Contract(
      this.network.cubeNativeToken,
      ABI_ERC20,
      this.provider
    )
  }

  async purchaseShare(signer: JsonRpcSigner, amount: number): Promise<void> {
    if (amount === 0) return
    try {
      const sender = await signer.getAddress()
      const signedCube = this.cube.connect(signer)
      await signedCube.buyShares(amount)
      signedCube.once('SharesIssued', (addr, shares) => {
        if (this.callback && sender === addr) {
          const ev: ContractEvent = {
            event: 'SharesIssued',
            data: { address: addr, shares: shares },
          }
          this.callback(ev)
        }
      })
    } catch (error) {
      console.error
    }
  }

  /**
   *
   * @param provider metamask provider
   * @returns amount of stable coins held by the address
   */
  async getUSDTBalance(walletAddress: string): Promise<number> {
    try {
      const erc20 = new ethers.Contract(
        this.network.cubeNativeToken,
        ABI_ERC20,
        this.provider
      )
      const contractBalance = await erc20.balanceOf(walletAddress)
      return formatUSDTWeiToNumber(contractBalance)
    } catch (error) {
      console.log(error)
      return 0
    }
  }

  async getERC20Allowance(owner: string): Promise<number> {
    try {
      const amount: BigNumber = await this.token.allowance(
        owner,
        this.network.cubeContract
      )

      return formatUSDTWeiToNumber(amount)
    } catch (error) {
      console.log(error)
      return 0
    }
  }

  async approveERC20Allowance(
    signer: JsonRpcSigner,
    amount: BigNumber
  ): Promise<void> {
    try {
      const signedContract = await this.token.connect(signer)
      await signedContract.approve(this.network.cubeContract, amount)
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * Will retrieive the name of the current vehicle waiting to be funded
   * @returns name of vehicle as stated in the contract
   */
  async getCurrentTargetAmount(): Promise<number> {
    try {
      const targetAmount = await this.cube.currentTargetAmount()
      return formatUSDTWeiToNumber(targetAmount)
    } catch (error) {
      console.log(error)
      return 0
    }
  }

  async getCurrentTargetAddress(): Promise<string | undefined> {
    try {
      return await this.cube.currentVehicle()
    } catch (error) {
      console.error
      return undefined
    }
  }

  async getNextTargetAddress(): Promise<string | undefined> {
    try {
      return await this.cube.nextVehicle()
    } catch (error) {
      console.error
      return undefined
    }
  }

  /**
   * Will retrieive the name of the current vehicle waiting to be funded
   * @returns name of vehicle as stated in the contract
   */
  async getCurrentTargetName(): Promise<string> {
    try {
      const vehicleAddress = await this.cube.currentVehicle()

      const vehicle = new ethers.Contract(
        vehicleAddress,
        ABI_VEHICLE,
        this.provider
      )
      const name = await vehicle.vehicleName()

      return ethers.utils.parseBytes32String(name)
    } catch (error) {
      console.log(error)
      return ''
    }
  }

  /**
   * Well retrive the amount required to trigger funding of the vehicle
   * @returns formatted amount to be reach before funding the vehicle
   */
  async getNextTargetAmount(): Promise<number> {
    try {
      const targetAmount = await this.cube.nextTargetAmount()
      return formatUSDTWeiToNumber(targetAmount)
    } catch (error) {
      console.log(error)
      return 0
    }
  }

  /**
   * Will retrieive the name of the next vehicle waiting to be funded
   * @returns name of vehicle as stated in the contract
   */
  async getNextTargetName(): Promise<string> {
    try {
      const vehicleAddress: string = await this.cube.nextVehicle()

      const vehicle = new ethers.Contract(
        vehicleAddress,
        ABI_VEHICLE,
        this.provider
      )
      const name = await vehicle.vehicleName()
      return ethers.utils.parseBytes32String(name)
    } catch (error) {
      console.log(error)
      return ''
    }
  }

  /**
   * Fetches the amount stored in the cube investment fund. These
   * are funds that is yet to be distributed to a vehicle
   * @returns amount of funds int the investment fund
   */
  async getCubeInvestmentFund(): Promise<number> {
    try {
      const amount: BigNumber = await this.cube.investmentHeld()
      return formatUSDTWeiToNumber(amount)
    } catch (error) {
      console.log(error)
      return 0
    }
  }

  /**
   * Get the amount of rewards, in the set currency, stored and waiting for distribution.
   * @returns amount of rewards waiting for distribution. Returned formatted
   */
  async getCubeRewardFund(): Promise<number> {
    try {
      const amount: BigNumber = await this.cube.rewardsHeld()
      return formatUSDTWeiToNumber(amount)
    } catch (error) {
      console.log(error)
      return 0
    }
  }

  /**
   * Will retreive the amount of shares held by a specific address
   * @returns count of shares held by this address
   */
  async getHeldShares(address: string | string[]): Promise<number> {
    try {
      const amount: BigNumber = await this.cube.shareholder(address)
      return amount.toNumber()
    } catch (error) {
      console.log(error)
      return 0
    }
  }

  /**
   *
   * @returns Total amount of shares issued by this cube
   */
  async getSharesIssued(): Promise<number> {
    try {
      const amount: BigNumber = await this.cube.sharesIssued()
      return amount.toNumber()
    } catch (error) {
      console.log(error)
      return 0
    }
  }

  async getSharePrice(): Promise<number> {
    try {
      const cost: BigNumber = await this.cube.unitcost()
      return formatUSDTWeiToNumber(cost)
    } catch (error) {
      console.log(error)
      return 0
    }
  }

  async getShareholderCount(): Promise<number> {
    try {
      const amount: BigNumber = await this.cube.shareHolderCount()
      return amount.toNumber()
    } catch (error) {
      console.log(error)
      return 0
    }
  }

  /**
   * Well retrive the amount required to trigger funding of the vehicle
   * @returns formatted amount to be reach before funding the vehicle
   */
  async getVehicleInvestmentPool(vehicleAddress: string): Promise<string> {
    try {
      const vehicle = new ethers.Contract(
        vehicleAddress,
        ABI_VEHICLE,
        this.provider
      )

      const amount: BigNumber = await vehicle.investmentPool()
      return ethers.utils.formatUnits(amount, 6)
    } catch (error) {
      console.log(error)
      return ''
    }
  }

  async getVehicleRewardPool(vehicleAddress: string): Promise<string> {
    try {
      const vehicle = new ethers.Contract(
        vehicleAddress,
        ABI_VEHICLE,
        this.provider
      )
      const amount: BigNumber = await vehicle.rewardPool()
      return ethers.utils.formatUnits(amount, 6)
    } catch (error) {
      console.log(error)
      return ''
    }
  }
}

export default ContractConnector

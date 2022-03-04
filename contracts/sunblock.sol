// SPDX-License-Identifier: MIT

/**
             _   _         _     ___ _
 ___ _ _ ___| |_| |___ ___| |_  |  _|_|___ ___ ___ ___ ___
|_ -| | |   | . | | . |  _| '_|_|  _| |   | .'|   |  _| -_|
|___|___|_|_|___|_|___|___|_,_|_|_| |_|_|_|__,|_|_|___|___|

*/

// Developed by Kenth Fagerlund (https://github.com/arkalon76)
// Inspired by the fantastic work by Dogu Deniz UGUR (https://github.com/DoguD)

// contracts/sunblock.sol

pragma solidity ^0.8.7;
import '@openzeppelin/contracts/security/Pausable.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/utils/math/SafeMath.sol';
import '@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol';
import '@openzeppelin/contracts/utils/structs/EnumerableSet.sol';

/**
    @title Sunblock investment vehicle
    @author Kenth Fagerlund
    @dev This constract allows users to combined their resources to purchase a high yield investment
    and toghether share the rewards.
    A very simple system where each participant will buy shares at a fixed price. Each share will count
    against the reward pool that comes from the investment. Each share is an equal part of the reward pie.

    The investment is usually done manually since the investments are off chain or does not allow contract to contract purchase.
    This requires A LOT of trust from each participant as as such should be used with EXTREME caution. There is no safety nest's
    included in this version of the contract. Just keep that in mind.
 */
contract Sunblock is Pausable, Ownable, ReentrancyGuard {
  using SafeMath for uint256;
  using SafeERC20 for IERC20;
  using EnumerableSet for EnumerableSet.AddressSet;

  /**
        @dev Representation of what this contract invests in. Dictates what form of payment the contract
        accept and the price per share.
     */
  struct InvestmentVehicle {
    uint256 identifier; // Unique identifier for this vehicle
    IERC20 paymentInstrument; //Token used to purchase shares in this vehicle
    uint256 unitcost; // Cost of one share using token specified in paymentInstrument
    address investmentPool; // Wallet used to store incoming investments
    address manager; // Current manager of this investment Vehicle. Recieves fees from rewards
    uint256 managementFee; // Fee taken from the reward prior to distribution. No fee for investment pool. EVER.
  }

  struct Shareholder {
    uint256 shares;
  }

  // #### Variables ####
  InvestmentVehicle public vehicle; // Specifies what investment vehicle this contract allows. DO NOT CHANGE THIS STATE!!
  uint256 public sharesIssued;

  // #### Mappings ####
  mapping(address => Shareholder) public shareholder;
  EnumerableSet.AddressSet private holders;

  // #### Events #### //
  event SharesIssued(address holder, uint256 sharesIssued);
  event DepositMade(uint256 amount, address payer);
  event RewardIssued(address holder, uint256 amount);
  event RewardsDepleted(uint256 holders, uint256 totalAmount);
  event TokenRecovered(address token, uint256 amount, address recoveryAddress);
  event NewShareholder(address);

  constructor(
    uint256 identifier,
    address paymentInstrument,
    address investmentPool,
    address manager,
    uint256 unitcost,
    uint256 managementFee
  ) {
    vehicle = InvestmentVehicle(
      identifier,
      IERC20(paymentInstrument),
      unitcost,
      investmentPool,
      manager,
      managementFee
    );
  }

  function shareHolderCount() external view returns(uint256){
     return EnumerableSet.length(holders);
  }

  // buyShares allows a signer to be issued a set amount of shares (_shareAmounts) against a payment
  // as described in the Investment Vehicle.
  // The signer will pay (_shareAmount * InvestmentVehicle.unitcost) with the token
  // mentioned in (InvestmentVehicle.paymentInstrument)
  function buyShares(uint256 _shareAmount) external nonReentrant {
    require(_shareAmount > 0, 'Share amount must be 1 or more');
    // Transfer funds into the pool
    bool success = vehicle.paymentInstrument.transferFrom(
      msg.sender,
      vehicle.investmentPool,
      vehicle.unitcost.mul(_shareAmount)
    );
    require(success, 'Failed to transfer');
    // Issue shares to the signer.
    Shareholder storage sh = shareholder[msg.sender];
    sh.shares += _shareAmount;
    bool newHolder = EnumerableSet.add(holders, msg.sender);
    if (newHolder) {
      emit NewShareholder(msg.sender);
    }
    sharesIssued += _shareAmount;

    //Emit events
    emit SharesIssued(msg.sender, _shareAmount);
  }

  // Returns amount of tokens in the investement pool that is waiting to be invested in the Investment Vehicle.
  function investmentsHeld() external view returns (uint256) {
    return vehicle.paymentInstrument.balanceOf(vehicle.investmentPool);
  }

  // Returns of tokens in the reward pool that is waiting to be distributed to shareholders
  function rewardsHeld() external view returns (uint256) {
    return vehicle.paymentInstrument.balanceOf(address(this));
  }

  // #### --------------- #### //
  // #### ADMIN FUNCTIONS #### //
  // #### --------------- #### //

  // Allows for the manager to be changed during the lifetime of the contract
  function changeManager(address newManager) external onlyOwner nonReentrant {
    require(vehicle.manager != newManager, 'Cannot be same manager');
    vehicle.manager = newManager;
  }

  // Allow to withdraw any arbitrary token, should be used by
  // contract owner to recover accidentally received funds.
  function recoverToken(address _tokenAddress, uint256 amount)
    external
    onlyOwner
    nonReentrant
  {
    require(
      _tokenAddress != address(vehicle.paymentInstrument),
      "You can't recover payment instrument token"
    ); // No stealing our investments!
    bool success = IERC20(_tokenAddress).transfer(msg.sender, amount);
    require(success, 'Unable to transfer recovered token');
    emit TokenRecovered(_tokenAddress, amount, msg.sender);
  }

  // Will deposit any rewards in the token as dictated by the payment instrument.
  function depositRewards(uint256 _amount) external onlyOwner nonReentrant {
    require(_amount > 0, 'Amount must be over 0');
    uint256 rewardAfterFee = (_amount * (1000 - 100)) / 1000;
    uint256 managerfee = _amount - rewardAfterFee;
    bool depositSuccess = vehicle.paymentInstrument.transferFrom(
      msg.sender,
      address(this),
      rewardAfterFee
    );
    require(depositSuccess, 'Unable to deposit rewards');
    bool feeSuccess = vehicle.paymentInstrument.transferFrom(
      msg.sender,
      vehicle.manager,
      managerfee
    ); // Fee deducted before distribution so manager can pay for gas.
    require(feeSuccess, 'Unable to transfer fee to manager');
    emit DepositMade(_amount, msg.sender);
  }

  /**
   *
   * @dev Will distribute the rewards to shareholder.
   * Note that the fee has been taken when rewards were deposited so the full sum
   * is distrubuted at this time
   */
  function distributeRewards() external onlyOwner nonReentrant {
    // How much rewards do we have to dish out?
    uint256 rewardBalance = vehicle.paymentInstrument.balanceOf(address(this));
    require(rewardBalance > 0, 'No rewards to distribute');

    // How much reward for each share
    uint256 rewardPerShare = rewardBalance / sharesIssued;

    // Loop though all shareholders so we can issue their share
    uint256 _holderno = EnumerableSet.length(holders);
    for (uint256 i = 0; i < _holderno; ++i) {
      // How many shares does the holder have?
      address holderAddr = EnumerableSet.at(holders, i);
      Shareholder memory holder = shareholder[holderAddr];

      // How much is his/her/their share
      uint256 rewardShare = rewardPerShare * holder.shares;
      vehicle.paymentInstrument.safeTransfer(holderAddr, rewardShare);

      emit RewardIssued(holderAddr, rewardShare);
    }
    emit RewardsDepleted(_holderno, rewardBalance);
  }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol';
import '@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';
import '@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol';

/// @custom:security-contact security@sunblock.finance
contract InvestmentVehicle is
  Initializable,
  PausableUpgradeable,
  AccessControlUpgradeable,
  UUPSUpgradeable
{
  bytes32 public constant PAUSER_ROLE = keccak256('PAUSER_ROLE');
  bytes32 public constant UPGRADER_ROLE = keccak256('UPGRADER_ROLE');
  bytes32 public constant MANAGER_ROLE = keccak256('MANAGER_ROLE');

  IERC20 public paymentInstrument; // Token used to be used for investment and reward. This will be later bridged and swapped to vehicle token
  uint256 public managementFee; // Fee taken from the reward prior to distribution. No fee for investment pool. EVER.
  uint256 public investmentPool; // Current stored investment in the pool
  uint256 public rewardPool; // Current stored rewards in the pool
  uint256 public feePool; // This pool collects the fees owed to the manager of the investment vehicle

  // ========= EVENTS =========== //
  event InvestmentDeposited(address from, address by, uint256 amount);
  event InvestmentWithdrawn(address to, address by, uint256 amount);
  event RewardDeposited(address from, address by, uint256 amount);
  event RewardWithdrawn(address to, address by, uint256 amount);
  event FeeWithdrawn(address to, address by, uint256 amount);
  /// @custom:oz-upgrades-unsafe-allow constructor
  constructor() initializer {}

  function initialize(address instrument, uint256 fee) public initializer {
    __Pausable_init();
    __AccessControl_init();
    __UUPSUpgradeable_init();

    _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    _grantRole(PAUSER_ROLE, msg.sender);
    _grantRole(UPGRADER_ROLE, msg.sender);
    _grantRole(MANAGER_ROLE, msg.sender);

    paymentInstrument = IERC20(instrument);
    managementFee = fee;
  }


  function depositInvestment(address invPool, uint256 amount) external  onlyRole(MANAGER_ROLE) returns(bool) {
    bool success = paymentInstrument.transferFrom(invPool, address(this), amount);
    require(success, "Unable to deposit funds to contract");
    investmentPool += amount;
    emit InvestmentDeposited(invPool, msg.sender, amount);
    return success;
  }
  function withdrawInvestment(address receiver, uint256 amount) external onlyRole(MANAGER_ROLE) returns(bool) {
    require(investmentPool >= amount,'Not enough balance in investment pool for withdrawal');
    bool success = paymentInstrument.transfer(receiver, amount);
    require(success, "Unable to withdraw investment funds from contract");
    investmentPool -= amount;
    emit InvestmentWithdrawn(receiver, msg.sender, amount);
    return success;
  }
  function depositReward(address _rewardPool, uint256 _amount) external onlyRole(MANAGER_ROLE) returns(bool) {
    require(_amount > 0, 'Amount must be over 0');
    uint256 rewardAfterFee = _extractFee(_amount);
    bool success = paymentInstrument.transferFrom(_rewardPool, address(this), _amount);
    require(success, 'Unable to deposit rewards');
    rewardPool += rewardAfterFee;
    emit RewardDeposited(_rewardPool, msg.sender, _amount);
    return success;
  }
  function withdrawReward(address receiver, uint256 _amount) external onlyRole(MANAGER_ROLE) returns(bool) {
   require(rewardPool >= _amount, "Not enough balance in reward pool for withdrawal");
    bool success = paymentInstrument.transfer(receiver, _amount);
    require(success, "Unable to withdraw reward funds from contract");
    rewardPool -= _amount;
    emit RewardWithdrawn(receiver, msg.sender, _amount);
    return success;
  }
  function withdrawManagerFee(address receiver, uint256 _amount) external onlyRole(MANAGER_ROLE) returns(bool){
    require(feePool >= _amount, "Not enough balance in fee pool for withdrawal");
    bool success = paymentInstrument.transfer(receiver, _amount);
    require(success, "Unable to withdraw reward funds from contract");
    feePool -= _amount;
    emit FeeWithdrawn(receiver, msg.sender, _amount);
    return success;
  }
  function _extractFee(uint256 _amount) internal returns(uint256) {
    uint256 rewardAfterFee = (_amount * (1000 - managementFee)) / 1000;
    uint256 managerfee = _amount - rewardAfterFee;
    feePool += managerfee;
    return rewardAfterFee;
  }

  function pause() public onlyRole(PAUSER_ROLE) {
    _pause();
  }

  function unpause() public onlyRole(PAUSER_ROLE) {
    _unpause();
  }

  function _authorizeUpgrade(address newImplementation)
    internal
    override
    onlyRole(UPGRADER_ROLE)
  {}
}

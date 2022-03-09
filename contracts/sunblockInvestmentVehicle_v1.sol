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

  // ========= EVENTS =========== //
  event InvestmentDeposited(address from, address by, uint256 amount);

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
      emit InvestmentDeposited(invPool, msg.sender, amount);
      return success;
  }
  function withdrawInvestment() external onlyRole(MANAGER_ROLE) {}
  function depositReward() external onlyRole(MANAGER_ROLE) {}
  function withdrawReward() external onlyRole(MANAGER_ROLE) {}
  function _extractFee() internal {}


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

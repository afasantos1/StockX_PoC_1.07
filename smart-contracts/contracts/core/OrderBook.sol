// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title OrderBook
 * @dev Smart contract for managing order settlement on-chain
 */
contract OrderBook is AccessControl {
    bytes32 public constant RELAYER_ROLE = keccak256("RELAYER_ROLE");

    struct Order {
        address user;
        address token;
        bool isBuy;
        uint256 price;
        uint256 quantity;
        uint256 nonce;
        uint256 expiry;
        bytes signature;
        bool filled;
    }

    mapping(bytes32 => Order) public orders;
    mapping(address => uint256) public nonces;

    event OrderMatched(
        bytes32 indexed orderHash,
        address indexed buyer,
        address indexed seller,
        address token,
        uint256 price,
        uint256 quantity
    );

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function settleTrade(
        Order memory buyOrder,
        Order memory sellOrder
    ) external onlyRole(RELAYER_ROLE) {
        require(
            !orders[keccak256(abi.encodePacked(buyOrder))].filled,
            "OrderBook: Buy order already filled"
        );
        require(
            !orders[keccak256(abi.encodePacked(sellOrder))].filled,
            "OrderBook: Sell order already filled"
        );
        require(
            buyOrder.price >= sellOrder.price,
            "OrderBook: Price mismatch"
        );

        orders[keccak256(abi.encodePacked(buyOrder))].filled = true;
        orders[keccak256(abi.encodePacked(sellOrder))].filled = true;

        emit OrderMatched(
            keccak256(abi.encodePacked(buyOrder)),
            buyOrder.user,
            sellOrder.user,
            buyOrder.token,
            buyOrder.price,
            buyOrder.quantity
        );
    }
}

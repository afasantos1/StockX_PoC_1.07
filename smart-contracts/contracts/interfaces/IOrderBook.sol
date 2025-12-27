// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title IOrderBook
 * @dev Interface for OrderBook contract
 */
interface IOrderBook {
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

    function settleTrade(Order memory buyOrder, Order memory sellOrder) external;
    function orders(bytes32) external view returns (bool);
}

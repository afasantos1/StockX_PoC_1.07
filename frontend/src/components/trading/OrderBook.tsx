import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface OrderBookProps {
  symbol: string;
}

const OrderBook: React.FC<OrderBookProps> = ({ symbol }) => {
  // Mock order book data
  const buyOrders = [
    { price: 175.45, quantity: 150, total: 26317.50 },
    { price: 175.40, quantity: 200, total: 35080.00 },
    { price: 175.35, quantity: 100, total: 17535.00 },
    { price: 175.30, quantity: 75, total: 13147.50 },
    { price: 175.25, quantity: 300, total: 52575.00 },
  ];

  const sellOrders = [
    { price: 175.50, quantity: 120, total: 21060.00 },
    { price: 175.55, quantity: 180, total: 31599.00 },
    { price: 175.60, quantity: 90, total: 15804.00 },
    { price: 175.65, quantity: 250, total: 43912.50 },
    { price: 175.70, quantity: 160, total: 28112.00 },
  ];

  return (
    <div className="card">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Order Book
      </h2>

      <div className="space-y-4">
        {/* Sell Orders (Asks) */}
        <div>
          <div className="flex items-center justify-between text-xs font-medium text-gray-600 dark:text-gray-400 mb-2 px-2">
            <span>Price</span>
            <span>Quantity</span>
            <span>Total</span>
          </div>
          <div className="space-y-1">
            {sellOrders.map((order, index) => (
              <div
                key={`sell-${index}`}
                className="flex items-center justify-between p-2 hover:bg-danger-50 dark:hover:bg-danger-900/20 rounded cursor-pointer transition-colors group"
              >
                <div className="flex items-center space-x-2 flex-1">
                  <ArrowUpRight className="w-3 h-3 text-danger-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="font-medium text-danger-600 dark:text-danger-400">
                    ${order.price.toFixed(2)}
                  </span>
                </div>
                <span className="text-gray-700 dark:text-gray-300 flex-1 text-right">
                  {order.quantity}
                </span>
                <span className="text-gray-600 dark:text-gray-400 flex-1 text-right text-sm">
                  ${order.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Spread */}
        <div className="py-3 border-t border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-center space-x-2">
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              ${((sellOrders[0].price + buyOrders[0].price) / 2).toFixed(2)}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Spread: ${(sellOrders[0].price - buyOrders[0].price).toFixed(2)}
            </span>
          </div>
        </div>

        {/* Buy Orders (Bids) */}
        <div>
          <div className="space-y-1">
            {buyOrders.map((order, index) => (
              <div
                key={`buy-${index}`}
                className="flex items-center justify-between p-2 hover:bg-success-50 dark:hover:bg-success-900/20 rounded cursor-pointer transition-colors group"
              >
                <div className="flex items-center space-x-2 flex-1">
                  <ArrowDownRight className="w-3 h-3 text-success-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="font-medium text-success-600 dark:text-success-400">
                    ${order.price.toFixed(2)}
                  </span>
                </div>
                <span className="text-gray-700 dark:text-gray-300 flex-1 text-right">
                  {order.quantity}
                </span>
                <span className="text-gray-600 dark:text-gray-400 flex-1 text-right text-sm">
                  ${order.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderBook;

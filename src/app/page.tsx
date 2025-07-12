"use client";

import React from "react";

export default function Dashboard() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isConnected, setIsConnected] = React.useState(false);
  const [totalValue, setTotalValue] = React.useState(0);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      setIsConnected(true);
      setTotalValue(4500);
    }, 1000);
  }, []);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100">
            {/* <ChartPie className="w-4 h-4" /> */}
            View Analytics
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            {/* <Wallet className="w-4 h-4" /> */}
            Connect Wallet
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm font-medium">Total Portfolio Value</h2>
            {/* <DollarSign className="h-4 w-4 text-gray-400" /> */}
          </div>
          <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
          <p className="text-xs text-gray-500">Across all chains</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm font-medium">Asset Distribution</h2>
            {/* <BarChart2 className="h-4 w-4 text-gray-400" /> */}
          </div>
          <div className="space-y-2">
            {isLoading ? (
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
            ) : (
              <div>Asset distribution will be shown here</div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm font-medium">DeFi Positions</h2>
            {/* <Bank className="h-4 w-4 text-gray-400" /> */}
          </div>
          <div className="space-y-2">
            {isLoading ? (
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
            ) : (
              <div>DeFi positions will be shown here</div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="border-b pb-4">
          <div className="flex gap-4">
            <button className="px-4 py-2 border-b-2 border-blue-600 text-blue-600">Recent Transactions</button>
            <button className="px-4 py-2">Payment Activity</button>
          </div>
        </div>
        <div className="space-y-4">
          {isLoading ? (
            <div className="h-12 w-full bg-gray-200 rounded animate-pulse" />
          ) : (
            <div>Recent transactions will be shown here</div>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import { AAVEVaultProvider } from "@/components/provider/AAVEVaultProvider";
import AAVEYieldAcrossChains from "@/components/aave/AAVEYieldAcrossChains";
import React from "react";
import { BiWallet } from "react-icons/bi";
import { FaChartPie } from "react-icons/fa";

export default function Dashboard() {
  return (
    <div className="container mx-auto p-6">
      
      {/* <div className="mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">AACE Yield USDC Optimizer</h1> */}
          {/* TODO: Possiblity to add quick action for users */}
          {/* <div className="flex gap-4">
            <button className="flex items-center gap-2 px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100">
              <FaChartPie className="w-4 h-4" /> 
              View Analytics
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              <BiWallet className="w-4 h-4" />
              Connect Wallet
            </button>
          </div> */}
        {/* </div>

        <h2>Find the best Yield across chains and rebalance instantly</h2>
      </div> */}

      {/* TODO: Psossibility to add quick wallet observation on the user */}

      {/* TODO: Show the best here */}

      {/* Display for all chain the yield */}
      <AAVEVaultProvider>
        <AAVEYieldAcrossChains />
      </AAVEVaultProvider>
    </div>
  );
}

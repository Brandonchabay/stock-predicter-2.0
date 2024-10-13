"use client";
import { useState } from "react";
import Chart from "../Components/Chart";
import StockList from "../Components/StocksList";
import Navbar from "../Components/Navbar";

export default function Dashboard() {
  const [selectedStock, setSelectedStock] = useState(null);

  const handleStockClick = (stock) => {
    // Toggle the chart display based on the selected stock
    if (selectedStock === stock) {
      setSelectedStock(null); // Hide chart if the same stock is clicked
    } else {
      setSelectedStock(stock); // Show the chart for the selected stock
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col md:flex-row h-screen">
        <div className="w-full md:w-1/3 p-4 border-r">
          {/* Pass the handleStockClick function to StockList */}
          <StockList onStockClick={handleStockClick} />
        </div>
        <div className="w-full md:w-2/3 p-4">
          {/* Render Chart only if a stock is selected */}
          {selectedStock && <Chart stock={selectedStock} />}
        </div>
      </div>
    </div>
  );
}

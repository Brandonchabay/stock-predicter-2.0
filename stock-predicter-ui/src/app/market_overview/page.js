"use client";
import { useState } from "react";
import Chart from "../Components/Chart";
import Navbar from "../Components/Navbar";
import StockList from "../Components/StocksList";
import CircularProgress from "@mui/material/CircularProgress";
import TextGeneratorEffect from "../Components/TextGeneratorEffect";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function MarketOverview() {
  const [selectedStock, setSelectedStock] = useState(null);
  const [data, setData] = useState(null);
  const [loadingStockData, setLoadingStockData] = useState(false);
  const [loadingAiSuggestions, setLoadingAiSuggestions] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const stocks = ["AAPL", "TSLA", "AMZN", "GOOGL", "MSFT"];

  // Function to sequentially generate AI suggestions
  const fetchAiSuggestions = async (stock) => {
    setLoadingAiSuggestions(true);
    setAiSuggestions([]); // Clear previous suggestions
    try {
      const response = await fetch("http://localhost:5000/getAI", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: stock }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch AI suggestions");
      }

      const result = await response.json();
      if (result.code === "SUCCESS") {
        for (const suggestion of result.message) {
          await new Promise((resolve) => {
            setAiSuggestions((prevSuggestions) => [
              ...prevSuggestions,
              suggestion,
            ]);
            setTimeout(resolve, 2000);
          });
        }
      } else {
        throw new Error(result.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error fetching AI suggestions:", error);
    } finally {
      setLoadingAiSuggestions(false);
    }
  };

  const fetchStockData = async (stock) => {
    setLoadingStockData(true);
    try {
      const response = await fetch(`http://localhost:5000/getData/${stock}`);
      if (!response.ok) {
        console.error("Network response was not ok:", response.statusText);
        return;
      }
      const newData = await response.json();
      const convertedData = newData.map((entry) => ({
        ...entry,
        date: new Date(entry.date),
      }));
      setData(convertedData);
    } catch (error) {
      console.error("Error fetching stock data:", error);
    } finally {
      setLoadingStockData(false);
    }
  };

  const handleStockClick = (stock) => {
    if (selectedStock === stock) {
      setSelectedStock(null);
      setData(null);
      setAiSuggestions([]);
    } else {
      setSelectedStock(stock);
      fetchStockData(stock);
      fetchAiSuggestions(stock);
    }
  };

  const isLoading = loadingStockData || loadingAiSuggestions;

  return (
    <div>
      <Navbar />
      <div className="flex flex-col md:flex-row h-screen">
        <div className="w-full md:w-1/3 p-4 border-r">
          <StockList
            stocks={stocks}
            onStockClick={handleStockClick}
            loading={isLoading}
            selectedStock={selectedStock}
          />
        </div>
        <div className="w-full md:w-2/3 p-4">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <CircularProgress size={100} />
            </div>
          ) : (
            selectedStock && (
              <div>
                <Chart stockData={data} />
                <div className="space-y-3 font-bold mt-10">
                  {aiSuggestions.map((suggestion, index) => (
                    <Card
                      key={index}
                      variant="outlined"
                      className="bg-gray-100"
                    >
                      <CardContent>
                        <Typography variant="h6" component="div">
                          AI Suggestion {index + 1}
                        </Typography>
                        <TextGeneratorEffect text={suggestion} speed={20} />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

"use client";
import "ag-charts-enterprise";
import { AgFinancialCharts } from "ag-charts-react";
import { useState } from "react";

export default function Chart({ stockData }) {
  const [options] = useState({
    data: stockData,
    dateKey: "date",
    openKey: "open",
    highKey: "high",
    lowKey: "low",
    closeKey: "close",
    volumeKey: "volume",
    chartType: "candlestick",
    navigator: true,
    toolbar: true,
    rangeButtons: true,
    volume: true,
    statusBar: true,
    zoom: true,
    barWidth: 1,
  });

  return <AgFinancialCharts options={options} />;
}

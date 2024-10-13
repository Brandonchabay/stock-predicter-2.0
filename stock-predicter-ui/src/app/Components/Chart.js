"use client";
import "ag-charts-enterprise";
import { AgFinancialCharts } from "ag-charts-react";
import { useState } from "react";

export default function Chart() {
  const mockData = [
    {
      date: new Date("2024-10-01"),
      open: 150,
      high: 155,
      low: 148,
      close: 152,
      volume: 3000,
    },
    {
      date: new Date("2024-10-02"),
      open: 152,
      high: 160,
      low: 151,
      close: 157,
      volume: 2800,
    },
    {
      date: new Date("2024-10-03"),
      open: 157,
      high: 162,
      low: 156,
      close: 161,
      volume: 3200,
    },
    {
      date: new Date("2024-10-04"),
      open: 161,
      high: 165,
      low: 160,
      close: 163,
      volume: 3500,
    },
    {
      date: new Date("2024-10-05"),
      open: 163,
      high: 168,
      low: 162,
      close: 167,
      volume: 3100,
    },
  ];
  const [options] = useState({
    data: mockData,
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

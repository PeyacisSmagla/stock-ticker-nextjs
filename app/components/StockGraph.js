"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Brush,
} from "recharts";
import NoDataFound from "./NoDataFound";

const StockGraph = ({ data }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return <NoDataFound />;
  }

  const latest = data[data.length - 1];

  const yDomain = () => {
    const closes = data.map((d) => d.close);
    const min = Math.min(...closes);
    const max = Math.max(...closes);
    const buffer = Math.max(5, (max - min) * 0.2);
    return [min - buffer, max + buffer];
  };

  return (
    <div className="p-6 md:px-6 md:py-10 bg-gray-900 rounded-xl text-white w-full max-w-4xl mx-auto shadow-md">
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="areaColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f85f5fff" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              tickFormatter={(dateStr) => {
                const localDate = new Date(dateStr);
                return localDate.toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                });
              }}
              minTickGap={20}
              tick={{ fill: "#ccc", fontSize: 12 }}
            />
            <YAxis domain={yDomain()} tick={{ fill: "#ccc", fontSize: 12 }} />
            <CartesianGrid stroke="#444" />
            <Tooltip
              contentStyle={{ backgroundColor: "#111", borderColor: "#333" }}
            />
            <Area
              type="monotone"
              dataKey="close"
              stroke="#a72c2cff"
              strokeWidth={3}
              fill="url(#areaColor)"
              dot={false}
            />
            <Brush
              dataKey="date"
              height={30}
              stroke="#d75050ff"
              travellerWidth={10}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-sm text-gray-300">
        <p>
          <strong>Close:</strong> ₹{latest?.close} &nbsp;|{" "}
          <strong>Open:</strong> ₹{latest?.open}
        </p>
        <p>
          <strong>High:</strong> ₹{latest?.high} &nbsp;| <strong>Low:</strong> ₹
          {latest?.low}
        </p>
        <p>
          <strong>Change:</strong> {latest?.change} ({latest?.percent}%) &nbsp;|{" "}
          <strong>Volume:</strong> {(latest?.volume / 1e5).toFixed(1)}L
        </p>
        <p>
          <strong>Value:</strong> ₹{(latest?.value / 1e7).toFixed(2)} Cr
        </p>
      </div>
    </div>
  );
};

export default StockGraph;

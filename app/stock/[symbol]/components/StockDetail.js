"use client";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Bookmark, ChevronRight } from "lucide-react";

import StockGraph from "./StockGraph";
import NoDataFound from "../../../components/NoDataFound";
import { useSearchParams } from "next/navigation";

function Stat({ label, value }) {
  return (
    <div className="">
      <p className="text-sm text-blue-500">{label}</p>
      <p className="text-xs font-medium text-[var(--primary)]">{value}</p>
    </div>
  );
}

export default function StockDetail({ data, symbol }) {
  const params = useSearchParams();
  const name = params.get("company");

  const [isFav, setIsFav] = useState(false);
  const latest =
    Array.isArray(data) && data.length > 0 ? data[data.length - 1] : null;

  const toggleFavorite = () => {
    const favs = JSON.parse(localStorage.getItem("favStocks")) || [];
    let updatedFavs;

    if (favs.includes(symbol)) {
      updatedFavs = favs.filter((item) => item !== symbol);
      setIsFav(false);
    } else {
      updatedFavs = [...favs, symbol];
      setIsFav(true);
    }

    localStorage.setItem("favStocks", JSON.stringify(updatedFavs));
  };

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favStocks")) || [];
    setIsFav(favs.includes(symbol));
  }, [symbol]);

  if (!data || data?.length === 0) return <NoDataFound />;

  return (
    <>
      <div className="flex items-center text-xs text-gray-400">
        <Link href={"/"}>Dashboard</Link>
        <ChevronRight strokeWidth={1.75} size={18} />
        <p>Stock Details</p>
      </div>
      <div className="flex items-center text-xs text-gray-400 gap-3">
        <h1 className="text-xl font-bold text-[var(--primary)] lg:my-3">
          {name || ""} Stock Details
        </h1>
        <button
          onClick={toggleFavorite}
          className="transition duration-200 hover:scale-110 cursor-pointer"
          title="Make it your favourite stock"
        >
          <Bookmark
            className={`w-5 h-5 ${
              isFav ? "text-blue-500 fill-blue-500" : "text-gray-500"
            }`}
          />
        </button>
      </div>

      <div className="w-full h-64  space-y-4">
        <div className="bg-search rounded-lg p-4 shadow-lg mb-6 flex justify-between items-center border-blue mt-5">
          <div>
            <h3 className=" font-bold text-[var(--primary)]">{symbol}</h3>
            <p className="text-sm text-gray-400">
              {latest?.date?.split(" ")[0]}
            </p>
          </div>
          <div className="text-right">
            <p className=" font-semibold text-blue-600">₹{latest.close}</p>
            <p
              className={`text-sm ${
                latest.change >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {latest.change >= 0 ? "▲" : "▼"} {latest.change} ({latest.percent}
              %)
            </p>
          </div>
        </div>
        <div className="p-4 flex flex-col md:flex-row items-center gap-5">
          <StockGraph data={data} />
          {latest && (
            <div
              className="grid grid-cols-2 w-full md:w-[40%] md:grid-cols-3 gap-4 min-h-50 flex items-center bg-[var(--search-bg)] 
             hover:scale-105 transform transition duration-200
          p-4 rounded-lg shadow-md border-blue"
            >
              <Stat label="Open" value={latest.open || "--"} />
              <Stat label="High" value={latest.high || "--"} />
              <Stat label="Low" value={latest.low || "--"} />
              <Stat label="Prev Close" value={latest.prev_close || "--"} />
              <Stat
                label="Volume"
                value={latest.volume?.toLocaleString() || "--"}
              />
              <Stat
                label="Value"
                value={
                  latest.value
                    ? `₹${(latest.value / 1_00_00_000).toFixed(2)} Cr`
                    : "--"
                }
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

StockDetail.propTypes = {
  data: PropTypes.array,
};

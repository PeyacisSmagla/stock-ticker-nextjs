"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import NoDataFound from "@/app/components/NoDataFound";
import { ArrowUpRight, Bookmark } from "lucide-react";

const FavStocks = () => {
  const [favStocks, setFavStocks] = useState([]);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favStocks")) || [];
    setFavStocks(favs);
  }, []);

  return (
    <div className="space-y-3 my-5">
      <h2 className="text-lg font-bold text-[var(--primary)] flex items-center gap-1">
        Favorite Stocks
        <Bookmark size={18} className="mt-1" />
      </h2>

      {favStocks.length === 0 ? (
        <div className="min-h-50">
          <NoDataFound />
        </div>
      ) : (
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {favStocks.map((symbol) => (
            <li
              key={symbol}
              className="bg-search p-4 rounded-lg shadow-md border-blue 
            hover:scale-102 transform transition duration-400"
            >
              <Link
                href={`/stock/${symbol}`}
                target="_blank"
                className="text-[var(--primary)] flex justify-between"
              >
                {symbol}
                <ArrowUpRight />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavStocks;

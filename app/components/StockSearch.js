"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SEARCH_API } from "../utils/apiEndPoint";

export default function StockSearch() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);

  const handleNavigate = (symbol) => {
    router.push(`/stock/${symbol}`);
  };

  useEffect(() => {
    if (keyword.length < 2) {
      setResults([]);
      return;
    }

    const delay = setTimeout(() => {
      fetch(SEARCH_API(keyword))
        .then((res) => res.json())
        .then((data) => setResults(data))
        .catch((err) => console.error("Search error:", err));
    }, 300);

    return () => clearTimeout(delay);
  }, [keyword]);

  return (
    <div className="max-w-md mx-auto mt-10">
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search stock symbol or name"
        className="w-full px-4 py-2 border rounded"
      />
      {results.length > 0 && (
        <ul className="border mt-2 rounded shadow bg-white z-10 relative">
          {results.map((item) => (
            <li
              key={item.symbol}
              onClick={() => handleNavigate(item.symbol)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {item.company} ({item.symbol})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

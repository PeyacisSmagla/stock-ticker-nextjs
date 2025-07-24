"use client";

import { useState, useEffect, useRef } from "react";
import { SEARCH_API } from "../utils/apiEndPoint";
import { SearchPlaceholder } from "./SearchPlaceholder";
import { getErrorMessage } from "../utils/helperFn";
import NoDataFound from "./NoDataFound";

const placeholderWords = [
  "Stocks...",
  "Indices...",
  "Superstars...",
  "Buckets...",
];
const categories = ["All Stocks", "Indices", "Superstars", "Buckets"];

export default function StockSearch() {
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All Stocks");
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const placeholder = SearchPlaceholder(placeholderWords);

  const handleNavigate = (symbol) => {
    window.open(`/stock/${symbol}`, "_blank");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (keyword === "") {
      setResults([]);
      return;
    }

    const delay = setTimeout(() => {
      setIsLoading(true);
      fetch(SEARCH_API(keyword))
        .then((res) => res.json())
        .then((data) => {
          setResults(data);
          setIsLoading(false);
        })
        .catch((error) => {
          getErrorMessage(error);
          setResults([]);
          setIsLoading(false);
        });
    }, 300);

    return () => clearTimeout(delay);
  }, [keyword]);

  return (
    <div className="relative max-w-md mx-auto z-[999]">
      <div className="flex items-center bg-[var(--search-bg)] rounded-full px-4 py-2">
        <i className="pi pi-search text-[var(--primary)] mr-3"></i>
        <input
          ref={inputRef}
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder={placeholder}
          className="flex-grow bg-transparent outline-none text-[var(--primary)] placeholder:text-gray-500 text-sm"
        />
      </div>

      {isFocused && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 mt-1 rounded-lg shadow z-[9999] bg-[var(--search-bg)] border-blue overflow-auto"
          style={{
            minWidth: "460px",
            maxWidth: "500px",
            minHeight: "150px",
            maxHeight: "400px",
          }}
        >
          <div className="flex bg-[var(--search-bg)]">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-1 m-3 px-1 py-1 rounded-lg text-xs text-[var(--primary)] ${
                  activeCategory === cat
                    ? "border-1 border-blue-500 font-semibold"
                    : "border-blue"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <ul>
            {isLoading ? (
              <li className="flex items-center justify-center px-4 py-6">
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
              </li>
            ) : results?.length === 0 ? (
              <NoDataFound />
            ) : (
              results?.map((item) => (
                <li
                  key={item.symbol}
                  onClick={() => handleNavigate(item.symbol)}
                  className="px-4 py-3 cursor-pointer text-xs 
                  text-[var(--primary)] flex items-start justify-between border-b"
                >
                  <div>
                    <p className="mb-1">{item.company}</p>
                    <p className="text-blue-500">{item.symbol}</p>
                  </div>
                  <p className="text-xs">{item.type}</p>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

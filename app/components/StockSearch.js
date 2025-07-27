"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import NoDataFound from "./NoDataFound";
import { SearchPlaceholder } from "./SearchPlaceholder";

import { SEARCH_API } from "../utils/apiEndPoint";
import { getErrorMessage } from "../utils/helperFn";

const placeholderWords = [
  "Stocks...",
  "Indices...",
  "Superstars...",
  "Buckets...",
];
const categories = ["All Stocks", "Indices", "Superstars", "Buckets"];

const renderResults = (results, isLoading, handleNavigate) => {
  if (isLoading) {
    return (
      <li className="flex justify-center items-center py-6">
        <div className="animate-spin h-6 w-6 rounded-full border-t-2 border-b-2 border-blue-500" />
      </li>
    );
  }

  if (results.length === 0) {
    return <NoDataFound />;
  }

  return results.map(({ symbol, company, type }) => (
    <li
      key={symbol}
      onClick={() => handleNavigate(symbol)}
      className="px-4 py-3 cursor-pointer text-xs text-[var(--primary)] flex justify-between items-start border-b"
    >
      <div>
        <p className="mb-1">{company}</p>
        <p className="text-blue-500">{symbol}</p>
      </div>
      <p className="text-xs">{type}</p>
    </li>
  ));
};

export default function StockSearch() {
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const router = useRouter();

  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const placeholder = SearchPlaceholder(placeholderWords);

  const handleNavigate = (symbol) => {
    router.push(`/stock/${symbol}`);
    setKeyword("");
    setResults([]);
    setIsFocused(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !dropdownRef.current?.contains(e.target) &&
        !inputRef.current?.contains(e.target)
      ) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!keyword) {
      setResults([]);
      return;
    }

    const delay = setTimeout(() => {
      setIsLoading(true);
      fetch(SEARCH_API(keyword))
        .then((res) => res.json())
        .then((data) => setResults(data))
        .catch((err) => {
          getErrorMessage(err);
          setResults([]);
        })
        .finally(() => setIsLoading(false));
    }, 300);

    return () => clearTimeout(delay);
  }, [keyword]);

  return (
    <div className="relative max-w-md mx-auto z-[999]">
      <div className="flex items-center bg-[var(--search-bg)] rounded-full px-4 py-2">
        <i className="pi pi-search text-[var(--primary)] mr-3" />
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
          className="absolute top-full left-0 mt-1 w-full max-w-[500px] min-w-[460px] 
          max-h-[400px] min-h-[150px] overflow-auto bg-[var(--search-bg)] border-blue rounded-lg shadow z-[9999]"
        >
          <div className="flex px-3 pt-3 bg-[var(--search-bg)]">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-1 px-1 py-1 text-xs rounded-lg text-[var(--primary)] ${
                  activeCategory === cat
                    ? "border border-blue-500 font-semibold"
                    : "border-transparent"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <ul>{renderResults(results, isLoading, handleNavigate)}</ul>
        </div>
      )}
    </div>
  );
}

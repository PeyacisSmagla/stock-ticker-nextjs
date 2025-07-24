"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Moon,
  SunMedium,
  Menu,
  X,
  ChevronDown,
  ShieldUser,
} from "lucide-react";

import { useTheme } from "../context/themeContext";
import StockSearch from "./StockSearch";

const menu = [
  {
    title: "Stock Picks",
  },
  {
    title: "Research Report",
    submenu: [
      "Technical Reports",
      "Monthly Stock Picks",
      "Seasonal Stock Picks",
      "IOP Reports",
    ],
  },
  {
    title: "Market",
    submenu: ["Heatmaps", "All Stocks"],
  },
  {
    title: "Tools",
    submenu: [
      "Watchlist",
      "Screener",
      "Portfolio Analysis",
      "Portfolio Backtesting",
    ],
  },
  {
    title: "Portal AI",
  },
  {
    title: "View Pricing",
  },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav
      className="shadow-lg px-6 md:px-10 py-4 md:py-5 relative z-50 flex items-center justify-between bg-[var(--nav-bg)] sticky top-0"
      style={{ backgroundColor: "var(--nav-bg)" }}
    >
      <div className="flex items-center space-x-4">
        <Image
          src={theme === "light" ? "/tbLogoLight.png" : "/tbLogo.png"}
          width={100}
          height={50}
          alt="logo"
        />
        <div className="hidden md:flex flex-grow max-w-xl mx-6">
          <StockSearch />
        </div>
      </div>

      <div className="hidden lg:flex items-center space-x-[4rem]">
        {menu?.map(({ title, submenu }, i) => (
          <div key={i} className="relative group">
            <button
              className={`flex items-center space-x-1 text-sm hover:text-blue-400 focus:outline-none bold ${
                title === "Stock Picks" || title === "View Pricing"
                  ? "text-gradient-stockpicks"
                  : "text-[var(--primary)]"
              }`}
            >
              {title === "View Pricing" && (
                <ShieldUser
                  strokeWidth={1.75}
                  size={20}
                  className="text-[#ff8c00]"
                />
              )}
              <span>{title}</span>
              {submenu && <ChevronDown strokeWidth={1.75} size={20} />}
            </button>

            {submenu && (
              <div
                className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity 
              duration-200 absolute top-full left-0 w-48  bg-[var(--menu-bg)] text-[var(--primary)] rounded-md shadow-xl z-50"
              >
                {submenu.map((item, i) => (
                  <Link
                    key={i}
                    href="#"
                    className="block px-4 py-2 hover:text-blue-500 text-sm rounded-md"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center space-x-4 lg:hidden">
        <button
          onClick={toggleTheme}
          aria-label="Toggle Dark Mode"
          className={`"p-[.2rem] transition cursor-pointer ${
            theme === "light" && "border-gray rounded-full"
          } "`}
        >
          {theme === "dark" ? (
            <SunMedium className="text-[var(--primary)]" size={20} />
          ) : (
            <Moon className="text-black" size={20} />
          )}
        </button>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
          className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6 text-[var(--primary)]" />
          ) : (
            <Menu className="w-6 h-6 text-[var(--primary)]" />
          )}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[var(--nav-bg)] shadow-md border-t border-gray-700 z-40">
          <div className="px-6 py-4 space-y-4 text-[var(--primary)]">
            {menu?.map(({ title, submenu }, i) => (
              <div key={i}>
                <p className="text-sm border-b border-gray-600 pb-2">{title}</p>
                <div className="mt-2 space-y-1">
                  {submenu?.map((item, j) => (
                    <Link
                      key={j}
                      href="#"
                      className="text-sm block py-1 hover:text-blue-400"
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            <a
              href="#login"
              className="block mt-6 w-full text-center px-4 py-2  bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Login
            </a>

            <div className="mt-8 text-sm text-center text-[var(--primary)] font-semibold">
              Ready to get started?
              <br />
              <Link
                href="#signup"
                className="text-blue-400 text-sm hover:underline"
              >
                Sign up for free
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="hidden lg:flex ml-6">
        <button
          onClick={toggleTheme}
          aria-label="Toggle Dark Mode"
          className={`flex items-center justify-center h-[1.5rem] w-[1.5rem] transition cursor-pointer ${
            theme === "light" && "border-gray rounded-full"
          } "`}
        >
          {theme === "dark" ? (
            <SunMedium className="text-[var(--primary)]" size={20} />
          ) : (
            <Moon className="text-black" size={20} />
          )}
        </button>
        <Link
          href="#login"
          className="ml-6 flex items-center justify-center h-[2rem] w-[4.5rem] rounded text-[var(--primary)] bg-gradient-to-r from-blue-400  text-sm
          to-blue-600 transform hover:scale-105 transition-all duration-300 font-semibold shadow"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}

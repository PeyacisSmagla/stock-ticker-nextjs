import { Geist, Geist_Mono, Inter } from "next/font/google";

import Navbar from "./components/Navbar";
import { ThemeProvider } from "./context/themeContext";

import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Stock Ticker App",
  description:
    "Real-time stock search and insights powered by Next.js and TradeBrains APIs.",
  keywords: [
    "stocks",
    "stock tracker",
    "NSE",
    "BSE",
    "stock search",
    "Next.js",
    "TradeBrains",
  ],
  authors: [{ name: "Peyacis Smagla" }],
  creator: "Peyacis Smagla",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

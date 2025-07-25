# Stock Ticker Next.js App

## Overview

This is a **Stock Ticker** web application built with Next.js (app router) that displays stock information and interactive charts using real-time data from the TradeBrains API.  
Users can search for stock symbols, view detailed stock data, and analyze intraday price movements.

---

## Features

- Search stocks by symbol or company name with live suggestions
- View detailed stock information for selected symbols
- Interactive intraday price charts using Recharts
- Server-side data fetching for improved SEO and performance
- Responsive UI with loading and error handling

---

## Technologies Used

- Next.js (app router)
- React
- Recharts (charting library)
- Fetch API for data fetching
- Tailwind CSS

---

## Setup & Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/YourUsername/stock-ticker-nextjs.git
   cd stock-ticker-nextjs
   ```

2. Install dependencies:
   npm install

3. Start the development server:
   npm run dev

---

## Project Structure

app/ — Next.js app directory with routing and pages
app/components/ — React components like StockSearch and StockGraph
app/stock/[symbol]/ — Dynamic stock detail pages
utils/constants.js — API endpoints and constants
public/ — Static assets (favicon, images)

---

## API Endpoints Used

GET /api/assignment/search?keyword=KEYWORD&length=10 — Search stocks
GET /api/assignment/stock/SYMBOL — Get stock details
GET /api/assignment/stock/SYMBOL/prices?days=1&type=INTRADAY&limit=20 — Intraday prices

---

## Contact

Created by Peyacis Smagla

export const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export const SEARCH_API = (keyword, length = 10) =>
  `${API_BASE}/search?keyword=${keyword}&length=${length}`;

export const STOCK_DETAILS_API = (symbol) => `${API_BASE}/stock/${symbol}`;

export const STOCK_PRICES_API = (
  symbol,
  days = 1,
  type = "INTRADAY",
  limit = 20
) =>
  `${API_BASE}/stock/${symbol}/prices?days=${days}&type=${type}&limit=${limit}`;

export const NIFTY_MOVERS_API = `${API_BASE}/index/NIFTY/movers/`;

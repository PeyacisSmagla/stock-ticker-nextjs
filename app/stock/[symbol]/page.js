import StockDetail from "@/app/stock/[symbol]/components/StockDetail";
import { STOCK_PRICES_API } from "@/app/utils/apiEndPoint";
import { getErrorMessage } from "@/app/utils/helperFn";

export async function generateMetadata({ params, searchParams }) {
  const { symbol } = await params;
  const companyFromQuery = await searchParams.company;

  const res = await fetch(STOCK_PRICES_API(symbol), { cache: "no-store" });
  if (!res.ok) {
    return { title: "Stock not found" };
  }

  return {
    title: `${companyFromQuery || ""} (${symbol}) - Stock Ticker App`,
    description: `Details and chart for ${companyFromQuery}`,
  };
}

export default async function StockPage({ params, searchParams }) {
  const { symbol } = await params;

  try {
    const res = await fetch(STOCK_PRICES_API(symbol), { cache: "no-store" });

    if (!res.ok) {
      return (
        <main className="p-4">
          <h1 className="text-red-500 font-bold">
            Error: Unable to load stock data for {symbol}
          </h1>
        </main>
      );
    }

    const data = await res.json();

    return (
      <main className="py-10 px-3 md:px-10 md:py-5">
        <StockDetail data={data} symbol={symbol} />
      </main>
    );
  } catch (error) {
    getErrorMessage(error);
    return (
      <main className="p-4">
        <h1 className="text-red-500 font-bold">
          Error: Something went wrong loading stock data for {symbol}
        </h1>
      </main>
    );
  }
}

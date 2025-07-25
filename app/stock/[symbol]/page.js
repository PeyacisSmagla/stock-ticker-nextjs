import StockDetail from "@/app/stock/[symbol]/components/StockDetail";
import { STOCK_PRICES_API } from "@/app/utils/apiEndPoint";

export default async function StockPage({ params }) {
  const { symbol } = await params;

  const res = await fetch(STOCK_PRICES_API(symbol), {
    cache: "no-store",
  });

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
}

import StockGraph from "@/app/components/StockGraph";
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
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-2">{symbol} Stock Details</h1>
      <StockGraph data={data} />
    </main>
  );
}

import StockDetail from "@/app/components/StockDetail";
import { STOCK_PRICES_API } from "@/app/utils/apiEndPoint";
import { ArrowRight, ChevronRight } from "lucide-react";

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
      <div className="flex items-center text-xs text-gray-400">
        <p>Dashboard</p>
        <ChevronRight strokeWidth={1.75} size={18}/>
        <p>Stock Details</p>
      </div>
      <h1 className="text-xl font-bold text-[var(--primary)] lg:my-3">
        {symbol} Stock Details
      </h1>
      <StockDetail data={data} symbol={symbol} />
    </main>
  );
}

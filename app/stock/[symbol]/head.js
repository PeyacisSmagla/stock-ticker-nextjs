export default async function Head({ params }) {
  const { symbol } = params;

  const res = await fetch(
    `https://portal.tradebrains.in/api/assignment/stock/${symbol}`,
    { cache: "no-store" }
  );

  const stock = await res.json();

  return (
    <>
      <title>
        {stock.name} ({symbol}) - Stock Ticker App
      </title>
      <meta
        name="description"
        content={`Details and chart for ${stock.name}`}
      />
      <meta name="keywords" content={`${symbol}, stock, trade, finance`} />
    </>
  );
}

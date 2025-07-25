const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const point = payload[0].payload;
    const date = new Date(point.date).toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    return (
      <div className="bg-[var(--nav-bg)] p-3 rounded shadow text-[var(--primary)] text-sm space-y-1 border-blue">
        <div className="font-medium">{date}</div>
        <div>Close: ₹{point.close?.toFixed(2)}</div>
        {point.open && <div>Open: ₹{point.open?.toFixed(2)}</div>}
        {point.high && <div>High: ₹{point.high?.toFixed(2)}</div>}
        {point.low && <div>Low: ₹{point.low?.toFixed(2)}</div>}
      </div>
    );
  }

  return null;
};

export default CustomTooltip;

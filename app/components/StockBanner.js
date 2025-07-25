"use client";
import { Triangle } from "lucide-react";
import { usePathname } from "next/navigation";

const data = [
  {
    label: "ETERNAL ₹313.15",
    subLabel: "+11.1 (+3.67%)",
  },
  {
    label: "TATAMOTORS ₹700.5",
    subLabel: "+10.4 (+1.51%)",
  },

  {
    label: "DRREDDY ₹1,265.5",
    subLabel: "+18.1 (+1.45%)",
  },

  {
    label: "GRASIM ₹2,735.9",
    subLabel: "+26.8 (+0.99%)",
  },

  {
    label: "CIPLA ₹1,487.9",
    subLabel: "+14.4 (+1.83%)",
  },
];

const StockBanner = () => {
  const pathname = usePathname();

  if (!pathname.startsWith("/stock")) return;

  return (
    <div>
      <div className="w-full bg-blue-500 flex items-center justify-center gap-3 min-h-13">
        <p className="text-sm font-bold ">Get 50% OFF This Monsoon!</p>
        <button className="textt-sm  px-3 py-2 text-black bg-white rounded text-sm font-bold">
          Claim Your Offer
        </button>
      </div>
      <div className="w-full bg-[var(--search-bg)] flex items-center min-h-8 px-3 justify-between">
        {data?.map((item) => (
          <div key={item.label} className="flex items-center gap-1">
            <p className="text-sm font-bold">
              {item?.label}
              <span className="text-[#00FF57]">{item?.subLabel}</span>
            </p>
            <Triangle className="fill-[#00FF57] text-[#00FF57]" size={15} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockBanner;

"use client";
import { Triangle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const data = [
  {
    id: 1,
    label: "ETERNAL ₹313.15",
    subLabel: "+11.1 (+3.67%)",
    path: "ETERNAL",
  },
  {
    id: 2,
    label: "TATAMOTORS ₹700.5",
    subLabel: "+10.4 (+1.51%)",
    path: "TATAMOTORS",
  },
  {
    id: 3,
    label: "DRREDDY ₹1,265.5",
    subLabel: "+18.1 (+1.45%)",
    path: "DRREDDY",
  },
  {
    id: 4,
    label: "GRASIM ₹2,735.9",
    subLabel: "+26.8 (+0.99%)",
    path: "GRASIM",
  },
  {
    id: 5,
    label: "CIPLA ₹1,487.9",
    subLabel: "+14.4 (+1.83%)",
    path: "CIPLA",
  },
  {
    id: 6,
    label: "GRASIM ₹2,735.9",
    subLabel: "+26.8 (+0.99%)",
    path: "GRASIM",
  },
  {
    id: 7,
    label: "ADANIGREEN ₹1,487.9",
    subLabel: "+14.4 (+1.83%)",
    path: "CIPLA",
  },
  {
    id: 8,
    label: "GRSIM ₹2,735.9",
    subLabel: "+26.8 (+0.99%)",
    path: "GRASIM",
  },
  {
    id: 9,
    label: "ADANIGREEN ₹1,487.9",
    subLabel: "+14.4 (+1.83%)",
    path: "CIPLA",
  },
];

const StockBanner = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigate = (path) => {
    router.push(`/stock/${path}`);
  };

  if (!pathname.startsWith("/stock")) return;

  return (
    <div>
      <div className="w-full bg-blue-500 flex items-center justify-center gap-3 min-h-13">
        <p className="text-sm font-bold ">Get 50% OFF This Monsoon!</p>
        <button className="textt-sm  px-3 py-2 text-black bg-white rounded text-sm font-bold">
          Claim Your Offer
        </button>
      </div>

      <div className="marquee-container">
        <div className="marquee">
          {data?.map((item) => (
            <div
              key={item.id}
              className="marquee-item"
              onClick={() => handleNavigate(item.path)}
            >
              <p className="text-xs xl:text-sm font-bold text-[var(--primary)]">
                {item?.label}
                <span className="text-[#00FF57]">{item?.subLabel}</span>
              </p>
              <Triangle className="fill-[#00FF57] text-[#00FF57]" size={15} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StockBanner;

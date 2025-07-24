import Image from "next/image";

const NoDataFound = () => {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-6">
      <Image
        height={300}
        width={300}
        src="/no-res-image.png"
        alt="No results found"
        className="w-20 h-20 opacity-50 mb-2"
      />
      <p className="text-sm text-[var(--primary)] opacity-70">
        No data available
      </p>
    </div>
  );
};

export default NoDataFound;

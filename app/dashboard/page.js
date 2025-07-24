import Image from "next/image";

export default async function Dashboard() {
  return (
    <div className="px-10 py-5">
      <Image
        src="/tradeiq_banner_desktop.webp"
        alt="banner"
        height={300}
        width={500}
        className="w-full"
      />
    </div>
  );
}

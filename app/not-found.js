"use client";

import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { Search } from "lucide-react";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center space-y-5">
      <div>
        <h1 className="text-[4rem] font-bold text-[var(--primary)]">404</h1>
        <p className="text-[var(--primary)]"> Page Not Found</p>
      </div>

      <Search className="text-[var(--primary)]" size={100} />
      <Button
        onClick={() => router.back()}
        label={"Go Back"}
        className=" font-medium py-1 px-4 rounded-md shadow-md transition duration-300 text-[var(--primary)]"
      />
    </div>
  );
}

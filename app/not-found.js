"use client";

import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { Search } from "lucide-react";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <div className="relative inline-block mb-8">
        <h1 className="text-9xl md:text-[12rem] font-bold text-gray-100">
          404
        </h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="p-6 rounded-full border border-green-200 bg-[var(--primary-light)]">
            <Search className="w-16 h-16 text-[var(--primary-main)]" />
          </div>
        </div>
        <Button
          onClick={() => router.back()}
          label={"Go Back"}
          bgColor={"var(--primary-main)"}
          className=" font-medium py-1 px-4 rounded-md shadow-md transition duration-300"
        />
      </div>
    </div>
  );
}

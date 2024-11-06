"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleCreateConfig = () => {
    router.push("/uuid");
  };

  const handleSearch = () => {
    router.push("/search");
  };

  return (
    <div className="w-80 mx-auto">
      <h2 className="text-2xl text-white mb-4">Home</h2>
      <div className="flex justify-content-left">
        <button onClick={handleCreateConfig}>uuid</button>
        <button onClick={handleSearch}>search</button>
      </div>
    </div>
  );
}

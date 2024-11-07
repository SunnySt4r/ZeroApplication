"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleCreateConfig = () => {
    router.push("/uuid/d816a08d-460c-4f6a-a891-30aa9d6bb04e");
  };

  const handleSearch = () => {
    router.push("/search");
  };

  return (
    <div className="w-80 ">
      <h2 className="text-2xl text-white mb-4">Home</h2>
      <div className="flex justify-content-left space-x-4">
        <button onClick={handleCreateConfig}>uuid-test</button>
        <button onClick={handleSearch}>search</button>
      </div>
    </div>
  );
}

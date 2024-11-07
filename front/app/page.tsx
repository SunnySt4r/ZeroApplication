"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleCreateConfig = () => {
    router.push("/config?uuid=26230398-d7e2-4a81-bf86-ccf5f229de02");
  };

  const handleSearch = () => {
    router.push("/featured");
  };

  return (
    <main>
      <h2 className="text-2xl text-white mb-4">Home</h2>
      <div className="flex justify-content-left space-x-4">
        <button onClick={handleCreateConfig}>uuid-test</button>
        <button onClick={handleSearch}>search</button>
      </div>
    </main>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import getPackages, { IPackage, IResponse } from "@/api/wingetrun";
import SearchBar from "@/components/SearchBar";
import CardContainer from "@/components/CardContainer";

export default function Featured() {
  const query = useSearchParams().get("query");
  const [pkgs, setPkgs] = useState<IPackage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getPackages(
      `packages?ensureContains=true&partialMatch=true&take=12&query=${query}`,
    )
      .then((res: IResponse) => {
        if (res.Packages) {
          setPkgs(res.Packages);
        } else {
          setPkgs([]);
        }
        setIsLoading(false);
      })
      .catch((e) => console.error(e));
  }, [query]);

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (query: string) => {
    setSearchTerm(query);
  };
  const handleAdd = () => {
    console.log("Add button clicked");
  };

  return (
    <>
      <div className="mt-32">
        <SearchBar
          onSearch={handleSearch}
          placeholder="Search for packages..."
        />
      </div>
      <main className="mt-4">
        <h1 className="text-2xl font-semibold text-text ">Query: "{query}"</h1>
        {pkgs.length == 0 ? (
          <p>Nothing here...</p>
        ) : (
          <div className="p-6">
            <CardContainer cards={pkgs} onAdd={handleAdd} />
          </div>
        )}
      </main>
    </>
  );
}

"use client";
import { useState, useEffect } from "react";
import getPackages, { IPackage, IResponse } from "@/api/wingetrun";
import SearchBar from "@/components/SearchBar";
import CardContainer from "@/components/CardContainer";

export default function Featured() {
  const [pkgs, setPkgs] = useState<IPackage[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchPkgs() {
      try {
        const data = await getPackages(`packages?&sort=UpdatedAt&order=-1`);
        setPkgs(data.Packages);
        console.log(data.Packages);
      } catch (e) {
        console.log(e);
      }
    }
    fetchPkgs();
  }, []);

  const handleAdd = () => {
    console.log("Add button clicked");
  };

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (query: string) => {
    setSearchTerm(query);
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
        <h1 className="text-2xl font-semibold text-text ">Featured</h1>
        <div className="p-6">
          {pkgs === null ? (
            <p>Nothing here...</p>
          ) : (
            <CardContainer cards={pkgs} onAdd={handleAdd} />
          )}
        </div>
      </main>
    </>
  );
}

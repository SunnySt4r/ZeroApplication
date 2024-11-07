"use client";
import { useState, useEffect, useRef } from "react";
import getPackages, { IPackage, IResponse } from "@/api/wingetrun";
import SearchBar from "@/components/SearchBar";
import CardContainer from "@/components/CardContainer";

export default function Featured() {
  const [pkgs, setPkgs] = useState<IPackage[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const scrollPositionRef = useRef<number>(0);

  const loadMore = () => {
    scrollPositionRef.current = window.scrollY;
    setLoading(true);
    getPackages(`packages?&sort=UpdatedAt&order=-1&page=${page + 1}`)
      .then((e: IResponse) => {
        setPkgs((prev) => [...prev, ...e.Packages]);
        setPage((prev) => ++prev);
        setLoading(false);
        window.scrollTo({ top: scrollPositionRef.current });
      })
      .catch((e) => console.error(e));
  };

  useEffect(() => {
    async function fetchPkgs() {
      try {
        const data = await getPackages(`packages?&sort=UpdatedAt&order=-1`);
        setPkgs(data.Packages);
        setTotal(data.Total);
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

  if (loading && pkgs.length == 0) return <main>Loading...</main>;

  return (
    <>
      <div className="mt-32">
        <SearchBar placeholder="Search for packages..." />
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
        {pkgs.length < total && (
          <button className="mx-auto block bg-blue-300" onClick={loadMore}>
            load more
          </button>
        )}
      </main>
    </>
  );
}

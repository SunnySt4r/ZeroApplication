"use client";

import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { useSearchParams } from "next/navigation";
import getPackages, { IPackage, IResponse } from "@/api/wingetrun";
import SearchBar from "@/components/SearchBar";
import CardContainer from "@/components/CardContainer";

export default function Search() {
  const query = useSearchParams().get("query");
  const [pkgs, setPkgs] = useState<IPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [num, setNum] = useState(0);
  const [page, setPage] = useState(0);

  const scrollPositionRef = useRef<number>(0);

  const loadMore = () => {
    scrollPositionRef.current = window.scrollY;
    setLoading(true);
    getPackages(
      `packages?ensureContains=true&partialMatch=true&take=12&query=${query}&page=${page + 1}`,
    )
      .then((e: IResponse) => {
        setPkgs((prev) => [...prev, ...e.Packages]);
        setPage((prev) => ++prev);
        setLoading(false);
        window.scrollTo({ top: scrollPositionRef.current });
      })
      .catch((e) => console.error(e));
  };

  useEffect(() => {
    getPackages(
      `packages?ensureContains=true&partialMatch=true&take=12&query=${query}`,
    )
      .then((res: IResponse) => {
        console.log(res);
        if (res.Packages) {
          setPkgs(res.Packages);
          setNum(res.Total);
        } else {
          setPkgs([]);
        }
        setLoading(false);
      })
      .catch((e) => console.error(e));
  }, [query]);

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
        <h1 className="text-2xl font-semibold text-text ">
          Query: "{query}". Found {num}.
        </h1>
        {pkgs.length == 0 ? (
          <p>Nothing here...</p>
        ) : (
          <div className="p-6">
            <CardContainer cards={pkgs} onAdd={handleAdd} />
          </div>
        )}

        {pkgs.length < num && (
          <button className="mx-auto block bg-blue-300" onClick={loadMore}>
            load more
          </button>
        )}
      </main>
    </>
  );
}

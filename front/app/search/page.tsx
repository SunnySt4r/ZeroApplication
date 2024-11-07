"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import getPackages, { IPackage, IResponse } from "@/api/wingetrun";

export default function Featured() {
  const query = useSearchParams().get("query");
  const [pkgs, setPkgs] = useState<IPackage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getPackages(
      `packages?ensureContains=true&partialMatch=true&take=12&${query}`,
    )
      .then((res: IResponse) => {
        if (res.Packages) {
          setPkgs(res.Packages);
        } else {
          setPkgs([]);
        }
        setIsLoading(false);
        console.log(pkgs);
      })
      .catch((e) => console.error(e));
  }, [query]);

  return <p>heh...</p>;
}

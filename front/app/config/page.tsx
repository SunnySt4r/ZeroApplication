"use client";

import { useEffect, useState } from "react";
import CheckboxList from "@/components/CheckboxList";
import { ServerResponse } from "@/components/CheckboxList";
import { useSearchParams } from "next/navigation";
import { get } from "@/api/utils";
import { DataProvider } from "@/components/configContext";

const Uuid = () => {
  const uuid = useSearchParams().get("uuid");
  const [config, setConfig] = useState<ServerResponse | null>(null);
  const [loading, setLoading] = useState<Boolean>(true);

  useEffect(() => {
    get(`/file/${uuid}`)
      .then((res) => setConfig(res))
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      <DataProvider>
        <h1 className="text-2xl font-semibold text-text ">
          Loaded your config
        </h1>
        {config === null || config === undefined ? (
          <p>Nothing here...</p>
        ) : (
          <>
            <p>Choose what to install</p>
            <CheckboxList config={config} uuid={uuid as string}></CheckboxList>
          </>
        )}
      </DataProvider>
    </main>
  );
};

export default Uuid;

"use client";

import { useEffect, useState } from "react";
import CheckboxList from "@/components/CheckboxList";
import { useSearchParams } from "next/navigation";
import { get } from "@/api/utils";
import { IResponse, useData } from "@/components/configContext";

const Uuid = () => {
  const uuid = useSearchParams().get("uuid");
  const [origConfig, setOrigConfig] = useState<IResponse | null>(null);
  const { config, setConfig } = useData();
  const [loading, setLoading] = useState<Boolean>(true);

  useEffect(() => {
    get(`/file/${uuid}`)
      .then((res) => {
        setOrigConfig(res);
        setConfig(res);
      })
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
      <h1 className="text-2xl font-semibold text-text ">Loaded your config</h1>
      {!origConfig || !uuid ? (
        <p>Nothing here...</p>
      ) : (
        <>
          <p>Choose what to install</p>
          <CheckboxList config={origConfig} uuid={uuid}></CheckboxList>
        </>
      )}
    </main>
  );
};

export default Uuid;

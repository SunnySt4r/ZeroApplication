"use client";

import { useEffect, useState } from "react";
import CheckboxList from "../../components/CheckboxList";
import { ServerResponse } from "../../components/CheckboxList";
import { usePathname } from "next/navigation";
import { get } from "../../api/utils";

const Uuid = () => {
  const pathname = usePathname();
  const uuid = pathname.split("/uuid/").pop();
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
    <>
      <h1 className="text-2xl font-semibold text-text ">Loaded your config</h1>
      <p>Choose what to install</p>
      {config === null || config === undefined ? (
        <p>Nothing here...</p>
      ) : (
        <CheckboxList config={config}></CheckboxList>
      )}
    </>
  );
};

export default Uuid;

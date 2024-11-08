"use client";

import React, { useEffect, useState } from "react";
import { post } from "../api/utils";
import { useRouter } from "next/navigation";
import { IResponse, useData } from "./configContext";

interface Props {
  config: IResponse;
  uuid: string;
}

const CheckboxList: React.FC<Props> = (props) => {
  const sources = props.config.Sources;
  const { config, setConfig } = useData();
  const [checkedItems, setCheckedItems] = useState<string[]>(
    sources.flatMap((source) =>
      source.Packages.map((pkg) => pkg.PackageIdentifier),
    ),
  );

  useEffect(() => {
    updateConfig();
  }, [checkedItems]);

  const handleCheckboxChange = (pkgId: string) => {
    setCheckedItems((prev) => {
      if (prev.includes(pkgId)) {
        return prev.filter((id) => id !== pkgId);
      } else {
        return [...prev, pkgId];
      }
    });
  };

  const updateConfig = () => {
    const newSources = sources.map((source) => ({
      ...source,
      Packages: source.Packages.filter((pkg) =>
        checkedItems.includes(pkg.PackageIdentifier),
      ),
    }));

    setConfig({ ...props.config, Sources: newSources });
  };

  const handleInstall = async () => {
    if (!config) {
      return <p>Error...</p>;
    }
    await post(`/file/${props.uuid}/generate`, config)
      .then(async (res) => {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "installer.bat";
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .catch((err) => console.error(err));
  };

  const router = useRouter();
  const handleAdd = () => {
    router.push("/featured");
  };

  const handleUncheckAll = () => {
    setCheckedItems([]);
  };

  const handleCheckAll = () => {
    setCheckedItems(
      sources.flatMap((source) =>
        source.Packages.map((pkg) => pkg.PackageIdentifier),
      ),
    );
  };

  return (
    <>
      <div className="p-4 space-y-2 bg-surface rounded-lg">
        {sources == null ? (
          <span>No packages loaded</span>
        ) : (
          sources.map((item) =>
            item.Packages.map((pkg) => (
              <label
                key={pkg.PackageIdentifier}
                className="flex items-center space-x-2"
              >
                <input
                  type="checkbox"
                  checked={config?.Sources.some((src) =>
                    src.Packages.some(
                      (item) => item.PackageIdentifier == pkg.PackageIdentifier,
                    ),
                  )}
                  onChange={() => handleCheckboxChange(pkg.PackageIdentifier)}
                />
                <span>
                  {pkg.PackageIdentifier.split(".").slice(1).join(".")}
                </span>
              </label>
            )),
          )
        )}
      </div>
      <div className="mt-4 flex space-x-2">
        <button className="bg-blue-300" onClick={handleInstall}>
          Install
        </button>
        <button className="bg-color-purple" onClick={handleAdd}>
          Browse for more
        </button>
        <button onClick={handleUncheckAll}>Uncheck All</button>
        <button onClick={handleCheckAll}>Check All</button>
      </div>
    </>
  );
};

export default CheckboxList;

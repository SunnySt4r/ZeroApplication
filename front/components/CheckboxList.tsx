"use client";

import React, { useState } from "react";
import { post } from "../api/utils";
import { useRouter } from "next/navigation";

export interface ServerResponse {
  $schema: string;
  CreationDate: string;
  Sources: [
    {
      Packages: Package[];
      SourceDetails: {
        Argument: string;
        Identifier: string;
        Name: string;
        Type: string;
      };
    },
  ];
  WinGetVersion: string;
}

interface Package {
  PackageIdentifier: string;
  Version: string;
}

interface Props {
  config: ServerResponse;
}

const CheckboxList: React.FC<Props> = (props) => {
  const sources = props.config.Sources;
  const [checkedItems, setCheckedItems] = useState<string[]>(
    sources.flatMap((source) =>
      source.Packages.map((pkg) => pkg.PackageIdentifier),
    ),
  );

  const handleCheckboxChange = (pkgId: string) => {
    setCheckedItems((prev) => {
      if (prev.includes(pkgId)) {
        return prev.filter((id) => id !== pkgId);
      } else {
        return [...prev, pkgId];
      }
    });
  };

  const getUpdatedConfig = () => {
    const newSources = sources.map((source) => ({
      ...source,
      Packages: source.Packages.filter((pkg) =>
        checkedItems.includes(pkg.PackageIdentifier),
      ),
    }));

    return { ...props.config, Sources: newSources };
  };

  const handleInstall = async () => {
    const newConfig = getUpdatedConfig();
    const res = await post("/file/", newConfig).catch((err) =>
      console.error(err),
    );
    console.log(res);
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
                  checked={checkedItems.includes(pkg.PackageIdentifier)}
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

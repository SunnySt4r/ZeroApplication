"use client";

import React, { useEffect, useState } from "react";
import { isNullOrUndefined, isUndefined } from "util";

interface ServerResponse {
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
  items: Package[];
}

const CheckboxList: React.FC = () => {
  const dummy = {
    $schema: "https://aka.ms/winget-packages.schema.2.0.json",
    CreationDate: "2024-11-05T20:07:31.014-00:00",
    Sources: [
      {
        Packages: [
          {
            PackageIdentifier: "Microsoft.Teams",
            Version: "24277.3507.3205.5228",
          },
          {
            PackageIdentifier: "Microsoft.AppInstaller",
            Version: "1.24.25180.0",
          },
          {
            PackageIdentifier: "Microsoft.UI.Xaml.2.7",
            Version: "7.2409.9001.0",
          },
          {
            PackageIdentifier: "Microsoft.UI.Xaml.2.8",
            Version: "8.2310.30001.0",
          },
          {
            PackageIdentifier: "Microsoft.VCLibs.Desktop.14",
            Version: "14.0.33728.0",
          },
        ],
        SourceDetails: {
          Argument: "https://cdn.winget.microsoft.com/cache",
          Identifier: "Microsoft.Winget.Source_8wekyb3d8bbwe",
          Name: "winget",
          Type: "Microsoft.PreIndexed.Package",
        },
      },
    ],
    WinGetVersion: "1.9.25180",
  };

  const [data, setData] = useState<Package[] | null>(null);
  const [loading, setLoading] = useState(true);

  const handleCheckboxChange = (id: string) => {
    setCheckedItems((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id],
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/file/all", {
          mode: "cors",
          credentials: "include",
        })
          .then(async (response) => (await response.json()) as ServerResponse)
          .then((data) => {
            const { Packages } = data.Sources[0];
            setData(Packages);
          });
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const [checkedItems, setCheckedItems] = useState<string[]>(
    isNullOrUndefined(data) ? [] : data?.map((pkg) => pkg.PackageIdentifier),
  );

  if (loading) return <p>loading...</p>;

  return (
    <div className="p-4 space-y-2 bg-surface rounded-lg">
      {data == null ? (
        <span>No packages loaded</span>
      ) : (
        data.map((item) => (
          <label
            key={item.PackageIdentifier}
            className="flex items-center space-x-2"
          >
            <input
              type="checkbox"
              checked={checkedItems.includes(item.PackageIdentifier)}
              onChange={() => handleCheckboxChange(item.PackageIdentifier)}
              className="accent-purple-600" // Tailwind for custom checkbox color
            />
            <span>{item.PackageIdentifier}</span>
          </label>
        ))
      )}
    </div>
  );
};

export default CheckboxList;

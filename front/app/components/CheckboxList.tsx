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

const PostConfig = async (url: string, body: any) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "appication/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("There was a problem with the request:", err);
  }
};

const CheckboxList: React.FC = () => {
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
<<<<<<< Updated upstream
        const response = await fetch("http://91.210.169.254:8080/file/all", {
          mode: "cors",
          credentials: "include",
        })
=======
        const response = await fetch(
          "http://91.210.169.254:8080/file/d816a08d-460c-4f6a-a891-30aa9d6bb04e",
          {
            mode: "cors",
            credentials: "include",
          },
        )
>>>>>>> Stashed changes
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
    <div className="p-4 space-y-2 bg-surface rounded-lg mt-20">
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
      <button className="mt-4">Install</button>
    </div>
  );
};

export default CheckboxList;

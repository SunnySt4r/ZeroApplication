"use client";

import React, { useEffect, useState } from "react";

interface ServerSideProps {
  data: string;
}

const CheckboxList: React.FC = () => {
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://91.210.169.254:8080/file/all", {
          mode: "cors",
          credentials: "include",
        });
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>loading...</p>;

  return <h1>{data}</h1>;

  // return (
  //   <div className="p-4 space-y-2 bg-surface rounded-lg">
  //     {data.items.map((item) => (
  //       <label key={item.id} className="flex items-center space-x-2">
  //         <input
  //           type="checkbox"
  //           checked={checkedItems.includes(item.id)}
  //           onChange={() => handleCheckboxChange(item.id)}
  //           className="accent-purple-600" // Tailwind for custom checkbox color
  //         />
  //         <span>{item.label}</span>
  //       </label>
  //     ))}
  //   </div>
  // );
};

export default CheckboxList;

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      console.log("Selected file:", file);
    }
  };

  const handleCreateConfig = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const fileContent = reader.result;
        console.log("File content:", fileContent);
      };
      reader.readAsText(selectedFile);
    } else {
      console.log("No file selected");
    }
  };

  const handleSearch = () => {
    router.push("/search");
  };

  return (
    <div className="w-80 mx-auto">
      <h2 className="text-2xl text-white mb-4">Upload a JSON File</h2>
      <div className="mb-4">
        <input
          type="file"
          accept=".json"
          onChange={handleFileChange}
          className="p-2 border border-purple-500 rounded"
        />
      </div>
      <div className="buttonContainer">
        <button onClick={handleCreateConfig}>create config</button>
        <button onClick={handleSearch}>search</button>
      </div>
    </div>
  );
}

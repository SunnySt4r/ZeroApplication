import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface SearchBarProps {
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = "Search..." }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
  };

  const router = useRouter();
  const handleEnter = (event: React.KeyboardEvent) => {
    if (event.key == "Enter") {
      router.push(`/search?query=${query}`);
    }
  };

  return (
    <div className="flex items-center border-none mx-10 bg-surface rounded-md shadow-sm max-w-full ">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleEnter}
        placeholder={placeholder}
        className="w-full bg-transparent border outline-none text-color-pink placeholder-muted-text p-2 text-lg"
      />
    </div>
  );
};

export default SearchBar;

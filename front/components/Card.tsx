import React, { useState } from "react";

interface CardProps {
  packageName: string;
  publisher: string;
  description: string;
  onAdd: () => void;
}

const Card: React.FC<CardProps> = ({
  packageName,
  publisher,
  description,
  onAdd,
}) => {
  const [added, setAdded] = useState(false);
  const handleClick = () => {
    setAdded(!added);
  };

  return (
    <div className="bg-color-background p-4 rounded-lg shadow-lg flex flex-col justify-between w-74 h-64 overflow-hidden border border-color-muted-text">
      <div>
        <h3 className="text-lg font-semibold text-text truncate">
          {packageName}
        </h3>
        <p className="text-sm text-muted-text truncate">
          Published by {publisher}
        </p>
        <p className="text-sm text-text mt-2 line-clamp-3 overflow-hidden">
          {description}
        </p>
      </div>
      {added ? (
        <button
          onClick={handleClick}
          className="mt-4 bg-color-pink text-background font-medium py-1 px-4 rounded hover:bg-gold"
        >
          Remove
        </button>
      ) : (
        <button
          onClick={handleClick}
          className="mt-4 bg-color-purple text-background font-medium py-1 px-4 rounded hover:bg-gold"
        >
          Add
        </button>
      )}
    </div>
  );
};

export default Card;

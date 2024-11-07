import React from "react";
import Card from "./Card";
import { IPackage } from "@/api/wingetrun";

interface CardContainerProps {
  cards: IPackage[];
  onAdd: (id: string) => void;
}

const CardContainer: React.FC<CardContainerProps> = ({ cards, onAdd }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
      {cards.map((card) => (
        <Card
          key={card.Id}
          packageName={card.Latest.Name}
          publisher={card.Latest.Publisher}
          description={
            card.Latest.Description ? card.Latest.Description : "No description"
          }
          onAdd={() => onAdd(card.Id)}
        />
      ))}
    </div>
  );
};

export default CardContainer;

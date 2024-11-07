import React, { createContext, useContext, useState } from "react";

export interface TrackedData {
  id: number;
  name: string;
  description: string;
}

interface DataContextType {
  trackedData: TrackedData | null;
  setTrackedData: React.Dispatch<React.SetStateAction<TrackedData | null>>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [trackedData, setTrackedData] = useState<TrackedData | null>(null);
  return (
    <DataContext.Provider value={{ trackedData, setTrackedData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};

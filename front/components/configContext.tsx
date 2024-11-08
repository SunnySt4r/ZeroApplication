"use client";

import React, { createContext, useContext, useState } from "react";

export interface IResponse {
  $schema: string;
  CreationDate: string;
  Sources: {
    Packages: IPackage[];
    SourceDetails: {
      Argument: string;
      Identifier: string;
      Name: string;
      Type: string;
    };
  }[];
  WinGetVersion: string;
}

interface IPackage {
  PackageIdentifier: string;
  Version: string;
}

interface DataContextType {
  config: IResponse | null;
  setConfig: React.Dispatch<React.SetStateAction<IResponse | null>>;
}

const DataContext = createContext<DataContextType | null>(null);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [config, setConfig] = useState<IResponse | null>(null);
  return (
    <DataContext.Provider value={{ config: config, setConfig: setConfig }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (context === null) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};

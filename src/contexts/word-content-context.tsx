"use client";

import React, { createContext, useContext, useState } from "react";

type WordContentContextProviderProps = {
  children: React.ReactNode;
};

type WordContentContext = {
  wordContent: any;
  setWordContent: React.Dispatch<React.SetStateAction<any>>;
};

export const WordContentContext = createContext<WordContentContext | null>(
  null
);

const WordContentContextProvider = ({
  children,
}: WordContentContextProviderProps) => {
  const [wordContent, setWordContent] = useState<any>([]);

  return (
    <WordContentContext.Provider value={{ wordContent, setWordContent }}>
      {children}
    </WordContentContext.Provider>
  );
};

export default WordContentContextProvider;

export function useWordContentContext() {
  const context = useContext(WordContentContext);

  if (!context) {
    throw new Error(
      "useWordContentContext must be used within a WordContentContextProvider"
    );
  }

  return context;
}

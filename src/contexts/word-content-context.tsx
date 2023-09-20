"use client";

import React, { createContext, useContext, useState } from "react";

type WordContentContextProviderProps = {
  children: React.ReactNode;
};

type WordContentContext = {
  wordContent: any;
  setWordContent: React.Dispatch<React.SetStateAction<any>>;
  searchedWord: string;
  setSearchedWord: React.Dispatch<React.SetStateAction<string>>;
  apiCall: (word: string) => Promise<void>;
  isLoading: boolean;
};

export const WordContentContext = createContext<WordContentContext | null>(
  null
);

const WordContentContextProvider = ({
  children,
}: WordContentContextProviderProps) => {
  const [wordContent, setWordContent] = useState<any>([]);
  const [searchedWord, setSearchedWord] = useState("dictionary");
  const [isLoading, setIsLoading] = useState(true);

  async function apiCall(word: string) {
    setIsLoading(true);
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    const content = await response.json();
    if (content) {
      setIsLoading(false);
      setWordContent(content);
    }
  }

  return (
    <WordContentContext.Provider
      value={{
        wordContent,
        setWordContent,
        searchedWord,
        setSearchedWord,
        apiCall,
        isLoading,
      }}
    >
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

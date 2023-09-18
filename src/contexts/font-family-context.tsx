"use client";

import React, { createContext, useContext, useState } from "react";

type FontFamilyContextProviderProps = {
  children: React.ReactNode;
};

type FontFamilyContext = {
  fontFamily: string;
  setFontFamily: React.Dispatch<React.SetStateAction<string>>;
};

export const FontFamilyContext = createContext<FontFamilyContext | null>(null);

const FontFamilyContextProvider = ({
  children,
}: FontFamilyContextProviderProps) => {
  const [fontFamily, setFontFamily] = useState("inter");

  return (
    <FontFamilyContext.Provider value={{ fontFamily, setFontFamily }}>
      {children}
    </FontFamilyContext.Provider>
  );
};

export default FontFamilyContextProvider;

export function useFontFamilyContext() {
  const context = useContext(FontFamilyContext);

  if (!context) {
    throw new Error(
      "useFontFamilyContext must be used within a FontFamilyContextProvider"
    );
  }

  return context;
}

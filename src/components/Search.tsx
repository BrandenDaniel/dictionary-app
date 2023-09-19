"use client";

import Image from "next/image";
import searchIcon from "../assets/icons/icon-search.svg";
import { inter, lora, inconsolata } from "../app/fonts";
import { useFontFamilyContext } from "@/contexts/font-family-context";
import { FormEvent, useEffect, useState } from "react";
import { useWordContentContext } from "@/contexts/word-content-context";

export function fontFamilyCondition(fontFamily: string) {
  return fontFamily === "inter"
    ? inter.className
    : fontFamily === "lora"
    ? lora.className
    : fontFamily === "inconsolata"
    ? inconsolata.className
    : "";
}

const Search = () => {
  const { fontFamily } = useFontFamilyContext();

  const { setWordContent, searchedWord, setSearchedWord, wordSearch } =
    useWordContentContext();

  useEffect(() => {
    wordSearch();
  }, []);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchedWord(searchedWord);
    wordSearch();
  };

  return (
    <form className="search" onSubmit={handleSearch}>
      <input
        type="text"
        id="search"
        onChange={(e) => setSearchedWord(e.currentTarget.value)}
        className={fontFamilyCondition(fontFamily)}
        value={searchedWord}
      />
      <button type="submit">
        <Image src={searchIcon} alt="search" />
      </button>
    </form>
  );
};

export default Search;

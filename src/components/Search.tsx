"use client";

import Image from "next/image";
import searchIcon from "../assets/icons/icon-search.svg";
import closeIcon from "../assets/icons/icon-close.svg";
import { inter, lora, inconsolata } from "../app/fonts";
import { useFontFamilyContext } from "@/contexts/font-family-context";
import { FormEvent, useEffect, ChangeEvent, MouseEvent } from "react";
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

  const { searchedWord, setSearchedWord, apiCall } = useWordContentContext();

  useEffect(() => {
    apiCall(searchedWord);
  }, []);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchedWord(searchedWord);
    searchedWord.length > 0 && apiCall(searchedWord);
  };

  const searchValidator = (e: ChangeEvent<HTMLInputElement>) => {
    e.currentTarget.value.length < 1
      ? e.currentTarget.classList.add("search__invalid")
      : e.currentTarget.classList.remove("search__invalid");

    setSearchedWord(e.currentTarget.value);
  };

  const clearSearch = (e: MouseEvent<HTMLButtonElement>) => {
    searchedWord.length > 0 && setSearchedWord("");
  };

  return (
    <form className="search" onSubmit={handleSearch}>
      <input
        type="text"
        id="search"
        onChange={searchValidator}
        className={fontFamilyCondition(fontFamily)}
        value={searchedWord}
        placeholder="Search for any word…"
      />
      <span>Whoops, can’t be empty…</span>
      <button type="button" onClick={clearSearch}>
        <Image
          src={searchedWord.length > 0 ? closeIcon : searchIcon}
          alt="search"
        />
      </button>
    </form>
  );
};

export default Search;

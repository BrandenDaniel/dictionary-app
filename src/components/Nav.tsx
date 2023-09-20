"use client";

import Image from "next/image";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import Logo from "../assets/icons/logo.svg";
import MoonLight from "../assets/icons/icon-moon-light.svg";
import MoonDark from "../assets/icons/icon-moon-dark.svg";
import { inter, lora, inconsolata } from "../app/fonts";
import { useFontFamilyContext } from "@/contexts/font-family-context";
import { fontFamilyCondition } from "./Search";

const Nav = () => {
  const [isFontFamilyDropdownActive, setIsFontFamilyDropdownActive] =
    useState(false);

  const { fontFamily, setFontFamily } = useFontFamilyContext();

  const [theme, setTheme] = useState("");

  useEffect(() => {
    // Check to see if Media-Queries are supported
    if (window.matchMedia) {
      // Check if the dark-mode Media-Query matches
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setTheme("dark");
        document.body.setAttribute("data-theme", "dark");
      } else {
        setTheme("light");
        document.body.setAttribute("data-theme", "light");
      }
    }
  }, []);

  const handleFontFamilySelector = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsFontFamilyDropdownActive(false);
    setFontFamily(e.currentTarget.value);
    localStorage.setItem("fontFamily", e.currentTarget.value);
  };

  const handleThemeToggle = (e: ChangeEvent<HTMLInputElement>) => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
    document.body.setAttribute(
      "data-theme",
      theme === "light" ? "dark" : "light"
    );
  };

  return (
    <nav className="nav">
      <Image src={Logo} alt="Logo" className="nav__logo" />

      <div>
        <div className="nav__font-dropdown">
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsFontFamilyDropdownActive(!isFontFamilyDropdownActive);
            }}
            className={fontFamilyCondition(fontFamily)}
          >
            {fontFamily === "inter"
              ? "Sans Serif"
              : fontFamily === "lora"
              ? "Serif"
              : fontFamily === "inconsolata"
              ? "Mono"
              : ""}
          </button>

          <ul
            className={`nav__font-dropdown-options ${
              isFontFamilyDropdownActive
                ? "nav__font-dropdown-options--open"
                : ""
            }`}
          >
            <li>
              <button
                className={inter.className}
                value="inter"
                onClick={handleFontFamilySelector}
              >
                Sans Serif
              </button>
            </li>
            <li>
              <button
                className={lora.className}
                value="lora"
                onClick={handleFontFamilySelector}
              >
                Serif
              </button>
            </li>
            <li>
              <button
                className={inconsolata.className}
                value="inconsolata"
                onClick={handleFontFamilySelector}
              >
                Mono
              </button>
            </li>
          </ul>
        </div>
        <div className="nav__theme-toggler">
          <input
            type="checkbox"
            onChange={handleThemeToggle}
            checked={theme === "dark" ? true : false}
          />
          <Image
            src={theme === "light" ? MoonLight : MoonDark}
            alt="theme toggler"
          />
        </div>
      </div>
    </nav>
  );
};

export default Nav;

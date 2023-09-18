"use client";

import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import Logo from "../assets/icons/logo.svg";
import MoonLight from "../assets/icons/icon-moon-light.svg";
import MoonDark from "../assets/icons/icon-moon-dark.svg";
import { inter, lora, inconsolata } from "../app/fonts";

const Nav = () => {
  const [isFontFamilyDropdownActive, setIsFontFamilyDropdownActive] =
    useState(false);

  const [fontFamily, setFontFamily] = useState("inter");

  const [theme, setTheme] = useState("light");

  const handleDropdown = (e: MouseEvent) => {
    e.preventDefault();
    setIsFontFamilyDropdownActive(!isFontFamilyDropdownActive);
  };

  const handleFontFamilySelector = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsFontFamilyDropdownActive(false);
    setFontFamily(e.currentTarget.value);
  };

  const handleThemeToggle = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.checked ? setTheme("dark") : setTheme("light");
  };

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <nav className="nav">
      <Link href="/">
        <Image src={Logo} alt="Logo" className="nav__logo" />
      </Link>

      <div>
        <div className="nav__font-dropdown">
          <button onClick={handleDropdown}>Sans Serif</button>

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
          <input type="checkbox" onChange={handleThemeToggle} />
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

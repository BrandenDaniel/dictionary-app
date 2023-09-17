"use client";

import Image from "next/image";
import Link from "next/link";
import { MouseEvent, useState } from "react";
import Logo from "../assets/icons/logo.svg";
import Moon from "../assets/icons/icon-moon.svg";
import { inter, lora, inconsolata } from "../app/fonts";

const Nav = () => {
  const [isFontFamilySelectorActive, setIsFontFamilySelectorActive] =
    useState(false);

  const [fontFamily, setFontFamily] = useState("inter");

  const handleDropdown = (e: MouseEvent) => {
    e.preventDefault();
    setIsFontFamilySelectorActive(!isFontFamilySelectorActive);
  };

  const handleFontFamilySelector = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setFontFamily(e.currentTarget.value);
  };

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
              isFontFamilySelectorActive
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
          <input type="checkbox" />
          <Image src={Moon} alt="theme toggler" />
        </div>
      </div>
    </nav>
  );
};

export default Nav;

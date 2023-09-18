import Image from "next/image";
import searchIcon from "../assets/icons/icon-search.svg";

const Search = () => {
  return (
    <form className="search">
      <input type="text" />
      <button>
        <Image src={searchIcon} alt="search" />
      </button>
    </form>
  );
};

export default Search;

import clsx from "clsx";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import styles from "./SearchBar.module.css";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  console.log(searchValue);
  return (
    <div className={clsx(styles.container)}>
      <input
        value={searchValue}
        className={clsx(styles.search)}
        type="text"
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyUp={(e) => {
          e.stopPropagation();
          if (e.keyCode === 13) {
            window.location = `/search/${searchValue}`;
          }
        }}
      />
    </div>
  );
};

export default SearchBar;

import clsx from "clsx";
import React, { useState } from "react";

import styles from "./Search.module.css";
import SearchComponent from "./SearchComponent/SearchComponent";

const Search = ({ setIsSearch }) => {
  const [disappear, setDisappear] = useState(false);
  const handleDisappearOnclick = () => {
    setDisappear(true);
    setTimeout(() => {
      setIsSearch(false);
    }, 200);
  };
  return (
    <div className={clsx(styles.container)}>
      <div
        className={clsx(styles.overlay, {
          [styles["overlay--fadeOut"]]: disappear,
        })}
        onClick={handleDisappearOnclick}
      ></div>
      <div
        className={clsx(styles["search-container"], {
          [styles["search-container--fadeOut"]]: disappear,
        })}
      >
        <SearchComponent />
      </div>
    </div>
  );
};

export default Search;

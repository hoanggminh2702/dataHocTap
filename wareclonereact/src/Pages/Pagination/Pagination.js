import clsx from "clsx";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Pagination.module.css";
import { setPage } from "../../features/filterSlice";

const Pagination = ({ setCurpage }) => {
  const totalPages = Math.ceil(
    +useSelector((state) => state.products.all.countDocs) / 8
  );
  const pageArr = [];
  for (let i = 1; i <= totalPages; i++) {
    pageArr.push(i);
  }
  const dispatch = useDispatch();
  const curPage = useSelector((state) => state.filter.page);
  const handleChoosePage = (page) => {
    dispatch(setPage(page));
    setCurpage(page);
  };
  return (
    <div className={clsx(styles.container)}>
      {pageArr.map((page) => (
        <div
          className={styles["page-container"]}
          key={page}
          style={page == curPage ? { backgroundColor: "gray" } : {}}
        >
          <p
            className={styles.page}
            onClick={(e) => {
              handleChoosePage(page);
            }}
          >
            {page}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Pagination;

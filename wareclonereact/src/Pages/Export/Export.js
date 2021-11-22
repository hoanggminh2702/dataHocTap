import clsx from "clsx";
import React, { useEffect, useState } from "react";
import exportApi from "../../api/exportApi";
import LoadingComponent from "../../component/LoadingComponent/LoadingComponent";
import styles from "./Export.module.css";
const Export = () => {
  const [top10Product, setTop10Product] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    exportApi
      .getRevenue()
      .then((res) => setTotalRevenue(res.totalRevenue))
      .catch((err) => console.log(err));
    exportApi
      .getTop10()
      .then((res) => setTop10Product(res.top10Product))
      .catch((err) => console.log(err));
    setIsLoaded(true);
  }, []);
  console.log(top10Product);
  return isLoaded ? (
    <div className={clsx(styles.container, "container-width")}>
      <h1
        className={styles.title}
      >{`Tổng doanh thu của tháng là ${totalRevenue}$`}</h1>
      <h1
        className={styles.title}
      >{`Sản phẩm bán chạy nhất tháng là: ${top10Product[0]?.name}, tổng doanh thu là ${top10Product[0]?.total}$`}</h1>
      <h1 className={styles.title}>{`Top 10 sản phẩm bán chạy nhất tháng`}</h1>
      <table>
        <thead>
          <tr>
            <th className={clsx(styles.td)}>STT</th>
            <th className={clsx(styles.td)}>Tên sản phẩm</th>
            <th className={clsx(styles.td)}>Số lượng đã bán</th>
            <th className={clsx(styles.td)}>Tổng doanh thu</th>
          </tr>
        </thead>
        <tbody>
          {top10Product.map((product, index) => {
            return (
              <tr key={product._id}>
                <td className={clsx(styles.th)}>{index}</td>
                <td className={clsx(styles.th)}>{product.name}</td>
                <td className={clsx(styles.th)}>{product.quantity}</td>
                <td className={clsx(styles.th)}>{`${product.total}$`}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  ) : (
    <LoadingComponent />
  );
};

export default Export;

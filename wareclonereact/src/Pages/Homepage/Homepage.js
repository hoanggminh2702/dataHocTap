import TopProductComponent from "./TopProductComponent/TopProductComponent";
import styles from "./Homepage.module.css";
import AllProductComponent from "./AllProductComponent/AllProductComponent";
const Homepage = () => {
  console.log(styles);
  return (
    <>
      <>
        <h1 className={styles.header}>Top sản phẩm bán chạy nhất tháng</h1>
        <TopProductComponent />
        <h1 className={styles.header}>Tất cả sản phẩm</h1>
        <AllProductComponent />
      </>
    </>
  );
};

export default Homepage;

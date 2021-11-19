import TopProductComponent from "./TopProductComponent/TopProductComponent";
import AllProductComponent from "./AllProductComponent/AllProductComponent";
import TitleComponent from "../../component/TitleComponent/TitleComponent";
const Homepage = () => {
  return (
    <>
      <>
        <TitleComponent title={"Top sản phẩm bán chạy nhất tháng"} />
        <TopProductComponent />
        <TitleComponent title={"Tất cả sản phẩm"} />
        <AllProductComponent />
      </>
    </>
  );
};

export default Homepage;

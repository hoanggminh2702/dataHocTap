import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../slice/productSlice";
import axios from "axios";
const Homepage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/getProducts?search=&take=5&page=1&price=`)
      .then((res) => {
        const action = fetchAllProducts(res.data.items);
        dispatch(action);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleOnClick = () => {
    console.log(products);
  };
  return (
    <>
      <div style={{ backgroundColor: "orange", height: "600px" }}>
        <button onClick={handleOnClick}>Click to add product</button>
      </div>
    </>
  );
};

export default Homepage;

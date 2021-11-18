import React, { useEffect, useState } from "react";
import Footer from "./component/Footer/Footer";
import GlobalStyle from "./component/GlobalStyle";
import Header from "./component/Header/Header";
import Homepage from "./Pages/Homepage/Homepage";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";
import Login from "./Pages/LoginPage/Login";
import Regiser from "./Pages/RegisterPage/Regiser";
import productApi from "./api/productApi";

const App = () => {
  const [productList, setProductList] = useState([]);
  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const response = await productApi.getAll();
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProductList();
  }, []);

  return (
    <GlobalStyle>
      <Router>
        <Header />
        <Switch>
          <Route index element={<Homepage />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<Regiser />} />
          <Route path="*" element={<Homepage />} />
        </Switch>
        <Footer />
      </Router>
    </GlobalStyle>
  );
};

export default App;

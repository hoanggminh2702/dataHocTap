import React, { Suspense, lazy } from "react";
import Footer from "./component/Footer/Footer";
import GlobalStyle from "./component/GlobalStyle";
import Header from "./component/Header/Header";
import Homepage from "./Pages/Homepage/Homepage";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";
import { Navigate } from "react-router";

import Regiser from "./Pages/RegisterPage/Regiser";
import ManageProduct from "./Pages/ManageProduct/ManageProduct";
import { useSelector } from "react-redux";
import ProductInfo from "./Pages/ProductInfo/ProductInfo";
import RequiredAuth from "./utils/RequiredAuth";
import FormProduct from "./Pages/ManageProduct/FormProduct/FormProduct";
import LoadingComponent from "./component/LoadingComponent/LoadingComponent";
import EditProduct from "./Pages/ManageProduct/EditProduct/EditProduct";
import CreateProduct from "./Pages/ManageProduct/CreateProduct/CreateProduct";

const App = () => {
  const Login = React.lazy(() => import("./Pages/LoginPage/Login"));

  return (
    <Suspense fallback={<LoadingComponent />}>
      <GlobalStyle>
        <Router>
          <Header />
          <Switch>
            <Route index element={<Homepage />} />
            <Route exact path="/product/:id" element={<ProductInfo />} />
            {/* <Route
            path="/manageproduct/*"
            element={user === "admin" ? <ManageProduct /> : <Navigate to="/" />}
          /> */}
            <Route
              path="/manageproduct"
              element={
                <RequiredAuth>
                  <ManageProduct />
                </RequiredAuth>
              }
            />
            <Route
              path="/manageproduct/edit/:id"
              element={
                <RequiredAuth>
                  <EditProduct />
                </RequiredAuth>
              }
            />
            <Route
              path="/manageproduct/create"
              element={
                <RequiredAuth>
                  <CreateProduct />
                </RequiredAuth>
              }
            />
            <Route path="/login" exact element={<Login />} />
            <Route path="/register" exact element={<Regiser />} />
            <Route path="*" element={<Homepage />} />
          </Switch>
          <Footer />
        </Router>
      </GlobalStyle>
    </Suspense>
  );
};

export default App;

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
import Login from "./Pages/LoginPage/Login";
import Regiser from "./Pages/RegisterPage/Regiser";
import ManageProduct from "./Pages/ManageProduct/ManageProduct";
import { useSelector } from "react-redux";
import ProductInfo from "./Pages/ProductInfo/ProductInfo";
import RequiredAuth from "./utils/RequiredAuth";
import FormProduct from "./Pages/ManageProduct/FormProduct/FormProduct";

const App = () => {
  const user = useSelector((state) => state.user.role);
  return (
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
          <Route path="/edit" element={<FormProduct />} />

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

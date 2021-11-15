import React from "react";
import Footer from "./component/Footer/Footer";
import GlobalStyle from "./component/GlobalStyle";
import Header from "./component/Header/Header";
import Homepage from "./Pages/Homepage/Homepage";

const App = () => {
  return (
    <GlobalStyle>
      <Header />
      <Homepage />
      <Footer />
    </GlobalStyle>
  );
};

export default App;

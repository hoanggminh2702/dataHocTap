import SecNavMobileComponent from "./SecNavMobile/SecNavMobileComponent";
import SecNavPCComponent from "./SecNavPC/SecNavPCComponent";
import "./secnav.css";

const SecNavComponent = () => {
  return (
    <section className="sec-nav sec-nav--shadow">
      <SecNavPCComponent />
      <SecNavMobileComponent />
    </section>
  );
};

export default SecNavComponent;

import MainSection from "../../sections/MainSection/MainSection";
import SideSection from "../../sections/SideSection/SideSection";

const HomePage = () => {
  return (
    <div className="row" style={{ margin: "auto" }}>
      <div className="col-lg-8 nopadding">
        <MainSection />
      </div>
      <div className="col-lg-4 nopadding">
        <SideSection />
      </div>
    </div>
  );
};

export default HomePage;

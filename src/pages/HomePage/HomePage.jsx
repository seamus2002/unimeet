import { useContext } from "react";
import MainSection from "../../sections/MainSection/MainSection";
import SideSection from "../../sections/SideSection/SideSection";
import { GroupContext } from "../../contexts/GroupContext";

const HomePage = () => {
  const { currentGroup, members, memberInfo, memberInfoFetched } =
    useContext(GroupContext);

  return (
    <div className="row" style={{ margin: "auto" }}>
      <div className="col-lg-8 nopadding">
        <MainSection memberInfo={memberInfo} />
      </div>
      <div className="col-lg-4 nopadding">
        <SideSection />
      </div>
    </div>
  );
};

export default HomePage;

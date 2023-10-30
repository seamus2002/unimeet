import Header from "../../components/Header/Header";
import GroupList from "../../components/GroupList/GroupList";
import ScheduleList from "../../components/ScheduleList/ScheduleList";
import GroupChat from "../../components/GroupChat/GroupChat";
import useGroupData from "../../hooks/useGroupData";

const MainSection = () => {
  const { currentGroup, members, memberInfo, memberInfoFetched } =
    useGroupData();

  return (
    <div className="main-section">
      <Header />
      <GroupList memberInfo={memberInfo} />
      <div className="row">
        <div className="col-lg-6 nopadding">
          <ScheduleList />
        </div>
        <div className="col-lg-6 nopadding">
          <GroupChat />
        </div>
      </div>
    </div>
  );
};

export default MainSection;

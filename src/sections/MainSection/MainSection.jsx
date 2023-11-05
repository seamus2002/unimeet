import Header from "../../components/Header/Header";
import GroupList from "../../components/GroupList/GroupList";
import ScheduleList from "../../components/ScheduleList/ScheduleList";
import GroupChat from "../../components/GroupChat/GroupChat";
import AddEventForm from "../../components/AddEventForm/AddEventForm";

const MainSection = ({ memberInfo }) => {
  return (
    <div className="main-section">
      <Header />
      <GroupList memberInfo={memberInfo} />
      <div className="row" style={{ margin: "auto" }}>
        <div className="col col-lg-6 nopadding">
          <ScheduleList memberInfo={memberInfo} />
        </div>
        <div className="col col-lg-6 nopadding">
          <AddEventForm />
          {/* <GroupChat /> */}
        </div>
      </div>
    </div>
  );
};

export default MainSection;

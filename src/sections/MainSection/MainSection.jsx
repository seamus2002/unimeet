import Header from "../../components/Header/Header";
import GroupList from "../../components/GroupList/GroupList";
import ScheduleList from "../../components/ScheduleList/ScheduleList";
import GroupChat from "../../components/GroupChat/GroupChat";
import AddEventForm from "../../components/AddEventForm/AddEventForm";
import BigCalendar from "../../components/BigCalendar/BigCalendar";
import { useState } from "react";

const MainSection = ({ memberInfo }) => {
  const [onCalendar, setOnCalendar] = useState(false);
  return (
    <div className="main-section">
      <Header onCalendar={onCalendar} setOnCalendar={setOnCalendar} />
      <GroupList memberInfo={memberInfo} />
      <div className="row" style={{ margin: "auto" }}>
        <BigCalendar memberInfo={memberInfo} />
        {/* <div className="col col-lg-6 nopadding">
              <ScheduleList memberInfo={memberInfo} />
            </div>
            <div className="col col-lg-6 nopadding">
              <AddEventForm />
            </div>{" "} */}
      </div>
    </div>
  );
};

export default MainSection;

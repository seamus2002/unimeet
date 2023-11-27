import Header from "../../components/Header/Header";
import GroupList from "../../components/GroupList/GroupList";
import BigCalendar from "../../components/BigCalendar/BigCalendar";
import { useState } from "react";

const MainSection = () => {
  const [onCalendar, setOnCalendar] = useState(false);
  return (
    <div className="main-section">
      <Header onCalendar={onCalendar} setOnCalendar={setOnCalendar} />
      <GroupList />
      <div className="row" style={{ margin: "auto" }}>
        <BigCalendar />
      </div>
    </div>
  );
};

export default MainSection;

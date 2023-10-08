import Header from "../components/Header"
import GroupList from "../components/GroupList"
import ScheduleList from "../components/ScheduleList"
import GroupChat from "../components/GroupChat"

const MainSection = () => {
  return (
    <div className="main-section">
        <Header />
        <GroupList />
        <div className="row">
            <div className="col-lg-6 nopadding">
                <ScheduleList />
            </div>
            <div className="col-lg-6 nopadding">
                <GroupChat />
            </div>
        </div>
    </div>
  )
}

export default MainSection
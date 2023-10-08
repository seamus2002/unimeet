import Header from "../components/Header"
import GroupList from "../components/GroupList"
import ScheduleList from "../components/ScheduleList"
import GroupChat from "../components/GroupChat"

const MainSection = () => {
  return (
    <div className="main-section">
        <Header />
        <GroupList />
        <div>
            <div>
                <ScheduleList />
            </div>
            <div>
                <GroupChat />
            </div>
        </div>
    </div>
  )
}

export default MainSection
import MainSection from "../sections/MainSection"
import SideSection from "../sections/SideSection"

const MainPage = () => {
  return (
    <div className="row">
      <div className="col-lg-8 nopadding">
        <MainSection />
      </div>
      <div className="col-lg-4 nopadding">
        <SideSection />
      </div>
    </div>
  )
}

export default MainPage
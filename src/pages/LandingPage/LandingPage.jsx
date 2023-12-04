import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./LandingPage.css";

const Landing = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="container col-xxl-8 px-4 py-5">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-10 col-sm-8 col-lg-6">
            <img
              src="https://th.bing.com/th/id/OIP.Nb-0SoiM6taBtb0YcrPwXwHaE3?pid=ImgDet&rs=1"
              alt="Welcome Image"
              className="landing-image"
            />
          </div>
          <div className="col-lg-6">
            <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">
              Welcome to UniMeet{" "}
              <img src={logo} alt="logo" style={{ width: "50px" }} />
            </h1>
            <p className="lead">
              A place where you can effortlessly coordinate meetups with your
              friends, even with your busy schedules.
            </p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              <button
                type="button"
                className="btn btn-primary btn-lg px-4 me-md-2"
                onClick={() => navigate("/auth")}
              >
                Log In
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="blue-section">
        <h2 className="section-title">Why Choose UniMeet?</h2>
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="phrase-container">
                <img
                  src="https://th.bing.com/th/id/OIP.geOxNyQMHIGgZPP0ZMKr8wHaFS?pid=ImgDet&rs=1"
                  alt="Revolutionize Image"
                  className="phrase-image"
                />
                <p className="phrase1">
                  Revolutionize the way you plan meetups and connect with
                  friends.
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="phrase-container">
                <img
                  src="https://assets.website-files.com/634681057b887c6f4830fae2/6367ddcb71d5e9741bb2de9c_6259f7e1d6bb00e39f6ac2e8_schedule_conflict.png"
                  alt="Scheduling Conflicts Image"
                  className="phrase-image"
                />
                <p className="phrase">
                  Say goodbye to scheduling conflicts and hello to hassle-free
                  meetups.
                </p>
              </div>
            </div>
            <div className="col-lg-4 spacing">
              <div className="phrase-container">
                <img
                  src="https://thumbs.dreamstime.com/b/people-meeting-together-outdoor-friends-gathering-vector-illustration-concept-friend-meetup-celebration-collab-collaboration-197968976.jpg"
                  alt="Future of Meetup Coordination Image"
                  className="phrase-image"
                />
                <p className="phrase3">
                  Experience the future of meetup coordination with UNIMEET.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer">
        <p className="footer-text">
          &copy; {new Date().getFullYear()} UniMeet. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Landing;

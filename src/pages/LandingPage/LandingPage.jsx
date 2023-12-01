import { Link } from "react-router-dom";
import "./LandingPage.css";

const Landing = () => {
  return (
    <div className="landing-container">
      <header className="header">
        <h1 className="logo">UNIMEET</h1>
        <p className="slogan">Simplify Your Meetups</p>
      </header>

    <div className="hero-container">
      <section className="hero">
        <h2 className="hero-title">Welcome to UNIMEET</h2>
        <p className="hero-description">
          A place where you can effortlessly coordinate meetups with your
          friends, even with your busy schedules.
        </p>
        <section className="cta-section">
          <Link to="/auth" className="cta-button secondary">
            Log in
          </Link>
        </section>
      </section>

      <img
        src="https://th.bing.com/th/id/OIP.Nb-0SoiM6taBtb0YcrPwXwHaE3?pid=ImgDet&rs=1"
        alt="Welcome Image"
        className="landing-image"
      />

    </div>

      {/* Phrases about UNIMEET */}
      <section className="phrases-section">
        <h2 className="section-title">Why Choose UNIMEET?</h2>
      <div className="card-container">
        <div className="phrase-container">
          <p className="phrase1">
            Revolutionize the way you plan meetups and connect with friends.
          </p>
          <img
            src="https://th.bing.com/th/id/OIP.geOxNyQMHIGgZPP0ZMKr8wHaFS?pid=ImgDet&rs=1"
            alt="Revolutionize Image"
            className="phrase-image"
          />
        </div>
        <div className="phrase-container">
          <p className="phrase">
            Say goodbye to scheduling conflicts and hello to hassle-free
            meetups.
          </p>
          <img
            src="https://assets.website-files.com/634681057b887c6f4830fae2/6367ddcb71d5e9741bb2de9c_6259f7e1d6bb00e39f6ac2e8_schedule_conflict.png"
            alt="Scheduling Conflicts Image"
            className="phrase-image"
          />
        </div>

        <div className="phrase-container">
          <p className="phrase3">
            Experience the future of meetup coordination with UNIMEET.
          </p>
          <img
            src="https://thumbs.dreamstime.com/b/people-meeting-together-outdoor-friends-gathering-vector-illustration-concept-friend-meetup-celebration-collab-collaboration-197968976.jpg"
            alt="Future of Meetup Coordination Image"
            className="phrase-image"
          />
        </div>
      </div>
      </section>

      <footer className="footer">
        <p className="footer-text">
          &copy; {new Date().getFullYear()} UNIMEET. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Landing;

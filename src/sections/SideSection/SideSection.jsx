import "./SideSection.css";

const SideSection = () => {
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3">
      <a
        href="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-decoration-none"
      >
        <span className="fs-4">UniMeet</span>
      </a>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <label for="groups">Group: </label>

          <select name="groups" id="groups">
            <option value="group1">group1</option>
            <option value="group2">group2</option>
            <option value="group3">group3</option>
            <option value="group4">group4</option>
          </select>
        </li>
        <li>Calendar</li>
        <li>
          <a href="#" className="nav-link">
            Sign Out
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SideSection;

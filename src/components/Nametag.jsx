const Nametag = ({ displayName }) => {
  return (
    <div className="nametag-container">
      <div className="nametag">
        {displayName}
        {/* {displayName.split(" ").slice(0, -1).join(" ")} */}
      </div>
    </div>
  );
};

export default Nametag;

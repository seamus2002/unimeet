const Nametag = ({ displayName }) => {
  return (
    <div className="nametag-container">
      <div className="nametag">
        {displayName.split(" ").slice(0, -1).join(" ")}
      </div>
    </div>
  );
};

export default Nametag;

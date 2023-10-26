const Nametag = ({ displayName }) => {
  return (
    <div className="nametag-container">
      <div className="nametag">
        {
          /\s/.test(displayName)
            ? displayName.split(" ")[0].length > 8
              ? displayName.split(" ")[0].slice(0, 8) + "..." // Display the first 8 characters of the first name with an ellipsis
              : displayName.split(" ")[0] // Display the first name as is if it's 8 characters or shorter
            : displayName // Display the full name if there is no space
        }
      </div>
    </div>
  );
};

export default Nametag;

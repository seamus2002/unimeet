import "./GroupChat.css";

const GroupChat = () => {
  return (
    <div className="group-chat">
      <form className="bottom">
        <input
          type="text"
          id="GroupChatInput"
          className=""
          placeholder="Send Message"
        />
      </form>
      
      <div className="bottomPart">
        <button className="btn btn-success">Add Event</button>
        <button className="btn btn-danger">Delete Event</button>
      </div>
    </div>
  );
};

export default GroupChat;

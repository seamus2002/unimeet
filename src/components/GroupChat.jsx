import "./styles/GroupChat.css";

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
    </div>
  );
};

export default GroupChat;

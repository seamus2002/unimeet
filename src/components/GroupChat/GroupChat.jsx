import "./GroupChat.css";
import React, { useState, useEffect } from "react";
import { addMessageToFirestore, listenForGroupMessages, db } from "../../utils/firebase/firebase.utils";


const GroupChat = ({ currentUserId, currentGroupId }) => {
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');

  useEffect(() => {
    if (currentGroupId) {
      const unsubscribe = listenForGroupMessages(currentGroupId, setMessages);
      return () => unsubscribe(); // Cleanup on unmount.
    }
  }, [currentGroupId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Debugging: Log the currentGroupId to see what it is when we try to send a message
    console.log('Current Group ID:', currentGroupId);
  
    if (!currentGroupId) {
      console.error('Cannot send message. No current group ID is defined.');
      return; // Exit the function if no currentGroupId is defined
    }
  
    if (chatInput.trim()) {
      await addMessageToFirestore(currentGroupId, currentUserId, chatInput)
        .then(() => {
          setChatInput(''); // Clear the input field after sending
        })
        .catch((error) => {
          console.error("Error sending message:", error);
        });
    }
  };
  

  return (
    <div className="group-chat">
      <div className="chat-messages">
        {messages.map((message) => (
          <div key={message.id} className="message">
            {message.text}
          </div>
        ))}
      </div>
      <form className="bottom" onSubmit={handleSubmit}>
        <input
          type="text"
          id="GroupChatInput"
          placeholder="Send Message"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default GroupChat;

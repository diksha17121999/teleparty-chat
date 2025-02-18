import React, { useState } from "react";
import { socket } from "../utils/socket";
import { SocketMessageTypes } from "teleparty-websocket-lib";

interface ChatInputProps {
  nickname: string;
  setMessages: React.Dispatch<React.SetStateAction<any[]>>;
}

const ChatInput: React.FC<ChatInputProps> = ({ nickname, setMessages }) => {
    const [message, setMessage] = useState("");
  
    const sendMessage = () => {
      if (!message.trim()) return;
  
      const formattedMessage = {
        type: "SEND_MESSAGE",
        data: {
          userNickname: nickname || "Unknown",
          body: message,
        },
      };
  
      socket.sendMessage(SocketMessageTypes.SEND_MESSAGE, formattedMessage);
      setMessages((prev) => [...prev, formattedMessage]);
      setMessage("");
    };
  
    return (
      <div className="input-container">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="input-box"
        />
        <button onClick={sendMessage} className="send-button">Send</button>
      </div>
    );
  };
  

export default ChatInput;

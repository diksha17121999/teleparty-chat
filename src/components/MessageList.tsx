import React from "react";

interface ChatMessage {
  type: string;
  data: {
    userNickname?: string;
    body: string;
  };
}

interface MessageListProps {
  messages: ChatMessage[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
    return (
      <div className="chat-room">
        {messages.length === 0 && <p>No messages yet. Start chatting!</p>}
        {messages.map((msg, index) => {
          const sender = msg?.data?.userNickname || "Unknown";
          const messageText = msg?.data?.body || "(empty message)";
          const isUser = sender === "You";
  
          return (
            <p key={index} className={`message ${isUser ? "user-message" : "other-message"}`}>
              <strong>{sender}: </strong> {messageText}
            </p>
          );
        })}
      </div>
    );
  };
  
  

export default MessageList;

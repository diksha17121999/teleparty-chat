import React, { useEffect, useState } from "react";
import { socket, setMessageHandler } from "../utils/socket";
import ChatInput from "./ChatInput";
import MessageList from "./MessageList";
import { useParams } from "react-router-dom";

interface ChatMessage {
  type: string;
  data: {
    userNickname?: string;
    body: string;
  };
}

const ChatRoom = () => {
  const { roomId } = useParams();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [nickname, setNickname] = useState<string>("");

  useEffect(() => {
    const storedNickname = localStorage.getItem("nickname");
    if (storedNickname) {
      setNickname(storedNickname);
    } else {
      alert("No nickname found. Redirecting to home.");
      window.location.href = "/";
    }

    const handleMessage = (message: any) => {
      console.log("📩 Received message:", message);

      // Ignore non-chat messages
      if (message.type !== "SEND_MESSAGE" && message.type !== "sendMessage") return;

      const formattedMessage: ChatMessage = {
        type: message.type,
        data: {
          userNickname: message.data?.userNickname || "Unknown",
          body: message.data?.body || "(empty message)",
        },
      };

      setMessages((prev) => [...prev, formattedMessage]);
    };

    setMessageHandler(handleMessage);

    return () => {
      setMessageHandler(() => {});
    };
  }, []);

  return (
    <div className="chat-room">
      <h2>Chat Room: {roomId}</h2>
      <MessageList messages={messages} />
      <ChatInput nickname={nickname} setMessages={setMessages} /> {}
    </div>
  );
};

export default ChatRoom;

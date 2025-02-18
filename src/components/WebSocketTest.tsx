import React, { useEffect, useState } from "react";
import { TelepartyClient, SocketEventHandler, SocketMessageTypes } from "teleparty-websocket-lib";

const WebSocketTest = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [socket, setSocket] = useState<TelepartyClient | null>(null);

  useEffect(() => {
    const eventHandler: SocketEventHandler = {
      onConnectionReady: () => {},
      onClose: () => {},
      onMessage: (message) => setMessages((prev) => [...prev, JSON.stringify(message)]),
    };

    const client = new TelepartyClient(eventHandler);
    setSocket(client);

    return () => setSocket(null);
  }, []);

  const sendMessage = () => {
    if (!socket) return;

    socket.sendMessage(SocketMessageTypes.SEND_MESSAGE, { body: "Hello, Teleparty!" });
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#f5f5f5", border: "1px solid #ddd", borderRadius: "8px" }}>
      <h2>WebSocket Test</h2>
      <button 
        onClick={sendMessage} 
        style={{ padding: "10px", fontSize: "16px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
        Send Test Message
      </button>
      <h3>Received Messages:</h3>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default WebSocketTest;

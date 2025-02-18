import React, { useState } from "react";
import { socket } from "../utils/socket";
import { useNavigate } from "react-router-dom";
import "../styles.css";

const Home = () => {
  const [roomName, setRoomName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();

  const createRoom = async () => {
    if (!nickname || !roomName) {
      alert("Please enter both a nickname and a room name.");
      return;
    }

    localStorage.setItem("nickname", nickname);
    const formattedRoomId = roomName.toLowerCase().replace(/\s+/g, "-");
    
    await socket.createChatRoom(nickname);
    navigate(`/chat/${formattedRoomId}`);
  };

  const joinRoom = () => {
    if (!roomId.trim() || !nickname.trim()) {
      alert("Enter a valid Room ID and Nickname.");
      return;
    }

    localStorage.setItem("nickname", nickname);
    socket.joinChatRoom(nickname, roomId);
    navigate(`/chat/${roomId}`);
  };

  return (
    <div className="home-container">
      <h1>✨ Teleparty Chat</h1>
      <input 
        type="text" 
        placeholder="Enter your nickname" 
        value={nickname} 
        onChange={(e) => setNickname(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Enter a room name" 
        value={roomName} 
        onChange={(e) => setRoomName(e.target.value)} 
      />
      <button onClick={createRoom} className="create-room-btn">Create Room</button>
      <input 
        type="text" 
        placeholder="Enter existing Room ID" 
        value={roomId} 
        onChange={(e) => setRoomId(e.target.value)} 
      />
      <button onClick={joinRoom} className="join-room-btn">Join Room</button>
    </div>
  );
};

export default Home;

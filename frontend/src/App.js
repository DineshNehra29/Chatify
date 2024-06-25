
import './App.css';
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./chat";

const socket = io.connect("http://localhost:3005");



function App() {

  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [showchat, setShowchat] = useState(false);

  const joinRoom = () => {
    if (name !== "" && room !== "") {
      socket.emit("join-room", room);
      setShowchat(true);
    }
  };

  return (

    <div className="App">
      {!showchat ? (
        <div className='join-chat'>
          <h1>Join A Chat...</h1>

          
          <input className="name"
            type="text"
            placeholder="enter name..."
            onChange={(e) => { setName(e.target.value); }} ></input>

          
          <input className="name"
            type="text"
            placeholder="enter room id..."
            onChange={(e) => { setRoom(e.target.value); }} ></input>

          <button onClick={joinRoom}>Join Room...</button> </div>) :

        (<Chat socket={socket} name={name} room={room} />)}
    </div>
  );
}

export default App;

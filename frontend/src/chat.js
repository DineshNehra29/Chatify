import React, { useState, useMemo, useRef, useEffect } from 'react';
import moment from 'moment';

function Chat({ socket, name, room }) {

    const [message, setMessage] = useState("");
    const [allmessage, setAllmessage] = useState([]);
    const messageEnd = useRef(null);


    const sendMessage = async () => {
        if (message !== "") {
            const messageData = {
                room: room,
                author: name,
                message: message,
                time: moment().format('LT'),
            };

            await socket.emit("send-message", messageData);
            setAllmessage((list) => [...list, messageData]);
            setMessage("");
        }

    };

    useMemo(() => {
        socket.on("receive-message", (data) => {
            console.log(data);
            setAllmessage((list) => [...list, data]);
        });

    }, [socket]);

    useEffect(()=>{
       messageEnd.current?.scrollIntoView();
    },[allmessage])

    return (
        <div className='chat'>
            <div className='chat-head'>
                <h1>{room}</h1>
            </div>
            <div className='allmessages'>
                 {allmessage.map((item, index) => {
                    return (
                        <div className='message' key={index} 
                        id={name === item.author ? "you" : "other"} >
                           
                            <div className='message-content'>
                                <p className='author'>{item.author}</p>
                               <h2>{item.message}</h2> 
                               <p className='time'>{item.time}</p>
                            </div>
                            
                        </div>)
                })}
              <div ref={messageEnd}></div>     
            </div>
            <div className='send'>
                <input className="message-sent"
                    type="text"
                    value={message}
                    placeholder="enter message..."
                    onChange={(e) => { setMessage(e.target.value); }} 
                   ></input>
                <button className='send-button' onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    )
}

export default Chat
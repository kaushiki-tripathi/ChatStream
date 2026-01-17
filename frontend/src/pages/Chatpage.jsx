import React from 'react'
import axios from 'axios';
import { useEffect,useState } from 'react';

const Chatpage = () => {
const [chats,setChats]=useState([]);


  const fetchChats = async () => {                          // API call to fetch chats will go here
    const {data}=await axios.get('/api/chat');
    setChats(Array.isArray(data)?data:data.chats ||[]);
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div>
      <h1>Chat Page loaded</h1>
      {chats.map((chat) => (
        <div key={chat._id}>{chat.chatName}</div>
      ))}
      </div>
  )
}

export default Chatpage

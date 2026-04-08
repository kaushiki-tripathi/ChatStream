import React, { useState, useEffect } from "react";
import axios from "axios";
import './style.css';
import  {ChatState}  from "../context/ChatProvider";
import {
  Box,
  Typography,
  IconButton,
  CircularProgress,
  TextField,
  Snackbar,
  Alert,
  FormControl,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";
import { getSender } from "../config/ChatLogics";
import { getSenderFull } from "../config/ChatLogics";
import ProfileModal from "./miscellaneous/ProfileModal";
import ScrollableChat from "./ScrollableChat";


const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [toastMsg, setToastMsg] = useState({ open: false, title: "", status: "info" });
  const { user, selectedChat, setSelectedChat } = ChatState();


  const sendMessage = async(e) => {
     if(e.key === "Enter" && newMessage) {
      try{
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage(""); // Show loading indicator for sending message
        const { data } = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );
        console.log("Message sent:", data);

        // ✅ ONLY CHANGE IS HERE
        setMessages((prevMessages) => [...prevMessages, data]);

      } catch (error) {
        setToastMsg({
          open: true,
          title: "Failed to send the Message",
          status: "error",
        });
      }
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    // Typing indicator logic can be implemented here if needed
  };

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );
      const sortedMessages = data.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
      console.log("Fetched messages:", data);
      setMessages(sortedMessages);
      setLoading(false);

    } catch (error) {
      setToastMsg({
        open: true,
        title: "Failed to Load the Messages",
        status: "error",
      });
    }
  };

  useEffect(()=>{
  fetchMessages();
},[selectedChat])


  return (
    <>
      {selectedChat ? (
        <>
          <Typography
            sx={{
              fontSize: { xs: "28px", md: "30px" },
              pb: 3,
              px: 2,
              width: "100%",
              fontFamily: "Work sans",
              display: "flex", // 'd' becomes 'display'
              justifyContent: { xs: "space-between" },
              alignItems: "center",
            }}
          >
            <IconButton
              sx={{ display: { xs: "flex", md: "none" }, color: "#111" }}
              onClick={() => setSelectedChat("")}
            >
              <ArrowBackIcon />
            </IconButton>
            {!selectedChat.isGroupChat ? (
              <>
                {/* For Individual Chats */}
                {getSender(user, selectedChat.users)}
                <ProfileModal user={getSenderFull(user, selectedChat.users)} />
              </>
            ) : (
              <>
                {/* For Group Chats */}
                {selectedChat.chatName}
                <UpdateGroupChatModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  fetchMessages={fetchMessages}
                />
              </>
            )}
          </Typography>
          <Box sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              p: 2,
              background: "rgba(2, 6, 23, 0.5)", 
              borderRadius: "12px",
              border: "1px solid rgba(16, 185, 129, 0.2)",
              overflowY: "hidden",
              width: "100%",
              height: "100%",
            }}>
            {
              loading ? (
                <CircularProgress 
                size={40}
                sx={{
                  color:"#383333",
                  alignSelf:"center",
                  margin:"auto",
                }} />
              ) : (
                <div className="messages">
                   <ScrollableChat messages={messages} />
              </div>
              )
            }
            
            <FormControl onKeyDown={sendMessage} fullWidth required sx={{ mt: 3 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Type a message..."
                value={newMessage}
                onChange={typingHandler}
                sx={{
                  bgcolor: "#E0E0E0",
                  borderRadius: "24px",
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '24px',
                    bgcolor: '#E0E0E0',
                    '& fieldset': {
                      borderColor: '#E0E0E0',
                    },
                    '&:hover fieldset': {
                      borderColor: '#B0B0B0',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#B0B0B0',
                    },
                  },
                }}
              />
            </FormControl>

          </Box>
        </>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100%"
        >
          <Typography variant="h5" fontFamily="Space Grotesk" color="gray">
            Click on a user to start chatting
          </Typography>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
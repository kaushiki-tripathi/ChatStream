import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import { ChatState } from "../context/ChatProvider";
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
import io from "socket.io-client";
import Lottie from "react-lottie";
import animationData from "../animations/typing.json";

const Endpoint = import.meta.env.VITE_API_URL || "http://localhost:5000";
var socket, selectedChatCompare;

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [toastMsg, setToastMsg] = useState({
    open: false,
    title: "",
    status: "info",
  });
  const { user, selectedChat, setSelectedChat, notification, setNotification } = ChatState();
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    socket = io(Endpoint); // Initialize socket connection
    socket.emit("setup", user); // Emit setup event with user data
    socket.on("connected", () => {
      setSocketConnected(true); // Set socket connection status to true when connected
    });
    socket.on("typing", () => {
      setIsTyping(true); // Set isTyping to true when typing event is received
    });
    socket.on("stop typing", () => {
      setIsTyping(false); // Set isTyping to false when stop typing event is received
    });
  }, []);

  const sendMessage = async (e) => {
    if (e.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat._id); // Emit stop typing event when message is sent
      try {
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
          config,
        );
        
        socket.emit("new message", data); // Emit new message event to the server for real-time updates

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
    if (!socketConnected) return;
    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    const lastTypingTime = new Date().getTime();
    const timerLength = 3000;
    setTimeout(() => {
      const timeNow = new Date().getTime();
      const timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
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
        config,
      );
      const sortedMessages = data.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      );
      console.log("Fetched messages:", data);
      setMessages(sortedMessages);
      setLoading(false);
      socket.emit("join chat", selectedChat._id); // Join the chat room for real-time updates
    } catch (error) {
      setToastMsg({
        open: true,
        title: "Failed to Load the Messages",
        status: "error",
      });
    }
  };

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        if(!notification.includes(newMessageRecieved)){
          setNotification([newMessageRecieved, ...notification]);
          setFetchAgain(!fetchAgain);
        }
        
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

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
          <Box
            sx={{
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
            }}
          >
            {loading ? (
              <CircularProgress
                size={40}
                sx={{
                  color: "#383333",
                  alignSelf: "center",
                  margin: "auto",
                }}
              />
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
            )}

            <FormControl
              onKeyDown={sendMessage}
              fullWidth
              required
              sx={{ mt: 3 }}
            >
              {isTyping ? (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Lottie
                    options={defaultOptions}
                    width={40}
                    height={20}
                    style={{ margin: "5px 0 5px 10px" }}
                  />
                </div>
              ) : null}
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Type a message..."
                value={newMessage}
                onChange={typingHandler}
                sx={{
                  bgcolor: "#E0E0E0",
                  borderRadius: "24px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "24px",
                    bgcolor: "#E0E0E0",
                    "& fieldset": {
                      borderColor: "#E0E0E0",
                    },
                    "&:hover fieldset": {
                      borderColor: "#B0B0B0",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#B0B0B0",
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

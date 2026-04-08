import React from "react";
import { Box, Stack, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState, useEffect } from "react";
import axios from "axios";
import { ChatState } from "../context/ChatProvider";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import ChatLoading from "./ChatLoading";
import { getSender } from "../config/ChatLogics";


const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  const [toast, setToast] = useState({ open: false, msg: "", type: "error" });

  const fetchChats = async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      setToast({
        open: true,
        msg: "Failed to load chats",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);

  return (
  <Box
    sx={{
      display: { xs: selectedChat ? "none" : "flex", md: "flex" },
      flexDirection: "column",
      height: "100%",
      backgroundColor: "#064e3b",
      width: { xs: "100%", md: "31%" },
      borderRadius: 3,
      border: "1px solid #e5e7eb",
      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      overflow: "hidden",
    }}
  >
    {/* Header */}
    <Box
      sx={{
        px: 2,
        py: 1.5,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #f1f5f9",
        backgroundColor: "#f9fafb",
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: "22px", md: "26px" },
          fontWeight: 600,
          fontFamily: "Work Sans",
          color: "#0f172a",
        }}
      >
        My Chats
      </Typography>

      <GroupChatModal>
        <Button
          variant="contained"
          size="small"
          endIcon={<AddIcon />}
          sx={{
            backgroundColor: "#064e3b",
            textTransform: "none",
            borderRadius: "18px",
            fontSize: "13px",
            px: 2,
            boxShadow: "none",

            "&:hover": {
              backgroundColor: "#059669",
              boxShadow: "none",
            },
          }}
        >
          New Group
        </Button>
      </GroupChatModal>
    </Box>

    {/* Chat List */}
    <Box
      sx={{
        flex: 1,
        overflowY: "auto",
        backgroundColor: "#064E3B",
        p: 1.5,
      }}
    >
      {loading ? (
        <ChatLoading />
      ) : chats?.length > 0 ? (
        <Stack spacing={1.2}>
          {chats.map((chat) => {
            const isSelected = selectedChat?._id === chat._id;

            return (
              <Box
                key={chat._id}
                onClick={() => setSelectedChat(chat)}
                sx={{
                  px: 1.9,
                  py: 1.5,
                  borderRadius: 2.5,
                  cursor: "pointer",
                  transition: "all 0.18s ease",

                  backgroundColor: isSelected ? "#549963" : "white",
                  color: isSelected ? "black" : "#0f172a",

                  "&:hover": {
                    transform: "translateY(-2.5px)",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
                  },
                }}
              >
                {/* Chat Name */}
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: 500,
                    mb: 0.3,
                  }}
                >
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Typography>

                {/* Latest Message */}
                {chat.latestMessage && (
                  <Typography
                    sx={{
                      fontSize: "12px",
                      opacity: isSelected ? 0.9 : 0.6,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    <b>{chat.latestMessage.sender.name}:</b>{" "}
                    {chat.latestMessage.content}
                  </Typography>
                )}
              </Box>
            );
          })}
        </Stack>
      ) : (
        <Typography
          sx={{
            textAlign: "center",
            color: "rgba(255,255,255,0.6)",
            mt: 4,
            fontFamily: "Work Sans",
          }}
        >
          No chats yet — search for a user to start chatting!
        </Typography>
      )}
    </Box>
  </Box>
)};


export default MyChats;

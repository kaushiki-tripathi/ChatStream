import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { ChatState } from "../../context/ChatProvider";
import UserBadgeItem from "../userAvatar/UserBadgeItem";
import UserListItem from "../userAvatar/UserListItem";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 3,
  display: "flex",
  flexDirection: "column",
  gap: 2,
};

const GroupChatModal = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user, chats, setChats } = ChatState();

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      alert("User already added"); // Chakra toast replacement
      return;
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleSearch = async (query) => {
    setSearch(query);

    if (!query) return;

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${query}`, config);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      setLoading(false);
      alert("Failed to Load Search Results");
    }
  };

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((u) => u._id !== delUser._id));
  };

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers.length) {
      alert("Please fill all the fields");
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/chat/group`,
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );

      setChats([data, ...chats]);
      setOpen(false);

      alert("New Group Chat Created!");
    } catch (error) {
      alert("Failed to Create the Chat");
    }
  };

  return (
    <>
      <span onClick={() => setOpen(true)} style={{ cursor: "pointer" }}>
        {children}
      </span>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={{ backgroundColor: "#064e3b", ...style }}>
          <Typography variant="h6" textAlign="center">
            Create Group Chat
          </Typography>

          <TextField
            label="Chat Name"
            variant="outlined"
            size="small"
            onChange={(e) => setGroupChatName(e.target.value)}
            fullWidth
          />

          <TextField
            label="Add Users"
            variant="outlined"
            size="small"
            onChange={(e) => handleSearch(e.target.value)}
            fullWidth
          />

          {/* Selected Users */}
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {selectedUsers.map((u) => (
              <UserBadgeItem
                key={u._id}
                user={u}
                handleFunction={() => handleDelete(u)}
              />
            ))}
          </Box>

          {/* Search Results */}
          <Box>
            {loading ? (
              <CircularProgress size={24} />
            ) : (
              searchResult
                ?.slice(0, 4)
                .map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleGroup(user)}
                  />
                ))
            )}
          </Box>

          <Button variant="contained" onClick={handleSubmit}>
            Create Chat
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default GroupChatModal;

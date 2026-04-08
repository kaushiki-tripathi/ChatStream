import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  IconButton,
  TextField,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useState } from "react";
import { ChatState } from "../../context/ChatProvider"; 
import UserBadgeItem from "../userAvatar/UserBadgeItem";
import UserListItem from "../userAvatar/UserListItem";

const UpdateGroupChatModal = ({ fetchMessages, fetchAgain, setFetchAgain }) => {
  const [open, setOpen] = useState(false);
  const [groupChatName, setGroupChatName] = useState("");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameloading, setRenameLoading] = useState(false);
  
  const [toastMsg, setToastMsg] = useState({ open: false, title: "", status: "info" });

  const { selectedChat, setSelectedChat, user } = ChatState();

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSearchResult([]);
    setSearch("");
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
      setToastMsg({
        open: true,
        title: "Failed to Load the Search Results",
        status: "error",
      });
      setLoading(false);
    }
  };

  const handleRename = async () => {
    if (!groupChatName) return;

    try {
      setRenameLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/chat/rename`,
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      );

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
      setToastMsg({
        open: true,
        title: "Group renamed successfully",
        status: "success",
      });
    } catch (error) {
      setToastMsg({
        open: true,
        title: error.response?.data?.message || "Failed to rename",
        status: "error",
      });
      setRenameLoading(false);
    }
    setGroupChatName("");
  };

  const handleAddUser = async (user1) => {
    if (selectedChat.users.find((u) => u._id === user1._id)) {
      setToastMsg({
        open: true,
        title: "User Already in group!",
        status: "error",
      });
      return;
    }

    if (selectedChat.groupAdmin._id !== user._id) {
      setToastMsg({
        open: true,
        title: "Only admins can add someone!",
        status: "error",
      });
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/chat/groupadd`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
      setToastMsg({
        open: true,
        title: `${user1.name} added to group`,
        status: "success",
      });
    } catch (error) {
      setToastMsg({
        open: true,
        title: error.response?.data?.message || "Failed to add user",
        status: "error",
      });
      setLoading(false);
    }
  };

  const handleRemove = async (user1) => {
    if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
      setToastMsg({
        open: true,
        title: "Only admins can remove someone!",
        status: "error",
      });
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/chat/groupremove`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );

      if (user1._id === user._id) {
        setSelectedChat();
        setToastMsg({
          open: true,
          title: `You left ${selectedChat.chatName}`,
          status: "success",
        });
      } else {
        setSelectedChat(data);
        setToastMsg({
          open: true,
          title: `${user1.name} removed from group`,
          status: "success",
        });
        fetchMessages();
      }
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      setToastMsg({
        open: true,
        title: error.response?.data?.message || "Failed to remove user",
        status: "error",
      });
      setLoading(false);
    }
  };

  // Shared dark mode input styling
  const inputStyles = {
    "& .MuiOutlinedInput-root": {
      color: "white",
      background: "rgba(255, 255, 255, 0.05)",
      "& fieldset": { borderColor: "rgba(16, 185, 129, 0.3)" },
      "&:hover fieldset": { borderColor: "#34d399" },
      "&.Mui-focused fieldset": { borderColor: "#10b981" },
    },
    "& input::placeholder": { color: "rgba(255, 255, 255, 0.5)" },
  };

  return (
    <>
      <IconButton onClick={handleOpen} sx={{ display: "flex", color: "#34d399" }}>
        <VisibilityIcon />
      </IconButton>

      <Dialog 
        open={open} 
        onClose={handleClose} 
        fullWidth 
        maxWidth="sm"
        PaperProps={{
          sx: {
            background: "linear-gradient(180deg, #020617 0%, #064e3b 100%)",
            border: "1px solid #10b981",
            color: "white",
            borderRadius: "12px",
          }
        }}
      >
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography sx={{ fontSize: "30px", fontFamily: "Work sans", fontWeight: "bold" }}>
            {selectedChat.chatName}
          </Typography>
          <IconButton onClick={handleClose} sx={{ color: "white" }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", pt: 2 }}>
          {/* Badges Area */}
          <Box sx={{ width: "100%", display: "flex", flexWrap: "wrap", pb: 3, gap: 1 }}>
            {selectedChat.users.map((u) => (
              <UserBadgeItem
                key={u._id}
                user={u}
                admin={selectedChat.groupAdmin}
                handleFunction={() => handleRemove(u)}
              />
            ))}
          </Box>

          {/* Rename Group Area */}
          <Box sx={{ display: "flex", width: "100%", mb: 3, gap: 1 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Chat Name"
              value={groupChatName}
              onChange={(e) => setGroupChatName(e.target.value)}
              sx={inputStyles}
            />
            <Button
              variant="contained"
              onClick={handleRename}
              disabled={renameloading}
              sx={{
                background: "#10b981",
                color: "#020617",
                fontWeight: "bold",
                "&:hover": { background: "#059669" },
              }}
            >
              {renameloading ? <CircularProgress size={24} sx={{ color: "#020617" }} /> : "Update"}
            </Button>
          </Box>

          {/* Add User Area */}
          <Box sx={{ width: "100%", mb: 2 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Add User to group"
              onChange={(e) => handleSearch(e.target.value)}
              sx={inputStyles}
            />
          </Box>

          {/* Search Results Area */}
          <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 1 }}>
            {loading ? (
              <CircularProgress sx={{ alignSelf: "center", color: "#34d399", mt: 2 }} />
            ) : (
              searchResult?.map((u) => (
                <UserListItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleAddUser(u)}
                />
              ))
            )}
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 3, justifyContent: "center" }}>
          <Button 
            onClick={() => handleRemove(user)} 
            variant="contained" 
            color="error"
            sx={{ fontWeight: "bold", borderRadius: "8px" }}
          >
            Leave Group
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for Notifications */}
      <Snackbar
        open={toastMsg.open}
        autoHideDuration={5000}
        onClose={() => setToastMsg({ ...toastMsg, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert 
          onClose={() => setToastMsg({ ...toastMsg, open: false })} 
          severity={toastMsg.status} 
          sx={{ width: "100%" }}
          variant="filled"
        >
          {toastMsg.title}
        </Alert>
      </Snackbar>
    </>
  );
};

export default UpdateGroupChatModal;
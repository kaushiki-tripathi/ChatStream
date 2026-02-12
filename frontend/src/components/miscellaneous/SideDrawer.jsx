import {
  Box,
  Button,
  Drawer,
  IconButton,
  TextField,
  Typography,
  Menu,
  MenuItem,
  Divider,
  Tooltip,
  Avatar,
  Snackbar,
  Alert,
  CircularProgress,
  Badge,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { ChatState } from "../../context/ChatProvider";
import ChatLoading from "../ChatLoading";
import UserListItem from "../userAvatar/UserListItem";
import ProfileModal from "./ProfileModal";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [toast, setToast] = useState({ open: false, msg: "", type: "info" });
  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();

  const { setSelectedChat, user, notification, chats, setChats } = ChatState();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const handleSearch = async () => {
    if (!search) {
      setToast({
        open: true,
        msg: "Please enter something in search",
        type: "warning",
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

      const { data } = await axios.get(`/api/user?search=${search}`, config);

      setSearchResult(data);
      setLoading(false);
    } catch (error) {
      setToast({
        open: true,
        msg: "Failed to load search results",
        type: "error",
      });
      setLoading(false);
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(`/api/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) {
        setChats([data, ...chats]);
      }

      setSelectedChat(data);
      setLoadingChat(false);
      setOpenDrawer(false);
    } catch (error) {
      setToast({
        open: true,
        msg: "Error fetching the chat",
        type: "error",
      });
      setLoadingChat(false);
    }
  };

  return (
    <>
      {/* Top Bar */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          background: "linear-gradient(#064e3b 100%)",
          borderBottom: "1px solid #10b981",
        }}
        px={2}
        py={1}
        borderBottom="1px solid #ddd"
      >
        <Tooltip title="Search users to chat">
          <Button
            onClick={() => setOpenDrawer(true)}
            startIcon={<SearchIcon />}
            sx={{
              textTransform: "none",
              color: "white",
              fontWeight: 500,
              fontSize: { xs: "14px", md: "18px" },
              fontFamily: "Work Sans",
            }}
          >
            Search User
          </Button>
        </Tooltip>

        <Typography variant="h6" color="white" fontFamily={"Work Sans"} fontSize={{ xs: "16px", md: "22px" }}>ChatStream</Typography>

        <Box display="flex" alignItems="center">
          {/* ✅ Updated Notification Badge */}
          <IconButton sx={{ color: "white" }}>
            <Badge
              badgeContent={notification?.length}
              color="error"
              invisible={notification?.length === 0} // hides when 0
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <Button
            onClick={(e) => setAnchorEl(e.currentTarget)}
            endIcon={<ArrowDropDownIcon sx={{ color: "#34d399" }}/>}
          >
            <Avatar
              sx={{ width: 30, height: 30, ml: 1}}
              src={user.pic}
              alt={user.name}
            />
          </Button>

          <Menu fontFamily={"Work Sans"}
            anchorEl={anchorEl}      
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            PaperProps={{
              sx: {
                background: "#0f172a",
                color: "white",
                border: "1px solid #059669"
              }
            }}
          >
            <ProfileModal user={user} fontFamily={"Work Sans"}>
              <MenuItem sx={{ "&:hover": { background: "rgba(52, 211, 153, 0.2)" }}}>My Profile</MenuItem>
            </ProfileModal>

            <Divider />

            <MenuItem onClick={logoutHandler} sx={{ "&:hover": { background: "rgba(5, 211, 155, 0.2)" }}}>Logout</MenuItem>
          </Menu>
        </Box>
      </Box>

      {/* Drawer */}
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        PaperProps={{
    sx: {
      backgroundColor: "#064E3B",    
      color: "white",
      width: 320,
    },
  }}
      >
        <Box width={300} p={2}>
          <Typography variant="h6" mb={2} color="white">
            Search Users
          </Typography>

          <Box display="flex" gap={1} mb={2}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search by name or email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              variant="outlined"
        sx={{
          input: { color: "white" },

          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "white",   // white border
            },
          },
        }}
            />

            <Button variant="contained" onClick={handleSearch}
            sx={{
          backgroundColor: "#10b981",
          color: "white",
          "&:hover": {
            backgroundColor: "#059669",
          },
        }}>
              Go
            </Button>
          </Box>

          {loading ? (
            <ChatLoading />
          ) : (
            searchResult.map((user) => (
              <UserListItem
                key={user._id}
                user={user}
                handleFunction={() => accessChat(user._id)}
              />
            ))
          )}

          {loadingChat && <CircularProgress sx={{ mt: 2, color: "#34d399" }} />}
        </Box>
      </Drawer>

      {/* Snackbar */}
      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={() => setToast({ ...toast, open: false })}
      >
        <Alert severity={toast.type}>{toast.msg}</Alert>
      </Snackbar>
    </>
  );
};

export default SideDrawer;

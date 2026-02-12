import React from "react";
import { Box, Typography, Avatar } from "@mui/material";
import { ChatState } from "../../context/ChatProvider";

const UserListItem = ({ user, handleFunction }) => {
  return (
    <Box
      onClick={handleFunction}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        width: "105%",
        bgcolor: "#064e3b",
        color: "white",
        px: 2.1,
        py: 1.2,
        mb: 1,
        borderRadius: 2,
        cursor: "pointer",
        transition: "0.2s",
        "&:hover": {
          bgcolor: "#059669",
          color: "white",
        },
      }}
    >
      <Avatar
        src={user.pic}
        alt={user.name}
        sx={{ width: 35, height: 35 }}
      />

      <Box>
        <Typography variant="body1">
          {user.name}
        </Typography>

        <Typography variant="caption">
          <b>Email:</b> {user.email}
        </Typography>
      </Box>
    </Box>
  );
};

export default UserListItem;

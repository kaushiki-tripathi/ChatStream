import React from "react";
import Chip from "@mui/material/Chip";
import CloseIcon from "@mui/icons-material/Close";

const UserBadgeItem = ({ user, handleFunction, admin }) => {
  return (
    <Chip
      label={
        admin === user._id
          ? `${user.name} (Admin)`
          : user.name
      }
      onDelete={handleFunction}
      deleteIcon={<CloseIcon />}
      color="secondary"
      variant="filled"
      sx={{
        m: 0.5,
        fontWeight: 500,
      }}
    />
  );
};

export default UserBadgeItem;

import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
  Avatar,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

const ProfileModal = ({ user, children }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {/* Trigger Button */}
      {children ? (
        <span onClick={handleOpen} style={{ cursor: "pointer" }}>
          {children}
        </span>
      ) : (
        <IconButton onClick={handleOpen}>
          <VisibilityIcon />
        </IconButton>
      )}

      {/* Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle
          sx={{
            textAlign: "center",
            fontSize: "32px",
          }}
        >
          {user.name}
        </DialogTitle>

        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            mt: 1,
          }}
        >
          <Avatar
            src={user.pic}
            alt={user.name}
            sx={{ width: 150, height: 150 }}
          />

          <Typography
            variant="h6"
            sx={{ fontFamily: "Work Sans" }}
          >
            Email: {user.email}
          </Typography>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
          <Button variant="contained" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProfileModal;

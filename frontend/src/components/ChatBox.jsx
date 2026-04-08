import { Box } from "@mui/material";
// import "./index.css"; 
import SingleChat from "./SingleChat";
import { ChatState } from "../context/ChatProvider";

const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <Box
      sx={{
        display: { xs: selectedChat ? "flex" : "none", md: "flex" },
        alignItems: "center",
        flexDirection: "column",
        p: 3,
        width: { xs: "100%", md: "68%" },
        borderRadius: "12px", 
        background: "white", 
        backdropFilter: "blur(10px)", // Glassmorphism effect
        border: "1px solid rgba(16, 185, 129, 0.3)", // Subtle green border
        boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.3)",
      }}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default Chatbox;
import React from 'react';
import { Avatar, Tooltip, Box } from '@mui/material';
import ScrollableFeed from 'react-scrollable-feed';
import { isSameSender, isLastMessage, isSameSenderMargin } from '../config/ChatLogics';
import { ChatState } from '../context/ChatProvider';

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div key={m._id} style={{ display: "flex", alignItems: "center" }}>
            
            {/* --- Avatar Logic (Only shows for the other person) --- */}
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip title={m.sender.name} placement="bottom-start" arrow>
                <Avatar
                  sx={{
                    mt: "7px",
                    mr: 1,
                    width: 30,
                    height: 30,
                    cursor: "pointer",
                    border: "1px solid #10b981", 
                  }}
                  alt={m.sender.name}
                  src={m.sender.pic}
                />
              </Tooltip>
            )}
            
            {/* --- Message Bubble --- */}
            <Box
              component="span"
              sx={{
                background: m.sender._id === user._id 
                  ? "linear-gradient(90deg, #059669 0%, #10b981 100%)" 
                  : "rgba(255, 255, 255, 0.1)",
                color: "white",
                border: m.sender._id !== user._id ? "1px solid rgba(16, 185, 129, 0.2)" : "none",
                borderRadius: m.sender._id === user._id 
                  ? "20px 20px 5px 20px" 
                  : "20px 20px 20px 5px",
                padding: "8px 16px",
                maxWidth: "75%",
                
                // ✅ THE FIX IS HERE ✅
                // If YOU sent the message -> margin-left: auto (pushes to the right)
                // If THEY sent the message -> margin-left: 0 or 33px (aligns properly with/without avatar)
                marginLeft: m.sender._id === user._id 
                    ? "auto" 
                    : (isSameSender(messages, m, i, user._id) || isLastMessage(messages, i, user._id) ? 0 : "33px"),
                
                marginTop: isSameSender(messages, m, i, user._id) ? "3px" : "10px",
                wordBreak: "break-word",
                fontFamily: "Work sans",
                fontSize: "15px"
              }}
            >
              {m.content}
            </Box>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
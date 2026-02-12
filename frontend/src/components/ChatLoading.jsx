import React from "react";
import { Stack, Box, Skeleton } from "@mui/material";

const ChatLoading = () => {
  return (
    <Stack spacing={2} sx={{ width: "100%", p: 1 }}>
      {Array.from(new Array(10)).map((_, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          {/* Avatar Skeleton */}
          <Skeleton variant="circular" width={45} height={45} />

          {/* Text Area */}
          <Box sx={{ flex: 1 }}>
            <Skeleton width="40%" height={15} />
            <Skeleton width="80%" height={15} />
          </Box>
        </Box>
      ))}
    </Stack>
  );
};

export default ChatLoading;

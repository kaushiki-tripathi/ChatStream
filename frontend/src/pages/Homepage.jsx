import { useState } from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Login from "../components/Loginpage";
import Signup from "../components/Signuppage";

function Homepage() {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        justifyContent="center"
        padding={1}
        bgcolor="white"
        width="100%"
        margin="40px 0 15px 0"
        borderRadius={2}
        border="1px solid #ddd"
      >
        <Typography variant="h5" fontFamily="Space Grotesk">
          CHAT-STREAM
        </Typography>
      </Box>

      <Box justifyContent="center"
        sx={{
          width: "100%",
          typography: "body1",
          bgcolor: "white",
          p: 3,
          borderRadius: 2,
          border: "1px solid #ddd",
        }}
      >
        <TabContext value={value}>
          <Box sx={{}}>
            <TabList
              onChange={handleChange}
              margin-bottom={2}
              centered
              sx={{
                "& .MuiTabs-indicator": {
                  backgroundColor: "green",
                  height: "4px",
                },
                "& .MuiTab-root.Mui-selected": {
                  color: "green",
                },
              }}
            >
              <Tab label="Login" value="1" />
              <Tab label="Register" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Login />
          </TabPanel>
          <TabPanel value="2">
            <Signup />
          </TabPanel>
        </TabContext>
      </Box>
    </Container>
  );
}

export default Homepage;

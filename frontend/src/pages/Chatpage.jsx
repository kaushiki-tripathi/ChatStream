import { Box } from '@mui/material';
import SideDrawer from '../components/miscellaneous/SideDrawer';
import MyChats from '../components/MyChats';
import Chatbox from '../components/ChatBox';
import { useState } from 'react';
import { ChatState } from '../context/ChatProvider';

const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();
  return (
    <Box width="100%">
      {user && <SideDrawer />}

      <Box
        display="flex"
        justifyContent="space-between"
        width="100%"
        height="100vh"
        p={1}
      >
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <Chatbox
            fetchAgain={fetchAgain}
            setFetchAgain={setFetchAgain}
          />
        )}
      </Box>
    </Box>
  )
};

export default Chatpage;

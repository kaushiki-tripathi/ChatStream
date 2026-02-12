import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  // This component will wrap the entire application and provide the user state to all components that need it
  const [user, setUser] = useState(); // State to store the logged in user information
  const [selectedChat, setSelectedChat] = useState(); // State to store the currently selected chat
  const [chats, setChats] = useState([]); // State to store the list of chats for the logged in user
  const [notification, setNotification] = useState([]);
  const navigate = useNavigate(); // useNavigate hook to programmatically navigate the user to different routes based on certain conditions such as if the user is not logged in then we can redirect them to the login page

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo")); // Getting the user information from local storage and setting it to the user state when the component mounts
    setUser(userInfo); // This is done to persist the user information even after the page is refreshed because when the page is refreshed the state is lost but local storage retains the data until it is explicitly cleared

    if (!userInfo) {
      // If there is no user information in local storage then it means the user is not logged in so we can redirect them to the login page
      navigate("/login"); // Redirecting to the login page if there is no user information in local storage
    }
  }, [navigate]); // Adding navigate as a dependency to the useEffect hook so that it runs whenever the navigate object changes

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        notification,
        setNotification,
        chats,
        setChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  // Custom hook to access the user state and setUser function from any component that is wrapped by the ChatProvider
  return useContext(ChatContext); // This will return the value provided by the ChatContext.Provider which is an object containing the user state and setUser function
};

export default ChatProvider;

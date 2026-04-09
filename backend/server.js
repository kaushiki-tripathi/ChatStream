const express=require('express');             // To create backend server easily
const dotenv=require('dotenv');               // To store secret values safely in.env file
const { chats } = require('./dummydata');     // Temporary fake data used for testing before connecting a real database
const connectDB = require('./config/db');          // Importing the database connection function
const userRoutes=require('./routes/userRoutes');
const chatRoutes=require('./routes/chatRoutes');
const messageRoutes=require('./routes/messageRoutes');  
const { notFound, errorHandler } = require('./middlewares/errorMiddlewares');
const path=require('path');                    // To work with file and directory paths

const app=express();          
dotenv.config();
connectDB();

app.use(express.json());                           //To accept JSON data in request body

app.get('/',(req,res)=>{
  res.send("API is running");
})

app.use("/api/user", userRoutes);                  //Using user routes for handling user related requests
app.use("/api/chat", chatRoutes);                   //Using chat routes for handling chat related requests
app.use("/api/message", require("./routes/messageRoutes")); //Using message routes for handling message related requests



//------------------------------Deployment---------------------------------
const _dirname=path.resolve();                      // To get the current directory path
if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(_dirname, "..", "frontend", "dist")));

  app.get("/ChatStream", (req, res) => {
    res.sendFile(path.resolve(_dirname, "..", "frontend", "dist", "index.html"));
  });
}
else{
  app.get("/", (req, res) => {
    res.send("API is running successfully");
  });
}




//------------------------------Deployment---------------------------------

app.use(notFound);                               // Handling not found errors
app.use(errorHandler);                           // Handling other errors

const PORT=process.env.PORT || 5000;

const server=app.listen(PORT,console.log(`Server started on PORT ${PORT}`));

const io=require('socket.io')(server,{
  pingTimeout:60000,        // To keep the connection alive for a longer time before timing out
  cors:{                    // To allow cross-origin requests from the frontend application
    origin:"http://localhost:5173",
  },
});

io.on("connection",(socket)=>{
  console.log("Connected to socket.io");
  
  socket.on("setup",(userData)=>{
    socket.join(userData._id);
    console.log("User joined room: " + userData._id);
    socket.emit("connected");
  });


  socket.on("join chat",(room)=>{
    socket.join(room);
    console.log("User joined chat room: " + room);
  }); 



  socket.on("typing",(room)=>{
    socket.in(room).emit("typing");
  });

  socket.on("stop typing",(room)=>{
    socket.in(room).emit("stop typing");
  });



  socket.on("new message",(newMessageRecieved)=>{
    var chat=newMessageRecieved.chat;
    if(!chat.users) 
      return console.log("Chat.users not defined");

     chat.users.forEach(user=>{
      if(user._id==newMessageRecieved.sender._id) return;  // Don't send the message to the sender

      socket.in(user._id).emit("message recieved",newMessageRecieved);  // Send the message to all other users in the chat
     });
  });

});
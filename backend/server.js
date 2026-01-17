const express=require('express');             // To create backend server easily
const dotenv=require('dotenv');               // To store secret values safely in.env file
const { chats } = require('./dummydata');     // Temporary fake data used for testing before connecting a real database
const connectDB = require('./config/db');          // Importing the database connection function
const userRoutes=require('./routes/userRoutes')

const app=express();          
dotenv.config();
connectDB();

app.get('/',(req,res)=>{
  res.send("API is running");
})

app.use('/api/user',userRoutes);


const PORT=process.env.PORT || 5000;

app.listen(PORT,console.log(`Server started on PORT ${PORT}`));
const express=require('express');             // To create backend server easily
const dotenv=require('dotenv');               // To store secret values safely in.env file
const { chats } = require('./dummydata');     // Temporary fake data used for testing before connecting a real database
const connectDB = require('./config/db');          // Importing the database connection function
const userRoutes=require('./routes/userRoutes');
const { notFound, errorHandler } = require('./middlewares/errorMiddlewares');

const app=express();          
dotenv.config();
connectDB();

app.use(express.json());                           //To accept JSON data in request body

app.get('/',(req,res)=>{
  res.send("API is running");
})

app.use('/api/user',userRoutes);                   //Using user routes for handling user related requests


app.use(notFound);                               // Handling not found errors
app.use(errorHandler);                           // Handling other errors

const PORT=process.env.PORT || 5000;

app.listen(PORT,console.log(`Server started on PORT ${PORT}`));
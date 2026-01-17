//Logic for the registration of the user
const asyncHandler = require("express-async-handler");
const User = require("../models/usermodel");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {               //If any of the fields is missing
    res.status(400);
    throw new Error("Please enter all the fields");
  }

  const userExists = await User.findOne({ email }); //Checking if a user with the same email already exists

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({                 //Creating a new user
    name,
    email,
    password,
    pic,
  }); 

  if (user) {                                      //If user is created successfully
    res.status(201).json({                         
      _id: user._id,                               
      name: user.name,
      email: user.email,
      pic: user.pic,
      token:generateToken(user._id),               //Generating a token for the user because it is required for authentication
    });
  } else {
    res.status(400);
    throw new Error("Failed to create the user");
  } 
});

module.exports={registerUser};

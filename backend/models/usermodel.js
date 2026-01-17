// UserSchema will contain the name, email, password, picture of the user

const mongoose = require('mongoose');
const UserSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    unique:true,
    required:true,
  },
  password:{
    type:String,
    required:true,
  },
  pic:{
    type:String,
    default:"https://media.licdn.com/dms/image/v2/D5635AQGjZw6fZAkn-Q/profile-framedphoto-shrink_400_400/B56ZnnQuj2G4Ac-/0/1760521546208?e=1768942800&v=beta&t=sbmNv15vh5O0CaNL8pYyoIqcvO2XTByzf_lX1vCL3BA",
  },
},{
  timestamps:true,                //To know when the user was created and when was the user last updated
})

const User=mongoose.model("User",UserSchema);
module.exports=User;
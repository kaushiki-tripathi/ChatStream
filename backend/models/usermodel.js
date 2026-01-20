// UserSchema will contain the name, email, password, picture of the user
const bcrypt = require('bcryptjs');
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


UserSchema.methods.matchPassword=async function(enteredPassword){
  return await bcrypt.compare(enteredPassword,this.password);   //Comparing entered password with the hashed password stored in database
}

UserSchema.pre('save',async function(next){              // Before saving the user, we need to hash the password
  if(!this.isModified('password')){                      //If password is not modified, move to the next middleware 
    next();
  } 
  const salt=await bcrypt.genSalt(10);                   //Generating a salt(it is a ) for hashing
  this.password=await bcrypt.hash(this.password,salt);   //Hashing the password with the salt  
});

const User=mongoose.model("User",UserSchema);
module.exports=User;
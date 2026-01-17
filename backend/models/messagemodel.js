// Message model will contains the name of sender then the content of the message that is inside the message then the reference to the chat to which the message belongs 

const mongoose=require('mongoose');
const messageSchema=new mongoose.Schema({
  sender:{
    type:mongoose.Schema.Types.ObjectId,               //Contain ID of the sender user
    ref:"User",
  },
  content:{
    type:String,                                        //Content of the message
    trim:true,
  },
  chat:{
    type:mongoose.Schema.Types.ObjectId,                  //Contain ID of the chat
    ref:"Chat",
  }
},{
  timestamps:true,             //To know when the message was created and when was the message last updated
});


const Message=mongoose.model("Message",messageSchema);
module.exports=Message;
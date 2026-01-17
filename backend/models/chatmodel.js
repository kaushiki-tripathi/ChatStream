//A singe chat fill conatin chatname, isgroupchat, list of user, refernce to latest message , who is the group admin

const mongoose = require("mongoose");
const chatSchema = new mongoose.Schema({
  chatName: { type: String, trim: true },
  isGroupChat: { type: Boolean, default: false },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId, //Contain ID of users
      ref: "User",
    },
  ],
  latestMessage: {
    type: mongoose.Schema.Types.ObjectId,     //Contain ID of latest message
    ref: "Message",
  },
  groupAdmin: {
    type: mongoose.Schema.Types.ObjectId,  //Contain ID of the admin user
    ref: "User",
  },
}, 
{ 
  timestamps: true         //To know when the chat was created and when was the chat last updated
});


const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
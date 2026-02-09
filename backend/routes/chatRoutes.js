const express=require('express');
const { accessChat, fetchChats, createGroupChat,renameGroup, addToGroup, removeFromGroup } = require('../controller/chatcontroller');
const { protect } = require('../middlewares/authMiddleware');

const router=express.Router(); 

router.post('/',protect,accessChat);   //Route for accessing or creating a one-on-one chat
router.get('/',protect,fetchChats);    //Route for fetching all chats of the logged in user
router.post('/group',protect,createGroupChat);  //Route for creating a group chat
router.put('/rename',protect,renameGroup);  // Route for renaming a group chat
router.put('/groupadd',protect,addToGroup);  //Route for adding a user to a group chat
router.put('/groupremove',protect,removeFromGroup);  //Route for removing a user from a group chat  */

module.exports=router;
const express=require('express');
const { registerUser, authUser, allUsers } = require('../controller/usercontroller');

const router=express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.get('/users', allUsers);


module.exports=router;
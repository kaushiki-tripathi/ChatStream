const express=require('express');
const { registerUser, authUser, allUsers } = require('../controller/usercontroller');
const { protect } = require('../middlewares/authMiddleware');

const router=express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.get('/', protect, allUsers);


module.exports=router;
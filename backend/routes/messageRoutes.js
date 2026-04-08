const express = require('express');
const { allMessages, sendMessage } = require('../controller/messageController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/:chatId', protect, allMessages);  // Route for fetching all messages in a specific chat
router.post('/', protect, sendMessage);        // Route for sending a new message

module.exports = router;
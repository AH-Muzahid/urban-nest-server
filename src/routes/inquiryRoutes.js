const express = require('express');
const router = express.Router();
const {
    createInquiry,
    getSentInquiries,
    getReceivedInquiries,
    markAsRead,
    deleteInquiry
} = require('../controllers/inquiryController');
const { protect } = require('../middlewares/authMiddleware');

router.use(protect);

router.post('/', createInquiry);
router.get('/sent', getSentInquiries);
router.get('/received', getReceivedInquiries);
router.put('/:id/read', markAsRead);
router.delete('/:id', deleteInquiry);

module.exports = router;

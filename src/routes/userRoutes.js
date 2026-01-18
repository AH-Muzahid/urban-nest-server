const express = require('express');
const router = express.Router();
const {
    getWishlist,
    toggleWishlist,
    getAllUsers
} = require('../controllers/userController');
const { protect, admin } = require('../middlewares/authMiddleware');

router.use(protect);

router.get('/wishlist', getWishlist);
router.post('/wishlist/:propertyId', toggleWishlist);
router.get('/', admin, getAllUsers);

module.exports = router;

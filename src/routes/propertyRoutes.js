const express = require('express');
const router = express.Router();
const {
    getProperties,
    getPropertyById,
    createProperty,
    updateProperty,
    deleteProperty,
    getUserProperties,
    getFeaturedProperties
} = require('../controllers/propertyController');
const { protect } = require('../middlewares/authMiddleware');

// Re-route into other resource routers
const reviewRouter = require('./reviewRoutes');
router.use('/:propertyId/reviews', reviewRouter);

// Public routes
router.get('/', getProperties);
router.get('/featured', getFeaturedProperties);

// Protected routes (place specific routes before generic :id)
router.get('/user/my-properties', protect, getUserProperties);
router.post('/', protect, createProperty);

// Routes with ID parameter
router.get('/:id', getPropertyById);
router.put('/:id', protect, updateProperty);
router.delete('/:id', protect, deleteProperty);

module.exports = router;

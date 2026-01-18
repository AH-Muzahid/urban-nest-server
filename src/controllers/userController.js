const User = require('../models/User');
const Property = require('../models/Property');


// @desc    Get user wishlist
// @route   GET /api/users/wishlist
// @access  Private
exports.getWishlist = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('wishlist');
        res.json(user.wishlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add/Remove property from wishlist
// @route   POST /api/users/wishlist/:propertyId
// @access  Private
exports.toggleWishlist = async (req, res) => {
    try {
        const property = await Property.findById(req.params.propertyId);
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        const user = await User.findById(req.user._id);

        // Check if property is already in wishlist
        const isWishlisted = user.wishlist.includes(req.params.propertyId);

        if (isWishlisted) {
            user.wishlist = user.wishlist.filter(id => id.toString() !== req.params.propertyId);
        } else {
            user.wishlist.push(req.params.propertyId);
        }

        await user.save();

        res.json(user.wishlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all users (Admin only)
// @route   GET /api/users
// @access  Private/Admin
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

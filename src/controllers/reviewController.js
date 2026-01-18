const Review = require('../models/Review');
const Property = require('../models/Property');

// @desc    Get reviews for a property
// @route   GET /api/properties/:propertyId/reviews
// @access  Public
exports.getReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ property: req.params.propertyId })
            .populate('user', 'name avatar')
            .sort({ createdAt: -1 });

        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add a review
// @route   POST /api/properties/:propertyId/reviews
// @access  Private
exports.addReview = async (req, res) => {
    try {
        req.body.property = req.params.propertyId;
        req.body.user = req.user._id;

        const property = await Property.findById(req.params.propertyId);

        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        const review = await Review.create(req.body);

        // Update numReviews manually if needed, or rely on aggregation
        // Adding simple increment here for immediate UI update potentially
        // But the model hook handles the average rating logic usually.
        // Let's count reviews for the property and update numReviews
        const count = await Review.countDocuments({ property: req.params.propertyId });
        property.numReviews = count;
        await property.save();

        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private
exports.deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // Check ownership or admin
        if (review.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const propertyId = review.property;
        await review.deleteOne();

        // Update count
        const property = await Property.findById(propertyId);
        const count = await Review.countDocuments({ property: propertyId });
        property.numReviews = count;
        await property.save();

        res.json({ message: 'Review removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

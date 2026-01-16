const Property = require('../models/Property');

// @desc    Get all properties
// @route   GET /api/properties
// @access  Public
exports.getProperties = async (req, res) => {
    try {
        const { search, type, status, minPrice, maxPrice, location } = req.query;

        let query = {};

        // Search filter
        if (search) {
            query.$text = { $search: search };
        }

        // Type filter
        if (type) {
            query.type = type;
        }

        // Status filter
        if (status) {
            query.status = status;
        }

        // Price range filter
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        // Location filter
        if (location) {
            query.location = { $regex: location, $options: 'i' };
        }

        const properties = await Property.find(query)
            .populate('owner', 'name email')
            .sort({ createdAt: -1 });

        res.json(properties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single property
// @route   GET /api/properties/:id
// @access  Public
exports.getPropertyById = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id)
            .populate('owner', 'name email phone');

        if (property) {
            // Increment views
            property.views += 1;
            await property.save();

            res.json(property);
        } else {
            res.status(404).json({ message: 'Property not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create new property
// @route   POST /api/properties
// @access  Private
exports.createProperty = async (req, res) => {
    try {
        const property = await Property.create({
            ...req.body,
            owner: req.user._id
        });

        res.status(201).json(property);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update property
// @route   PUT /api/properties/:id
// @access  Private
exports.updateProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);

        if (property) {
            // Check if user is owner
            if (property.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
                return res.status(403).json({ message: 'Not authorized to update this property' });
            }

            const updatedProperty = await Property.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true, runValidators: true }
            );

            res.json(updatedProperty);
        } else {
            res.status(404).json({ message: 'Property not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete property
// @route   DELETE /api/properties/:id
// @access  Private
exports.deleteProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);

        if (property) {
            // Check if user is owner
            if (property.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
                return res.status(403).json({ message: 'Not authorized to delete this property' });
            }

            await property.deleteOne();
            res.json({ message: 'Property removed' });
        } else {
            res.status(404).json({ message: 'Property not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user's properties
// @route   GET /api/properties/user/my-properties
// @access  Private
exports.getUserProperties = async (req, res) => {
    try {
        const properties = await Property.find({ owner: req.user._id })
            .sort({ createdAt: -1 });

        res.json(properties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get featured properties
// @route   GET /api/properties/featured
// @access  Public
exports.getFeaturedProperties = async (req, res) => {
    try {
        const properties = await Property.find({ featured: true })
            .populate('owner', 'name email')
            .limit(6)
            .sort({ createdAt: -1 });

        res.json(properties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

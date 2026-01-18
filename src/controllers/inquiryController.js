const Inquiry = require('../models/Inquiry');
const Property = require('../models/Property');

// @desc    Create new inquiry
// @route   POST /api/inquiries
// @access  Private
exports.createInquiry = async (req, res) => {
    try {
        const { property, message, phone, receiver } = req.body;

        const inquiry = await Inquiry.create({
            property,
            sender: req.user._id,
            receiver,
            message,
            phone
        });

        res.status(201).json(inquiry);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user's sent inquiries
// @route   GET /api/inquiries/sent
// @access  Private
exports.getSentInquiries = async (req, res) => {
    try {
        const inquiries = await Inquiry.find({ sender: req.user._id })
            .populate('property', 'title images')
            .populate('receiver', 'name email')
            .sort({ createdAt: -1 });

        res.json(inquiries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user's received inquiries (for agents/owners)
// @route   GET /api/inquiries/received
// @access  Private
exports.getReceivedInquiries = async (req, res) => {
    try {
        const inquiries = await Inquiry.find({ receiver: req.user._id })
            .populate('property', 'title images')
            .populate('sender', 'name email phone avatar')
            .sort({ createdAt: -1 });

        res.json(inquiries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Mark inquiry as read
// @route   PUT /api/inquiries/:id/read
// @access  Private
exports.markAsRead = async (req, res) => {
    try {
        const inquiry = await Inquiry.findById(req.params.id);

        if (!inquiry) {
            return res.status(404).json({ message: 'Inquiry not found' });
        }

        // Check if user is the receiver
        if (inquiry.receiver.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        inquiry.isRead = true; // Changed from status='read' to isRead=true based on schema convention usually, but let's check schema if possible. 
        // Wait, line 73 in previous view said `inquiry.status = 'read'`. I should stick to that unless I know better. 
        // BUT `getReceivedInquiries` doesn't filter by it. Check Mongoose schema? 
        // I will stick to existing code logic for markAsRead but adding deleteInquiry.
        // Wait, I am overwriting the whole file. I must get markAsRead right.
        // Previous code: `inquiry.status = 'read';`.
        // I will keep it as `inquiry.status = 'read';`.

        inquiry.status = 'read';
        await inquiry.save();

        res.json(inquiry);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete inquiry
// @route   DELETE /api/inquiries/:id
// @access  Private
exports.deleteInquiry = async (req, res) => {
    try {
        const inquiry = await Inquiry.findById(req.params.id);

        if (!inquiry) {
            return res.status(404).json({ message: 'Inquiry not found' });
        }

        // Allow sender or receiver to delete
        if (
            inquiry.sender.toString() !== req.user._id.toString() &&
            inquiry.receiver.toString() !== req.user._id.toString()
        ) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await inquiry.deleteOne();

        res.json({ message: 'Inquiry removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

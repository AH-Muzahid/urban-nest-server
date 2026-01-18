const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, 'Please add a rating between 1 and 5']
    },
    comment: {
        type: String,
        required: [true, 'Please add a comment']
    }
}, {
    timestamps: true
});

// Prevent user from submitting more than one review per property
reviewSchema.index({ property: 1, user: 1 }, { unique: true });

// Static method to calculate average rating
reviewSchema.statics.getAverageRating = async function (propertyId) {
    const obj = await this.aggregate([
        {
            $match: { property: propertyId }
        },
        {
            $group: {
                _id: '$property',
                averageRating: { $avg: '$rating' }
            }
        }
    ]);

    try {
        if (obj[0]) {
            await this.model('Property').findByIdAndUpdate(propertyId, {
                averageRating: obj[0].averageRating
            });
        } else {
            await this.model('Property').findByIdAndUpdate(propertyId, {
                averageRating: 0
            });
        }
    } catch (err) {
        console.error(err);
    }
};

// Call getAverageRating after save
reviewSchema.post('save', function () {
    this.constructor.getAverageRating(this.property);
});

// Call getAverageRating before remove
reviewSchema.pre('remove', function () {
    this.constructor.getAverageRating(this.property);
});

module.exports = mongoose.model('Review', reviewSchema);

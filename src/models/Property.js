const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a property title'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Please provide a description'],
        maxlength: [2000, 'Description cannot be more than 2000 characters']
    },
    price: {
        type: Number,
        required: [true, 'Please provide a price'],
        min: [0, 'Price cannot be negative']
    },
    location: {
        type: String,
        required: [true, 'Please provide a location'],
        trim: true
    },
    type: {
        type: String,
        required: [true, 'Please provide a property type'],
        enum: ['house', 'apartment', 'condo', 'villa', 'land'],
        default: 'house'
    },
    status: {
        type: String,
        enum: ['available', 'pending', 'sold'],
        default: 'available'
    },
    bedrooms: {
        type: Number,
        min: [0, 'Bedrooms cannot be negative'],
        default: 0
    },
    bathrooms: {
        type: Number,
        min: [0, 'Bathrooms cannot be negative'],
        default: 0
    },
    area: {
        type: Number,
        min: [0, 'Area cannot be negative'],
        default: 0
    },
    images: [{
        type: String
    }],
    features: [{
        type: String
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    featured: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// Index for search
propertySchema.index({ title: 'text', description: 'text', location: 'text' });

module.exports = mongoose.model('Property', propertySchema);

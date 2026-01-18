const express = require('express');
const cors = require('cors');
const propertyRoutes = require('./routes/propertyRoutes');
const authRoutes = require('./routes/authRoutes');
const inquiryRoutes = require('./routes/inquiryRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const userRoutes = require('./routes/userRoutes');
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();
const connectDB = require('./config/db');

// Database Connection Middleware for Serverless
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        console.error('Database Connection Failed:', error);
        res.status(500).json({ message: 'Internal Server Error: Database Connection Failed' });
    }
});

// Middleware
app.use(cors({
    origin: [
        'http://localhost:3000',
        'https://urban-nest-psi-black.vercel.app',
        process.env.FRONTEND_URL
    ].filter(Boolean),
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

// Routes
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Urban Nest API 🏠',
        version: '1.0.0',
        endpoints: {
            auth: '/api/auth',
            properties: '/api/properties',
            inquiries: '/api/inquiries',
            users: '/api/users',
            reviews: '/api/reviews'
        }
    });
});

app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reviews', reviewRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware
app.use(errorMiddleware);

module.exports = app;

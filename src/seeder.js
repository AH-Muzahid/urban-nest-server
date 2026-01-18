const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Property = require('./models/Property');
const User = require('./models/User');

// Load env vars
dotenv.config();

// Connect to DB
connectDB();

const importData = async () => {
    try {
        // Get a user to assign as owner (admin or first user found)
        const user = await User.findOne();

        if (!user) {
            console.error('Error: No users found. Please register a user first.');
            process.exit(1);
        }

        const propertyTypes = ['house', 'apartment', 'condo', 'villa', 'penthouse', 'mansion', 'estate'];
        const locations = [
            'Beverly Hills, CA', 'Manhattan, NY', 'Miami Beach, FL', 'Aspen, CO',
            'San Francisco, CA', 'Seattle, WA', 'Austin, TX', 'Chicago, IL',
            'Los Angeles, CA', 'Palm Springs, CA', 'Hamptons, NY', 'Malibu, CA'
        ];

        const adjectives = ['Luxury', 'Modern', 'Stunning', 'Elegant', 'Exclusive', 'Private', 'Contemporary', 'Historic', 'Grand', 'Cozy'];

        const properties = [];

        for (let i = 0; i < 50; i++) {
            const type = propertyTypes[Math.floor(Math.random() * propertyTypes.length)];
            const location = locations[Math.floor(Math.random() * locations.length)];
            const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];

            // Generate random coordinates near the location (rough approximation for variations)
            // Using a base lat/lng and adding small random variance
            const baseCoords = { lat: 34.0522, lng: -118.2437 }; // Default LA

            const randomPrice = Math.floor(Math.random() * (15000000 - 500000 + 1)) + 500000;
            const randomBeds = Math.floor(Math.random() * 8) + 1;
            const randomBaths = Math.floor(Math.random() * 8) + 1;
            const randomArea = Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000;

            const duplicateImages = [
                'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2671&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1600596542815-2a429b08e695?q=80&w=2668&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2666&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2670&auto=format&fit=crop'
            ];

            // Randomly select 3-5 images
            const shuffledImages = duplicateImages.sort(() => 0.5 - Math.random());
            const selectedImages = shuffledImages.slice(0, Math.floor(Math.random() * 3) + 3);

            properties.push({
                title: `${adjective} ${type.charAt(0).toUpperCase() + type.slice(1)} in ${location.split(',')[0]}`,
                description: `Experience the epitome of luxury living in this ${adjective.toLowerCase()} ${type} located in the heart of ${location}. This property features ${randomBeds} bedrooms, ${randomBaths} bathrooms, and boasts high-end finishes throughout. Enjoy breathtaking views and state-of-the-art amenities including a gourmet kitchen, private pool, and expansive outdoor living spaces.`,
                price: randomPrice,
                location: location,
                coordinates: {
                    lat: baseCoords.lat + (Math.random() - 0.5) * 0.1,
                    lng: baseCoords.lng + (Math.random() - 0.5) * 0.1
                },
                type: type,
                listingType: Math.random() < 0.7 ? 'sale' : 'rent',
                status: 'available',
                bedrooms: randomBeds,
                bathrooms: randomBaths,
                area: randomArea,
                images: selectedImages,
                features: ['Pool', 'Gym', 'Spa', 'Parking', 'Security', 'Smart Home'].sort(() => 0.5 - Math.random()).slice(0, 4),
                owner: user._id,
                featured: Math.random() < 0.2 // 20% chance of being featured
            });
        }

        await Property.deleteMany(); // Optional: Clear existing properties first
        await Property.insertMany(properties);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();

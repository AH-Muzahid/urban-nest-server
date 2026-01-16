# Environment Variables Setup

Create a `.env` file in the backend root directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/urban-nest

# For MongoDB Atlas (Cloud):
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/urban-nest?retryWrites=true&w=majority

# JWT Secret (Change this to a random string in production)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# Optional: Cloudinary for image uploads
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## MongoDB Setup Options

### Option 1: Local MongoDB
1. Install MongoDB on your system
2. Start MongoDB service
3. Use: `MONGODB_URI=mongodb://localhost:27017/urban-nest`

### Option 2: MongoDB Atlas (Cloud)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster
4. Get your connection string
5. Replace username and password
6. Use the connection string in `.env`

## JWT Secret
Generate a random secret key for production:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Important Notes
- Never commit `.env` file to git
- Change JWT_SECRET in production
- Use strong passwords for MongoDB
- Keep your API keys secure

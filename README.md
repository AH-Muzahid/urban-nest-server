# Urban Nest Backend API

Backend API for Urban Nest Real Estate Platform built with Node.js, Express, and MongoDB.

## 🚀 Features

- ✅ User Authentication (Register/Login with JWT)
- ✅ Property CRUD Operations
- ✅ Search & Filter Properties
- ✅ User Authorization
- ✅ Password Hashing with bcrypt
- ✅ MongoDB Database
- ✅ Error Handling Middleware
- ✅ CORS Enabled

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # Auth logic
│   │   └── propertyController.js # Property logic
│   ├── middlewares/
│   │   ├── authMiddleware.js     # JWT verification
│   │   └── errorMiddleware.js    # Error handler
│   ├── models/
│   │   ├── User.js               # User schema
│   │   └── Property.js           # Property schema
│   ├── routes/
│   │   ├── authRoutes.js         # Auth endpoints
│   │   └── propertyRoutes.js     # Property endpoints
│   └── app.js                    # Express config
├── server.js                     # Entry point
├── .env                          # Environment variables
└── package.json
```

## 🛠️ Installation

1. **Navigate to backend folder**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create .env file**
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/urban-nest
   JWT_SECRET=your_jwt_secret_key_here
   FRONTEND_URL=http://localhost:3000
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system

5. **Run the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)
- `PUT /api/auth/profile` - Update profile (Protected)

### Properties
- `GET /api/properties` - Get all properties
- `GET /api/properties/:id` - Get single property
- `GET /api/properties/featured` - Get featured properties
- `POST /api/properties` - Create property (Protected)
- `PUT /api/properties/:id` - Update property (Protected)
- `DELETE /api/properties/:id` - Delete property (Protected)
- `GET /api/properties/user/my-properties` - Get user's properties (Protected)

## 🔑 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment | `development` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/urban-nest` |
| `JWT_SECRET` | JWT secret key | `your_secret_key` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:3000` |

## 📝 API Usage Examples

### Register User
```bash
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login
```bash
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Create Property (Protected)
```bash
POST http://localhost:5000/api/properties
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "title": "Modern 3BR Apartment",
  "description": "Beautiful apartment in downtown",
  "price": 500000,
  "location": "New York",
  "type": "apartment",
  "bedrooms": 3,
  "bathrooms": 2,
  "area": 1500
}
```

## 🔒 Authentication

Protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

## 📦 Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **cors** - CORS middleware
- **dotenv** - Environment variables
- **express-validator** - Input validation

## 🚦 Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

## 📌 Notes

- Make sure MongoDB is running before starting the server
- Change JWT_SECRET in production
- Use MongoDB Atlas for cloud database
- All passwords are hashed before storing
- JWT tokens expire in 30 days

## 🔧 Development

```bash
# Install dependencies
npm install

# Run in development mode with nodemon
npm run dev

# Run in production mode
npm start
```

---

Built with ❤️ for Urban Nest Real Estate Platform

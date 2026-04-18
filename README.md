# WhatsApp Clone

A full-stack WhatsApp clone application built with the MERN stack (MongoDB, Express, React, Node.js) featuring real-time messaging via Socket.IO.

## Features

- **Real-time Messaging**: Instant message delivery using Socket.IO
- **File Sharing**: Upload and share images/documents using GridFS
- **User Authentication**: Secure user management
- **Conversation Management**: Create and manage chat conversations
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

### Frontend
- React.js
- CSS3 with custom styling
- RESTful API integration

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- GridFS for file storage
- Multer for file uploads
- CORS enabled

### Real-time Communication
- Socket.IO for bidirectional event-based communication

## Project Structure

```
whatsapp/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── constants/     # App constants
│   │   ├── assets/        # Static assets
│   │   └── ...
│   └── package.json
├── server/                # Express backend
│   ├── controller/        # Route controllers
│   ├── database/          # Database connection
│   ├── model/             # Mongoose models
│   ├── routes/            # API routes
│   ├── utils/             # Utility functions
│   ├── uploads/           # File uploads (created at runtime)
│   └── index.js           # Server entry point
└── socket/                # Socket.IO server
    └── index.js
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB instance
- npm or yarn package manager

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd whatsapp
```

### 2. Install dependencies

**Backend:**
```bash
cd server
npm install
```

**Socket Server:**
```bash
cd ../socket
npm install
```

**Frontend:**
```bash
cd ../client
npm install
```

### 3. Environment Setup

Create a `.env` file in the `server` directory:

```env
DB_USERNAME=your_mongodb_username
DB_PASSWORD=your_mongodb_password
MONGO_URI=your_mongodb_connection_string
```

### 4. MongoDB Configuration

1. Create a MongoDB Atlas cluster or use a local MongoDB instance
2. Create a database user with read/write permissions
3. Whitelist your IP address in Network Access settings
4. Copy the connection string to your `.env` file

## Running the Application

### Development Mode

Run all three services in separate terminal windows:

**Terminal 1 - Backend Server:**
```bash
cd server
npm run dev
```
Server runs on `http://localhost:8000`

**Terminal 2 - Socket Server:**
```bash
cd socket
npm start
```
Socket server runs on `http://localhost:9000`

**Terminal 3 - Frontend:**
```bash
cd client
npm start
```
React app runs on `http://localhost:3000`

### Production Mode

**Backend:**
```bash
cd server
npm start
```

**Socket:**
```bash
cd socket
npm start
```

**Frontend (build and serve):**
```bash
cd client
npm run build
# Serve the build folder using a static server
```

## Deployment

### Backend on Render

1. Push code to GitHub
2. Create a new Web Service on [Render](https://render.com)
3. Configure:
   - Build Command: `npm install`
   - Start Command: `npm start`
4. Add environment variables in Render dashboard
5. Update MongoDB Atlas to allow connections from Render IPs

### Frontend

Deploy the React build folder to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

Update the API base URL in your client code to point to your deployed backend.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| POST | `/file/upload` | Upload a file |
| GET | `/file/:filename` | Download a file |
| POST | `/conversation/add` | Create new conversation |
| POST | `/conversation/get` | Get user conversations |
| POST | `/message/add` | Send a message |
| GET | `/message/get/:id` | Get conversation messages |
| POST | `/user` | User operations |

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DB_USERNAME` | MongoDB username | Yes |
| `DB_PASSWORD` | MongoDB password | Yes |
| `MONGO_URI` | MongoDB connection string | Yes |
| `PORT` | Server port (defaults to 8000) | No |


## License

ISC License

## Author

Anchit

---


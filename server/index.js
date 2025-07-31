import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';

import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
import travelStoryRoutes from './routes/travelStory.route.js';
import { fileURLToPath } from 'url';

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected successfully!');
}).catch(err => {
    console.error('MongoDB connection error:', err);

})

const app = express();
app.use(cookieParser());
// For parsing application/x-www-form-urlencoded

// For allowing JSON data in requests
app.use(express.json());

app.listen(3000, () => {
    console.log('Server is running on port 3000!')
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/travel-story", travelStoryRoutes);

// Serve static files from the "uploads" directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, 'uploads')));

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    status: 'error',
    statusCode,
    message
  });
});



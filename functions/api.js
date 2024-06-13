// Import required modules
const express = require('express');
const serverless = require('serverless-http');
const leaderboardRoutes = require('./routes/leaderboardRoutes');
const mongoose = require('mongoose');
const cors = require('cors'); // Fix: added closing parenthesis

// Create an Express app instance
const app = express();

// Define database connection URLs
const dbCloudUrl = 'ongodb+srv://mazonsamuelrouell:Samuelmazon07@cluster0.k9pjkex.mongodb.net/LeaderboardsDB';
const dbLocalUrl = 'ongodb://localhost:27017/leaderboardsDB';

// Use CORS middleware to enable cross-origin requests
app.use(cors());

// Use JSON and URL-encoded request body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Establish a connection to the MongoDB database
mongoose
 .connect(dbCloudUrl || dbLocalUrl, { useNewUrlParser: true, useUnifiedTopology: true })
 .then(() => console.log('Connected to MongoDB'))
 .catch((error) => {
    console.error('Failed to connect to MongoDB', error);
    // Handle the error properly, for example, terminate the process
    process.exit(1);
  });

// Use leaderboard routes with the '/.netlify/functions/api' prefix
app.use('/.netlify/functions/api', leaderboardRoutes);

// Use user routes with the '/.netlify/functions/api/users' prefix
app.use('/.netlify/functions/api/users', userRoutes);

// Export the serverless handler
module.exports.handler = serverless(app);
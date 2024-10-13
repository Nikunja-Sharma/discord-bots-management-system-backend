const express = require('express');
const connectDB = require('./config/db');
const botRoutes = require('./routes/botRoutes');
require('dotenv').config();
const cors = require('cors'); // Add this line

const app = express();

// Middleware
app.use(cors({ origin: '*' })); // Explicitly allow all origins
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/bots', botRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
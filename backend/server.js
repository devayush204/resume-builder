require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', 
}));
app.use(bodyParser.json());

// Routes
app.use('/api/auth', require('./routes/auth'))


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

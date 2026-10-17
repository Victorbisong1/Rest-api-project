const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Automatically looks for .env in the root folder

// Initialize Express app
const app = express();

// Middleware: Tells Express to understand incoming JSON data
app.use(express.json());

// Get variables from environment
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Import our User model
const User = require('./models/User.js');

// DATABASE CONNECTION
mongoose.connect(MONGO_URI)
  .then(() => console.log('Database connected successfully!'))
  .catch((err) => console.log('Database connection error:', err));


// REST API ROUTES
// 1. GET: Return all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 2. POST: Add a new user
app.post('/users', async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    
    res.status(201).json({ message: 'User created successfully!', user: savedUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 3. PUT: Edit a user by ID
app.put('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
    
    res.status(200).json({ message: 'User updated successfully!', user: updatedUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 4. DELETE: Remove a user by ID
app.delete('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    await User.findByIdAndDelete(userId);
    
    res.status(200).json({ message: 'User deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
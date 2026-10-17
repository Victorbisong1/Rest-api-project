const mongoose = require('mongoose');

// Define what a "User" looks like in your database (Schema)
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number },
});

// Export this schema so server.js can use it
module.exports = mongoose.model('User', userSchema);
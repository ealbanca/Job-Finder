const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

const connectDb = async (callback) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Mongoose connected');
    callback(null);
  } catch (err) {
    console.error('Mongoose connection error:', err);
    callback(err);
  }
};

module.exports = {
  connectDb,
};
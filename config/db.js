const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    // If everything goes right, we're just going to console log
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;

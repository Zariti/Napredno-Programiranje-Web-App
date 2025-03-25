const mongoose = require('mongoose');

// URL za povezivanje na bazu
const DB_URL = 'mongodb://localhost:27017/alcohol_db';


const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log('Uspješno povezano na MongoDB!');
  } catch (error) {
    console.error('Povezivanje na MongoDB nije uspjelo:', error.message);
    process.exit(1); // zaustavlja aplikaciju u slucaju greske
  }
};

module.exports = connectDB;

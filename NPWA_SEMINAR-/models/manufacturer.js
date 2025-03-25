const mongoose = require('mongoose'); // omogucuje rad MongoDB bazon

const manufacturerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  founded: Number,
  country: String,
  description: String,
  logoUrl: String,
});

module.exports = mongoose.model('Manufacturer', manufacturerSchema);
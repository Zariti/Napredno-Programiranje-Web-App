const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    alcoholPercentage: Number,
    color: String,
    type: {type: String, enum: ['IPA', 'Lager', 'Stout', 'Porter', 'White Chocolate', 'Dark Chocolate']},
    manufacturer: {type: mongoose.Schema.Types.ObjectId, ref: 'Manufacturer' }
});

module.exports = mongoose.model('Product', productSchema); // exporta se model pod imenon Product
//module.exports = mongoose.model('Product', productSchema, 'products');    
                            //   naziv sheme   koja shema   naziv kolekcije u bazi


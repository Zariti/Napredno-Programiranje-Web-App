const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Veza sa korisnikom
    items: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // Veza sa proizvodom
            quantity: { type: Number, default: 1 }, // Količina proizvoda
        },
    ],
    totalPrice: { type: Number, default: 0 }, // Ukupna cena
});

module.exports = mongoose.model('Cart', cartSchema);
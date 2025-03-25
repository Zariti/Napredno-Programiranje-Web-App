const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Kreiranje User sheme
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'], // dozvoljene uloge
        default: 'user',
    },
});

// prije save-anja hashira lozinku
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10); // hashira lozinku
    next();
});

// usporeduje hashirane sifre     
userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password); // usporedba obicne lozinke sa lozinkom iz baze
};

// stvara se model
const User = mongoose.model('User', userSchema);

module.exports = User;

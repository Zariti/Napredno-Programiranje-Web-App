const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');  // za token napravit

const connectDB = require('./db');

const Product = require('./models/product');  // Product model importan i ovo ce referencirat usput kolekciju u bazi
const Manufacturer = require('./models/manufacturer'); // Manufacturer model importan i ovo ce referencirat usput kolekciju u bazi

const { verifyToken, } = require('./middleware/auth');

const Cart = require('./models/cart');

dotenv.config();  // za .env

const app = express(); // za server

connectDB(); // za spojit na bazu

app.use(cors());
app.use(express.json());


//products
app.get('/api/products', verifyToken, async (req, res) => {
    try {
        const products = await Product.find().populate('manufacturer').sort('manufacturer');
        res.json(products);
    } catch {
        console.log(err);
    }
})

app.get('/api/products/:id', verifyToken, async (req, res) => {
    try {
        const { id } = req.params; 
        const product = await Product.findById(id).populate('manufacturer'); 

        if (!product) {
            
            console.log("Product not found");
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(product); 
    } catch (err) {
        console.error(err); 
        
    }
});

app.post('/api/products', verifyToken,  async (req, res) => {
    const { name, price, alcoholPercentage, color, type, manufacturer } = req.body;
    try {
        const newProduct = new Product({
            name,
            price,
            alcoholPercentage,
            color,
            type,
            manufacturer, // ovo ocekuje ObjectId koji vec postoji u kolekciji Manufacturer
        });

        await newProduct.save();

        res.json({ message: 'Product created', product: newProduct });
    } catch (err) {
        console.error(err);
        
    }
});

app.put('/api/products/:id', verifyToken,  async (req, res) => {
    const { id } = req.params;          
    const updatedProduct = req.body;    
  
    await Product.findByIdAndUpdate(id, updatedProduct); 
    res.json({ message: 'Product updated' });  
});

app.delete('/api/products/:id', verifyToken,  async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.json({ message: 'Product deleted' });
});







app.get('/api/manufacturers', verifyToken, async (req, res) => {
    try {
        const manufacturers = await Manufacturer.find().sort('name');
        res.json(manufacturers);
    } catch {
        console.log(err);
    }
})

app.get('/api/manufacturers/:id', verifyToken, async (req, res) => {
    try {
        const { id } = req.params; 
        const manufacturer = await Manufacturer.findById(id); 

        if (!manufacturer) {
            
            console.log("Manufacturer not found");
            return res.status(404).json({ message: 'Manufacturer not found' });
        }

        res.json(manufacturer); 
    } catch (err) {
        console.error(err); 
        
    }
});

app.post('/api/manufacturers', verifyToken, /*verifyAdmin,*/ async (req, res) => {
    const { name, founded, country, description, logoUrl } = req.body;

    try {
        const newManufacturer = new Manufacturer({
            name,
            founded,
            country,
            description,
            logoUrl,
        });

        await newManufacturer.save();

        res.json({ message: 'Manufacturer created', manufacturer: newManufacturer });
    } catch (err) {
        console.error(err);
        
    }
});

app.put('/api/manufacturers/:id', verifyToken,  async (req, res) => {
    const { id } = req.params;          
    const updatedManufacturer = req.body;   
  
    await Manufacturer.findByIdAndUpdate(id, updatedManufacturer);  
    res.json({ message: 'Manufacturer updated' });  
});


app.delete('/api/manufacturers/:id', verifyToken,  async (req, res) => {
    try {
        const manufacturerId = req.params.id;

        
        const products = await Product.find({ manufacturer: manufacturerId });

        if (products.length > 0) {
            return res.status(400).json({ message: 'Cannot delete manufacturer with products associated.' });
        }

        const manufacturer = await Manufacturer.findByIdAndDelete(manufacturerId);

        if (!manufacturer) {
            return res.json({ message: 'Manufacturer not found' });
        }

        res.json({ message: 'Manufacturer deleted successfully' });
    } catch (err) {
        console.error(err);
        res.json({ message: 'Server error' });
    }
});



// authentication
const User = require('./models/user'); // user tablica amo rec

app.post('/api/register', async (req, res) => {
    const { email, password, role } = req.body; // iz req body-ja uzme 

    try {
        const existingUser = await User.findOne({ email }); // trazi jel vec postoji
        if (existingUser) { // ako postoji onda reci da je zauzet
            return res.json({ message: 'Email already exists' });
        }

        const user = new User({ email, password, role }); //ako nije onda napravi
        await user.save();                                // novog usera

        res.json({ message: 'User registered successfully' });
    } catch (err) {  // u slucaj greske baci error i ispisi ga na konzolu
        console.log(err);
        res.json({ message: 'Error registering user', error: err.message });
    }
});





app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' }); 
        }
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' }); 
        }
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, /*{ expiresIn: '1h' }*/);
        res.json({ token, role: user.role });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error logging in' }); 
    }
});



// dohvati samo imena svih usera
app.get('/api/user-names', verifyToken, async (req, res) => {
    try {
        //const users = await User.find({}, 'name'); // Dohvati samo ime korisnika
        const users = await User.find(); // Dohvati samo ime korisnika
        res.json(users);
    } catch (err) {
        console.log(err);
    }
});


app.get('/api/users/:id', verifyToken, async (req, res) => {
    try {
        const { id } = req.params; 
        const user = await User.findById(id); 

        if (!user) {
            
            console.log("User not found");
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user); 
    } catch (err) {
        console.error(err); 
        
    }
});




/*
// kosarica
// za stavljat u kosaricu
app.post('/api/cart', verifyToken, async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    try {
        let cart = await Cart.findOne({ user: userId });

        // Ako košarica ne postoji, kreiraj novu
        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
        }

        // Proveri da li proizvod već postoji u košarici
        const existingItem = cart.items.find(item => item.product.toString() === productId);

        if (existingItem) {
            // Ažuriraj količinu ako već postoji
            existingItem.quantity += quantity;
        } else {
            // Dodaj novi proizvod
            cart.items.push({ product: productId, quantity });
        }

        // Izračunaj ukupnu cenu
        cart.totalPrice = await calculateTotalPrice(cart.items);

        await cart.save();
        res.status(200).json(cart);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update cart' });
    }
});

async function calculateTotalPrice(items) {
    const products = await Product.find({ _id: { $in: items.map(item => item.product) } });
    return items.reduce((total, item) => {
        const product = products.find(p => p._id.toString() === item.product.toString());
        return total + product.price * item.quantity;
    }, 0);
}

// za dohvatit kosaricu usera
app.get('/api/cart', verifyToken, async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
        res.status(200).json(cart);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch cart' });
    }
});

// deleta
router.delete('/api/cart/:productId', verifyToken, async (req, res) => {
    try {
        const { productId } = req.params;

        // Pretpostavljam da je proizvod u bazi sa _id, pa se koristi productId
        const product = await Product.findByIdAndDelete(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Vraćanje odgovora
        res.status(200).json({ message: 'Product deleted from cart and database' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});
*/
///////////////////////////////////////
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err.message));

app.listen(5000, () => {
    console.log('Server running on port 5000');
})


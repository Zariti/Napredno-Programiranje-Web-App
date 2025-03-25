const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authorizationHeader = req.headers['authorization'];

    if (!authorizationHeader) {
        return res.json({ message: 'No token provided' }); 
    }

    
    const token = authorizationHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // uzme token i provjerava
        req.user = decoded; // priko tokena vrati podatke usera
        next();  // salje te podatke dalje 
    } catch (err) { // ako token nije sa servera vrati gresku
        console.log(err);
        return res.json({message: 'Invalid token'});
    }
};


module.exports = { verifyToken,  };
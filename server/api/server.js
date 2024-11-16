const express = require("express");
const cors = require('cors');
const dotenv = require('dotenv')
const connectDB = require('./config/db');
// Import Routes
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const {login} = require("./controllers/userController");

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

connectDB();

app.get('/', (req, res) => {
    res.send('Welcome to the Trendsware API');
});
 
app.get('/test', (req, res) => {
    res.json({ message: 'Server is working correctly!' });
});


app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
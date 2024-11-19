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

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

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

app.post('/api/create-payment', async (req, res) => {
    try {
        const {amount,customer,items} = req.body;

        const paymentIntent = await stripe.paymentIntents.create({
            amount:Math.round(amount*100),
            currency: 'usd',
            payment_method_types: ['card'],
            metadata: {
                customerFirstName:customer.firstName,
                customerLastName:customer.lastName,
                orderItems:JSON.stringify(items.map(item => ({
                    id:item.id,
                    name:item.name,
                    quantity:item.quantity,
                    price:item.price
                })))
            },
            description: `Order for ${customer.firstName} ${customer.lastName}`,
        });
        res.status(200).json({
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id,
        })
    }catch (error){
        console.error('Payment Creation Error:', error);
        res.status(500).json({
            error: 'Unable to create payment',
            details: error.message
        });
    }
});

app.post('/api/stripe-webhook',async (req,res) => {
    const sig = req.headers['stripe-signature'];

    try {
        const event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET,
        );
        switch (event.type){
            case "payment_intent.succeeded":
                const paymentIntent = event.data.object;
                break;
            case "payment_intent.payment_failed":
                const failedPaymentIntent = event.data.object;
                break;
            default:
                console.log(`Unhandled event type ${event.type}`);
        }
        res.json({received:true})
    }catch (error) {
        res.status(400).send(`Webhook Error:${error.message}`);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const config = {
    STRIPE_PUBLISHABLE_KEY: process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY,
    API_URL : process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
}

export default config;
import React , {createContext,useState} from "react";

export const CartContext = createContext();


export const CartProvider = ({children}) => {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const addToCart = (product, size, quantity = 1) => {
        const existingItemIndex = cartItems.findIndex(
            item => item.id === product._id && item.size === size
        );

        if (existingItemIndex > -1) {
            // Update quantity if item already exists
            const updatedCartItems = [...cartItems];
            updatedCartItems[existingItemIndex].quantity += 1;
            setCartItems(updatedCartItems);
        } else {
            // Add new item to cart
            const newCartItem = {
                id: product._id,
                name: product.productName,
                price: product.sellPrice,
                size: size,
                quantity: 1,
                image: product.imageUrl, // Make sure this matches your product schema
                // Add any other relevant details
            };
            setCartItems([...cartItems, newCartItem]);
        }
        setIsCartOpen(true);
    };

    const removeFromCart = (itemId, size) => {
        setCartItems(prevItems =>
            prevItems.filter(item => !(item.id === itemId && item.size === size))
        );
    };

    const updateQuantity = (itemId, size, newQuantity) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === itemId && item.size === size
                    ? { ...item, quantity: Math.max(1, newQuantity) }
                    : item
            )
        );
    };

    const cartTotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    return(
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                isCartOpen,
                setIsCartOpen,
                cartTotal
            }}
        >
            {children}
        </CartContext.Provider>
    );
}


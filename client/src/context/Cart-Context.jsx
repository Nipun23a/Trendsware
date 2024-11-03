import React , {createContext,useContext,useState} from "react";

export const CartContext = createContext();


export const CartProvider = ({children}) => {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const addToCart = (product, size, quantity = 1) => {
        setCartItems(prevItems => {
            // Check if item already exists with same size
            const existingItemIndex = prevItems.findIndex(
                item => item.id === product.id && item.size === size
            );

            if (existingItemIndex > -1) {
                // Update quantity of existing item
                const newItems = [...prevItems];
                newItems[existingItemIndex].quantity += quantity;
                return newItems;
            }

            // Add new item
            return [...prevItems, {
                ...product,
                size,
                quantity,
            }];
        });
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


import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ShoppingCart, Heart} from 'lucide-react';
import { X, SearchCode} from 'lucide-react';
import { CartContext } from "../../../context/Cart-Context";

const SingleProductContainer = () => {
    const { id } = useParams();
    const { addToCart } = useContext(CartContext);
    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState('');
    const [mainImage, setMainImage] = useState('');
    const [secondaryImages, setSecondaryImages] = useState([]);
    const [isImageChanging, setIsImageChanging] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [fullImageView, setFullImageView] = useState(false);
    const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/products/${id}`);
                setProduct(response.data);

                // Set main image
                setMainImage(response.data.imageUrl);

                // Prepare secondary images
                const otherImages = response.data.secondaryImages || [];
                const images = [response.data.imageUrl, ...otherImages].slice(0, 3);
                setSecondaryImages(images);

                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleImageClick = (image) => {
        setIsImageChanging(true);
        setTimeout(() => {
            setMainImage(image);
            setIsImageChanging(false);
        }, 300);
    };

    const handleAddToCart = () => {
        if (selectedSize && product) {
            addToCart(product, selectedSize);
        }
    };

    const handleFullImageView = () => {
        setFullImageView(!fullImageView);
    };

    const handleMouseMove = (e) => {
        const rect = e.target.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width * 100;
        const y = (e.clientY - rect.top) / rect.height * 100;
        setMagnifierPosition({ x, y });
    };


    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!product) return <div>Product not found</div>;

    return (
        <div className="max-w-7xl mx-auto p-6 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left side - Product Image */}
                <div className="relative group">
                    <div
                        className="aspect-square rounded-xl bg-gray-100 overflow-hidden relative"
                        onClick={handleFullImageView}
                        style={{cursor: 'pointer'}}
                    >
                        <img
                            src={mainImage}
                            alt="Product"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-white/50 rounded-full p-1">
                            <SearchCode className="w-5 h-5"/>
                        </div>
                    </div>
                    {fullImageView && (
                        <div
                            className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center"
                            onClick={handleFullImageView}
                        >
                            <div
                                className="max-w-[90%] max-h-[90%] relative"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    className="absolute -top-10 right-0 text-white"
                                    onClick={handleFullImageView}
                                >
                                    <X className="w-8 h-8" />
                                </button>
                                <div
                                    className="relative overflow-hidden"
                                    onMouseMove={handleMouseMove}
                                >
                                    <img
                                        src={mainImage}
                                        alt="Full Product"
                                        className="w-full h-full object-contain"
                                        style={{
                                            backgroundPosition: `${magnifierPosition.x}% ${magnifierPosition.y}%`,
                                            transform: 'scale(1.5)',
                                            transformOrigin: `${magnifierPosition.x}% ${magnifierPosition.y}%`
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                    <button
                        className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
                        aria-label="Add to wishlist"
                    >
                        <Heart className="w-5 h-5 text-gray-600"/>
                    </button>

                    {/* Thumbnails - Product Images */}
                    <div className="flex gap-2 mt-4 justify-center md:justify-start">
                        {secondaryImages.map((image, index) => (
                            <button
                                key={index}
                                className={`w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border transition-colors 
                ${mainImage === image ? 'border-gray-400' : 'border-transparent hover:border-gray-300'}`}
                                onClick={() => handleImageClick(image)}
                            >
                                <img
                                    src={image}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="w-full h-full object-cover"
                                    style={{
                                        objectFit: 'cover', // Ensures thumbnails also cover their containers
                                        width: '100%',
                                        height: '100%',
                                        objectPosition: 'center'
                                    }}
                                />
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-8 flex flex-col justify-between">
                    <div className="space-y-6">
                        {/* Product Header */}
                        <div>
                            <h1 className="text-3xl md:text-[48px] font-bold text-blue-950 mb-2 font-raleway">
                                {product.productName}
                            </h1>
                            <p className="text-xl md:text-3xl font-semibold text-blue-950 font-raleway">
                                ${product.sellPrice.toFixed(2)}
                            </p>
                        </div>

                        {/* Size Selection */}
                        <div className="space-y-4">
                            <p className="text-md font-light text-gray-700 font-poppins">Select Size</p>
                            <div className="flex gap-2 md:gap-3 flex-wrap">
                                {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`w-12 h-12 md:w-14 md:h-14 rounded-lg font-medium transition-colors font-poppins
                                            ${selectedSize === size
                                            ? 'bg-blue-950 text-white'
                                            : 'bg-white border border-gray-200 text-blue-950 hover:bg-gray-50'
                                        }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Add to Cart Button */}
                        <button
                            className={`w-full h-12 md:h-14 rounded-lg flex items-center justify-center gap-2 text-lg font-medium transition-colors font-montserrat
                                ${selectedSize
                                ? 'bg-blue-900 text-white hover:bg-blue-950'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                            disabled={!selectedSize}
                            onClick={handleAddToCart}
                        >
                            <ShoppingCart className="w-5 h-5" />
                            Add to Cart
                        </button>
                    </div>

                    {/* Product Description */}
                    <div className="border-t pt-6 space-y-4">
                        <h2 className="text-lg md:text-xl font-semibold text-blue-950 font-poppins">Product Description</h2>
                        <p className="text-md md:text-lg text-blue-950 leading-relaxed md:leading-[40px] font-raleway font-normal">
                            {product.description}
                        </p>
                    </div>

                    {/* Product Availability */}
                    <div className="space-y-4">
                        <h2 className="text-lg md:text-xl font-semibold text-blue-950 font-poppins">Availability</h2>
                        <p className={`text-md font-medium ${product.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {product.quantity > 0 ? `In Stock (${product.quantity} available)` : 'Out of Stock'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleProductContainer;


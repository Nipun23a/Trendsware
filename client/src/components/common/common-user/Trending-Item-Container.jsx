import React,{useState} from 'react';
import ItemContainer from "./Item-Container";

const TrendingItemContainer = () =>{
    const [selectedCategory, setSelectedCategory] = useState('All');
    const categories = ['All', 'Clothing', 'Accessories', 'Shoes', 'Bags'];
    return (
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-14">
            <div className="NewItemTitleContainer text-center mb-12">
                <h2 className="text-[60px] font-bold text-blue-950 mb-4 font-libre">
                    Our Best Sellers
                </h2>
                <nav>
                    <ul className="flex justify-center items-center gap-8 font-poppins">
                        {categories.map((category) => (
                            <li key={category}>
                                <button
                                    onClick={() => setSelectedCategory(category)}
                                    className={`text-blue-950 hover:border-b-2 hover:border-dashed hover:border-blue-950 pb-1 transition-all
                    ${selectedCategory === category ? 'border-b-2 border-dashed border-blue-950' : ''}`}
                                >
                                    {category}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            <div
                className="NewItemProductsContainer mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center ">
                <ItemContainer/>
                <ItemContainer/>
                <ItemContainer/>
                <ItemContainer/>
            </div>
            <div
                className="NewItemProductsContainer mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center ">
                <ItemContainer/>
                <ItemContainer/>
                <ItemContainer/>
                <ItemContainer/>
            </div>

            {/* View All Button
             <div className="flex justify-center mt-12">
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-medium flex items-center space-x-2 transition-colors">
                    <span>View All Products</span>
                </button>
            </div>
             */}

        </div>
    );
}

export default TrendingItemContainer;
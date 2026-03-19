import React, { useState } from 'react';
import './ProductList.css';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';

function ProductList({ onHomeClick }) {

    const [showCart, setShowCart] = useState(false);

    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.items);

    // ✅ Total items in cart
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    // ✅ Add to cart
    const handleAddToCart = (plant) => {
        dispatch(addItem(plant));
    };

    // ✅ Check if already added
    const isAdded = (name) => {
        return cart.some(item => item.name === name);
    };

    const plantsArray = [
        {
            category: "Air Purifying Plants",
            plants: [
                {
                    name: "Snake Plant",
                    image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
                    description: "Produces oxygen at night, improving air quality.",
                    cost: "$15"
                },
                {
                    name: "Spider Plant",
                    image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg",
                    description: "Filters formaldehyde and xylene from the air.",
                    cost: "$12"
                }
            ]
        }
    ];

    const handleHomeClick = (e) => {
        e.preventDefault();
        onHomeClick();
    };

    const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true);
    };

    const handleContinueShopping = (e) => {
        e.preventDefault();
        setShowCart(false);
    };

    return (
        <div>

            {/* ✅ NAVBAR */}
            <div className="navbar" style={{
                backgroundColor: '#4CAF50',
                color: '#fff',
                padding: '15px',
                display: 'flex',
                justifyContent: 'space-between'
            }}>

                <a href="/" onClick={handleHomeClick}>
                    <h3 style={{ color: 'white' }}>Paradise Nursery</h3>
                </a>

                <div>
                    <button onClick={handleCartClick}>
                        🛒 {totalItems}
                    </button>
                </div>
            </div>

            {/* ✅ PRODUCT LIST */}
            {!showCart ? (
                <div className="product-grid">

                    {plantsArray.map((category, index) => (
                        <div key={index}>
                            <h2>{category.category}</h2>

                            <div style={{ display: 'flex', gap: '20px' }}>
                                {category.plants.map((plant, idx) => {

                                    const added = isAdded(plant.name);

                                    return (
                                        <div key={idx} style={{
                                            border: '1px solid #ccc',
                                            padding: '10px',
                                            width: '200px'
                                        }}>

                                            <img src={plant.image} alt={plant.name} width="100%" />
                                            <h3>{plant.name}</h3>
                                            <p>{plant.cost}</p>

                                            <button
                                                onClick={() => handleAddToCart(plant)}
                                                disabled={added}
                                            >
                                                {added ? "Added" : "Add to Cart"}
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}

                </div>
            ) : (
                <CartItem onContinueShopping={handleContinueShopping} />
            )}
        </div>
    );
}

export default ProductList;
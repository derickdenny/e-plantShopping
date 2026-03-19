import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // ✅ Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      return total + item.quantity * parseFloat(item.cost.substring(1));
    }, 0);
  };

  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  // ✅ Increase quantity
  const handleIncrement = (item) => {
    dispatch(updateQuantity({
      name: item.name,
      amount: item.quantity + 1
    }));
  };

  // ✅ Decrease quantity OR remove item
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({
        name: item.name,
        amount: item.quantity - 1
      }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  // ✅ Remove item completely
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // ✅ Calculate total cost for each item
  const calculateTotalCost = (item) => {
    return (item.quantity * parseFloat(item.cost.substring(1))).toFixed(2);
  };

  // ✅ Checkout alert
  const handleCheckoutShopping = () => {
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container">

      {/* ✅ TOTAL AMOUNT */}
      <h2 style={{ color: 'black' }}>
        Total Cart Amount: ${calculateTotalAmount().toFixed(2)}
      </h2>

      {/* ✅ CART ITEMS */}
      <div>
        {cart.length === 0 ? (
          <h3 style={{ color: 'black' }}>Your cart is empty 🌱</h3>
        ) : (
          cart.map(item => (
            <div className="cart-item" key={item.name}>
              <img
                className="cart-item-image"
                src={item.image}
                alt={item.name}
              />

              <div className="cart-item-details">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-cost">{item.cost}</div>

                {/* ✅ QUANTITY CONTROLS */}
                <div className="cart-item-quantity">
                  <button
                    className="cart-item-button cart-item-button-dec"
                    onClick={() => handleDecrement(item)}
                  >
                    -
                  </button>

                  <span className="cart-item-quantity-value">
                    {item.quantity}
                  </span>

                  <button
                    className="cart-item-button cart-item-button-inc"
                    onClick={() => handleIncrement(item)}
                  >
                    +
                  </button>
                </div>

                {/* ✅ ITEM TOTAL */}
                <div className="cart-item-total">
                  Total: ${calculateTotalCost(item)}
                </div>

                {/* ✅ DELETE */}
                <button
                  className="cart-item-delete"
                  onClick={() => handleRemove(item)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ✅ BUTTONS */}
      <div className="continue_shopping_btn">
        <button
          className="get-started-button"
          onClick={(e) => handleContinueShopping(e)}
        >
          Continue Shopping
        </button>

        <br />

        <button
          className="get-started-button1"
          onClick={handleCheckoutShopping}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
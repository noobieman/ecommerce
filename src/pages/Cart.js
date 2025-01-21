import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in by looking for the token
    const token = localStorage.getItem("token");
    if (!token) {
      // If the user is not logged in, redirect to login page
      navigate("/login");
    } else {
      // Retrieve the cart data from localStorage when the component mounts
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(storedCart);
    }
  }, [navigate]);

  const handleRemoveItem = (productId) => {
    const updatedCart = cartItems.filter((item) => item._id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleReduceQuantity = (productId) => {
    const updatedCart = cartItems.map((item) => {
      if (item._id === productId && item.quantity > 1) {
        item.quantity -= 1;
      }
      return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleIncreaseQuantity = (productId) => {
    const updatedCart = cartItems.map((item) => {
      if (item._id === productId) {
        item.quantity += 1;
      }
      return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Calculate total price of the cart items
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="container mt-5">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty. Add some products to your cart!</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <td>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => handleReduceQuantity(item._id)}
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => handleIncreaseQuantity(item._id)}
                  >
                    +
                  </button>
                </td>
                <td>${item.price * item.quantity}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleRemoveItem(item._id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <h3>Total: ${total}</h3>
      <button className="btn btn-success">Proceed to Checkout</button>
    </div>
  );
}

export default Cart;





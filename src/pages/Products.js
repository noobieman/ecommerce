import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    const selectedQuantity = quantity[product._id] || 1; // Default to 1 if no quantity selected

    const cartItem = {
      ...product,
      quantity: selectedQuantity,
    };

    // Get existing cart from localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the item is already in the cart
    const existingItemIndex = cart.findIndex((item) => item._id === product._id);

    if (existingItemIndex > -1) {
      // If item is already in cart, update the quantity
      cart[existingItemIndex].quantity += selectedQuantity;
    } else {
      // If item is not in cart, add the new item
      cart.push(cartItem);
    }

    // Save the updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Optional: Show a success message or redirect to the cart
    alert("Product added to cart!");
  };

  const handleQuantityChange = (e, productId) => {
    const newQuantity = e.target.value;
    setQuantity({
      ...quantity,
      [productId]: newQuantity,
    });
  };

  return (
    <div className="container mt-4">
      <h2>Our Products</h2>
      <div className="row">
        {products.map((product) => (
          <div key={product._id} className="col-md-4 mb-4">
            <div className="card">
              <img
                src={product.image}
                alt={product.name}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">
                  <strong>${product.price}</strong>
                </p>

                {/* Quantity input field */}
                <div className="form-group">
                  <label htmlFor={`quantity-${product._id}`}>Quantity</label>
                  <input
                    type="number"
                    id={`quantity-${product._id}`}
                    className="form-control"
                    min="1"
                    value={quantity[product._id] || 1}
                    onChange={(e) => handleQuantityChange(e, product._id)}
                  />
                </div>

                {/* Add to Cart button */}
                <button
                  className="btn btn-primary mt-3"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;


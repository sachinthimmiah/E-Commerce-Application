import React, { useState, useEffect } from "react";
import "./Orders.css";
import { Header } from "./Header";
import { Footer } from "./Footer";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:9090/api/orders", {
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setOrders(data.products);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="orders-container">
      <Header />
      <main>
        <h1>My Orders</h1>
        {orders.length === 0 ? (
          <p>No orders found</p>
        ) : (
          <div className="orders-grid">
            {orders.map((order) => (
              <div key={order.product_id} className="order-card">
                <img src={order.image_url} alt={order.name} />
                <div className="order-description">
                  <h3>{order.name}</h3>
                  <p>
                    <strong>Order ID:</strong> {order.order_id}
                  </p>
                  <p>
                    <strong>Description:</strong> {order.description}
                  </p>
                  <p>
                    <strong>Quantity:</strong> {order.quantity}
                  </p>
                  <p className="price">
                    <strong>Price per Unit:</strong> ₹{order.price_per_unit.toFixed(2)}
                  </p>
                  <p className="total-price">
                    <strong>Total Price:</strong> ₹{order.total_price.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Orders;

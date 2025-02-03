import React, { useState, useEffect } from 'react';
import { CategoryNavigation } from './CategoryNavigation';
import { ProductList } from './ProductList';
import { Footer } from './Footer';
import { Header } from './Header';
import './assets/home.css';


export default function CustomerHomePage() {
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [username, setUsername] = useState('');
  const [cartError, setCartError] = useState(false);
  const [isCartLoading, setIsCartLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
    if (username) {
      fetchCartCount();
    }
  }, [username]);

  const fetchProducts = async (category = '') => {
    try {
      const response = await fetch(
        `http://localhost:9090/api/products${category ? `?category=${category}` : '?category=Shirts'}`, 
        { credentials: 'include' }
      );
      const data = await response.json();
      if (data) {
        setUsername(data.user?.name || 'Guest');
        setProducts(data.products || []);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    }
  };

  const fetchCartCount = async () => {
    setIsCartLoading(true);
    try {
      const response = await fetch(`http://localhost:9090/api/cart/items/count?username=${username}`, {
        credentials: 'include',
      });
      const count = await response.json();
      setCartCount(count);
      setCartError(false);
    } catch (error) {
      console.error('Error fetching cart count:', error);
      setCartError(true);
    } finally {
      setIsCartLoading(false);
    }
  };

  const handleCategoryClick = (category) => {
    fetchProducts(category);
  };

 const handleAddToCart = async (productId) => {
  console.log("Username:", username); // Check if username is available
  console.log("Product ID:", productId); // Verify productId is passed

  if (!username) {
    console.error('Username is required to add items to the cart');
    return;
  }

  try {
    const response = await fetch('http://localhost:9090/api/cart/add', {
      method: 'POST',
      credentials: 'include', // Ensures cookies or credentials are sent
      body: JSON.stringify({ username, productId }), // Sending payload
      headers: {
        'Content-Type': 'application/json', // Correct Content-Type header
      },
    });


      if (response.ok) {
        
        fetchCartCount();
      } else {
        console.error('Failed to add product to cart');
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  // Image Slider Logic
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    "https://assets.ajio.com/cms/AJIO/WEB/D-1.0-UHP-02012025-GFS-Mainbanner-50to80.jpg",
    "https://assets.ajio.com/cms/AJIO/WEB/D-1.0-UHP-08012025-MainBanners-Z1-P7-ColdDaysWarmLooks-ShopWinterFavoritesforAll.jpg",
    "https://assets.ajio.com/cms/AJIO/WEB/D-1.0-UHP-09012025-MainBanners-Z1-P5-DNMX-Netplay-Flat60.jpg"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3500); // Change image every 3.5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="customer-homepage">
      <Header
        cartCount={isCartLoading ? '...' : cartError ? 'Error' : cartCount}
        username={username}
      />
      <nav className="navigation">
        <CategoryNavigation onCategoryClick={handleCategoryClick} />
      </nav>
      <main className="main-content">
        <div className="image-container" style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}>
          {images.map((imgSrc, index) => (
            <img key={index} src={imgSrc} alt={`Banner ${index + 1}`} />
          ))}
        </div>
        <ProductList products={products} onAddToCart={handleAddToCart} />
      </main>
      <Footer />
    </div>
  );
}

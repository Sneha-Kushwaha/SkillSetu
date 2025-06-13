import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import axios from 'axios';

const Home = () => {
  const [latest, setLatest] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('/api/products?sort=newest');
        setLatest(res.data);
      } catch (err) {
        console.error('Error fetching latest products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      {/* Hero Section */}
  <section className="relative h-96">
  <img
    src="https://i.etsystatic.com/12762848/r/il/37885d/1508204837/il_1588xN.1508204837_t6ti.jpg"
    alt="Hero"
    className="absolute inset-0 w-full h-full object-cover"
  />
  <div className="absolute inset-0   flex items-center justify-center">
    <div className="text-black text-center px-4">
      <h1 className="text-4xl font-bold mb-4">Discover Handmade Treasures</h1>
      <button
        className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition"
        onClick={() => (window.location.href = '/shop')}
      >
        Shop Now
      </button>
    </div>
  </div>
</section>


      {/* Featured Categories */}
    <section className="p-8">
  <h2 className="text-2xl font-semibold mb-4 text-center">
    Featured Categories
  </h2>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
    {[
      { img: '/images/Basket.jpg', label: 'Home Decor' },
      { img: '/images/stone.webp', label: 'Wellness' },
      { img: '/images/Vase.avif', label: 'Crafts' },
      { img: '/images/towel.jpg', label: 'Textiles' },
    ].map((item, idx) => (
      <div
        key={idx}
        className="cursor-pointer  rounded overflow-hidden shadow hover:shadow-md transition"
      >
        <div className="w-full h-50 ">
          <img
            src={item.img}
            alt={item.label}
            className="w-full h-full"
          />
        </div>
        <div className="text-center p-2">
          <p className="font-medium">{item.label}</p>
        </div>
      </div>
    ))}
  </div>
</section>


      {/* Latest Products */}
      <section className="p-8">
  <h2 className="text-2xl font-semibold mb-4 text-center">Latest Products</h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
    {[
      {
        id: 1,
        name: 'Handmade Vase',
        image: '/images/Vase.avif',
        price: 25.99,
      },
      {
        id: 2,
        name: 'Decor Basket',
        image: '/images/Basket.jpg',
        price: 19.5,
      },
      {
        id: 3,
        name: 'Wellness Stones',
        image: '/images/stone.webp',
        price: 12.75,
      },
      {
        id: 4,
        name: 'Soft Towel Set',
        image: '/images/towel.jpg',
        price: 29.0,
      },
    ].map((product) => (
      <div
        key={product.id}
        className="rounded-lg shadow hover:shadow-md transition overflow-hidden bg-white"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-60"
        />
        <div className="p-4 text-center">
          <h3 className="font-semibold mb-2 text-lg">{product.name}</h3>
          <p className="text-gray-800 mb-3 font-medium">
            ${product.price.toFixed(2)}
          </p>
          <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition">
            Add to Cart
          </button>
        </div>
      </div>
    ))}
  </div>
</section>

    </div>
  );
};

export default Home;

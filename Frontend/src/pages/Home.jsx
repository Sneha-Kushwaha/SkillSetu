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

        const data = Array.isArray(res.data)
          ? res.data
          : res.data.products || [];

        setLatest(data);
      } catch (err) {
        console.error('Error fetching latest products:', err);
        setLatest([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);


  
  return (
    <div className="pt-16 md:pt-0">
      {/* Hero Section */}
      <section className="relative h-[20rem] sm:h-[28rem] md:h-[36rem] lg:h-[44rem]">
  <img
    src="https://i.etsystatic.com/12762848/r/il/37885d/1508204837/il_1588xN.1508204837_t6ti.jpg"
    alt="Hero"
    className="absolute inset-0 w-full h-full object-cover"
  />
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="text-center px-4 text-black">
      <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-snug">
        Discover Handmade Treasures
      </h1>
      <button
        className="bg-white text-black px-6 py-2 text-sm sm:text-base rounded hover:bg-gray-200 transition"
        onClick={() => (window.location.href = '/shop')}
      >
        Shop Now
      </button>
    </div>
  </div>
</section>


      {/* Featured Categories */}
      <section className="px-4 sm:px-6 lg:px-8 py-10 bg-fuchsia-100">
  <h2 className="text-2xl sm:text-3xl font-semibold mb-8 text-center">
    Featured Categories
  </h2>

  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
    {[
      { img: '/images/Basket.jpg', label: 'Home Decor' },
      { img: '/images/stone.webp', label: 'Wellness' },
      { img: '/images/Vase.avif', label: 'Crafts' },
      { img: '/images/towel.jpg', label: 'Textiles' },
    ].map((item, idx) => (
      <div
        key={idx}
        className="bg-white rounded-lg shadow hover:shadow-2xl transition overflow-hidden cursor-pointer flex flex-col"
      >
        <div className="aspect-w-1 aspect-h-1 w-full">
          <img
            src={item.img}
            alt={item.label}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="text-center py-4">
          <p className="text-lg font-medium">{item.label}</p>
        </div>
      </div>
    ))}
  </div>
</section>


      {/* Latest Products */}
      <section className="p-6 md:p-12">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Latest Products
        </h2>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : latest.length === 0 ? (
          <p className="text-center">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {latest.map((product) => (
              <ProductCard key={product._id || product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;

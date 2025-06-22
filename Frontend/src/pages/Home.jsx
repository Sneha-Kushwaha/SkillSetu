// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { motion } from "framer-motion";
import { fetchProducts } from "../services/productService";

const Home = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
  const load = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      console.error("Failed to load products", err);
    }
  };
  load();
}, []);

  useEffect(() => {
    // 🔗 Replace this with real API call
    const mockProducts = [
      { _id: "1", name: "JavaScript Course", price: 499, image: "https://via.placeholder.com/150" },
      { _id: "2", name: "React Bootcamp", price: 699, image: "https://via.placeholder.com/150" },
      { _id: "3", name: "MERN Mastery", price: 999, image: "https://via.placeholder.com/150" },
    ];
    setProducts(mockProducts);
  }, []);

  return (
    <motion.div
      className="p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-2xl font-bold mb-6 text-blue-600">Available Courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white rounded-lg shadow p-4">
            <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded mb-3" />
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-green-600 font-bold">₹{product.price}</p>
            <div className="flex justify-between mt-3">
              <Link
                to={`/product/${product._id}`}
                className="text-sm text-blue-500 hover:underline"
              >
                View
              </Link>
              <button
                onClick={() => addToCart(product)}
                className="text-sm text-white bg-blue-500 px-3 py-1 rounded hover:bg-blue-600"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Home;

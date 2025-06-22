// src/pages/ProductDetails.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../contexts/CartContext";
import { fetchProductById } from "../services/productService";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // 🔗 Replace with real API call
    const mockProducts = [
      { _id: "1", name: "JavaScript Course", description: "Master JS from scratch.", price: 499, image: "https://via.placeholder.com/400" },
      { _id: "2", name: "React Bootcamp", description: "Build awesome UIs with React.", price: 699, image: "https://via.placeholder.com/400" },
      { _id: "3", name: "MERN Mastery", description: "Complete MERN stack guide.", price: 999, image: "https://via.placeholder.com/400" },
    ];
    const found = mockProducts.find(p => p._id === id);
    setProduct(found);
  }, [id]);

  useEffect(() => {
  const load = async () => {
    try {
      const data = await fetchProductById(id);
      setProduct(data);
    } catch (err) {
      console.error("Failed to load product", err);
    }
  };
  load();
}, [id]);

  if (!product) return <p className="p-6 text-gray-500">Loading product...</p>;

  return (
    <div className="p-6 flex flex-col md:flex-row gap-6">
      <img
        src={product.image}
        alt={product.name}
        className="w-full md:w-1/2 rounded shadow"
      />
      <div>
        <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
        <p className="text-gray-700 mb-4">{product.description}</p>
        <p className="text-xl font-semibold text-green-600 mb-4">₹{product.price}</p>
        <button
          onClick={() => addToCart(product)}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;

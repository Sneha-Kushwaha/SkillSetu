import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext); // ✅ move inside function

  return (
    <div className="border p-4 rounded shadow">
      <img src={product.image} alt={product.title} className="w-full h-48 object-cover"/>
      <h3 className="text-lg font-semibold">{product.title}</h3>
      <p>${product.price}</p>
      <button
        className="bg-blue-500 text-white px-4 py-1 mt-2 rounded"
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;

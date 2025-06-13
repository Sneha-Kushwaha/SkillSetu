import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition bg-white flex flex-col">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-contain bg-gray-100"
      />
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold mb-2 line-clamp-2">
            {product.title}
          </h3>
          <p className="text-gray-800 font-medium mb-4">${product.price.toFixed(2)}</p>
        </div>
        <button
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

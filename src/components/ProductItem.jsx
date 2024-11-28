import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({
  id,
  image = [],
  name,
  price,
  discount = 0,
  bestseller,
  offers,
  sizes = [],
}) => {
  const { currency } = useContext(ShopContext);

  // Default to an empty array for images
  const productImage =
    image.length > 0 ? image[0] : "path/to/default/image.jpg"; // Provide a default image

  // Price after discount calculation
  const discountedPrice = discount
    ? (price - (price * discount) / 100).toFixed(2)
    : price;

  return (
    <Link
      onClick={() => scrollTo(0, 0)}
      className="text-gray-700 cursor-pointer"
      to={`/product/${id}`}
    >
      <div className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105 overflow-hidden relative h-full">
        {/* Product Image */}
        <div className="overflow-hidden">
          <img
            className="w-full h-48 object-cover transition-transform duration-300 transform hover:scale-110 md:h-56 lg:h-64 xl:h-72"
            src={productImage}
            alt={name}
          />
        </div>

        {/* Product Details */}
        <div className="p-4 sm:p-5 h-48">
          {/* Product Name */}
          <p className="text-lg font-semibold text-gray-900 truncate">{name}</p>

          {/* Chips for UI - Size, Offers, Bestseller */}
          <div className="flex flex-wrap space-x-2 mt-2">
            {sizes.length > 0 &&
              sizes.map((size, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-full"
                >
                  {size}
                </span>
              ))}
            {offers && (
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                Offers
              </span>
            )}
            {bestseller && (
              <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                Bestseller
              </span>
            )}
          </div>

          {/* Price Section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-3">
            {discount > 0 && (
              <>
                <span className="line-through text-red-600 text-sm font-medium mr-2">
                  {currency}
                  {price}
                </span>
                <span className="text-xl font-semibold text-green-600">
                  {currency}
                  {discountedPrice}
                </span>
              </>
            )}
            {discount === 0 && (
              <span className="text-xl font-semibold text-gray-900">
                {currency}
                {price}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <div className="mt-3">
            <button className="bg-orange-600 text-white py-2 px-6 rounded-lg font-medium text-sm hover:bg-orange-700 transition-all duration-300 ease-in-out transform hover:scale-105 w-full">
              Buy Now!
            </button>
          </div>
        </div>

        {/* Optional Sale Badge */}
        {discount > 0 && (
          <div className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
            Sale
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProductItem;

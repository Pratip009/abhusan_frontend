import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image = [], name, price }) => {
  // Default to an empty array
  const { currency } = useContext(ShopContext);

  // Check if image exists and is not empty
  const productImage =
    image.length > 0 ? image[0] : "path/to/default/image.jpg"; // Provide a default image

  return (
    <Link
      onClick={() => scrollTo(0, 0)}
      className="text-gray-700 cursor-pointer"
      to={`/product/${id}`}
    >
      <div className="overflow-hidden">
        <img
          className="w-full h-64 object-cover hover:scale-110 transition ease-in-out" // Fixed height and object-cover
          src={productImage}
          alt={name}
        />
      </div>
      <p className="pt-3 pb-1 text-sm">{name}</p>
      <p className="text-sm font-medium">
        {currency}
        {price}
      </p>
    </Link>
  );
};

export default ProductItem;

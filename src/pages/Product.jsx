import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [sendAsGift, setSendAsGift] = useState(false);
  const [selectedGiftPackage, setSelectedGiftPackage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProductData = () => {
    const foundProduct = products.find((item) => item._id === productId);

    if (foundProduct) {
      setProductData(foundProduct);
      setImage(foundProduct.images[0]);
      setError("");
    } else {
      setError("Product not found.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  // Calculate discounted price if a discount is available
  const discountedPrice = productData.discount
    ? (productData.price * (1 - productData.discount / 100)).toFixed(2)
    : productData.price;

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product Data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData?.images?.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt={`Product Image ${index + 1}`}
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img
              className="w-full h-[500px] object-cover"
              src={image}
              alt="Selected Product"
            />
          </div>
        </div>

        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            {[...Array(4)].map((_, i) => (
              <img src={assets.star_icon} alt="" className="w-3.5" key={i} />
            ))}
            <img src={assets.star_dull_icon} alt="" className="w-3.5" />
            <p className="pl-2">(122)</p>
          </div>

          {/* Display Price with Discounted Price and Strikethrough Original Price */}
          <div className="mt-5 text-3xl font-medium">
            {productData.discount ? (
              <>
                <span className="line-through text-gray-500">
                  {currency}
                  {productData.price}
                </span>
                <span className="text-red-500 pl-3">
                  {currency}
                  {discountedPrice} ({productData.discount}% OFF)
                </span>
              </>
            ) : (
              <span>
                {currency}
                {productData.price}
              </span>
            )}
          </div>

          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>

          {/* Select Size Section */}
          {productData.sizes?.length > 0 && (
            <div className="flex flex-col gap-4 my-8">
              <p>Select Colors</p>
              <div className="flex gap-2">
                {productData.sizes.map((item, index) => (
                  <button
                    onClick={() => setSize(item)}
                    className={`border py-2 px-4 bg-gray-100 ${
                      item === size ? "border-orange-500" : ""
                    }`}
                    key={index}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Send as a Gift Checkbox */}
          <div className="flex items-center gap-2 mt-6">
            <input
              type="checkbox"
              id="sendAsGift"
              checked={sendAsGift}
              onChange={(e) => setSendAsGift(e.target.checked)}
            />
            <label htmlFor="sendAsGift" className="font-medium text-lg">
              Send as a gift? 🎁
            </label>
          </div>

          {/* Display Gift Package Options */}
          {sendAsGift && productData.giftPackages?.length > 0 && (
            <div className="mt-8">
              <h3 className="font-medium text-xl">Gift Package Options</h3>
              <div className="flex gap-4 mt-4">
                {productData.giftPackages
                  .filter((pkg) => pkg.imageUrl && pkg.price > 0)
                  .map((pkg, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedGiftPackage(pkg)}
                      className={`cursor-pointer border p-4 rounded-lg ${
                        selectedGiftPackage === pkg ? "border-orange-500" : ""
                      }`}
                    >
                      <img
                        src={pkg.imageUrl}
                        alt={`Gift Package ${index + 1}`}
                        className="w-24 h-24 mb-3 object-cover"
                        onError={(e) => {
                          e.target.src =
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrA7AnzVfkvExs3rWGo4jL69PZTPbDsSnKLg&s";
                        }}
                      />
                      <div className="text-center">
                        {pkg.discount ? (
                          <>
                            <span className="line-through text-gray-500">
                              {currency}
                              {pkg.price}
                            </span>
                            <span className="text-red-500 pl-2">
                              {currency}
                              {(pkg.price * (1 - pkg.discount / 100)).toFixed(
                                2
                              )}
                            </span>
                          </>
                        ) : (
                          <span>
                            {currency}
                            {pkg.price}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          <button
            onClick={() => {
              // Log selected details to the console
              console.log("Adding to cart:");
              console.log("Product ID:", productData._id);
              console.log("Selected Size:", size);
              if (selectedGiftPackage) {
                console.log("Gift Package Price:", selectedGiftPackage.price);
                console.log(
                  "Gift Package Image URL:",
                  selectedGiftPackage.imageUrl
                );
              } else {
                console.log("No gift package selected.");
              }

              // Call the addToCart function
              addToCart(productData._id, size, selectedGiftPackage);
            }}
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700 mt-5"
          >
            ADD TO CART
          </button>

          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            An e-commerce website is an online platform that facilitates the
            buying and selling of products or services over the internet...
          </p>
          <p>
            E-commerce websites typically display products or services along
            with detailed descriptions, images, prices, and any available
            variations (e.g., sizes, colors).
          </p>
        </div>
      </div>

      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  );
};

export default Product;

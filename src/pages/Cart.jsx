import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";

const Cart = () => {
  const {
    products,
    currency,
    cartItems,
    updateQuantity,
    navigate,
    setCartItems,
    delivery_fee
  } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      let calculatedSubtotal = 0;
      const updatedCartItems = { ...cartItems };

      for (const itemID in cartItems) {
        const productExists = products.some((product) => product._id === itemID);
        if (!productExists) {
          delete updatedCartItems[itemID];
        } else {
          for (const size in cartItems[itemID]) {
            if (cartItems[itemID][size].quantity > 0) {
              const quantity = cartItems[itemID][size].quantity;
              const giftPackageQuantity = cartItems[itemID][size].giftPackageQuantity || 0;
              const productData = products.find((product) => product._id === itemID);
              const originalPrice = productData.price;

              const discountedPrice = productData.discount
                ? (originalPrice * (1 - productData.discount / 100)).toFixed(2)
                : originalPrice;

              const giftPackagePrice = cartItems[itemID][size].giftPackage
                ? cartItems[itemID][size].giftPackage.discount
                  ? (
                      cartItems[itemID][size].giftPackage.price *
                      (1 - cartItems[itemID][size].giftPackage.discount / 100)
                    ).toFixed(2)
                  : cartItems[itemID][size].giftPackage.price
                : 0;

              calculatedSubtotal +=
                discountedPrice * quantity + giftPackagePrice * giftPackageQuantity;

              tempData.push({
                _id: itemID,
                size: size,
                quantity: quantity,
                giftPackage: cartItems[itemID][size].giftPackage,
                giftPackageQuantity: giftPackageQuantity
              });
            }
          }
        }
      }

      setCartData(tempData);
      setSubtotal(calculatedSubtotal);

      if (JSON.stringify(updatedCartItems) !== JSON.stringify(cartItems)) {
        setCartItems(updatedCartItems);
      }
    }
  }, [cartItems, products, setCartItems]);

  const total = subtotal + delivery_fee;

  const handlePlaceOrder = () => {
    const orderData = cartData.map((item) => {
      const productData = products.find((product) => product._id === item._id);
      if (!productData) return null;

      return {
        productId: item._id,
        size: item.size,
        quantity: item.quantity,
        giftPackage: item.giftPackage
          ? {
              imageUrl: item.giftPackage.imageUrl,
              price: item.giftPackage.price,
              discount: item.giftPackage.discount || 0,
              quantity: item.giftPackageQuantity,
            }
          : null,
      };
    }).filter(Boolean);

    // Log the order data to check details
    console.log("Order Data:", orderData);

    // Here you would make a request to the backend, e.g., axios.post('/api/place-order', orderData)
    // For now, we can just log a success message
    console.log("Sending order data to backend...");
    navigate("/place-order");
  };

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1="YOUR" text2="CART" />
      </div>

      <div>
        {cartData.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id);

            if (!productData) {
              return null;
            }

            const originalPrice = productData.price;
            const discountedPrice = productData.discount
              ? (originalPrice * (1 - productData.discount / 100)).toFixed(2)
              : originalPrice;

            const giftImageUrl = item.giftPackage ? item.giftPackage.imageUrl : null;
            const giftPackagePrice = item.giftPackage ? item.giftPackage.price : 0;

            return (
              <div
                key={index}
                className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
              >
                <div className="flex items-start gap-6">
                  {productData.images && productData.images[0] && (
                    <img
                      className="w-16 sm:w-20"
                      src={productData.images[0]}
                      alt={productData.name || "Product Image"}
                    />
                  )}
                  <div>
                    <p className="text-xs sm:text-lg font-medium">
                      {productData.name || "Unnamed Product"}
                    </p>
                    <div className="flex items-center gap-5 mt-2">
                      <p>
                        {currency}
                        {discountedPrice}
                      </p>
                      <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                        {item.size}
                      </p>
                    </div>
                    {giftImageUrl && (
                      <div className="flex items-center mt-2">
                        <p className="text-sm">Gift Package:</p>
                        <img
                          src={giftImageUrl}
                          alt="Gift Package"
                          className="w-16 h-16 ml-2"
                        />
                        <input
                          type="number"
                          min="0"
                          value={item.giftPackageQuantity}
                          onChange={(e) => {
                            const newQuantity = parseInt(e.target.value, 10) || 0;
                            updateQuantity(item._id, item.size, item.quantity, newQuantity);
                          }}
                          className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 ml-2 text-center"
                        />
                      </div>
                    )}
                  </div>
                </div>
                <input
                  onChange={(e) =>
                    e.target.value === "" || e.target.value === "0"
                      ? null
                      : updateQuantity(item._id, item.size, Number(e.target.value), item.giftPackageQuantity)
                  }
                  className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 text-center"
                  type="number"
                  min={1}
                  defaultValue={item.quantity}
                />
                <img
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                  className="w-4 mr-4 sm:w-5 cursor-pointer"
                  src={assets.bin_icon}
                  alt="Delete"
                />
              </div>
            );
          })
        )}
      </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <div className="border-t pt-4">
            {cartData.map((item, index) => {
              const productData = products.find((product) => product._id === item._id);
              if (!productData) return null;

              const originalPrice = productData.price;
              const discountedPrice = productData.discount
                ? (originalPrice * (1 - productData.discount / 100)).toFixed(2)
                : originalPrice;
              const quantity = item.quantity;

              return (
                <div key={index} className="flex justify-between">
                  <p>
                    {productData.name} (x{quantity})
                  </p>
                  <p>
                    {currency}
                    {(discountedPrice * quantity).toFixed(2)}
                  </p>
                </div>
              );
            })}

            {cartData.map((item, index) => {
              const giftPackagePrice = item.giftPackage ? item.giftPackage.price : 0;
              const quantity = item.giftPackageQuantity;

              return (
                item.giftPackage && quantity > 0 && (
                  <div key={index + cartData.length} className="flex justify-between">
                    <p>Special Packaging (x{quantity})</p>
                    <p>
                      {currency}
                      {(giftPackagePrice * quantity).toFixed(2)}
                    </p>
                  </div>
                )
              );
            })}

            <div className="flex justify-between">
              <p>Shipping Fee</p>
              <p>
                {currency}
                {delivery_fee.toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between font-bold">
              <p>Total</p>
              <p>
                {currency}
                {total.toFixed(2)}
              </p>
            </div>
          </div>
          <div className="w-full text-end">
            <button
              onClick={handlePlaceOrder}
              className="bg-black text-white text-sm my-8 px-8 py-3"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

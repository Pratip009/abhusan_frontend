import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);

  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="flex items-center justify-between h-20 px-4 md:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={assets.abhusan}
            className="w-28 sm:w-32 object-contain py-2"
            alt="Logo"
          />
        </Link>

        {/* Navigation Links (Desktop) */}
        <ul className="hidden sm:flex gap-6 text-sm font-medium text-gray-700">
          {["HOME", "COLLECTION", "OFFERS", "ABOUT", "BLOG", "CONTACT"].map(
            (item, idx) => (
              <NavLink
                key={idx}
                to={item === "HOME" ? "/" : `/${item.toLowerCase()}`} // Use "/" for HOME link
                className="flex flex-col items-center"
              >
                <p>{item}</p>
                <hr className="hidden w-2/4 h-[1.5px] bg-gray-700" />
              </NavLink>
            )
          )}
        </ul>

        {/* Icons and Actions */}
        <div className="flex items-center gap-6">
          <img
            onClick={() => {
              setShowSearch(true);
              navigate("/collection");
            }}
            src={assets.search_icon}
            className="w-5 cursor-pointer"
            alt="Search"
          />
          <div className="relative">
            <img
              onClick={() => (token ? null : navigate("/login"))}
              src={assets.profile_icon}
              className="w-5 cursor-pointer"
              alt="Profile"
            />
            {token && (
              <div className="absolute right-0 hidden pt-4 group-hover:block">
                <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                  <p className="cursor-pointer hover:text-black">My Profile</p>
                  <p
                    onClick={() => navigate("/orders")}
                    className="cursor-pointer hover:text-black"
                  >
                    Orders
                  </p>
                  <p
                    onClick={logout}
                    className="cursor-pointer hover:text-black"
                  >
                    Logout
                  </p>
                </div>
              </div>
            )}
          </div>
          <Link to="/cart" className="relative">
            <img src={assets.cart_icon} className="w-5" alt="Cart" />
            <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white rounded-full text-[8px]">
              {getCartCount()}
            </p>
          </Link>
          <img
            onClick={() => setVisible(true)}
            src={assets.menu_icon}
            className="w-5 cursor-pointer sm:hidden"
            alt="Menu"
          />
        </div>
      </div>

      {/* Sidebar Menu (Mobile) */}
      <div
        className={`fixed top-0 right-0 bottom-0 bg-white transition-all ${
          visible ? "w-3/4 sm:w-1/2" : "w-0"
        } overflow-hidden z-40`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img className="h-4 rotate-180" src={assets.dropdown_icon} alt="" />
            <p>Back</p>
          </div>
          {["HOME", "COLLECTION", "ABOUT", "CONTACT"].map((item, idx) => (
            <NavLink
              key={idx}
              onClick={() => setVisible(false)}
              className="py-2 pl-6 border"
              to={item === "HOME" ? "/" : `/${item.toLowerCase()}`} // Use "/" for HOME link
            >
              {item}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

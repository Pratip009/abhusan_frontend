import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [subSubCategory, setSubSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");

  const subCategories = {
    Bracelets: [],
    Earrings: {
      default: [
        "Chandbali",
        "Drops",
        "Hoops",
        "Danglers",
        "Jhumkas",
        "Korean",
        "Oxidised",
        "Studs",
        "Sui Dhaga",
      ],
      Chandbali: ["AD", "Kundan", "Light Weight", "Meenakari"],
      Hoops: ["AD", "Kundan", "Light Weight", "Meenakari"],
      Danglers: [
        "AD",
        "Kundan",
        "Light Weight",
        "Meenakari",
        "Anti Tarnish",
        "Pearls",
      ],
      Drops: [
        "AD",
        "Kundan",
        "Light Weight",
        "Meenakari",
        "Anti Tarnish",
        "Pearls",
      ],
      Jhumkas: ["AD", "Kundan", "Meenakari"],
      Studs: [
        "AD",
        "Kundan",
        "Light Weight",
        "Meenakari",
        "Anti Tarnish",
        "Pearls",
      ],
    },
    Jewellery: [],
    Necklace: [],
    Rings: {
      default: [
        "AD",
        "Anti Tarnish",
        "Cocktail",
        "Kundan and Meenakari",
        "Oxidised",
      ],
    },
  };

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
      setSubCategory([]); // Reset subCategory when category is deselected
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    if (subCategory.includes(value)) {
      setSubCategory((prev) => prev.filter((item) => item !== value));
      setSubSubCategory([]); // Reset subSubCategory when subCategory is deselected
    } else {
      setSubCategory((prev) => [...prev, value]);
    }
  };

  const toggleSubSubCategory = (e) => {
    const value = e.target.value;
    if (subSubCategory.includes(value)) {
      setSubSubCategory((prev) => prev.filter((item) => item !== value));
    } else {
      setSubSubCategory((prev) => [...prev, value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    if (subSubCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subSubCategory.includes(item.subSubCategory)
      );
    }

    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case "low-high":
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;

      case "high-low":
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;

      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, subSubCategory, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t p-4">
      {/* Filter Options */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>

        {/* Category Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {Object.keys(subCategories).map((cat) => (
              <p className="flex gap-2" key={cat}>
                <input
                  className="w-3"
                  type="checkbox"
                  value={cat}
                  onChange={toggleCategory}
                />{" "}
                {cat}
              </p>
            ))}
          </div>
        </div>

        {/* SubCategory Filter */}
        {category.length > 0 && (
          <div
            className={`border border-gray-300 pl-5 py-3 my-5 ${
              showFilter ? "" : "hidden"
            } sm:block`}
          >
            <p className="mb-3 text-sm font-medium">TYPE</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              {category.map((cat) => (
                <div key={cat}>
                  {subCategories[cat].default &&
                    subCategories[cat].default.length > 0 && (
                      <>
                        <p className="flex gap-2">
                          <input
                            className="w-3"
                            type="checkbox"
                            value={cat}
                            onChange={toggleSubCategory}
                          />{" "}
                          {cat}
                        </p>
                        {subCategories[cat].default.map((sub) => (
                          <p className="flex gap-2 pl-5" key={sub}>
                            <input
                              className="w-3"
                              type="checkbox"
                              value={sub}
                              onChange={toggleSubCategory}
                            />{" "}
                            {sub}
                          </p>
                        ))}
                      </>
                    )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sub-SubCategory Filter */}
        {subCategory.length > 0 && (
          <div
            className={`border border-gray-300 pl-5 py-3 my-5 ${
              showFilter ? "" : "hidden"
            } sm:block`}
          >
            <p className="mb-3 text-sm font-medium">SUB-TYPE</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              {subCategory.map((subCat) => (
                <div key={subCat}>
                  {subCategories[
                    category.find((cat) => subCategories[cat][subCat])
                  ][subCat] && (
                    <>
                      <p className="flex gap-2">
                        <input
                          className="w-3"
                          type="checkbox"
                          value={subCat}
                          onChange={toggleSubCategory}
                        />{" "}
                        {subCat}
                      </p>
                      {subCategories[
                        category.find((cat) => subCategories[cat][subCat])
                      ][subCat].map((subSub) => (
                        <p className="flex gap-2 pl-5" key={subSub}>
                          <input
                            className="w-3"
                            type="checkbox"
                            value={subSub}
                            onChange={toggleSubSubCategory}
                          />{" "}
                          {subSub}
                        </p>
                      ))}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          {/* Product Sort */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-2"
          >
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Map Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              image={item.images}
              name={item.name}
              price={item.price}
              discount={item.discount} // Add the discount value here
              bestseller={item.bestseller} // Add bestseller flag
              offers={item.offers} // Add offers flag
              sizes={item.sizes} // Add sizes array if available
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;

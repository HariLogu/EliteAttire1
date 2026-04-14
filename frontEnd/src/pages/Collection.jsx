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
  const [name, setName] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  function togglecategory(e) {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  }
  function toggleSubCategory(e) {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  }
  function toggleName(e) {
    if (name.includes(e.target.value)) {
      setName((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setName((prev) => [...prev, e.target.value]);
    }
  }
  function applyFilter() {
    let productsCopy = products.slice();
    if (search) {
      productsCopy = productsCopy.filter((i) =>
        i.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category.length > 0) {
      productsCopy = productsCopy.filter((i) => category.includes(i.category));
    }
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((i) =>
        subCategory.includes(i.subCategory)
      );
    }
    if (name.length > 0) {
      productsCopy = productsCopy.filter((i) => name.includes(i.name));
    }
    setFilterProducts(productsCopy);
  }
  function sortProduct() {
    let filterProductCopy = filterProducts.slice();
    switch (sortType) {
      case "low-high":
        setFilterProducts(filterProductCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProducts(filterProductCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  }
  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, products, showSearch,name]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);
  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* left */}
      {/* filter options */}
      <div className="min-w-40">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2 uppercase"
        >
          filters
          <img
            src={assets.drop_down}
            alt=""
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
          />
        </p>
        {/* category filter */}
        <div
          className={`border border-gray-300 rounded pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium uppercase">categories</p>
          <div className="flex flex-col gap-2 text-sm text-gray-700">
            <p className="flex gap-2">
              <input
                type="checkbox"
                value={"Men"}
                onChange={togglecategory}
                className="w-4 md:w-3"
              />{" "}
              Men
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                value={"Women"}
                onChange={togglecategory}
                className="w-4 md:w-3"
              />
              Women
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                value={"Kids"}
                onChange={togglecategory}
                className="w-4 md:w-3"
              />
              Kids
            </p>
          </div>
        </div>
        {/* subcategory */}
        <div
          className={`border border-gray-300 rounded pl-5 py-3 my-5 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium uppercase">type</p>
          <div className="flex flex-col gap-2 text-sm text-gray-700">
            <p className="flex gap-2">
              <input
                type="checkbox"
                value={"shoes"}
                onChange={toggleSubCategory}
                className="w-4 md:w-3"
              />
              Shoes
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                value={"jacket"}
                onChange={toggleSubCategory}
                className="w-4 md:w-3"
              />
              Jackets
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                value={"dress"}
                onChange={toggleSubCategory}
                className="w-4 md:w-3"
              />
              Dress
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                value={"jeans"}
                onChange={toggleSubCategory}
                className="w-4 md:w-3"
              />
              Jeans
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                value={"short"}
                onChange={toggleSubCategory}
                className="w-4 md:w-3"
              />
              Shorts
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                value={"hoodie"}
                onChange={toggleSubCategory}
                className="w-4 md:w-3"
              />
              Hoodie
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                value={"tshirt"}
                onChange={toggleSubCategory}
                className="w-4 md:w-3"
              />
              T Shirt
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                value={"bag"}
                onChange={toggleSubCategory}
                className="w-4 md:w-3"
              />
              Bags
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                value={"suit"}
                onChange={toggleSubCategory}
                className="w-4 md:w-3"
              />
              Suits
            </p>
          </div>
        </div>
        {/* by brands */}
        <div
          className={`border border-gray-300 rounded pl-5 py-3 my-5 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium uppercase">brands</p>
          <div className="flex flex-col gap-2 text-sm text-gray-700">
            <p className="flex gap-2">
              <input
                type="checkbox"
                value={"Versace"}
                onChange={toggleName}
                className="w-4 md:w-3"
              />
              Versace
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                value={"Clarks Originals"}
                onChange={toggleName}
                className="w-4 md:w-3"
              />
              Clarks Originals
            </p>
            <p className="flex gap-2">
              
              <input
                type="checkbox"
                value={"NIKE"}
                onChange={toggleName}
                className="w-4 md:w-3"
              />
              Nike
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                value={"Zegna"}
                onChange={toggleName}
                className="w-4 md:w-3"
              />
              Zegna
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                value={"Palm Angels"}
                onChange={toggleName}
                className="w-4 md:w-3"
              />
              Palm Angels
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                value={"Jacquemus"}
                onChange={toggleName}
                className="w-4 md:w-3"
              />
              Jacquemus
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                value={"Amina Muadi"}
                onChange={toggleName}
                className="w-4 md:w-3"
              />
              Amina Muadi
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                value={"Stella Kids"}
                onChange={toggleName}
                className="w-4 md:w-3"
              />
              Stella Kids
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                value={"Mini Rodini"}
                onChange={toggleName}
                className="w-4 md:w-3"
              />
              Mini Rodini
            </p>
            <p className="flex gap-2">
              
              <input
                type="checkbox"
                value={"Valentino"}
                onChange={toggleName}
                className="w-4 md:w-3"
              />
              Valentino
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                value={"KENZO"}
                onChange={toggleName}
                className="w-4 md:w-3"
              />
              KENZO
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                value={"Les Tien"}
                onChange={toggleName}
                className="w-4 md:w-3"
              />
              Les Tien
            </p>
            <p className="flex gap-2">
              
              <input
                type="checkbox"
                value={"Balenciaga"}
                onChange={toggleName}
                className="w-4 md:w-3"
              />
              Balenciaga
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                value={"Off White"}
                onChange={toggleName}
                className="w-4 md:w-3"
              />
              Off-white
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                value={"Mugler"}
                onChange={toggleName}
                className="w-4 md:w-3"
              />
              Mugler
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                value={"Molo"}
                onChange={toggleName}
                className="w-4 md:w-3"
              />
              Molo
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                value={"Adidas Yeezy"}
                onChange={toggleName}
                className="w-4 md:w-3"
              />
              Adidas Yeezy
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                value={"Bobo Choses"}
                onChange={toggleName}
                className="w-4 md:w-3"
              />
              Bobo Choses
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                value={"VEJA Kids"}
                onChange={toggleName}
                className="w-4 md:w-3"
              />
              VEJA Kids
            </p>
          </div>
        </div>
      </div>

      {/* right */}
      <div className="flex-1">
        <div className="uppercase flex justify-between text-[base] sm:text-2xl mb-4">
          <Title  text1={"all"} text2={"collections"} />
          {/* product sort */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-1 sm:px-2 rounded"
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High </option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
        {/* map products */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Collection;


// ok
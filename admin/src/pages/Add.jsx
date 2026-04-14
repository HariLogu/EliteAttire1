import { assets } from "../assets/assets";
import { useState } from "react";
import axios from "axios";
import { backendURL } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const sizeList = [
    "XS",
    "S",
    "M",
    "L",
    "XL",
    "XXL",
    "14yrs",
    "16yrs",
    "2yrs",
    "3yrs",
    "4yrs",
    "5yrs",
    "6yrs",
    "29",
    "31",
    "32",
    "34",
    "36",
    "38",
    "40",
  ];
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("shoes");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [highlights, setHighlights] = useState([]);

  async function onSubmitHandler(e) {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", Number(price));
      formData.append("rating", Number(rating));
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("highlights", JSON.stringify(highlights));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        backendURL + "/api/product/add",
        formData,
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice("");
        // setRating("");
        // setHighlights("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full pl-2 gap-3 item-start mt-5 mx-5"
    >
      <div>
        <p className="capitalize mb-2">upload image</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <label htmlFor="image1">
            <img
              className="w-20"
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
              alt=""
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              hidden
            />
          </label>
          <label htmlFor="image2">
            <img
              className="w-20"
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
              alt=""
            />
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              id="image2"
              hidden
            />
          </label>
          <label htmlFor="image3">
            <img
              className="w-20"
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
              alt=""
            />
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              id="image3"
              hidden
            />
          </label>
          <label htmlFor="image4">
            <img
              className="w-20"
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
              alt=""
            />
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              id="image4"
              hidden
            />
          </label>
        </div>
      </div>

      <div className="w-full">
        <p className="capitalize">product name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          placeholder="Type here"
          required
          className="w-full max-w-[500px] px-3 py-2"
        />
      </div>
      <div className="w-full">
        <p className="capitalize">product description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          type="text"
          placeholder="Write Content here"
          required
          className="w-full max-w-[500px] px-3 py-2"
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div>
          <p className="capitalize">product category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            required
            value={category}
            name=""
            id=""
            className="px-3 py-2"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <p className="capitalize">sub category</p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            required
            value={subCategory}
            name=""
            id=""
            className="px-3 py-2"
          >
            <option value="shoes">Shoes</option>
            <option value="jacket">Jackets</option>
            <option value="dress">Dress</option>
            <option value="jeans">Jeans</option>
            <option value="short">Shorts</option>
            <option value="hoodie">Hoodie</option>
            <option value="tshirt">T Shirt</option>
            <option value="bag">Bags</option>
            <option value="suits">Suits</option>
          </select>
        </div>

        <div>
          <p className="capitalize">product price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            required
            value={price}
            type="number"
            placeholder="25"
            className="px-3 py-2"
          />
        </div>
      </div>

      <div className="w-full">
        <p className="capitalize mb-2">product highlights</p>

        {/* Input + Add */}
        <div className="flex-col w-1/2 md:flex-row flex gap-2">
          <input
            type="text"
            placeholder="Enter highlight"
            className="px-3 py-2 w-full max-w-[400px]"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                const value = e.target.value.trim();

                if (!value) return;
                if (highlights.includes(value)) return;
                if (highlights.length >= 6) return;

                setHighlights((prev) => [...prev, value]);
                e.target.value = "";
              }
            }}
          />

          <button
            type="button"
            onClick={(e) => {
              const input = e.currentTarget.previousSibling;
              const value = input.value.trim();

              if (!value) return;
              if (highlights.includes(value)) return;
              if (highlights.length >= 6) return;

              setHighlights((prev) => [...prev, value]);
              input.value = "";
            }}
            className="px-3 py-2 bg-black text-white rounded"
          >
            Add
          </button>
        </div>

        {/* Display */}
        <div className="flex flex-wrap gap-2 mt-3">
          {highlights.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-slate-200 px-3 py-1 rounded"
            >
              <p>{item}</p>
              <button
                type="button"
                onClick={() =>
                  setHighlights((prev) => prev.filter((_, i) => i !== index))
                }
                className="text-red-500"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="capitalize mb-2">product sizes</p>
        <div className="flex gap-3 flex-wrap">
          {sizeList.map((size) => (
            <div
              key={size}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes(size)
                    ? prev.filter((i) => i !== size)
                    : [...prev, size]
                )
              }
            >
              <p
                className={`px-3 py-1 cursor-pointer ${
                  sizes.includes(size) ? "bg-pink-300" : "bg-slate-200"
                } rounded text-sm`}
              >
                {size}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div>
          <p className="capitalize">product rating</p>
          <input
            onChange={(e) => setRating(e.target.value)}
            required
            value={rating}
            type="number"
            placeholder="4.5"
            className="px-3 py-2"
          />
        </div>
      <div className="flex items-center gap-2 mt-2">
        <input
          onChange={() => setBestseller((prev) => !prev)}
          checked={bestseller}
          type="checkbox"
          id="bestseller"
        />
        <label htmlFor="bestseller" className="cursor-pointer">
          Add to bestseller
        </label>
      </div>
      
      <button
        className="capitalize w-20 py-3 mt-4 bg-black text-white cursor-pointer rounded"
        type="submit"
      >
        add
      </button>
    </form>
  );
};
export default Add;

// update need like shoe sizes and subcategory

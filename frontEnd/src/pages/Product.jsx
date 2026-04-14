import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [desc, setDesc] = useState(true);
  const [review, setReview] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  async function fetchProductData() {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);

        return null;
      }
    });
  }

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  console.log("Products:", products);
console.log("Product ID:", productId);
  

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* product data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* product images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                alt=""
                className={`w-[24%] sm:w-2/3 sm:mb-3 border rounded  flex-shrink-0 cursor-pointer ${image===item?"scale-90 border-amber-400":"border-gray-300"}`}
              />
            ))}
          </div>
          {/* big image */}
          <div className="w-full sm:w-[80%]">
            <img
              src={image}
              alt=""
              className="w-full max-h-[500px] object-contain"
            />
          </div>
        </div>
        {/* product info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            {productData.rating}<img src={assets.star_icon} alt="" className="w-5 sm:w-3" />
            <p className="pl-2">{122} Reviews</p>
          </div>
          <p className="mt-5 text-3xl font-medium">{currency}{productData.price}</p>
          <p className="mt-5 text-gray-700 capitalize md:w-4/5">{productData.description}</p>
          <div className="flex flex-col gap-4 my-5">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item,index)=>(
                <button onClick={()=>setSize(item)} className={`border py-2 px-3 bg-gray-100 rounded ${item === size ? "border-orange-500":"" }`} key={index}>{item}</button>
              )) }
            </div>
          </div>
          <button onClick={()=>addToCart(productData._id,size)} className="bg-amber-400 text-black capitalize px-6 py-2 rounded text-sm active:bg-amber-200 cursor-pointer">add to cart</button>
          
          
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p className="capitalize">100% original product</p>
            <p className="capitalize">cash on delivery is available on this product</p>
            <p className="capitalize">easy return and exchange policy within 7 days.</p>
            <p className="text-lg capitalize text-black font-medium mt-5">highlights</p>
        
              <div className="flex gap-2 mt-2 flex-wrap ">
              {productData.highlights.map((i,idx)=>(
                  <p key={idx} className="capitalize border px-2 py-1 rounded text-[12px] text-black tracking-tighter">{i}</p>
              ))
            }
              </div>
              
            
          </div>
        </div>
      </div>
      {/* description and review */}
      <div className="mt-5 flex flex-col gap-2">
        <div className="flex gap-2 ">
          <p onClick={()=>{setDesc(true);setReview(false)}} className={`capitalize rounded border px-5 py-3 cursor-pointer text-sm  ${desc?"border-amber-600 font-semibold":""}`}>description</p>
          <p onClick={()=>{setDesc(false);setReview(true)}} className={`capitalize rounded border px-5 py-3 cursor-pointer text-sm ${review?"border-amber-600 font-semibold":""}`}>reviews (122)</p>
        </div>
        <div className={`${desc?"border-amber-600":""} ${review?"border-amber-600":""} flex rounded flex-col gap-4 border p-6 text-sm text-gray-500 `}>
          <div  className={`${desc?"block":"hidden"}`}>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse, illo? Quod cupiditate laborum quaerat dicta recusandae sunt explicabo quasi voluptate.</p>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse, illo? Quod cupiditate laborum quaerat dicta recusandae sunt explicabo quasi voluptate.</p>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse, illo? Quod cupiditate laborum quaerat dicta recusandae sunt explicabo quasi voluptate.</p>
          </div>

          <div  className={`${review?"block":"hidden"}`}>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse, illo? Quod cupiditate laborum quaerat dicta recusandae sunt explicabo quasi voluptate88888888888888.</p>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse, illo? Quod cupiditate laborum quaerat dicta recusandae sunt explicabo quasi voluptate.</p>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse, illo? Quod cupiditate laborum quaerat dicta recusandae sunt explicabo quasi voluptate.</p>
          </div>
        </div>

        
          
        
      </div>
      {/* display related products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};
export default Product;


// ok
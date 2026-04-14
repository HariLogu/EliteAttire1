import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import ProductItem from "./ProductItem";

const RelatedProducts = ({ category, subCategory }) => {
    const { products } = useContext(ShopContext);
    const [related, setRelated] = useState([]);

    useEffect(() => {
        if (products.length > 0) {
            let productCopy = products.slice();
            productCopy = productCopy.filter((item) => category === item.category);
            productCopy = productCopy.filter(
                (item) => subCategory === item.subCategory
            );

            setRelated(productCopy.slice(0, 5));
        }
    }, []);
    return (
        <div className="my-15">
            <div className="text-center text-2xl md:text-3xl py-2 uppercase">
                <Title text1={"related"} text2={"products"} />
            </div>
            <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 gap-y-6">
                {related.map((item, index) => (
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
    );
};
export default RelatedProducts;


// ok

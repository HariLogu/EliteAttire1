import productModel from "../models/productModels.js";
import { v2 as cloudinary } from "cloudinary"
import mongoose from "mongoose"

// addproduct
export async function addProduct(req, res) {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller, highlights ,rating} = req.body;

        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter((i) => i !== undefined)

        // remaining
        let imagesUrl = await Promise.all(
            images.map(async (image) => {
                let result = await cloudinary.uploader.upload(image.path, { resource_type: "image" });
                return result.secure_url;
            })
        )

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === "true" ? true : false,
            sizes: JSON.parse(sizes),
            highlights: JSON.parse(highlights),
            image: imagesUrl,
            rating:Number(rating),
            date: Date.now()
        }

        console.log(productData);
        const product = new productModel(productData);
        await product.save()

        res.json({ success: true, message: "Product Added" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

//list product
export async function listProducts(req, res) {
    try{
        const products = await productModel.find({});
        if (products.length > 0) res.status(200).json({ success: true, products });
        else res.json({ success: false, message: "Product List is Empty" });
    }catch(error){
        console.log(error);
        res.json({ success: false, message: error.message })
    }
    
    
}

// removeproduct
export async function removeProduct(req, res) {
    try {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(400).json({
                success:false,
                message:"Invalid Product Id"
            })
        }
        const product = await productModel.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, message: "product not found" });
        }
        else {
            res.status(200).json({ success: true, message: "product deleted successfully" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// getSingle
export async function getSingleProduct(req, res) {
    try {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(400).json({
                success:false,
                message:"Invalid Product Id"
            })
        }
        
        const product = await productModel.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, message: "product not found" });
        }
        else {
            res.status(200).json({ success: true, product });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

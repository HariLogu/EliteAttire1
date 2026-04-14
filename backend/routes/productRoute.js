// import express from "express";
// import {
//   addProduct,
//   getSingleProduct,
//   listProducts,
//   removeProduct,
// } from "../controllers/productController.js";
// import upload from "../middlewares/multer.js";
// import adminAuth from "../middlewares/adminAuth.js";

// const productRouter = express.Router();

// productRouter.post("/add", adminAuth, upload.fields([
//   { name: "image1", maxCount: 1 },
//   { name: "image2", maxCount: 1 },
//   { name: "image3", maxCount: 1 },
//   { name: "image4", maxCount: 1 }
// ]), addProduct);

// productRouter.delete("/remove/:id", adminAuth, removeProduct);

// productRouter.route("/getsingle/:id").get(getSingleProduct);

// productRouter.route("/products").get(listProducts);

// export default productRouter;



import express from "express";
import {
  addProduct,
  getSingleProduct,
  listProducts,
  removeProduct,
} from "../controllers/productController.js";
import upload from "../middlewares/multer.js";
import adminAuth from "../middlewares/adminAuth.js";

const productRouter = express.Router();

productRouter.post("/add",adminAuth,upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 }
  ]),addProduct);

productRouter.delete("/remove/:id",adminAuth, removeProduct);

productRouter.get("/getsingle/:id",getSingleProduct);

productRouter.get("/products",listProducts);

export default productRouter;




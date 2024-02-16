import express from "express";

import {
  createProducts,
  getProducts,
  singleProducts,
  deleteProducts,
  updateProducts,
  searchProducts,
} from "../../controllers/providers/Items.js";
import { VerifyToken } from "../../middlewares/jwt.js";

const router = express.Router();

router.post("/postproducts", VerifyToken, createProducts);
router.get("/getproducts/:sortby?", getProducts);
router.get("/singleproduct/:id", VerifyToken, singleProducts);
router.delete("/deleteproduct/:id", VerifyToken, deleteProducts);
router.put("/updateproducts/:id", VerifyToken, updateProducts);
// Search endpoint
router.get("/searchproducts/:searchTerm", VerifyToken, searchProducts);
// router.get("/filteredproducts/:sortby", VerifyToken, getFilteredProducts);

export default router;

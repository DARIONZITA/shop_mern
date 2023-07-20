import { Router } from "express" ;


// controllers
import {
  createProduct,
  readProducts,
  readProduct,
  updateProduct,
  updateCategory,
  deleteProduct,
} from "../controllers/productController.js";

import { requireAuth } from "../middleware/requireAuth.js";


import { adminAuth } from "../middleware/adminAuth.js";


const router = Router();

// run this middleware function before the crud operations below
// we need to protect those routes below
// they have to be authenticated first before they can do all of crud below
//router.use(requireAuth);

// CRUD ////////////////////////
// CREATE
router.post("/",adminAuth, createProduct);

// READ ALL
router.get("/", readProducts);

// READ ONE
router.get("/:id", readProduct);

// UPDATE
router.patch("/:id",adminAuth, updateProduct);

router.patch("/addCategory/:id", updateCategory);

// DELETE
router.delete("/:id",adminAuth, deleteProduct);


//getporcategorias
//getpor preço
//

export default router;

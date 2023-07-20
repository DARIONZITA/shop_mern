import { Router } from "express" ;
// controllers
import { adminSignup, adminLogin } from "../controllers/adminController.js"
import { adminAuth } from "../middleware/adminAuth.js";

const router = Router();

// SIGNUP
router.post("/signup",adminAuth, adminSignup);

// LOGIN
router.post("/login", adminLogin);

export default router;

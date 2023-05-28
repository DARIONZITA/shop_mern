import { Router } from "express" ;
// controllers
import { adminSignup, adminLogin } from "../controllers/adminController.js"

const router = Router();

// SIGNUP
router.post("/signup", adminSignup);

// LOGIN
router.post("/login", adminLogin);

export default router;

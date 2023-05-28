import { Router } from "express" ;

// controllers
import {
  customerSignup,
  customerLogin,
} from "../controllers/customerController.js";

const router = Router();

// SIGNUP
router.post("/signup", customerSignup);

// LOGIN
router.post("/login", customerLogin);

export default router;

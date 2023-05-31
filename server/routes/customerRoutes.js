import { Router } from "express" ;

// controllers
import {
  customerSignup,
  customerSignupConfirm,
  customerLogin,
} from "../controllers/customerController.js";

const router = Router();

// SIGNUP

router.post("/signup",customerSignupConfirm)
router.post("/signup/verifyEmail", customerSignup);
// LOGIN
router.post("/login", customerLogin);

export default router;

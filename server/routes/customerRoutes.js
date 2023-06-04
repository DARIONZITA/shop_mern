import { Router } from "express" ;

// controllers
import {
  customerSignup,
  customerSignupConfirm,
  customerLogin,
  customerUpadate
} from "../controllers/customerController.js";
import { requireAuth } from "../middleware/requireAuth.js";
const router = Router();

// SIGNUP

router.post("/signup",customerSignupConfirm)
router.post("/signup/verifyEmail", customerSignup);
// LOGIN
router.post("/login", customerLogin);

router.use(requireAuth);
//UPDATE
router.patch('/update',customerUpadate)
export default router;

import { Router } from "express" ;

// controllers
import {
  customerSignup,
  customerSignupConfirm,
  customerLogin,
  customerUpadate,
  MyOrders
} from "../controllers/customerController.js";
import { requireAuth } from "../middleware/requireAuth.js";
const router = Router();

// SIGNUP

router.post("/signup/verifyEmail",customerSignupConfirm)
router.post("/signup", customerSignup);
// LOGIN
router.post("/login", customerLogin);

//UPDATE
router.patch('/update',requireAuth,customerUpadate)
router.get('/myOrders',requireAuth,MyOrders)
export default router;

import { Router } from "express" ;

import {
    createOrder,
    getAllOrders,
    changeIsDone,
    cancelOrder
} from "../controllers/oders.controller.js"
import {requireAuth} from "../middleware/requireAuth.js"
import { adminAuth } from "../middleware/adminAuth.js";
import { orderAuth } from "../middleware/order.middleware.js";

const router = Router();
router.post('/create',requireAuth,createOrder)
router.get("/getAll",adminAuth,getAllOrders)
router.patch("/done/:idOrder",adminAuth,changeIsDone)
router.delete("/cancel/:idOrder",orderAuth,cancelOrder)
//router.post("/signup/verifyEmail", customerSignup);
// LOGIN
//router.post("/login", customerLogin);
//all undone
//all done
//search
//change done
//getall paginação
//done/undone


export default router
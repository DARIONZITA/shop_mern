import { Router } from "express" ;

import {
    createOrder,
    getAllOrders,
    changeIsDone,
    cancelOrder
} from "../controllers/oders.controller.js"
import {requireAuth} from "../middleware/requireAuth.js"

const router = Router();
router.post('/create',requireAuth,createOrder)
router.get("/getAll",getAllOrders)
router.patch("/done/:idOrder",changeIsDone)
router.delete("/cancel/:idOrder",cancelOrder)
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
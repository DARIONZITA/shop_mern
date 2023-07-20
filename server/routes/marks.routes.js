import { Router } from "express" ;

import {
    addMark,
    getMarks,
    removeMark
} from "../controllers/mark.controller.js"
import {requireAuth} from "../middleware/requireAuth.js"
import { adminAuth } from "../middleware/adminAuth.js";

const router = Router();
    router.post('/add',adminAuth,addMark)
router.get("/getAll",getMarks)
router.delete("/cancel/:idMarker",adminAuth,removeMark)


export default router
import { Router } from "express" ;

import {
    addMark,
    getMarks,
    removeMark
} from "../controllers/mark.controller.js"
import {requireAuth} from "../middleware/requireAuth.js"

const router = Router();
router.post('/add',addMark)
router.get("/getAll",getMarks)
router.delete("/cancel/:idMarker",removeMark)


export default router
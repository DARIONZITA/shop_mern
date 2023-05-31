import { Router } from "express" ;

const router = Router();

router.get("/getAll",getAll)
router.post("/signup/verifyEmail", customerSignup);
// LOGIN
router.post("/login", customerLogin);
//all undone
//all done
//search
//change done
//

export default router
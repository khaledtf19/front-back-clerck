import 'dotenv/config'
import { Router } from 'express';

import user from "./user"
import post from "./post"
const router = Router();

router.use("/user", user)
router.use("/post", post)

export default router;

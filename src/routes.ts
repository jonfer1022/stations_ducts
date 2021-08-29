import { Router } from "express";
import progressWorks from "./resolvers/progressWorks.resolver";

const router = Router();

router.route('/getTableProgressWorks').get(progressWorks.getTableProgressWorks);

export default router;
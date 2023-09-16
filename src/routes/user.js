import express from "express";
import * as CT from "../controllers";
const router = express.Router();
router.post("/register", CT.registerCT);
router.post("/login", CT.login);

export default router;

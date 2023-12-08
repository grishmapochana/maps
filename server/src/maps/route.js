import { Router } from "express";
import * as controller from "./controller.js";

const router = Router();
router.get("/", controller.getCities);
router.post("/shortestPath", controller.shortestPath);

export default router;

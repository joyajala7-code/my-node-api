import { Router } from "express";
import {  getHome, getAbout,getGoals } from "../controller/userController.js";

const router = Router();

router.get('/', getHome).get('/about', getAbout).get('/goals', getGoals);

export default router;
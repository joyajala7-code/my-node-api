import { Router } from "express";
import {  getHome, getAbout, getGoals, postUser, Login, getAllUsers, getSingleUser,deleteSingle, logout} from "../controller/userController.js";
import { checkToken } from "../middlewares/authMiddleware.js";


const router = Router();

router.get('/', getHome).get('/about', getAbout).get('/goals', getGoals).post('/post-user', postUser).post('/login', Login).get('/users', checkToken, getAllUsers).get('/user/:id', checkToken, getSingleUser).delete('/delete-user/:id', deleteSingle).get('/logout', logout);
export default router;
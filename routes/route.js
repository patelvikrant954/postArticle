import express from "express";
import {  invalidUrl, login, register, updateUser } from "../controller/user-controller.js";
import { postArticle,getArticles,} from "../controller/article-controller.js";
import authMiddleware from "../middleware/authMiddleware.js";
const route=express.Router();

route.post('/login',login)
route.post('/register',register)
route.patch('/users/:userid',authMiddleware ,updateUser)
route.post('/users/:userid/article', authMiddleware,postArticle)
route.get('/articles', authMiddleware,getArticles)
route.get('*',invalidUrl)


export default route;
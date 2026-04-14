import express from "express";
import {loginUser,registerUser,adminLogin,getUsers} from "../controllers/userController.js"

const UserRouter=express.Router();

UserRouter.post("/login",loginUser);
UserRouter.post("/register",registerUser);
UserRouter.post("/admin",adminLogin);
UserRouter.get("/users",getUsers);

export default UserRouter;
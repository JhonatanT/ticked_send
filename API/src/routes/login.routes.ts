import { Router } from "express";
import { LoginController } from "../controller/Login/LoginController";

const login = Router()

const loginController = new LoginController();

login.post("/",loginController.handle)

export {login}
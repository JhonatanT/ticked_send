import { Router } from "express";
import { SendEmailController } from "../controller/Email/SendEmailController";

const sendEmail = Router()

const sendEmailController = new SendEmailController();

sendEmail.post("/",sendEmailController.handle)

export {sendEmail}
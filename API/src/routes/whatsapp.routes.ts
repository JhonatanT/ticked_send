import { Router } from "express";
import { SendWhatsappController } from "../controller/Whatsapp/SendWhatsappController";

const sendWhatsapp = Router()

const sendWhatsappController = new SendWhatsappController();

sendWhatsapp.post("/",sendWhatsappController.handle)

export {sendWhatsapp}
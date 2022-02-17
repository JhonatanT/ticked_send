import { Router } from "express";
import { SaveController } from "../controller/Save/SaveController";

const saveArquivo = Router()

const saveController = new SaveController();

saveArquivo.post("/",saveController.handle)

export {saveArquivo}
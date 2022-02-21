import { Router } from "express";
import { UploadController } from "../controller/Upload/UploadController";

const uploads = Router()

const uploadController = new UploadController();

uploads.post("/",uploadController.handle)

export {uploads}
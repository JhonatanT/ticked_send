import { Router } from "express";
import multer from "multer";
import { saveArquivo } from "./save.routes";
import { sendEmail } from "./sendEmail.routes";
import { sendWhatsapp } from "./whatsapp.routes";
import { login } from "./login.routes";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./Email/.rar");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
})

const upload = multer({storage})

const router = Router();

router.use("/login", login)

router.use("/saveArquivo", ensureAuthenticated, upload.single("file"), saveArquivo)
router.use("/sendEmail", ensureAuthenticated, sendEmail)
router.use("/sendWhatsapp", ensureAuthenticated, sendWhatsapp)

export { router}
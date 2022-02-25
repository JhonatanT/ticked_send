import express, { Request, Response, NextFunction } from "express";
import "express-async-errors"
import cors from "cors"
import http from "http"
import { router } from "./routes"
import qrcode from 'qrcode-terminal'
const {Client} = require('whatsapp-web.js');

const app = express()

app.use(cors())

app.use(express.json())

app.use(router)

app.post('/test', async (req, res) => {
})

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    //verificando se o erro é uma instancia da classe Error se for retorna um Status
    if (err instanceof Error) {
        return response.status(400).json({
            error: err.message
        });
    }
    return response.status(500).json({
        status: "error",
        message: "erro interno"
    });
})

const client = new Client();

client.on('qr', (qr: any) => {
    console.log(qr);
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

//client.initialize();

const serverHttp = http.createServer(app)

export {serverHttp,client}
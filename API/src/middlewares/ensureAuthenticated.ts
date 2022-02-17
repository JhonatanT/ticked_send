import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"

interface IPayload {
    sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction){

    const authToken = request.headers.authorization;

    if (!authToken) {
        return response.status(401).json({ message: "token invalid" });
    }

    const [, token] = authToken.split(" ");

    try {
        const { sub } = verify(token, "c094a4ad8a548c26dd6957247edde900") as IPayload;
        
        request.user_id = sub;

        return next();
    }
    catch (err) {
        console.log('token não autorizado');
        return response.status(401).json({ message: "token não autorizado" });
    }
}
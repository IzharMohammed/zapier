import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import { jwtPassword } from "../router/user";

export const authMiddleWare = (req: Request, res: Response, next: NextFunction): void | Promise<void> => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({ message: "Unauthorized: No token provided" });
            return
        }

        const token = authHeader.split(" ")[1];

        console.log(`token:-${token}`);

        const decoded = jwt.verify(token, jwtPassword) as { userId: number };
        //@ts-ignore
        req.userId = decoded.userId;
        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            throw new Error("Invalid token");
        }
        next(error);
    }
}


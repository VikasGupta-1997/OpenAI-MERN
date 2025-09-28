
import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { COOKIE_NAME } from './constants';

export const createToken = (id: string, email: string, expiresIn: string) => {
    const payload = { id,email }
    const secret = process.env.JWT_SECRET as string;
    if (!secret) {
        throw new Error("JWT_SECRET is not defined");
    }
    const token = jwt.sign(payload, secret , { expiresIn })
    return token
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.signedCookies[`${COOKIE_NAME}`]
    if(!token || token.trim() == ""){
        return res.status(401).json({message: "Token Expired"})
    }
    return new Promise<void>((resolve, reject) => {
        return jwt.verify( token, process.env.JWT_SECRET, (err, success) => {
            if(err){
                reject(err.message);
                return res.status(401).json({message: "Token Expired"})
            } else {
                resolve()
                res.locals.jwtData = success
                return next()
            }
        })
    })
}

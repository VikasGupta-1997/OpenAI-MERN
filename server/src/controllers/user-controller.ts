import { Request, Response, NextFunction } from 'express'
import { hash, compare } from 'bcrypt'

import User from '../models/User'
import { createToken } from '../utils/token-manager';
import { COOKIE_NAME } from '../utils/constants';

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.find();
        return res.status(200).json({ message: "ok", users })
    } catch(err){
        console.log(err)
        return res.status(200).json({ message: "ok", cause: err.message })
    }
}

export const userSignup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password } = req.body
        const hashedPassword = await hash(password, 10)
        const user = new User({ name, email, password: hashedPassword })
        await user.save()
        res.clearCookie(COOKIE_NAME, {
            path: "/", 
            domain: "localhost", 
            httpOnly: true, 
            signed: true 
        })
        const token = createToken(user._id.toString(), user.email, "7d")
        const expires = new Date();
        expires.setDate(expires.getDate() + 7)
        res.cookie(COOKIE_NAME, token, { 
            path: "/", 
            domain: "localhost", 
            expires, 
            httpOnly: true, 
            signed: true 
        })
        return res.status(200).json({ message: "ok", user })
    } catch(err){
        console.log(err)
        return res.status(200).json({ message: "ok", cause: err.message })
    }
}

export const userLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({email})
        if(!user){
            return res.status(401).send("User not registered!")
        }
        const isPasswordCorrect = await compare(password, user.password)
        if(!isPasswordCorrect){
            return res.status(403).send("Incorrect Password!")
        }
        res.clearCookie(COOKIE_NAME, {
            path: "/", 
            domain: "localhost", 
            httpOnly: true, 
            signed: true 
        })
        const token = createToken(user._id.toString(), user.email, "7d")
        const expires = new Date();
        expires.setDate(expires.getDate() + 7)
        res.cookie(COOKIE_NAME, token, { 
            path: "/", 
            domain: "localhost", 
            expires, 
            httpOnly: true, 
            signed: true 
        })
        return res.status(200).json({ message: "ok", user })
    } catch(err){
        console.log(err)
        return res.status(200).json({ message: "ok", cause: err.message })
    }
}


export const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findById(res.locals.jwtData.id)
        if(!user){
            return res.status(401).send("User not registered Or Token malfunctioned")
        }
        console.log("USEr==>", user.name, user._id)
        console.log("es.locals.jwtData==>", res.locals.jwtData)
        if(user._id.toString() !== res.locals.jwtData.id){
            return res.status(401).send("Permissions didnt match")
        }
        
        return res.status(200).json({ message: "ok", user })
    } catch(err){
        console.log(err)
        return res.status(200).json({ message: "ok", cause: err.message })
    }
}

export const userLogout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }

    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "localhost",
      signed: true,
      path: "/",
    });

    return res
      .status(200)
      .json({ message: "OK", name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};
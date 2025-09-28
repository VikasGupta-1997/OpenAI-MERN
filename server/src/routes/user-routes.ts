import { Router } from 'express'
import {
    getAllUsers,
    userSignup,
    userLogin,
    verifyUser,
    userLogout
} from "../controllers/user-controller"
import {
    validate,
    signupValidator
} from '../utils/validator'
import { verifyToken } from '../utils/token-manager'

const userRouter = Router()

userRouter.get('/', getAllUsers)
userRouter.post('/signup', validate(signupValidator), userSignup)
userRouter.post('/login', userLogin)
userRouter.get('/auth-status', verifyToken, verifyUser)
userRouter.get("/logout", verifyToken, userLogout);

export default userRouter
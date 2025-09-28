import { Router } from 'express'
import { verifyToken } from '../utils/token-manager'
import { generateChatCompletion, sendChatsToUser } from '../controllers/chats-controllers'

const chatRouter = Router()
chatRouter.post("/new", verifyToken, generateChatCompletion)
chatRouter.get("/all-chats", verifyToken, sendChatsToUser)


export default chatRouter
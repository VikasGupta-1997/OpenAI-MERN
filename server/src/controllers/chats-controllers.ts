import { Request, Response, NextFunction } from 'express'
import User from '../models/User'
import { OpenAI } from 'openai'

export const generateChatCompletion = async (req: Request, res: Response, next: NextFunction) => {
    const { message } = req.body
    try {
        const user = await User.findById(res.locals.jwtData.id)
        if (!user) {
            return res.status(401).send("User not registered Or Token malfunctioned")
        }
        const chats = user.chats.map(({ role, content }) => ({ role: role as "system" | "user" | "assistant", content }))
        chats.push({ content: message, role: "user" })
        user.chats.push({ content: message, role: "user" })
        const newopenAi = new OpenAI({
            apiKey: process.env.OPEN_AI_SECRET,
            organization: process.env.OPEN_AI_ORGANIZATION_ID
        });
        const chatResponse = await newopenAi.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: chats
        })
        const answer = chatResponse.choices[0].message.content as any;
        console.log("Answerr", JSON.stringify(answer))
        user.chats.push({
            role: "assistant",
            content: answer || ""
        });
        await user.save()
        return res.status(200).json({ chats: user.chats })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Something Went Wrong: " + err.message })
    }

}

export const sendChatsToUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findById(res.locals.jwtData.id)
        if (!user) {
            return res.status(401).send("User not registered Or Token malfunctioned")
        }
        
        return res.status(200).json({ chats: user.chats })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Something Went Wrong: " + err.message })
    }

}
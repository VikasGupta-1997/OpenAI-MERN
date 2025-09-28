import express from "express"
import cors from 'cors'
import { config } from 'dotenv'
import morgan from 'morgan'
import appRouter from "./routes"
import cookieParser from "cookie-parser"

config()

const app = express()

app.use(cors({ origin: 'http://localhost:5173', credentials:true }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//cookie-parser
app.use(cookieParser(process.env.COOKIE_SECRET))
//remove from production
app.use(morgan('dev'))

//Routes
app.use("/api/v1", appRouter)

export default app
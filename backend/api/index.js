import express, { json } from "express"
import { config as configDotenv } from "dotenv"
import connectDB from "./config/db.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import apiRouter from "./routes/apiRouter.js"

configDotenv()

const app = express()

app.disable('X-powered-by')
connectDB()

app.use(json())
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true
  })
)
app.use(cookieParser())

app.use('/api', apiRouter);

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})

export default app
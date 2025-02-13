import { configDotenv } from 'dotenv'
import jwt from 'jsonwebtoken'

export const auth = (req, res, next) => {
  configDotenv()
  const TOKEN_SECRET = process.env.TOKEN_SECRET

  try {
    const token = req.cookies?.token

    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' })
    }

    const user = jwt.verify(token, TOKEN_SECRET)
    req.user = user
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' })
  }
}

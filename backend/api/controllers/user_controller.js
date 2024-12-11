import User from '../models/user_model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { createAccessToken } from '../utils.js'
import { config as configDotenv } from "dotenv"

configDotenv()
const TOKEN_SECRET = process.env.TOKEN_SECRET

export const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      userName,
      email,
      password: passwordHash
    });

    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved._id });

    res.cookie('token', token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
    });

    res.status(201).json({ message: 'User registered successfully', user: newUser, token });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
}


export const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const userFound = await User.findOne({ email })

    if (!userFound) {
      return res.status(400).json({ message: 'The email does not exist' })
    }

    const isMatch = await bcrypt.compare(password, userFound.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'The password is incorrect' })
    }

    const token = await createAccessToken({ id: userFound._id })
    res.cookie('token', token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    })

    res.status(200).json({
      id: userFound._id,
      userName: userFound.userName,
      email: userFound.email
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const verifyToken = async (req, res) => {
  const { token } = req.cookies
  if (!token) return res.status(401).json({ message: 'No token provided' })

  jwt.verify(token, TOKEN_SECRET, async (error, user) => {
    if (error) return res.status(401).json({ message: 'Unauthorized' })

    const userFound = await User.findById(user.id)
    if (!userFound) return res.status(404).json({ message: 'User not found' })

    return res.status(200).json({
      id: userFound._id,
      username: userFound.userName,
      email: userFound.email
    })
  })
}

export const logout = async (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(0)
  })
  return res.status(200).json({ message: 'Sesión cerrada exitosamente' })
}

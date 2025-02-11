import User from '../models/user_model.js'
import Board from '../models/board_model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { createAccessToken } from '../utils.js'
import { config as configDotenv } from "dotenv"
import List from '../models/list_model.js'
import Card from '../models/card_model.js'
import { promisify } from 'util'

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
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
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
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'lax' : 'lax',
      credetials: true
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
  try {
    const { token } = req.cookies
    if (!token) return res.status(401).json({ message: 'No token provided' })

    // Convertimos jwt.verify en una promesa para poder usar await
    const decoded = await promisify(jwt.verify)(token, TOKEN_SECRET)

    const userFound = await User.findById(decoded.id)
    if (!userFound) return res.status(404).json({ message: 'User not found' })

    return res.status(200).json({
      id: userFound._id,
      userName: userFound.userName,
      email: userFound.email
    })
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
}

export const logout = async (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(0)
  })
  return res.status(200).json({ message: 'Sesión cerrada exitosamente' })
}

export const deleteUserAccount = async (req, res) => {
  const { id } = req.user; // Asumiendo que el ID del usuario está en `req.user` tras autenticación.
  console.log('req.user.id:', id);

  try {
    // Verificar si el usuario existe
    const userFound = await User.findById(id);
    console.log('userFound:', userFound);
    if (!userFound) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    // Obtener boards asociados al usuario
    const boards = await Board.find({ createdBy: id });
    console.log('Boards found:', boards);

    for (const board of boards) {
      console.log('Processing board:', board._id);

      // Obtener listas asociadas al board
      const lists = await List.find({ board: board._id });
      console.log(`Lists for board ${board._id}:`, lists);

      for (const list of lists) {
        console.log('Processing list:', list._id);

        // Obtener cards asociadas a la lista
        const cards = await Card.find({ board: board._id, list: list._id });
        console.log(`Cards for list ${list._id}:`, cards);

        // Eliminar todas las cards asociadas a la lista
        if (cards.length > 0) {
          console.log(`Deleting ${cards.length} cards for list ${list._id}`);
          await Card.deleteMany({ board: board._id, list: list._id });
        } else {
          console.log(`No cards found for list ${list._id}`);
        }
      }

      // Eliminar todas las listas asociadas al board
      if (lists.length > 0) {
        console.log(`Deleting ${lists.length} lists for board ${board._id}`);
        await List.deleteMany({ board: board._id });
      } else {
        console.log(`No lists found for board ${board._id}`);
      }
    }

    // Eliminar los boards
    if (boards.length > 0) {
      console.log(`Deleting ${boards.length} boards for user ${id}`);
      await Board.deleteMany({ createdBy: id });
    } else {
      console.log(`No boards found for user ${id}`);
    }

    // Eliminar el usuario
    console.log('Deleting user:', id);
    await User.findByIdAndDelete(id);

    res.status(200).json({ message: 'User account and related data deleted successfully' });
  } catch (error) {
    console.error('Error during account deletion:', error);
    res.status(500).json({ message: 'Error deleting user account', error: error.message });
  }
};


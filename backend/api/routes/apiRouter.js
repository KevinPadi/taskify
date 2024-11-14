// api/routes/apiRouter.js
import { Router } from 'express';
import {
  createBoard,
  getBoards,
  updateBoard,
  deleteBoard,
} from '../controllers/board_controller.js';
import {
  createList,
  getLists,
  updateList,
  deleteList,
} from '../controllers/list_controller.js';
import {
  getCards,
  updateCard,
  createCard,
  deleteCard,
} from '../controllers/card_controller.js';
import {
  registerUser,
  login,
  verifyToken,
  logout,
} from '../controllers/user_controller.js';
import { auth } from '../middlewares/auth_middleware.js';
import { validateSchema } from '../middlewares/validator_middleware.js';
import boardSchema from '../Schemas/boardSchema.js';
import listSchema from '../Schemas/listSchema.js';
import cardSchema from '../Schemas/cardSchema.js';
import { registerSchema, loginSchema } from '../Schemas/userSchema.js';

const apiRouter = Router();

// Rutas de autenticación
apiRouter.post('/register', validateSchema(registerSchema), registerUser);
apiRouter.post('/login', validateSchema(loginSchema), login);
apiRouter.get('/verify', verifyToken);
apiRouter.post('/logout', logout);

// Rutas de tableros
apiRouter.get('/board', auth, getBoards);
apiRouter.post('/board', auth, validateSchema(boardSchema), createBoard);
apiRouter.patch('/board/:id', auth, updateBoard);
apiRouter.delete('/board/:id', auth, deleteBoard);

// Rutas de listas
apiRouter.get('/list/:boardId', auth, getLists);
apiRouter.post('/list/:boardId', auth, validateSchema(listSchema), createList);
apiRouter.patch('/list/:boardId/:id', auth, updateList);
apiRouter.delete('/list/:boardId/:id', auth, deleteList);

// Rutas de cards
apiRouter.get('/card/:listId/:boardId', auth, getCards);
apiRouter.post('/card/:listId/:boardId', auth, validateSchema(cardSchema), createCard);
apiRouter.patch('/card/:listId/:boardId/:id', auth, updateCard);
apiRouter.delete('/card/:listId/:boardId/:id', auth, deleteCard);

export default apiRouter;

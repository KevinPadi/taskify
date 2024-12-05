import Card from '../models/card_model.js'
import Board from '../models/board_model.js'
import { ObjectId } from 'mongodb'

// get cards
export const getCards = async (req, res) => {
  try {
    const board = await Board.findOne({ _id: req.params.boardId, createdBy: req.user.id })
    if (!board) {
      return res.status(404).json({ message: 'Board not found' })
    }
    const cards = await Card.find({ board: req.params.boardId })
    res.status(200).json(cards)
  } catch (error) {
    console.error('Error fetching cards:', error)
    res.status(500).json({ message: 'Error fetching cards' })
  }
}

// create card
export const createCard = async (req, res) => {
  try {
    const { title, description, priority } = req.body

    if (!title) {
      return res.status(400).json({ message: 'Title is required' })
    }

    const boardExists = await Board.findOne({ _id: req.params.boardId, createdBy: req.user.id })
    if (!boardExists) {
      return res.status(404).json({ message: 'Board not found' })
    }

    const newCard = new Card({
      title,
      description,
      priority,
      list: req.params.listId,
      board: req.params.boardId,
      user: req.user.id
    })
    await newCard.save()
    res.status(201).json(newCard)
  } catch (error) {
    console.error('Error creating card:', error)
    res.status(400).json({ message: 'Error creating card' })
  }
}

// update card
export const updateCard = async (req, res) => {
  try {
    const { id } = req.params
    const { title, description, priority, list } = req.body

    const boardExists = await Board.findOne({ _id: req.params.boardId, createdBy: req.user.id })
    if (!boardExists) {
      return res.status(404).json({ message: 'Board not found' })
    }

    const card = await Card.findOne({ _id: id, board: req.params.boardId, user: req.user.id })
    if (!card) {
      return res.status(404).json({ message: 'Card not found' })
    }

    if (title !== undefined) card.title = title
    if (description !== undefined) card.description = description
    if (priority !== undefined) card.priority = priority
    if (list !== undefined) {
      const listid = new ObjectId(list)
      card.list = listid
    }

    await card.save()
    res.status(200).json(card)
  } catch (error) {
    console.error('Error updating card:', error)
    res.status(400).json({ message: 'Error updating card' })
  }
}

// delete card
export const deleteCard = async (req, res) => {
  try {
    const { id } = req.params

    const boardExists = await Board.findOne({ _id: req.params.boardId, createdBy: req.user.id })
    if (!boardExists) {
      return res.status(404).json({ message: 'Board not found' })
    }

    const deletedCard = await Card.findOneAndDelete({ _id: id, board: req.params.boardId, user: req.user.id })
    if (!deletedCard) {
      return res.status(404).json({ message: 'Card not found' })
    }
    return res.sendStatus(204)
  } catch (error) {
    console.error('Error deleting card:', error)
    res.status(500).json({ message: 'Error deleting card' })
  }
}

import Board from '../models/board_model.js'

// create board
export const createBoard = async (req, res) => {
  try {
    const { name } = req.body
    const newBoard = new Board({
      name,
      createdBy: req.user.id
    })
    await newBoard.save()
    res.status(201).json(newBoard)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// get user boards
export const getBoards = async (req, res) => {
  try {
    const boards = await Board.find({ createdBy: req.user.id })
    res.status(200).json(boards)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// update board
export const updateBoard = async (req, res) => {
  try {
    const { id } = req.params
    const { name } = req.body
    const updatedBoard = await Board.findOneAndUpdate(
      { _id: id, createdBy: req.user.id },
      { name },
      { new: true, runValidators: true }
    )
    if (!updatedBoard) {
      return res.status(404).json({ message: "Board not found" })
    }
    res.status(200).json(updatedBoard)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// delete board
export const deleteBoard = async (req, res) => {
  try {
    const { id } = req.params
    const deletedBoard = await Board.findOneAndDelete({ _id: id, createdBy: req.user.id })

    if (!deletedBoard) {
      return res.status(404).json({ message: 'Board not found' })
    }

    return res.sendStatus(204)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

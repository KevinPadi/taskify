import Board from '../models/board_model.js'
import List from '../models/list_model.js'
// create board
export const createBoard = async (req, res) => {
  try {
    const { name, background } = req.body
    const newBoard = new Board({
      name,
      background,
      createdBy: req.user.id
    })
    await newBoard.save()

    // Define las listas predefinidas
    const predefinedLists = ["Backlog", "To Do", "In Progress", "Done"]
    const lists = predefinedLists.map((name, index) => ({
      name,
      board: newBoard._id,
      order: index + 1, // El orden será 1, 2, 3, 4
    }))

    // Inserta las listas en la base de datos
    await List.insertMany(lists)

    res.status(201).json({ board: newBoard, lists })
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
    const { name, background } = req.body
    const updatedBoard = await Board.findOneAndUpdate(
      { _id: id, createdBy: req.user.id },
      { name, background },
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

    return res.status(200).json({ message: 'Board deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

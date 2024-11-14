import List from '../models/list_model.js'

// create list
export const createList = async (req, res) => {
  try {
    const { name } = req.body

    if (!req.params.boardId) {
      return res.status(400).json({ message: 'Board ID is required' })
    }

    const lastList = await List.findOne({ board: req.params.boardId }).sort('-order')
    const newOrder = lastList ? lastList.order + 1 : 1

    const newList = new List({
      name,
      board: req.params.boardId,
      order: newOrder
    })

    await newList.save()
    res.status(201).json(newList)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}


// get board Lists
export const getLists = async (req, res) => {
  try {
    const Lists = await List.find({ board: req.params.boardId })
    res.status(200).json(Lists)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// update List
export const updateList = async (req, res) => {
  try {
    const { id } = req.params
    const { name, order } = req.body
    const updatedList = await List.findOneAndUpdate(
      { _id: id, board: req.params.boardId },
      { name, order },
      { new: true, runValidators: true }
    )
    if (!updatedList) {
      return res.status(404).json({ message: "List not found" })
    }
    res.status(200).json(updatedList)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// delete List
export const deleteList = async (req, res) => {
  try {
    const { id } = req.params
    const deletedList = await List.findOneAndDelete({ _id: id, board: req.params.boardId })

    if (!deletedList) {
      return res.status(404).json({ message: 'List not found' })
    }

    return res.sendStatus(204)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

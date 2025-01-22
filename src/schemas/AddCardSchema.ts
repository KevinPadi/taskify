import z from 'zod'

export const addCardSchema = z.object({
  title: z.string().min(1, "Title is required"),
  priority: z.enum(["low", "medium", "high"]),
  content: z.string().optional(),
  id: z.string().optional(),
  board: z.string().optional(),
  column: z.string().optional()
})

export const editCardSchema = z.object({
  title: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]),
  // content: z.string().optional(),
  id: z.string().optional(),
  board: z.string().optional(),
  column: z.string().optional()
})
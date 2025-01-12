import z from 'zod'

export const addCardSchema = z.object({
  title: z.string().min(1, "Title is required"),
  priority: z.enum(["low", "medium", "high"]),
  id: z.string().optional(),
  board: z.string().optional(),
  column: z.string().optional()
});
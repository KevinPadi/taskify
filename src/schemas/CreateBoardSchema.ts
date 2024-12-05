import { z } from 'zod'

export const createBoardSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(1, {
    message: 'The board name must be at least 1 character'
  }).max(50, {
    message: 'The board name must not exceed 50 characters.'
  }),
  background: z.string().min(1, {
    message: 'Please select a background'
  })
})


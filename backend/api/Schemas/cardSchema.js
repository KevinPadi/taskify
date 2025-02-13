import { z } from 'zod'

const cardSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  priority: z.enum(['low', 'medium', 'high'], 'Invalid priority'),
})

export default cardSchema

import { z } from 'zod'

const boardSchema = z.object({
  name: z.string({
    required_error: 'Name is required'
  })
})

export default boardSchema
import { z } from 'zod';

const listSchema = z.object({
  name: z.string({
    required_error: 'Name is required'
  }).min(1, { message: 'Name is required' })
});

export default listSchema;

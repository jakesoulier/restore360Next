import { z } from 'zod'

export const createContactSchema = z.object({
    name: z.string().min(1, "Name is required bozo.").max(255),
    email: z.string().email("Invalid email address.").min(1, "Email is required."),
    description: z.string().min(1, "Description is required."),
});
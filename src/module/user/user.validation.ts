import { z } from 'zod';

const userValidationSchema = z.object({
    name: z
        .string({
            invalid_type_error: 'Name must be string',
        })
        .min(3, { message: 'Name must be at least 3 characters long' })
        .max(50, { message: 'Name must be at most 50 characters long' }),

    age: z
        .number({
            invalid_type_error: 'Age must be number',
        })
        .int()
        .positive({ message: 'Age must be a positive number' }),

    email: z
        .string({
            invalid_type_error: 'Email must be string',
        })
        .email({ message: 'Invalid email format' }),

    photo: z
        .string({
            invalid_type_error: 'Photo must be string',
        })
        .optional()
});

export const UserValidation = {
    userValidationSchema,
};
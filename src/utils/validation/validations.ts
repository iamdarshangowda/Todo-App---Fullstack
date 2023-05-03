import { z } from 'zod';

const REQUIRED_MESSAGE = 'This field is required';

const requiredString = z.string({
  required_error: REQUIRED_MESSAGE,
  invalid_type_error: 'This field should be type of string!',
});

export const signUpSchema = z
  .object({
    email: z.string(requiredString).email({ message: 'Invalid email!' }),
    username: z
      .string({ required_error: 'This field is required!' })
      .min(2, { message: 'This field is required!' }),
    password: z
      .string(requiredString)
      .min(6, { message: 'Password must be at least 6 characters!' }),
    repassword: z
      .string(requiredString)
      .min(6, { message: 'Password must be at least 6 characters!' }),
  })
  .superRefine(({ password, repassword }, ctx) => {
    if (password.trim() !== repassword.trim()) {
      ctx.addIssue({
        code: 'custom',
        message: 'Password did not match',
        path: ['repassword'],
      });
    }
  });

export const loginSchema = z.object({
  email: z.string(requiredString).email({ message: 'Invalid Email' }),
  password: z
    .string(requiredString)
    .min(6, { message: 'Password must be at least 6 characters!' }),
});

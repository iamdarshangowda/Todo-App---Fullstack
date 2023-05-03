import { z } from 'zod';
import { FormError } from '../types';

const parseZodError = (error: z.ZodError): Array<FormError> =>
  error.issues.map((error) => ({ field: `${error.path[0]}`, message: error.message }));

export default parseZodError;

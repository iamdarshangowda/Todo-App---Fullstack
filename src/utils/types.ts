import { HTMLAttributes, InputHTMLAttributes } from 'react';

export interface FormError {
  field: string;
  message: string;
}

export type InputAttributes = HTMLAttributes<HTMLInputElement> &
  InputHTMLAttributes<HTMLInputElement>;

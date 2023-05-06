import { FunctionComponent, HTMLAttributes, InputHTMLAttributes } from 'react';

export interface FormError {
  field: string;
  message: string;
}

export type InputAttributes = HTMLAttributes<HTMLInputElement> &
  InputHTMLAttributes<HTMLInputElement>;

export interface IMenu {
  icon: JSX.Element;
  label: string;
}

export type IMenuList = IMenu[];

export interface ISVGIocnProps {
  size?: number;
  stroke?: number;
}

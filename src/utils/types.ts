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
  route: string;
}

export type IMenuList = IMenu[];

export interface ISVGIocnProps {
  size?: number;
  stroke?: number;
}

export interface ISingleTask {
  title: string;
  due_date?: string;
  list_type?: string;
  description?: string;
  _id?: string;
}

export type TaskLists = ISingleTask[];

export interface ISuccessToast {
  show: boolean;
  message: string;
}

import React, { ChangeEvent, FormEvent, forwardRef, useState } from 'react';
import { useToggleContext } from '@context/useToggleContext';
import PrimaryButton from '@components/common/buttons/primaryButton';
import TextInput from '@components/common/inputs/textInput';
import TextButton from '@components/common/buttons/textButton';
import { Schema } from 'zod';
import { loginSchema } from '@utils/validation/validations';
import parseZodError from '@utils/validation/parsedZodErrors';
import { noAuthPost } from '../../config/axiosClient';
import { useRouter } from 'next/navigation';
import { useUIHelperContext } from '@context/useUIHelperContext';
import { useUserDataContext } from '@context/useUserContext';

const initialForm = {
  email: '',
  password: '',
};

const LoginForm = forwardRef<HTMLDivElement, {}>((_props, ref) => {
  const { setCurrentTab, setShowSuccessToast } = useToggleContext();
  const router = useRouter();
  const [userData, setUserData] = useState(initialForm);
  const [formError, setFormError] = useState(initialForm);
  const { loading, setLoading } = useUIHelperContext();
  const { setUserAuthData } = useUserDataContext();

  const handleFormOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const validateOnBlur = (value: string, name: string) => {
    if (!value.trim()) return;

    const result = loginSchema.safeParse({ ...userData, [name]: value });
    if (!result.success) {
      // If validation is not success set error message
      const parsedZodError = parseZodError(result.error);
      const formError = parsedZodError.find((type) => type.field === name);
      if (!formError) {
        setFormError((prev) => ({ ...prev, [name]: '' }));
      } else {
        setFormError((prev) => ({ ...prev, [name]: formError.message }));
      }
    } else {
      // Clear error message of previous state if validation is success
      setFormError((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const onBlur = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = event.target;
    validateOnBlur(value, name);
  };

  const loginValidation = (schema: Schema) => {
    const validate = schema.safeParse(userData);

    if (!validate.success) {
      const parseZodErrors = parseZodError(validate.error);

      for (let { field, message } of parseZodErrors) {
        setFormError((prev) => ({ ...prev, [field]: message }));
      }
      return true;
    }
  };

  const handleSignIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (loginValidation(loginSchema)) return;
    setFormError(initialForm);
    setLoading(true);

    try {
      await noAuthPost('user/login', userData).then((data) => {
        const token = data.data.accessToekn;
        localStorage.setItem('todoAuthToken', JSON.stringify(token));
        setUserAuthData(data.data.user);
        setShowSuccessToast({ show: true, message: data.data.message });
        router.replace('/tasks/today');
      });
    } catch (error: any) {
      // console.log(error.response.data.message);
      setFormError((prev) => ({ ...prev, password: error.response.data.message }));
      setLoading(false);
    }
  };

  const handleSignUp = () => {
    setCurrentTab(2);
  };

  return (
    <div className="max-w-lg w-full flex flex-col gap-4" ref={ref}>
      <h1 className="text-heading-1/h2 text-grey-0">Sign In</h1>
      <form onSubmit={handleSignIn}>
        <div className="flex flex-col gap-4">
          <TextInput
            type={'text'}
            placeholder={'Enter your email'}
            name={'email'}
            onChange={handleFormOnChange}
            autoComplete="username"
            onBlur={onBlur}
            error={formError.email}
          />
          <TextInput
            type={'password'}
            placeholder={'Enter your password'}
            name={'password'}
            onChange={handleFormOnChange}
            autoComplete="current-password"
            onBlur={onBlur}
            error={formError.password}
          />
          <PrimaryButton text="Sign in" type="submit" disable={loading} />
        </div>
      </form>
      <TextButton text="Don't have an account? Sign up" onClick={handleSignUp} />
    </div>
  );
});

LoginForm.displayName = 'LoginForm';
export default LoginForm;

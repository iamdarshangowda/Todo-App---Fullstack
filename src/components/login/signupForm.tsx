import PrimaryButton from '@components/common/buttons/primaryButton';
import TextButton from '@components/common/buttons/textButton';
import TextInput from '@components/common/inputs/textInput';
import { useToggleContext } from '@context/useToggleContext';
import React, { ChangeEvent, FormEvent, forwardRef, useState } from 'react';
import { noAuthPost } from '../../config/axiosClient';
import { useRouter } from 'next/navigation';
import { Schema } from 'zod';
import parseZodError from '@utils/validation/parsedZodErrors';
import { signUpSchema } from '@utils/validation/validations';
import { useUIHelperContext } from '@context/useUIHelperContext';
import { useUserDataContext } from '@context/useUserContext';

const initialForm = {
  username: '',
  email: '',
  password: '',
  repassword: '',
};

const SignupForm = forwardRef<HTMLDivElement, {}>((_props, ref) => {
  const { setCurrentTab } = useToggleContext();
  const router = useRouter();
  const [userData, setUserData] = useState(initialForm);
  const { loading, setLoading } = useUIHelperContext();
  const { setUserAuthData } = useUserDataContext();

  const [formError, setFormError] = useState(initialForm);

  const handleFormOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const validateOnBlur = (value: string, name: string) => {
    if (!value.trim()) return;

    const result = signUpSchema.safeParse({ ...userData, [name]: value });
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

  const inputValidation = (schema: Schema) => {
    const validate = schema.safeParse(userData);

    if (!validate.success) {
      const parsedZodErrors = parseZodError(validate.error);
      for (const { field, message } of parsedZodErrors) {
        setFormError((prev) => ({ ...prev, [field]: message }));
      }

      return true;
    }

    setFormError(initialForm);
    return false;
  };

  const handleSignUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputValidation(signUpSchema)) return;
    setLoading(true);

    const data = {
      username: userData.username,
      email: userData.email,
      password: userData.password,
    };

    try {
      await noAuthPost('user/signup', data).then((data) => {
        const token = data.data.accessToekn;
        localStorage.setItem('todoAuthToken', JSON.stringify(token));
        setUserAuthData(data.data.user);
        console.log(data.data);
        router.replace('/tasks/today');
      });
    } catch (error: any) {
      console.log(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = () => {
    setCurrentTab(1);
  };

  return (
    <div className="max-w-lg w-full flex flex-col gap-4" ref={ref}>
      <h1 className="text-heading-1/h2 text-grey-0 ">Sign Up</h1>
      <form onSubmit={handleSignUp}>
        <div className="flex flex-col gap-4">
          <TextInput
            type={'text'}
            placeholder={'Enter your email'}
            name={'email'}
            onChange={handleFormOnChange}
            disabled={loading}
            error={formError.email}
            onBlur={onBlur}
            value={userData.email}
            autoComplete="username"
          />
          <TextInput
            type={'text'}
            placeholder={'Enter your username'}
            name={'username'}
            onChange={handleFormOnChange}
            disabled={loading}
            error={formError.username}
            value={userData.username}
            onBlur={onBlur}
            autoComplete="name"
          />
          <TextInput
            type={'password'}
            placeholder={'Enter your password'}
            name={'password'}
            onChange={handleFormOnChange}
            disabled={loading}
            error={formError.password}
            value={userData.password}
            onBlur={onBlur}
            autoComplete="new-password"
          />
          <TextInput
            type={'password'}
            placeholder={'Re-enter your password'}
            name={'repassword'}
            onChange={handleFormOnChange}
            disabled={loading}
            error={formError.repassword}
            value={userData.repassword}
            onBlur={onBlur}
            autoComplete="new-password"
          />
          <PrimaryButton text="Sign up" type="submit" disable={loading} />
        </div>
      </form>
      <TextButton text="Already have an account? Sign in" onClick={handleSignIn} />
    </div>
  );
});

SignupForm.displayName = 'SignupForm';
export default SignupForm;

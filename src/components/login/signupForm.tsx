import PrimaryButton from '@components/common/buttons/primaryButton';
import TextButton from '@components/common/buttons/textButton';
import TextInput from '@components/common/inputs/textInput';
import { useTabContext } from '@context/tabToggleContext';
import React, { ChangeEvent, FormEvent, forwardRef, useState } from 'react';
import { noAuthPost } from '../../config/axiosClient';
import { useRouter } from 'next/navigation';
import { Schema } from 'zod';
import parseZodError from '../../utils/parsedZodErrors';
import { signUpSchema } from '../../utils/validations';

const initialForm = {
  username: '',
  email: '',
  password: '',
  repassword: '',
};

const SignupForm = forwardRef<HTMLDivElement, {}>((_props, ref) => {
  const { setCurrentTab } = useTabContext();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [userData, setUserData] = useState(initialForm);

  const [formError, setFormError] = useState(initialForm);

  const handleFormOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email: string) => {
    if (!email.trim()) return;

    const result = signUpSchema.safeParse({ ...userData, email });

    if (!result.success) {
      const parsedZodError = parseZodError(result.error);

      const emailError = parsedZodError.find((type) => type.field === 'email');
      if (!emailError) {
        setFormError((prev) => ({ ...prev, email: '' }));
      } else {
        setFormError((prev) => ({ ...prev, email: emailError.message }));
      }
    }
  };

  const onBlur = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = event.target;
    validateEmail(value);
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
        router.push('/dashboard');
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
      <h1 className="text-heading-1/h2 text-grey-90">Sign Up</h1>
      <form onSubmit={handleSignUp}>
        <div className="flex flex-col gap-6">
          <TextInput
            type={'text'}
            placeholder={'Enter your email'}
            name={'email'}
            onChange={handleFormOnChange}
            disabled={loading}
            error={formError.email}
            onBlur={onBlur}
            value={userData.email}
          />
          <TextInput
            type={'text'}
            placeholder={'Enter your username'}
            name={'username'}
            onChange={handleFormOnChange}
            disabled={loading}
            error={formError.username}
            value={userData.username}
          />
          <TextInput
            type={'password'}
            placeholder={'Enter your password'}
            name={'password'}
            onChange={handleFormOnChange}
            disabled={loading}
            error={formError.password}
            value={userData.password}
          />
          <TextInput
            type={'password'}
            placeholder={'Re-enter your password'}
            name={'repassword'}
            onChange={handleFormOnChange}
            disabled={loading}
            error={formError.repassword}
            value={userData.repassword}
          />
          <PrimaryButton text="Sign up" type="submit" />
        </div>
      </form>
      <TextButton text="Already have an account? Sign in" onClick={handleSignIn} />
    </div>
  );
});

SignupForm.displayName = 'SignupForm';
export default SignupForm;

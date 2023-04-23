import PrimaryButton from '@components/common/buttons/primaryButton';
import TextButton from '@components/common/buttons/textButton';
import TextInput from '@components/common/inputs/textInput';
import { useTabContext } from '@context/tabToggleContext';
import React, { FormEvent, forwardRef, useState } from 'react';
import { noAuthPost } from '../../config/axiosClient';

const SignupForm = forwardRef<HTMLDivElement, {}>((_props, ref) => {
  const { setCurrentTab } = useTabContext();
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    repassword: '',
  });

  const handleFormOnChange = (type: string, value: string) => {
    setUserData((prev) => ({ ...prev, [type]: value }));
  };

  const handleSignUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = {
      username: userData.username,
      email: userData.email,
      password: userData.password,
    };

    await noAuthPost('user/signup', data).then((data) => {
      console.log(data);
    });
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
            onChange={(value: string) => handleFormOnChange('email', value)}
          />
          <TextInput
            type={'text'}
            placeholder={'Enter your username'}
            name={'username'}
            onChange={(value: string) => handleFormOnChange('username', value)}
          />
          <TextInput
            type={'password'}
            placeholder={'Enter your password'}
            name={'password'}
            onChange={(value: string) => handleFormOnChange('password', value)}
          />
          <TextInput
            type={'password'}
            placeholder={'Re-enter your password'}
            name={'repassword'}
            onChange={(value: string) => handleFormOnChange('repassword', value)}
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

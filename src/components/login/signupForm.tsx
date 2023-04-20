import PrimaryButton from '@components/common/buttons/primaryButton';
import TextButton from '@components/common/buttons/textButton';
import TextInput from '@components/common/inputs/textInput';
import { useTabContext } from '@context/tabToggleContext';
import React, { FormEvent, forwardRef } from 'react';

const SignupForm = forwardRef<HTMLDivElement, {}>((_props, ref) => {
  const { setCurrentTab } = useTabContext();

  const handleSignUp = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleSignIn = () => {
    setCurrentTab(1);
  };

  return (
    <div className="max-w-lg w-full flex flex-col gap-4" ref={ref}>
      <h1 className="text-heading-1/h2 text-grey-90">Sign Up</h1>
      <form onSubmit={handleSignUp}>
        <div className="flex flex-col gap-6">
          <TextInput type={'text'} placeholder={'Enter your email'} name={'email'} />
          <TextInput
            type={'password'}
            placeholder={'Enter your password'}
            name={'password'}
          />
          <TextInput
            type={'password'}
            placeholder={'Re-enter your password'}
            name={'password'}
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

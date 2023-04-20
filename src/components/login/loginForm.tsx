import React, { FormEvent, forwardRef } from 'react';
import { useTabContext } from '@context/tabToggleContext';
import PrimaryButton from '@components/common/buttons/primaryButton';
import TextInput from '@components/common/inputs/textInput';
import TextButton from '@components/common/buttons/textButton';

const LoginForm = forwardRef<HTMLDivElement, {}>((_props, ref) => {
  const { setCurrentTab } = useTabContext();
  const handleSignIn = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCurrentTab(0);
  };

  return (
    <div className="max-w-lg w-full flex flex-col gap-4" ref={ref}>
      <h1 className="text-heading-1/h2 text-grey-90">Sign In</h1>
      <form onSubmit={handleSignIn}>
        <div className="flex flex-col gap-6">
          <TextInput type={'text'} placeholder={'Enter your email'} name={'email'} />
          <TextInput
            type={'password'}
            placeholder={'Enter your password'}
            name={'password'}
          />
          <PrimaryButton text="Sign in" type="submit" />
        </div>
      </form>
      <TextButton text="Don't have an account? Sign up" />
    </div>
  );
});

LoginForm.displayName = 'LoginForm';
export default LoginForm;

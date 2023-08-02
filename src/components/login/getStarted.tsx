import React, { forwardRef } from 'react';
import { useToggleContext } from '@context/useToggleContext';
import PrimaryButton from '@components/common/buttons/primaryButton';
import TextButton from '@components/common/buttons/textButton';
import { useUIHelperContext } from '@context/useUIHelperContext';

const GetStarted = forwardRef<HTMLDivElement, {}>((_props, ref) => {
  const { setCurrentTab } = useToggleContext();
  const { loading } = useUIHelperContext();

  const handleGetStarted = () => {
    setCurrentTab(2);
  };

  const handleSignIn = () => {
    if (loading) return;
    setCurrentTab(1);
  };

  return (
    <div className="max-w-lg flex flex-col gap-4" ref={ref}>
      <h1 className="text-heading-1/h2 text-grey-0">Productive Mind</h1>
      <p className="text-body-1/b2">
        With only the features you need, <span className="text-body-1/b1">Todo App</span>{' '}
        is customised for individual seeking a stress-free way to saty focused on their
        goals, projects and tasks.
      </p>
      <PrimaryButton text={'Get Started'} onClick={handleGetStarted} disable={loading} />
      <TextButton text=" Already have an account? Sign in" onClick={handleSignIn} />
    </div>
  );
});

GetStarted.displayName = 'GetStarted';
export default GetStarted;

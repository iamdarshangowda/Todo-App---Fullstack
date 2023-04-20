import React, { forwardRef } from 'react';
import { useTabContext } from '@context/tabToggleContext';
import PrimaryButton from '@components/common/buttons/primaryButton';
import TextButton from '@components/common/buttons/textButton';

const GetStarted = forwardRef<HTMLDivElement, {}>((_props, ref) => {
  const { setCurrentTab } = useTabContext();

  const handleGetStarted = () => {
    setCurrentTab(1);
  };

  return (
    <div className="max-w-lg flex flex-col gap-4 " ref={ref}>
      <h1 className="text-heading-1/h2 text-grey-90">Productive Mind</h1>
      <p className="text-body-1/b2 text-grey-80">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus in
        recusandae, repellendus sapiente dolorem consequatur voluptatibus nulla expedita?
      </p>
      <PrimaryButton text={'Get Started'} onClick={handleGetStarted} />
      <TextButton text=" Already have an account? Sign in" />
    </div>
  );
});

GetStarted.displayName = 'GetStarted';
export default GetStarted;

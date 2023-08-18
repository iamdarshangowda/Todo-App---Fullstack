import { TodoIconSmall } from '@components/common/icons/icons';
import LoginTabs from '@components/login/loginTabs';
import Tree from '@components/tree/tree';
import Link from 'next/link';
import React from 'react';

const userAuth = () => {
  return (
    <main className="flex h-screen items-center sm:justify-between p-4 gap-6 flex-col sm:flex-row login">
      <div className="w-full relative h-32 sm:h-full tree rounded-xl">
        <Tree />
        <div className="absolute top-4 left-6 ">
          <h1 className="text-heading-1/h2 text-grey-0">Todo</h1>
        </div>
        <div className="absolute top-16 left-14 ">
          <Link href="https://github.com/iamdarshangowda" legacyBehavior>
            <a target="_blank">
              <p className="text-body-2/b3 hover:underline text-grey-30 underline">
                by darshan
              </p>
            </a>
          </Link>
        </div>
        <div className="block md:hidden absolute top-5 right-5">
          <TodoIconSmall />
        </div>
      </div>
      <div className="w-full h-full shadow-md shadow-grey-50 rounded-xl flex flex-col items-center p-4 justify-center gap-4 relative ">
        <div className="hidden md:block absolute top-5 left-5">
          <TodoIconSmall />
        </div>
        <LoginTabs />
      </div>
    </main>
  );
};

export default userAuth;

import LoginTabs from '@components/login/loginTabs';
import Tree from '@components/tree/tree';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen items-center sm:justify-between p-4 gap-6 flex-col sm:flex-row ">
      <div className="w-full sm:h-[95vh] relative h-[15vh] tree rounded-xl">
        <Tree />
        <div className="absolute top-4 left-6 ">
          <h1 className="text-heading-1/h2 text-grey-0">Todo</h1>
        </div>
        <div className="absolute top-16 left-14 ">
          <Link href="https://github.com/iamdarshangowda" legacyBehavior>
            <a target="_blank">
              <p className="text-body-2/b2 text-grey-0 hover:underline ">by darshan</p>
            </a>
          </Link>
        </div>
      </div>
      <div className="w-full sm:h-[95vh] h-[75vh] bg-grey-0 rounded-xl flex items-center p-4 justify-center gap-4  ">
        <LoginTabs />
      </div>
    </main>
  );
}

import { IMenu } from '@utils/types';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

interface SingleMenuProps {
  count?: number;
}

const SingleMenu = (props: IMenu & SingleMenuProps) => {
  const { icon, label, count, route } = props;
  const router = useRouter();
  const pathname = usePathname();

  const handleRoutes = () => {
    router.push(route);
  };

  return (
    <button
      onClick={handleRoutes}
      className={`flex items-center gap-2 py-2 px-2 hover:bg-[#D8D8D8] text-body-1/b2 hover:text-body-1/b1
    rounded-lg hover:cursor-pointer duration-300 ${
      pathname === route ? 'bg-[#D8D8D8]' : ''
    }`}
    >
      {icon}
      <h3 className={` text-grey-40 flex-grow text-left pl-5`}>{label}</h3>
      {count && (
        <span className="px-3 text-body-2/b1 text-grey-60 bg-[#D8D8D8] rounded-md ">
          {count}
        </span>
      )}
    </button>
  );
};

export default SingleMenu;

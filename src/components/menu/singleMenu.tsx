import { useToggleContext } from '@context/useToggleContext';
import { useUIHelperContext } from '@context/useUIHelperContext';
import isMobileDevice from '@utils/detectUserDevice';
import { IMenu } from '@utils/types';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

const SingleMenu = (props: IMenu) => {
  const { icon, label, count, route } = props;
  const router = useRouter();
  const pathname = usePathname();
  const { setLoading } = useUIHelperContext();
  const { setHideMenu } = useToggleContext();

  const handleRoutes = () => {
    if (route !== '/') setLoading(true);
    if (isMobileDevice()) {
      setTimeout(() => {
        setHideMenu(true);
      }, 150);
    }
    router.push(route);
  };

  return (
    <button
      onClick={handleRoutes}
      className={`flex items-center gap-2 p-2 hover:bg-[#D8D8D8] text-body-1/b2 hover:text-body-1/b1
    rounded-lg hover:cursor-pointer duration-300 ${
      pathname === route ? 'bg-[#D8D8D8]' : ''
    }`}
    >
      {icon}
      <h3 className={` text-grey-40 flex-grow text-left pl-5`}>{label}</h3>
      {count ? (
        <span className="px-3 text-body-2/b1 text-grey-60 bg-[#D8D8D8] rounded-md ">
          {count}
        </span>
      ) : null}
    </button>
  );
};

export default SingleMenu;

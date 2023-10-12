import { useToggleContext } from '@context/useToggleContext';
import { useUIHelperContext } from '@context/useUIHelperContext';
import isMobileDevice from '@utils/detectUserDevice';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { useThemeContext } from '@context/ThemeContext';
import capitalizeFirstLetter from '@utils/capitalizeFirstLetter';
import { useAuthGaurdContext } from '@context/RouteGaurd';

interface ISingleMenuProps {
  icon: JSX.Element;
  label: string;
  count?: number;
  route: string;
}

const SingleMenu = (props: ISingleMenuProps) => {
  const { icon, label, count, route } = props;
  const router = useRouter();
  const pathname = usePathname();
  const { setLoading } = useUIHelperContext();
  const { setHideMenu, setCurrentTab } = useToggleContext();
  const { mode } = useThemeContext();
  const { setAuthorized } = useAuthGaurdContext();

  const handleRoutes = () => {
    if (!route) return;
    if (route !== '/auth') setLoading(true);
    if (isMobileDevice()) {
      setHideMenu(true);
    }

    if (label === 'Sign Out') {
      setCurrentTab(1);
      setAuthorized(false);
      localStorage.removeItem('todoAuthToken');
    }

    router.push(route);
  };

  return (
    <div className="flex gap-1">
      <button
        onClick={handleRoutes}
        className={`flex flex-1 items-center gap-2 p-2 ${
          mode === 'dark' ? 'hover:bg-grey-40' : 'hover:bg-[#D8D8D8] '
        } text-body-1/b3
    rounded-lg hover:cursor-pointer ${
      pathname === route ? (mode === 'dark' ? 'bg-grey-40' : 'bg-[#D8D8D8]') : ''
    }`}
      >
        {icon}
        <h3 className={`flex-grow text-left pl-5`}>{capitalizeFirstLetter(label)}</h3>
        {count ? <span className="px-3 text-body-2/b1 rounded-md ">{count}</span> : null}
      </button>
    </div>
  );
};

export default SingleMenu;

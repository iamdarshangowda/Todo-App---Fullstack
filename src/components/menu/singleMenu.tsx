import { CloseIcon } from '@components/common/icons/icons';
import { useToggleContext } from '@context/useToggleContext';
import { useUIHelperContext } from '@context/useUIHelperContext';
import isMobileDevice from '@utils/detectUserDevice';
import { usePathname, useRouter } from 'next/navigation';
import React, { useMemo } from 'react';
import { put } from '../../config/axiosClient';

interface ISingleMenuProps {
  icon: JSX.Element;
  label: string;
  count?: number;
  route: string;
  showDelete?: boolean;
  callback?: () => void;
}

const SingleMenu = (props: ISingleMenuProps) => {
  const { icon, label, count, route, showDelete, callback } = props;
  const router = useRouter();
  const pathname = usePathname();
  const { setLoading } = useUIHelperContext();
  const { setHideMenu, setShowSuccessToast, setShowErrorToast } = useToggleContext();

  const handleRoutes = () => {
    if (route !== '/') setLoading(true);
    if (isMobileDevice()) {
      setTimeout(() => {
        setHideMenu(true);
      }, 150);
    }
    router.push(route);
  };

  const showListDelete = useMemo(
    () =>
      showDelete &&
      route.includes('lists') &&
      !route.includes('personal') &&
      !route.includes('work'),
    [route, showDelete]
  );

  const handleDeleteList = async () => {
    try {
      await put('list', { list: label }).then((data) => {
        callback && callback();
        setShowSuccessToast({ show: true, message: data.data.message });
      });
    } catch (err: any) {
      console.log(err.message);
      setShowErrorToast({ show: true, message: err.response.data.message });
    }
  };

  return (
    <div className="flex gap-1">
      <button
        onClick={handleRoutes}
        className={`flex flex-1 items-center gap-2 p-2 hover:bg-[#D8D8D8] text-body-1/b2 hover:text-body-1/b1
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
      {showListDelete && (
        <button className="hover:bg-grey-20 p-4 rounded-full" onClick={handleDeleteList}>
          <CloseIcon size={'w-3 h-3'} />
        </button>
      )}
    </div>
  );
};

export default SingleMenu;

import { CloseIcon } from '@components/common/icons/icons';
import { useToggleContext } from '@context/useToggleContext';
import { useUIHelperContext } from '@context/useUIHelperContext';
import isMobileDevice from '@utils/detectUserDevice';
import { usePathname, useRouter } from 'next/navigation';
import React, { Dispatch, SetStateAction, useMemo } from 'react';
import { put } from '../../config/axiosClient';
import { useThemeContext } from '@context/ThemeContext';
import ListIocnBox from './listIocnBox';
import capitalizeFirstLetter from '@utils/capitalizeFirstLetter';

interface ISingleMenuProps {
  color: string;
  label: string;
  count?: number;
  route: string;
  showDelete?: boolean;
  setShowInput?: Dispatch<SetStateAction<boolean>>;
  callback?: () => void;
}

const SingleList = (props: ISingleMenuProps) => {
  const { color, label, count, route, showDelete, callback, setShowInput } = props;

  const router = useRouter();
  const pathname = usePathname();
  const { setLoading } = useUIHelperContext();
  const { setHideMenu, setShowSuccessToast, setShowErrorToast } = useToggleContext();
  const { mode } = useThemeContext();

  const handleRoutes = () => {
    if (!route) return;
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
        setShowInput && setShowInput((prev) => !prev);
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
        className={`flex flex-1 items-center gap-2 p-2 ${
          mode === 'dark' ? 'hover:bg-grey-40' : 'hover:bg-[#D8D8D8] '
        } text-body-1/b3
    rounded-lg hover:cursor-pointer ${
      pathname === route ? (mode === 'dark' ? 'bg-grey-40' : 'bg-[#D8D8D8]') : ''
    }`}
      >
        <ListIocnBox bgColor={color ? color : '#4B4B4B'} />
        <h3 className={`flex-grow text-left pl-5`}>{capitalizeFirstLetter(label)}</h3>
        {count ? <span className="px-3 text-body-2/b1 rounded-md ">{count}</span> : null}
      </button>
      {showListDelete && (
        <button className="hover:bg-grey-20 p-4 rounded-full" onClick={handleDeleteList}>
          <CloseIcon size={'w-3 h-3'} />
        </button>
      )}
    </div>
  );
};

export default SingleList;

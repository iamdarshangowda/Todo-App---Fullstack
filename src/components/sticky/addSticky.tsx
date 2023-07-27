import TextButton from '@components/common/buttons/textButton';
import { AddIcon, CloseIcon } from '@components/common/icons/icons';
import { useUIHelperContext } from '@context/useUIHelperContext';
import { generateRandomColor } from '@utils/generateRandomColor';
import React, { ChangeEvent, useState } from 'react';
import { post } from '../../config/axiosClient';
import { useToggleContext } from '@context/useToggleContext';
import { getAllCount } from '../../apis/getCount';
import { useDataStoreContext } from '@context/useDataStoreContext';

const initialData = {
  text: '',
  stickyColor: generateRandomColor(),
};

interface IAddStickyProps {
  callback: () => void;
}

const AddSticky = (props: IAddStickyProps) => {
  const { callback } = props;

  const [isAdding, setIsAdding] = useState(false);
  const { loading, setLoading } = useUIHelperContext();
  const { setShowSuccessToast, setShowErrorToast } = useToggleContext();
  const { setTasksCount } = useDataStoreContext();
  const [stickyData, setStickyData] = useState(initialData);
  const bg = `bg-[${stickyData.stickyColor}]`;

  const handleStickyChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;

    if (value.length > 100) {
      setShowErrorToast({ show: true, message: 'Text is too long' });
      return;
    }
    setStickyData((prev) => ({ ...prev, text: value }));
  };

  const handleSaveSticky = async () => {
    try {
      setLoading(true);
      await post('sticky', stickyData).then((data) => {
        setIsAdding(false);
        callback();
        getAllCount(setTasksCount);
        setStickyData(initialData);
        setShowSuccessToast({ show: true, message: data.data.message });
      });
    } catch (error: any) {
      console.log(error);
      setShowErrorToast({ show: true, message: error.response.data.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative rounded-xl shadow-sm shadow-grey-50 dark:shadow-grey-40 w-full h-full flex justify-center items-center
     text-grey-80 bg-cream"
    >
      {isAdding ? (
        <div className="w-full h-full">
          <textarea
            className={`rounded-xl w-full h-full border-none outline-none pt-12 px-6 placeholder:text-grey-20
            placeholder:text-body-1/b2 disabled:text-grey-20 ${bg}`}
            onChange={handleStickyChange}
            value={stickyData.text}
            autoComplete="off"
            placeholder={'Type here...'}
            disabled={loading}
          />
          <div className="absolute top-5 right-5 cursor-pointer flex gap-3">
            <div onClick={handleSaveSticky}>
              <TextButton text="Save" />
            </div>
            <div
              onClick={() => {
                setIsAdding(false);
                setStickyData(initialData);
              }}
            >
              <CloseIcon />
            </div>
          </div>
        </div>
      ) : (
        <div className="cursor-pointer" onClick={() => setIsAdding(true)}>
          <AddIcon size={'w-8 h-8'} />
        </div>
      )}
    </div>
  );
};

export default AddSticky;

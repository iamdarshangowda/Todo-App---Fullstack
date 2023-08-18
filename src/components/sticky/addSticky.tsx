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
  stickyColor: '',
};

interface IAddStickyProps {
  callback: () => void;
}

const AddSticky = (props: IAddStickyProps) => {
  const { callback } = props;

  const { loading, setLoading } = useUIHelperContext();
  const { setShowSuccessToast, setShowErrorToast } = useToggleContext();
  const { setTasksCount } = useDataStoreContext();
  const [stickyData, setStickyData] = useState(initialData);
  const bg = `bg-[${stickyData.stickyColor}]`;

  const handleStickyChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;

    if (value.length > 150) {
      setShowErrorToast({ show: true, message: 'Text is too long' });
      return;
    }
    setStickyData((prev) => ({ ...prev, text: value }));
  };

  const handleSaveSticky = async () => {
    if (!stickyData.text) {
      setShowErrorToast({ show: true, message: 'Text is empty!' });
      return;
    }

    try {
      setLoading(true);
      stickyData.stickyColor = generateRandomColor();
      await post('sticky', stickyData).then((data) => {
        callback();
        getAllCount(setTasksCount);
        setStickyData(initialData);
        setShowSuccessToast({ show: true, message: data.data.message });
      });
    } catch (error: any) {
      console.log(error);
      setShowErrorToast({ show: true, message: error.response.data.message });
      setLoading(false);
    }
  };

  return (
    <div
      className="relative rounded-xl shadow-sm shadow-grey-50 dark:shadow-grey-40 w-full h-full flex justify-center items-center
     text-grey-80 bg-cream min-h-[150px] md:min-h-[200px]"
    >
      <div className="w-full h-full">
        <textarea
          className={`rounded-xl w-full h-full border-none outline-none pt-8 md:pt-10 px-2 md:px-5 placeholder:text-grey-20
            placeholder:text-body-2/b2 disabled:text-grey-20 ${bg}`}
          onChange={handleStickyChange}
          value={stickyData.text}
          autoComplete="off"
          placeholder={'Type here...'}
          disabled={loading}
        />

        <div className="absolute  bottom-2 right-2 md:bottom-4 md:right-4 cursor-pointer bg-yellow rounded-xl flex items-center text-caption/c2 md:text-body-2/b2 p-0 md:p-1">
          <div onClick={handleSaveSticky}>
            <TextButton text="Save" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSticky;

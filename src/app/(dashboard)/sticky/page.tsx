'use client';

import AddSticky from '@components/sticky/addSticky';
import SingleSticky from '@components/sticky/singleSticky';
import { useUIHelperContext } from '@context/useUIHelperContext';
import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { deleteTask, get } from '../../../config/axiosClient';
import { useToggleContext } from '@context/useToggleContext';
import { IStickyData } from '@utils/types';
import { AddIcon, CloseIcon, DeleteIcon } from '@components/common/icons/icons';
import { useThemeContext } from '@context/ThemeContext';
import SkeletonSticky from '@components/sticky/skeletonSticky';
import { getAllCount } from '../../../apis/getCount';
import { useDataStoreContext } from '@context/useDataStoreContext';
import SecondaryButton from '@components/common/buttons/secondaryButton';

const StickyWall = () => {
  const { loading, setLoading } = useUIHelperContext();
  const { setShowErrorToast, setShowSuccessToast } = useToggleContext();
  const [stickyItems, setStickyItems] = useState<IStickyData[]>([]);
  const [showDelete, setShowDelete] = useState(false);
  const { mode } = useThemeContext();
  const { setTasksCount } = useDataStoreContext();
  const [adding, setAdding] = useState(false);

  const handleDelete = () => {
    setShowDelete((prev) => !prev);
  };

  const reorderStickyItems = (list: any[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const handleonDragEnd = (result: any) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    if (result.destination.droppableId === 'delete') {
      const div = document.getElementById(result.draggableId);
      if (div) div.style.display === 'none';
      handleDeleteSticky(result.draggableId);
    } else {
      const items = reorderStickyItems(
        stickyItems,
        result.source.index,
        result.destination.index
      );

      setStickyItems(items);
    }
  };

  const getAllStickyNotes = async () => {
    try {
      setLoading(true);
      await get('stickies').then((stikies) => {
        setStickyItems(stikies.data);
      });
    } catch (err: any) {
      console.log(err.message);
      setShowErrorToast({ show: true, message: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSticky = async (id: string) => {
    try {
      await deleteTask(`sticky?id=${id}`).then((data) => {
        getAllStickyNotes();
        setShowSuccessToast({ show: true, message: data.data.message });
        getAllCount(setTasksCount);
      });
    } catch (err: any) {
      console.log(err.message);
      setShowErrorToast({ show: true, message: err.message });
    }
  };

  useEffect(() => {
    getAllStickyNotes();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center gap-2">
        <SecondaryButton
          text={adding ? 'Close' : 'Add Sticky'}
          onClick={() => setAdding(!adding)}
          icon={adding ? <CloseIcon /> : <AddIcon />}
        />
        {stickyItems.length ? (
          showDelete ? (
            <div onClick={handleDelete} className="cursor-pointer">
              <CloseIcon />
            </div>
          ) : (
            <div onClick={handleDelete} className="cursor-pointer">
              <DeleteIcon fill={mode === 'dark' ? 'default' : '#bbb'} />
            </div>
          )
        ) : null}
      </div>

      <DragDropContext onDragEnd={handleonDragEnd}>
        {showDelete && stickyItems.length ? (
          <Droppable droppableId="delete">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={` h-20 w-ful flex justify-center items-center  ${
                  snapshot.isDraggingOver
                    ? 'bg-gradient-to-r from-white dark:from-[#111] via-error dark:via-error to-white dark:to-[#111] opacity-100'
                    : 'bg-gradient-to-r from-white dark:from-[#111] via-grey-20 dark:via-grey-40 to-white dark:to-[#111] opacity-70'
                }`}
              >
                Drag and drop here to delete
              </div>
            )}
          </Droppable>
        ) : null}
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={`${
                stickyItems.length ? 'border border-grey-20 dark:border-cream' : ''
              }  rounded-xl
          grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 p-4 ${
            snapshot.isDraggingOver ? 'bg-grey-40' : ''
          }`}
            >
              {adding && <AddSticky callback={getAllStickyNotes} />}
              {loading && <SkeletonSticky />}
              {stickyItems.length
                ? stickyItems.map((data, index) => (
                    <Draggable key={data._id} draggableId={data._id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`rounded-xl shadow-sm shadow-grey-50 dark:shadow-grey-40 select-none`}
                          style={{ ...provided.draggableProps.style }}
                          id={data._id}
                        >
                          <SingleSticky
                            data={data}
                            isDeleting={snapshot.isDragging && showDelete}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))
                : null}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default StickyWall;

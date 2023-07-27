'use client';

import AddSticky from '@components/sticky/addSticky';
import SingleSticky from '@components/sticky/singleSticky';
import { useUIHelperContext } from '@context/useUIHelperContext';
import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { get } from '../../../config/axiosClient';
import { useToggleContext } from '@context/useToggleContext';
import { IStickyData } from '@utils/types';

const StickyWall = () => {
  const { loading, setLoading } = useUIHelperContext();
  const { setShowErrorToast } = useToggleContext();
  const [stickyItems, setStickyItems] = useState<IStickyData[]>([]);

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
    const items = reorderStickyItems(
      stickyItems,
      result.source.index,
      result.destination.index
    );

    setStickyItems(items);
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
      // Just to make loading more applealing
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllStickyNotes();
  }, []);

  return (
    <DragDropContext onDragEnd={handleonDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`border border-grey-20 dark:border-cream  rounded-xl
          grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 p-4  ${
            snapshot.isDraggingOver ? 'bg-grey-40' : ''
          }`}
          >
            <AddSticky callback={getAllStickyNotes} />
            {stickyItems.map((data, index) => (
              <Draggable key={data._id} draggableId={data._id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`rounded-xl shadow-sm shadow-grey-50 dark:shadow-grey-40 ${provided.draggableProps.style} select-none`}
                  >
                    <SingleSticky data={data} />
                  </div>
                )}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default StickyWall;

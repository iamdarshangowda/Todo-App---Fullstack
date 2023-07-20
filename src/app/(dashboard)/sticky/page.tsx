'use client';

import SingleSticky from '@components/sticky/singleSticky';
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const StickyWall = () => {
  const [stickyItems, setStickyItems] = useState<any[]>(
    Array.from({ length: 10 }, (v, k) => k)
  );

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

  return (
    <DragDropContext onDragEnd={handleonDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`border border-grey-20 dark:border-cream  rounded-xl
          grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 p-4 ${
            snapshot.isDraggingOver ? 'bg-grey-40' : ''
          }`}
          >
            {stickyItems
              .map((k) => ({
                id: `item-${k}`,
                content: `item ${k}`,
              }))
              .map((data, index) => (
                <Draggable key={data.id} draggableId={data.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={` rounded-xl ${
                        snapshot.isDragging ? 'bg-green' : 'bg-cream'
                      }`}
                    >
                      <SingleSticky text={data.content} />
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
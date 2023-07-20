import SingleSticky from '@components/sticky/singleSticky';
import React from 'react';

const StickyWall = () => {
  return (
    <div
      className="border border-grey-20 dark:border-cream  rounded-xl
    grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 p-4 "
    >
      {Array(10)
        .fill('')
        .map((data) => (
          <SingleSticky />
        ))}
    </div>
  );
};

export default StickyWall;

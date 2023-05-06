'use client';

import AddTasks from '@components/add-tasks/addTasks';
import MenuSidebar from '@components/menu/menuSidebar';
import Today from '@components/today/today';
import React, { useState } from 'react';

const DashBoard = () => {
  const [showAddTasks, setShowAddTasks] = useState<boolean>(false);
  return (
    <div className="fixed top-0 bottom-0 flex gap-4 p-4 w-full">
      <MenuSidebar />
      <Today setShowAddTasks={setShowAddTasks} />
      {showAddTasks && <AddTasks setShowAddTasks={setShowAddTasks} />}
    </div>
  );
};

export default DashBoard;

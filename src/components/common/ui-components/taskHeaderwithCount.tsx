import React from 'react';

interface ITaskHeaderwithCount {
  title: string;
  count: number;
  loading: boolean;
}

const TaskHeaderwithCount = (props: ITaskHeaderwithCount) => {
  const { title, count, loading } = props;
  return (
    <div className="text-heading-1/h2 text-grey-80 flex gap-10 ">
      <h1>{title}</h1>
      {loading ? (
        <span className="w-12 rounded-lg animate-pulse bg-grey-10"></span>
      ) : count ? (
        <span className="px-4 border border-grey-20 rounded-lg">{count}</span>
      ) : null}
    </div>
  );
};

export default TaskHeaderwithCount;

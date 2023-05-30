import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { useEffect, useState } from 'react';

export default function ResultContainer() {
  const taskHours = useSelector((state: RootState) => state.data.taskHours);
  const [success, setSuccess] = useState(true);

  useEffect(() => {
    if (taskHours) {
      setSuccess(taskHours.available > taskHours.required);
    }
  }, [taskHours]);

  if (taskHours === null) {
    return null;
  }

  return (
    <div
      className={`flex flex-col gap-4 w-full max-w-xl shadow-md rounded-lg p-5 px-4 sm:px-6 lg:px-8 ${
        success ? 'bg-green-200' : 'bg-red-200'
      }`}
    >
      {success ? (
        <div>You have plenty of time to finish your task!</div>
      ) : (
        <div>You don't have sufficient time to finish your task.</div>
      )}
      <div>Available hours to study: {taskHours?.available}</div>
      <div>Required hours to study: {taskHours?.required}</div>
    </div>
  );
}

import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch } from '../app/hook';
import { setData, setTaskHours } from '../redux/data.slice';

interface Inputs {
  date: string;
  requiredTime: number;
  busyHours: number;
  sleepHours: number;
}
export interface StorageItem {
  date: string;
  studyHours: number;
  busyHours: number;
  sleepHours: number;
}
export interface TaskHours {
  available: number;
  required: number;
}

export default function InputContainer() {
  const { register, handleSubmit, watch } = useForm<Inputs>();
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<Inputs> = (data): void => {
    const { date, requiredTime, busyHours, sleepHours } = data;
    const currentDate = new Date();
    const targetDate = new Date(date);
    const daysLeft = Math.ceil(
      (targetDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    const studyHoursPerDay = Math.floor(requiredTime / daysLeft);
    const remainder = requiredTime % daysLeft;
    const availabeStudyHours = (24 - busyHours - sleepHours) * daysLeft;

    const storageItems: StorageItem[] = [];
    const taskHours: TaskHours = {
      available: availabeStudyHours,
      required: requiredTime,
    };

    let remainingStudyHours = remainder;

    for (let i = 0; i < daysLeft; i++) {
      const currentDateCopy = new Date(currentDate.getTime());
      currentDateCopy.setDate(currentDate.getDate() + i);
      const formattedDate = currentDateCopy.toISOString().split('T')[0];

      let studyHours = studyHoursPerDay;

      // Distribute remaining study hours evenly among the days
      if (remainingStudyHours > 0) {
        const maxStudyHours = 24 - studyHours - sleepHours - busyHours;
        const studyHoursToAdd = Math.min(
          remainingStudyHours,
          studyHoursPerDay,
          maxStudyHours
        );

        studyHours += studyHoursToAdd;
        remainingStudyHours -= studyHoursToAdd;
      }

      const storageItem: StorageItem = {
        date: formattedDate,
        studyHours,
        busyHours,
        sleepHours,
      };

      storageItems.push(storageItem);
    }
    dispatch(setData(storageItems));
    dispatch(setTaskHours(taskHours));
  };

  console.log(watch('date'));

  return (
    <div className="flex flex-col justify-center items-center gap-4 bg-white w-full max-w-xl shadow-md rounded-lg p-5">
      <h1 className="font-medium">Starting data</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full items-center gap-4"
      >
        <div className="w-full box-border flex flex-col text-start">
          <label className="mb-1 text-base">Deadline date:</label>
          <input
            required
            {...register('date', { required: true })}
            className="rounded-md p-2 border"
            type="date"
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
        <div className="w-full box-border flex flex-col text-start">
          <label className="mb-1 text-base">
            Time required to complete the task:
          </label>
          <input
            required
            {...register('requiredTime', { required: true })}
            className="rounded-md p-2 border"
            type="number"
            min={0}
          />
        </div>
        <div className="w-full box-border flex flex-col text-start">
          <label className="mb-1 text-base">
            Your avarage busy hours per day:
          </label>
          <input
            required
            {...register('busyHours', { required: true })}
            className="rounded-md p-2 border"
            type="number"
            min={0}
          />
        </div>
        <div className="w-full box-border flex flex-col text-start">
          <label className="mb-1 text-base">
            Your average daily sleep duration:
          </label>
          <input
            required
            {...register('sleepHours', { required: true })}
            className="rounded-md p-2 border"
            type="number"
            min={0}
          />
        </div>

        <button
          type="submit"
          className="rounded-md p-2 border w-fit bg-gray-50 hover:bg-gray-100"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

export default function OutputContainer() {
  const data = useSelector((state: RootState) => state.data.storageItems);

  if (data.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4 bg-white w-full max-w-xl shadow-md rounded-lg p-5 px-4 sm:px-6 lg:px-8 mb-8">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr className="divide-x divide-gray-200">
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3  text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5  text-sm font-semibold text-gray-900"
                  >
                    Sleep hours
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5  text-sm font-semibold text-gray-900"
                  >
                    Busy hours
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5  text-sm font-semibold text-gray-900"
                  >
                    Study hours
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.map((day) => (
                  <tr key={day.date} className="divide-x divide-gray-200">
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm  text-gray-500 sm:pl-0">
                      {day.date}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {day.sleepHours}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {day.busyHours}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {day.studyHours}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

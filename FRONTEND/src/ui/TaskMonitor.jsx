import { MdOutlineTaskAlt } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";
import { VscError } from "react-icons/vsc";
import { useTaskStore } from "../store/useTaskStore";
import { useEffect } from "react";
export const TaskMonitor = () => {
  const { updateTaskCount, taskCount, refresh } = useTaskStore();

  useEffect(() => {
    updateTaskCount();
  }, [refresh]);

  const taskList = [
    {
      title: "All Tasks",
      icon: (
        <FaRegClock className="text-3xl p-1 bg-blue-200 rounded-lg text-blue-400" />
      ),
      count: taskCount?.all,
    },
    {
      title: "Pending",
      icon: (
        <FaRegClock className="text-3xl p-1 bg-orange-200 rounded-lg text-orange-400" />
      ),
      count: taskCount?.Pending,
    },
    {
      title: "Completed",
      icon: (
        <MdOutlineTaskAlt className="text-3xl p-1 bg-green-200 rounded-lg text-green-600" />
      ),
      count: taskCount?.Completed,
    },
    {
      title: "Accepted",
      icon: (
        <FaRegClock className="text-3xl p-1 bg-green-200 rounded-lg text-green-600" />
      ),
      count: taskCount?.Accepted,
    },
    {
      title: "Rejected",
      icon: (
        <VscError className="text-3xl p-1 bg-red-200 rounded-lg text-red-600" />
      ),
      count: taskCount?.Rejected,
    },
  ];
  return (
    <div className="">
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pt-4">
        {taskList.map((tasks, index) => {
          return (
            <div
              key={index}
              className="shadow-[0px_0px_6px_rgb(0,0,0,.7)] py-4 px-2 rounded-lg flex flex-col items-center justify-center gap-2 md:py-6 lg:py-6 "
            >
              <div>{tasks.icon}</div>
              <div className="flex gap-2 items-center justify-center">
                <div className="font-semibold text-[var(--font-color)] text-sm">
                  {tasks.title}
                </div>
                <div className="font-bold text-[var(--font-color)]">
                  {tasks.count}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

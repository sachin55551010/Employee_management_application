import { PiSpinnerBold } from "react-icons/pi";
import { useTaskStore } from "../store/useTaskStore";

export const TaskDeleteMenu = ({ setDeleteTaskId, deleteTaskId }) => {
  const { deleteTask, isTaskDeleted } = useTaskStore();

  const handleDeleteTaskBtn = () => {
    deleteTask(deleteTaskId);
    setDeleteTaskId(null);
  };
  const handleCancelBtn = () => {
    setDeleteTaskId(null);
  };
  return (
    <div className="border-[var(--ui-light)] border-2 bg-[var(--ui-color)] w-90 absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 p-4 rounded-lg shadow-[0px_0px_30px_5px_rgb(0,0,0,1)]">
      <h1 className="text-center">Are you sure to delete this task ?</h1>
      <div className="flex justify-around mt-12">
        <button
          onClick={handleDeleteTaskBtn}
          className="flex items-center gap-2 bg-[var(--button-color)] py-2 px-6 rounded-lg text-[var(--ui-color)] font-bold hover:scale-110 transition duration-200 cursor-pointer disabled:cursor-not-allowed"
          disabled={isTaskDeleted}
        >
          Yes
          {isTaskDeleted && <PiSpinnerBold className="text-xl animate-spin" />}
        </button>
        <button
          onClick={handleCancelBtn}
          className="bg-[var(--ui-light)] py-2 px-6 rounded-lg text-white/80 font-bold hover:scale-110 transition duration-200 cursor-pointer"
        >
          No
        </button>
      </div>
    </div>
  );
};

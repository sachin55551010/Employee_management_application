import { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useTaskStore } from "../store/useTaskStore";
import { PiSpinnerBold } from "react-icons/pi";

export const AssignTask = ({
  setIsAssignFormOpen,
  editTaskId,
  setEditTaskId,
}) => {
  const { createTask, getAllTask, allTasks, updateTask, isTaskCreated } =
    useTaskStore();
  const [assignTask, setAssignTask] = useState({
    title: "",
    description: "",
    priority: "",
    dueDate: "",
    assignedTo: "",
  });
  const { getAllUsers, allUsers, refresh } = useAuthStore();
  useEffect(() => {
    getAllUsers();
    getAllTask();
    const updatedTask = allTasks.find((task) => task._id === editTaskId);
    if (updatedTask) {
      setAssignTask({
        title: updatedTask.title,
        description: updatedTask.description,
        priority: updatedTask.priority,
        dueDate: updatedTask.dueDate?.slice(0, 10),
        assignedTo: updatedTask.assignedTo,
      });
    } else {
      setAssignTask({
        title: "",
        description: "",
        priority: "",
        dueDate: "",
        assignedTo: "",
      });
    }
  }, [getAllUsers, refresh, getAllTask]);

  const priority = ["Low", "Medium", "High"];

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    try {
      if (editTaskId) {
        await updateTask(editTaskId, assignTask);
      } else {
        await createTask(assignTask);
      }

      setAssignTask({
        title: "",
        description: "",
        priority: "",
        dueDate: "",
        assignedTo: "",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsAssignFormOpen(false);
    }
  };
  const handleCancelBtn = () => {
    setIsAssignFormOpen(false);
    setEditTaskId(null);
  };

  // comment to check theme output
  return (
    <div className="inset-0 left-1/2 top-12 transform -translate-x-1/2 h-fit bg-[var(--ui-color)] rounded-lg fixed w-100 py-4 px-6 shadow-[0px_0px_20px_rgb(0,0,0,.7)]  opacity-90">
      <form
        onSubmit={handleSubmitForm}
        className="flex flex-col justify-center items-center gap-3 "
      >
        <h1 className="font-bold text-xl">Assign Task</h1>

        <input
          value={assignTask.title}
          onChange={(e) =>
            setAssignTask({ ...assignTask, title: e.target.value })
          }
          id="title"
          className="bg-[var(--ui-light)] h-9 rounded-lg pl-3 w-full outline-0"
          type="text"
          placeholder="Title"
          required
        />

        <textarea
          value={assignTask.description}
          onChange={(e) =>
            setAssignTask({ ...assignTask, description: e.target.value })
          }
          className="bg-[var(--ui-light)] w-full rounded-lg h-20 pl-3 pt-3 outline-0"
          name=""
          id=""
          placeholder="Description"
          required
        ></textarea>

        <label
          className="w-full flex items-center justify-between text-sm"
          htmlFor="assignedTo"
        >
          Assign To :{" "}
          <select
            id="assignedTo"
            value={assignTask.assignedTo}
            onChange={(e) =>
              setAssignTask({ ...assignTask, assignedTo: e.target.value })
            }
            className="bg-[var(--ui-light)] h-9 rounded-lg w-[77%] outline-0"
            name=""
            required
          >
            <option value="" disabled hidden>
              Choose Employee
            </option>
            {allUsers.map((user) => {
              return (
                <option
                  className=" rounded-lg outline-0 mt-4"
                  key={user._id}
                  value={user._id}
                >
                  {user.name}
                </option>
              );
            })}
          </select>
        </label>

        <div className="flex justify-between items-center w-full">
          <label className="text-sm flex flex-col" htmlFor="priority">
            Priority
            <select
              value={assignTask.priority}
              onChange={(e) =>
                setAssignTask({ ...assignTask, priority: e.target.value })
              }
              className="bg-[var(--ui-light)] h-9 rounded-lg w-40 outline-0"
              name=""
              id="priority"
              required
            >
              <option value="" disabled hidden>
                Choose
              </option>
              {priority.map((data) => {
                return (
                  <option key={data} value={data} id="priority">
                    {data}
                  </option>
                );
              })}
            </select>
          </label>
          <label className="text-sm flex flex-col" htmlFor="date">
            Due Date
            <input
              value={assignTask.dueDate}
              onChange={(e) =>
                setAssignTask({ ...assignTask, dueDate: e.target.value })
              }
              className="bg-[var(--ui-light)] h-9 rounded-lg pl-3 w-40 outline-0 px-2"
              type="date"
              id="date"
              required
            />
          </label>
        </div>

        <div className="flex w-full justify-between ">
          <button
            className={`flex items-center gap-2 bg-[var(--button-color)] py-2 px-5 rounded-lg text-gray-700 font-bold cursor-pointer hover:scale-110 transition-transform duration-200 text-sm disabled:cursor-not-allowed`}
            disabled={isTaskCreated}
          >
            {editTaskId ? "Update" : "Create"}
            {isTaskCreated && (
              <PiSpinnerBold className="text-xl animate-spin" />
            )}
          </button>
          <button
            onClick={handleCancelBtn}
            className="bg-[var(--ui-light)] py-2 px-5 rounded-lg text-gray-200 font-bold cursor-pointer hover:scale-110 transition-transform duration-200 text-sm"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

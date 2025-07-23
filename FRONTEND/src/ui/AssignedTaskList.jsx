import { useEffect, useState } from "react";
import { useTaskStore } from "../store/useTaskStore";
import { MdDelete } from "react-icons/md";
import { MdDraw } from "react-icons/md";
import { TaskDeleteMenu } from "./TaskDeleteMenu";
import { useAuthStore } from "../store/useAuthStore";
import { PiSpinnerBold } from "react-icons/pi";

export const AssignedTaskList = ({
  setIsAssignFormOpen,
  setEditTaskId,
  priorityFilter,
  statusFilter,
  searchValue,
}) => {
  const [deleteTaskId, setDeleteTaskId] = useState(null);
  const { getAllTask, refresh, allTasks, updateTaskStatus, isCheckingTask } =
    useTaskStore();
  const { authUser } = useAuthStore();
  useEffect(() => {
    getAllTask({
      priority: priorityFilter,
      status: statusFilter,
      search: searchValue,
    });
  }, [priorityFilter, statusFilter, searchValue, refresh]);

  const role = authUser?.user?.role;

  const priorityColor = {
    Low: "bg-green-100 text-green-600",
    Medium: "bg-yellow-100 text-yellow-600",
    High: "bg-red-200 text-red-600",
    Pending: "bg-orange-200 text-orange-600",
    Accepted: "bg-yellow-200 text-yellow-600",
    Completed: "bg-green-200 text-green-600",
    Rejected: "bg-red-200 text-red-600",
  };

  const handleDeleteBtn = (id) => {
    setDeleteTaskId(id);
  };

  const handleUpdateTaskBtn = (id) => {
    setIsAssignFormOpen(true);
    setEditTaskId(id);
  };

  const handleAcceptBtn = (id, data) => {
    updateTaskStatus(id, data);
  };

  const handleRejectBtn = (id, data) => {
    updateTaskStatus(id, data);
  };
  const handleCompleteBtn = (id, data) => {
    updateTaskStatus(id, data);
  };

  if (isCheckingTask && allTasks.length === 0) {
    return (
      <div className="flex items-center justify-center mt-10">
        <PiSpinnerBold className="text-4xl animate-spin" />
      </div>
    );
  }

  return (
    <div className="px-3 mb-4">
      {allTasks.length === 0 && <h1 className="mt-4">No Task !</h1>}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
        {allTasks.map((task) => {
          return (
            // this is item list section
            <section
              key={task._id}
              className="relative  border-1 border-white/10 rounded-lg flex flex-col p-3 gap-3"
            >
              {/* this is all content inside list items */}
              <div className="lst-contaier flex flex-col justify-between gap-2">
                <section className="upper flex justify-between">
                  <div className="task-details flex flex-col gap-3 w-[90%]">
                    <div className="flex gap-2 items-center">
                      <h1 className="font-semibold text-[.9rem]">
                        {task.title}
                      </h1>
                      <div
                        className={`text-[.7rem] ${
                          priorityColor[task.priority]
                        } py-1 px-3 font-bold rounded-lg `}
                      >
                        {task.priority}
                      </div>
                      <div
                        className={`text-[.7rem] ${
                          priorityColor[task.status]
                        } py-1 px-2 font-semibold rounded-lg`}
                      >
                        {task.status}
                      </div>
                    </div>
                    <p className="text-white/80 text-[.85rem] h-20 mt-2">
                      {task.description}
                    </p>
                  </div>
                  <div className="">
                    {role === "employee" && (
                      <div className="flex flex-col gap-3">
                        {task.status === "Pending" && (
                          <div className=" flex flex-col gap-2">
                            <button
                              onClick={() =>
                                handleAcceptBtn(task._id, {
                                  status: "Accepted",
                                })
                              }
                              className="bg-green-200 text-[var(--ui-color)] py-1 px-2 text-[.7rem] font-semibold rounded-lg hover:scale-110 -transform -transition duration-200"
                            >
                              Accept
                            </button>

                            <button
                              onClick={() =>
                                handleRejectBtn(task._id, {
                                  status: "Rejected",
                                })
                              }
                              className="bg-red-200 text-[var(--ui-color)] py-1 px-2 text-[.7rem] font-semibold rounded-lg hover:scale-110 transform transition duration-200 ease-in-out"
                            >
                              Reject
                            </button>
                          </div>
                        )}

                        {task.status === "Accepted" && (
                          <button
                            onClick={() =>
                              handleCompleteBtn(task._id, {
                                status: "Completed",
                              })
                            }
                            className="bg-green-200 text-[var(--ui-color)] py-1 px-2 text-[.7rem] font-semibold rounded-lg hover:scale-110 transform transition duration-200 ease-in-out"
                          >
                            Complete
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  {role === "admin" && (
                    <div className="flex flex-col gap-3">
                      <button
                        onClick={() => handleDeleteBtn(task._id)}
                        className="bg-red-200/80 text-[var(--ui-color)] p-1 rounded-lg cursor-pointer transition-transform duration-200 hover:scale-110 hover:bg-red-300"
                      >
                        <MdDelete className="text-[1.4rem]" />
                      </button>
                      <button className="bg-yellow-100 text-[var(--ui-color)] p-1 rounded-lg transition-transform duration-200 hover:scale-110 hover:bg-yellow-300 cursor-pointer">
                        <MdDraw
                          onClick={() => handleUpdateTaskBtn(task._id)}
                          className="text-[1.4rem]"
                        />
                      </button>
                    </div>
                  )}
                </section>

                <div className="flex justify-between  items-center">
                  {/* task accept and reject button  */}
                </div>

                {deleteTaskId === task?._id && (
                  <TaskDeleteMenu
                    setDeleteTaskId={setDeleteTaskId}
                    deleteTaskId={deleteTaskId}
                  />
                )}

                {/* info section */}
                <div className="flex w-full justify-between ">
                  <section>
                    <div className="text-[.7rem] text-[var(--font-color)] font-semibold">
                      Assigned To :{" "}
                    </div>
                    <div className="text-[.8rem] text-[var(--font-color)] font-bold">
                      {task.assignedTo.name}
                    </div>
                  </section>
                  <section>
                    <div className="text-[.7rem] text-[var(--font-color)] font-semibold">
                      Created :{" "}
                    </div>
                    <div className="text-[.8rem] text-[var(--font-color)] font-bold">
                      {task.createdAt.slice(0, 10)}
                    </div>
                  </section>
                  <section>
                    <div className="text-[.7rem] text-[var(--font-color)] font-semibold">
                      Due :{" "}
                    </div>
                    <div className="text-[.8rem]  text-[var(--font-color)] font-bold">
                      {task.dueDate.slice(0, 10)}
                    </div>
                  </section>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

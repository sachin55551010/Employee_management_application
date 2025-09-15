import { useState } from "react";
import { TaskMonitor } from "../ui/TaskMonitor";
import { AssignTask } from "../ui/AssignTask";
import { AssignedTaskList } from "../ui/AssignedTaskList";
import { TaskSearchFilter } from "../ui/TaskSearchFilter";

export const AdminDashboard = () => {
  const [isAssignFormOpen, setIsAssignFormOpen] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);

  const [priorityFilter, setPriorityFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [searchValue, setSearchValue] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "priority") setPriorityFilter(value);
    if (name === "status") setStatusFilter(value);
    if (name === "searchValue") setSearchValue(value);
  };

  const handleCreateBtn = () => {
    setIsAssignFormOpen(true);
  };

  return (
    <div className="relative pt-[var(--navbar-height)] px-2">
      <div
        className={`min-h-[calc(100vh-var(--navbar-height))] ${
          isAssignFormOpen ? "blur-sm" : ""
        } transition duration-300 `}
      >
        <div>
          <TaskMonitor />

          <div className=" flex items-center justify-between mt-5 gap-1">
            <button
              onClick={handleCreateBtn}
              className="bg-[var(--button-color)] py-1 px-2 rounded-md font-semibold text-gray-900 cursor-pointer hover:scale-110 transition-transform duration-200 text-sm"
            >
              Create Task
            </button>
            <TaskSearchFilter
              statusFilter={statusFilter}
              priorityFilter={priorityFilter}
              onChange={onChange}
              searchValue={searchValue}
            />
          </div>
        </div>
        <AssignedTaskList
          isAssignFormOpen={isAssignFormOpen}
          setIsAssignFormOpen={setIsAssignFormOpen}
          setEditTaskId={setEditTaskId}
          editTaskId={editTaskId}
          statusFilter={statusFilter}
          priorityFilter={priorityFilter}
          searchValue={searchValue}
        />
      </div>
      {isAssignFormOpen && (
        <AssignTask
          setIsAssignFormOpen={setIsAssignFormOpen}
          editTaskId={editTaskId}
          setEditTaskId={setEditTaskId}
        />
      )}
    </div>
  );
};

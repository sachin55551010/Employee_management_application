import { useEffect } from "react";
import { useTaskStore } from "../store/useTaskStore";
import { AssignedTaskList } from "../ui/AssignedTaskList";
import { TaskMonitor } from "../ui/TaskMonitor";
import { TaskSearchFilter } from "../ui/TaskSearchFilter";
import { useState } from "react";

export const EmployeeDashboard = () => {
  const { updateTaskCount } = useTaskStore();

  const [priorityFilter, setPriorityFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "priority") setPriorityFilter(value);
    if (name === "status") setStatusFilter(value);
  };
  useEffect(() => {
    updateTaskCount();
  }, []);
  return (
    <div className="min-h-dvh pt-[var(--navbar-height)] px-2">
      <TaskMonitor />
      <div className="ml-4 mt-6">
        <TaskSearchFilter
          priorityFilter={priorityFilter}
          statusFilter={statusFilter}
          onChange={onChange}
        />
      </div>
      <div className="pb-1">
        <AssignedTaskList
          priorityFilter={priorityFilter}
          statusFilter={statusFilter}
        />
      </div>
    </div>
  );
};

import { FaFilter } from "react-icons/fa6";
import { useAuthStore } from "../store/useAuthStore";
export const TaskSearchFilter = ({
  priorityFilter,
  statusFilter,
  onChange,
  searchValue,
}) => {
  const { authUser } = useAuthStore();

  const role = authUser?.user?.role;

  return (
    <div className="flex gap-2">
      <label htmlFor="" className="flex items-center gap-2">
        <FaFilter className="text-[.8rem]" />
        <select
          value={priorityFilter}
          onChange={onChange}
          name="priority"
          id=""
          className="border-1 border-white/40 rounded-md text-[.8rem] h-8 bg-[var(--ui-color)]"
        >
          <option value="">All</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </label>
      <label htmlFor="" className="flex items-center gap-2">
        <FaFilter className="text-[.8rem]" />
        <select
          value={statusFilter}
          onChange={onChange}
          name="status"
          id=""
          className="border-1 border-white/40 rounded-md text-[.8rem] h-8 bg-[var(--ui-color)]"
        >
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="Accepted">Accepted</option>
          <option value="Completed">Completed</option>
          <option value="Rejected">Rejected</option>
        </select>
      </label>

      {role === "admin" && (
        <div>
          <input
            value={searchValue}
            onChange={onChange}
            name="searchValue"
            type="text"
            className="border-1 border-white/40 w-30 rounded-md h-8 text-[.8rem] outline-0 pl-2"
            placeholder="Search Name"
          />
        </div>
      )}
    </div>
  );
};

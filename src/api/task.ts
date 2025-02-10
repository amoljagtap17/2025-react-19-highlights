import { ITask } from "../components/section/types";

export const fetchTasks = async (order: "asc" | "desc" = "asc") => {
  const sort = order === "asc" ? "task" : "-task";
  const response = await fetch(`http://localhost:5000/tasks?_sort=${sort}`);

  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }

  const tasks: ITask[] = await response.json();

  return tasks;
};

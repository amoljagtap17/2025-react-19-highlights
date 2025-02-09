import { Suspense, use } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "../lib/ErrorFallback";
import { useTaskContext } from "./TaskContextProvider";
import "./TaskList.css";
import { ITask } from "./types";

interface ITaskListProps {
  fetchTasks: Promise<ITask[]>;
}

function TaskList({ fetchTasks }: ITaskListProps) {
  const tasks = use(fetchTasks);

  return (
    <div>
      <h1>Task List</h1>
      <ul className="task-list__list">
        {tasks.map(({ id, task }) => (
          <li key={id} className="task-list__list-item">
            {task}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TaskListContainer() {
  const { updateCount } = useTaskContext();

  console.log("updateCount::", updateCount);

  const fetchTasks = (async () => {
    const response = await fetch("http://localhost:5000/tasks");
    const tasks: ITask[] = await response.json();

    return tasks;
  })();

  return (
    <div className="task-list" key={updateCount}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<div>Loading...</div>}>
          <TaskList fetchTasks={fetchTasks} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

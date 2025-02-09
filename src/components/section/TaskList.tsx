import { Suspense, use } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "../lib/ErrorFallback";
import "./TaskList.css";

const fetchTasks = (async () => {
  const response = await fetch("http://localhost:5000/tasks");
  const tasks = await response.json();

  return tasks;
})();

function TaskList() {
  const tasks = use(fetchTasks);

  return (
    <div>
      <h1>Task List</h1>
      <ul className="task-list__list">
        {tasks.map(({ id, task }: { id: string; task: string }) => (
          <li key={id} className="task-list__list-item">
            {task}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TaskListContainer() {
  return (
    <div className="task-list">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<div>Loading...</div>}>
          <TaskList />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

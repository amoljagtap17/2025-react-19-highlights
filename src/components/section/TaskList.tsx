import { Suspense, use, useReducer } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Button } from "../lib/Button";
import { ErrorFallback } from "../lib/ErrorFallback";
import { useTaskStateContext } from "./TaskContextProvider";
import "./TaskList.css";
import { ITask } from "./types";

function TaskList({ fetchTasks }: { fetchTasks: Promise<ITask[]> }) {
  const tasks = use(fetchTasks);
  const { optimisticTasks } = useTaskStateContext();

  const newTasks = [...tasks, ...optimisticTasks];

  return (
    <ul className="task-list__list">
      {newTasks.map(({ id, task }) => (
        <li key={id} className="task-list__list-item">
          {task}
        </li>
      ))}
    </ul>
  );
}

export function TaskListContainer() {
  const [version, forceUpdate] = useReducer((x) => x + 1, 0);

  const fetchTasksPromise = (async () => {
    const response = await fetch("http://localhost:5000/tasks");
    const tasks: ITask[] = await response.json();

    return tasks;
  })();

  return (
    <div className="task-list" key={version}>
      <div className="task-list__header">
        <h1>Task List</h1>
        <Button
          onClick={() => {
            forceUpdate();
          }}
          disabled={false}
        >
          Refresh
        </Button>
      </div>

      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<div>Loading...</div>}>
          <TaskList fetchTasks={fetchTasksPromise} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

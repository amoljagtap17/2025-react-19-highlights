import { Suspense, use } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "../lib/ErrorFallback";
import { Select } from "../lib/Select";
import { useTaskContext } from "./TaskContextProvider";
import "./TaskList.css";

function TaskList() {
  const { taskPromise } = useTaskContext();
  const tasks = use(taskPromise);
  const { optimisticTasks } = useTaskContext();

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

const options = [
  { label: "Ascending", value: "asc" },
  { label: "Descending", value: "desc" },
];

function TaskListContainer() {
  return (
    <div>
      <div className="task-list__header">
        <h1>Task List</h1>
      </div>

      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<div>Loading...</div>}>
          <TaskList />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export function TaskListWrapper() {
  const { order, updateOrder } = useTaskContext();

  return (
    <div className="task-list">
      <Select options={options} value={order} handleOnChange={updateOrder} />
      <TaskListContainer />
    </div>
  );
}

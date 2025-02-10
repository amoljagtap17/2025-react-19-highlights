import {
  Suspense,
  use,
  useCallback,
  useDeferredValue,
  useReducer,
  useState,
} from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Button } from "../lib/Button";
import { ErrorFallback } from "../lib/ErrorFallback";
import { Select } from "../lib/Select";
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

const options = [
  { label: "Ascending", value: "asc" },
  { label: "Descending", value: "desc" },
];

interface ITaskListContainerProps {
  sort: string;
}

function TaskListContainer({ sort }: ITaskListContainerProps) {
  const [version, forceUpdate] = useReducer((x) => x + 1, 0);

  const fetchTasksPromise = async () => {
    const response = await fetch(`http://localhost:5000/tasks?_sort=${sort}`);
    const tasks: ITask[] = await response.json();

    return tasks;
  };

  const fetchTasksCallback = useCallback(() => fetchTasksPromise(), [sort]);

  return (
    <div key={version}>
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
          <TaskList fetchTasks={fetchTasksCallback()} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export function TaskListWrapper() {
  const [order, setOrder] = useState("asc");
  const deferredOrder = useDeferredValue(order);
  const sort = deferredOrder === "asc" ? "task" : "-task";

  return (
    <div className="task-list">
      <Select options={options} value={order} handleOnChange={setOrder} />
      <TaskListContainer sort={sort} />
    </div>
  );
}

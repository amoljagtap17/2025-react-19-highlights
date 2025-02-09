import { use } from "react";
import "./TaskList.css";

const fetchTasks = (async () => {
  const response = await fetch("http://localhost:5000/tasks");
  const tasks = await response.json();

  return tasks;
})();

function TaskList() {
  const tasks = use(fetchTasks);

  return (
    <div className="task-list">
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
    <div>
      <TaskList />
    </div>
  );
}

import { fetchTasks } from "./api/task";
import { NewTaskForm } from "./components/section/NewTaskForm";
import { TaskContextProvider } from "./components/section/TaskContextProvider";
import { TaskListWrapper } from "./components/section/TaskList";

export function App() {
  const initialTaskPromise = fetchTasks("asc");

  return (
    <TaskContextProvider taskPromise={initialTaskPromise}>
      <NewTaskForm />
      <TaskListWrapper />
    </TaskContextProvider>
  );
}

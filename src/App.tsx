import { NewTaskForm } from "./components/section/NewTaskForm";
import { TaskContextProvider } from "./components/section/TaskContextProvider";
import { TaskListWrapper } from "./components/section/TaskList";

export function App() {
  return (
    <TaskContextProvider>
      <NewTaskForm />
      <TaskListWrapper />
    </TaskContextProvider>
  );
}

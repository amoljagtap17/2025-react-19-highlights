import { NewTaskForm } from "./components/section/NewTaskForm";
import { TaskContextProvider } from "./components/section/TaskContextProvider";
import { TaskListContainer } from "./components/section/TaskList";

export function App() {
  return (
    <TaskContextProvider>
      <NewTaskForm />
      <TaskListContainer />
    </TaskContextProvider>
  );
}
